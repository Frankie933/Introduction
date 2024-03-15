import React from 'react';
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

import './App.css';

class Excel14 extends React.Component {
  constructor(props) {
    super();
    const data = clone(props.initialData).map((row, idx) =>
      row.concat(idx),
    );
    this.state = {
      data,
      sortby: null,
      descending: false,
      edit: null, // {row: index, column: index}
      search: false,
    };

    this.preSearchData = null;
    // log the initial state
    this.log = [clone(this.state)];
    this.replayID = null;

    this.sort = this.sort.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.save = this.save.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.search = this.search.bind(this);
    this.replay = this.replay.bind(this);
    this.logSetState = this.logSetState.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.downloadJSON = this.download.bind(this, 'json');
    this.downloadCSV = this.download.bind(this, 'csv');
  }

  keydownHandler(e) {
    if (e.altKey && e.shiftKey && e.keyCode === 82) {
      // ALT+SHIFT+R(eplay)
      this.replay();
    }
  }

  async componentDidMount() {
    document.addEventListener('keydown', this.keydownHandler);

    const response = await fetch('https://www.phpied.com/files/reactbook/table-data.json');
    const initialData = await response.json();
    const data = clone(initialData).map((row, idx) =>
      row.concat(idx),
    );
    this.setState({ data });
    
    /*
    fetch('https://www.phpied.com/files/reactbook/table-data.json')
      .then((response) => response.json())
      .then((initialData) => {
        const data = clone(initialData).map((row, idx) =>
          row.concat(idx),
        );
        this.setState({ data });
      });
      */
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler);
    clearInterval(this.replayID);
  }

  sort(e) {
    const column = Number(e.target.dataset.cellIndex);
    const data = clone(this.state.data);
    const descending =
      this.state.sortby === column && !this.state.descending;
    data.sort((a, b) => {
      if (a[column] === b[column]) {
        return 0;
      }
      return descending
        ? a[column] < b[column]
          ? 1
          : -1
        : a[column] > b[column]
          ? 1
          : -1;
    });
    this.logSetState({
      data,
      sortby: column,
      descending,
    });
  }

  showEditor(e) {
    this.logSetState({
      edit: {
        row: parseInt(e.target.parentNode.dataset.row, 10),
        column: e.target.cellIndex,
      },
    });
  }

  save(e) {
    e.preventDefault();
    const input = e.target.firstChild;
    const data = clone(this.state.data).map((row) => {
      if (row[row.length - 1] === this.state.edit.row) {
        row[this.state.edit.column] = input.value;
      }
      return row;
    });
    this.logSetState({
      edit: null,
      data,
    });
    if (this.preSearchData) {
      this.preSearchData[this.state.edit.row][this.state.edit.column] =
        input.value;
    }
  }

  toggleSearch() {
    if (this.state.search) {
      this.logSetState({
        data: this.preSearchData,
        search: false,
      });
      this.preSearchData = null;
    } else {
      this.preSearchData = this.state.data;
      this.logSetState({
        search: true,
      });
    }
  }

  search(e) {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      this.logSetState({ data: this.preSearchData });
      return;
    }
    const idx = e.target.dataset.idx;
    const searchdata = this.preSearchData.filter((row) => {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.logSetState({ data: searchdata });
  }

  logSetState(newState) {
    // remember the old state in a clone
    this.log.push(clone(newState));
    // now set it
    this.setState(newState);
  }

  replay() {
    if (this.log.length === 1) {
      console.warn('No state changes to replay yet');
      return;
    }
    let idx = -1;
    this.replayID = setInterval(() => {
      if (++idx === this.log.length - 1) {
        // the end
        clearInterval(this.replayID);
      }
      this.setState(this.log[idx]);
    }, 1000);
  }

  download(format, ev) {
    const data = clone(this.state.data).map((row) => {
      row.pop(); // drop the last column, the recordId
      return row;
    });
    const contents =
      format === 'json'
        ? JSON.stringify(data, null, '  ')
        : data.reduce((result, row) => {
          return (
            result +
            row.reduce((rowcontent, cellcontent, idx) => {
              const cell = cellcontent.replace(/"/g, '""');
              const delimiter = idx < row.length - 1 ? ',' : '';
              return `${rowcontent}"${cellcontent}"${delimiter}`;
            }, '') +
            '\n'
          );
        }, '');

    const URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], { type: 'text/' + format });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  }

  render() {
    const searchRow = !this.state.search ? null : (
      <tr onChange={this.search}>
        {this.props.headers.map((_, idx) => (
          <td key={idx}>
            <input type="text" data-idx={idx} />
          </td>
        ))}
      </tr>
    );
    return (
      <div>
        <div className="toolbar">
          <button onClick={this.toggleSearch}>
            {this.state.search ? 'Hide search' : 'Show search'}
          </button>
          <a href="data.json" onClick={this.downloadJSON}>
            Export JSON
          </a>
          <a href="data.csv" onClick={this.downloadCSV}>
            Export CSV
          </a>
        </div>
        <table>
          <thead onClick={this.sort}>
            <tr>
              {this.props.headers.map((title, idx) => {
                if (this.state.sortby === idx) {
                  title += this.state.descending ? ' \u2191' : ' \u2193';
                }
                return <th key={idx} data-cell-index={idx}>{title}</th>;
              })}
            </tr>
          </thead>
          {this.state.data.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={this.props.headers.length}>
                  Loading data...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody onDoubleClick={this.showEditor}>
              {searchRow}
              {this.state.data.map((row) => {
                const recordId = row[row.length - 1];
                return (
                  <tr key={recordId} data-row={recordId}>
                    {row.map((cell, columnidx) => {
                      if (columnidx === this.props.headers.length) {
                        return;
                      }
                      const edit = this.state.edit;
                      if (
                        edit &&
                        edit.row === recordId &&
                        edit.column === columnidx
                      ) {
                        cell = (
                          <form onSubmit={this.save}>
                            <input type="text" defaultValue={cell} />
                          </form>
                        );
                      }
                      return <td key={columnidx}>{cell}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    );
  }
}

//helper function to clone an object using deep copy. 
function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

Excel14.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default Excel14;