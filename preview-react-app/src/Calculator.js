import React from 'react';
import ReactDOM from 'react-dom/client';

//https://www.pluralsight.com/guides/find-specific-elements-from-the-dom-in-react
//https://reactjs.org/docs/react-api.html#reactcreateref


//Copy the calculator.css file into src directory
import './calculator.css';

//Simply copy and paste the HTML file
//1. a simple function component.

//2. refracture to make a class
//  - class should extend React.Component
//  - Have an parameterless constructor
//  - JSX class -> className 
//  - study the event and state handling

class Calculator extends React.Component {

  constructor() {

    super();

    //Setting the state makes thing much easier than in the HTML/js version
    this.state = {
      currentOperand: '',
      previousOperand: '',
      operation: '',
      memOperand: '',
    };

    //Set the eventhandlers in the contructor and rebind to this
    this.onNumClick = this.onNumClick.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
    this.onDelClick = this.onDelClick.bind(this);
    this.onOperClick = this.onOperClick.bind(this);
    this.onEquClick = this.onEquClick.bind(this);
    this.onMemStoreClick = this.onMemStoreClick.bind(this);
    this.onMemRecallClick = this.onMemRecallClick.bind(this);
    this.onMemClearClick = this.onMemClearClick.bind(this);
  }

  render() {

    return <div className="calculator-container">
      <div className="calculator-grid">

        <div className="output">
          {/* When state is chanded the component is automatically rerendered */}
          <div data-previous-operand className="previous-operand">
            {`${this.state.previousOperand} ${this.state.operation}`}
          </div>
          <div data-current-operand className="current-operand">{this.state.currentOperand}</div>
        </div>

        <button data-clear className="wide-button" onClick={this.onClearClick}>AC</button>
        <button data-del onClick={this.onDelClick}>DEL</button>
        <button data-oper="div" onClick={this.onOperClick}>÷</button>
        <button data-num="1" onClick={this.onNumClick}>1</button>
        <button data-num="2" onClick={this.onNumClick}>2</button>
        <button data-num="3" onClick={this.onNumClick}>3</button>
        <button data-oper="mul" onClick={this.onOperClick}>*</button>
        <button data-num="4" onClick={this.onNumClick}>4</button>
        <button data-num="5" onClick={this.onNumClick}>5</button>
        <button data-num="6" onClick={this.onNumClick}>6</button>
        <button data-oper="add" onClick={this.onOperClick}>+</button>
        <button data-num="7" onClick={this.onNumClick}>7</button>
        <button data-num="8" onClick={this.onNumClick}>8</button>
        <button data-num="9" onClick={this.onNumClick}>9</button>
        <button data-oper="sub" onClick={this.onOperClick}>-</button>
        <button data-num="dot" onClick={this.onNumClick}>.</button>
        <button data-num="0" onClick={this.onNumClick}>0</button>
        <button data-equals onClick={this.onEquClick} className="wide-button">=</button>

        <button data-oper="sqr" onClick={this.onOperClick} className="science">sqr</button>
        <button data-oper="MCl" onClick={this.onMemClearClick} className="science">MC</button>
        <button data-oper="MSt" onClick={this.onMemStoreClick} className="science">MSt</button>
        <button data-oper="MRe" onClick={this.onMemRecallClick} className="science"
          style={this.state.memOperand === '' ? { backgroundColor: undefined } : { backgroundColor: 'green' }}>MRe</button>

      </div>
    </div>;
  }

  onNumClick(event) {
    const number = event.target.innerText;

    if (number === '.' && this.state.currentOperand.includes('.')) return;
    this.setState({ currentOperand: this.state.currentOperand.toString() + number.toString() })
  }

  onMemStoreClick(event) {
    if (this.state.currentOperand === '') return;

    this.setState({ memOperand: this.state.currentOperand })
  }

  onMemRecallClick(event) {
    if (this.state.memOperand === '') return;
    this.setState({ currentOperand: this.state.memOperand });
  }

  onMemClearClick(event) {
    this.setState({ memOperand: '' })
  }

  onClearClick(event) {
    this.setState({
      currentOperand: '',
      previousOperand: '',
      operation: ''
    })
  }

  onDelClick(event) {
    this.setState({ currentOperand: this.state.currentOperand.toString().slice(0, -1) });
  }

  onOperClick(event) {

    const result = this.compute(event.target.innerText);
    if (result) {

      //we have a result, present it
      this.setState({ operation: event.target.innerText, previousOperand: result, currentOperand: '' });
      return;
    }

    if (this.state.previousOperand === '') {

      //We dont have a previous operand. only a currentOperand Move current to previous and start operation
      this.setState({ operation: event.target.innerText, previousOperand: this.state.currentOperand, currentOperand: '' });
    }
    else {

      //We have only the previsous operand - starting an operation
      this.setState({ operation: event.target.innerText });
    }
  }

  onEquClick(event) {

    if ((this.state.previousOperand === '') || this.state.currentOperand === '') return;

    const result = this.compute(this.state.operation);
    this.setState({ operation: '', previousOperand: '', currentOperand: result });
  }

  compute(operation) {

    //returns undefined if the calculation does not work
    let result = undefined;
    const prev = Number(this.state.previousOperand);
    const current = Number(this.state.currentOperand);

    try {
      switch (operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '÷':
          result = prev / current;
          break;
        case 'sqr':
          result = current * current;
          break;
        case 'sqrt':
          result = Math.sqrt(current);
          break
        default:
          return undefined;
      }
      if (isNaN(result))
        return undefined;

      return result;
    }

    catch {

      return undefined;
    }
  }
}


export default Calculator;

/* Exercises
  1. Implement the sqr operation. Sqr = currentOperand * current Operans. 
  2. Implement the MSt, MRe, MC buttons.
      MSt should store the currentOperand in a state property memOperand
      MRe should recall state property memOperand and replace the currentOperand
      MC should clear the memOperand
  3. Indicate MRe as green background only when memOperand has a value (to indicated MRe can be used)
*/