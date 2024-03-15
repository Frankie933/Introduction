import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './03.table.css';

import Calculator from './Calculator';
import Excel14 from './03.14.table-fetch';

import reportWebVitals from './reportWebVitals';


const top_level_headers = ['Book', 'Author', 'Language', 'Published', 'Sales'];
const data = [
  [
    'A Tale of Two Cities',
    'Charles Dickens',
    'English',
    '1859',
    '200 million',
  ],
  [
    'Le Petit Prince (The Little Prince)',
    'Antoine de Saint-Exupéry',
    'French',
    '1943',
    '150 million',
  ],
  [
    "Harry Potter and the Philosopher's Stone",
    'J. K. Rowling',
    'English',
    '1997',
    '120 million',
  ],
  [
    'And Then There Were None',
    'Agatha Christie',
    'English',
    '1939',
    '100 million',
  ],
  [
    'Dream of the Red Chamber',
    'Cao Xueqin',
    'Chinese',
    '1791',
    '100 million',
  ],
  ['The Hobbit', 'J. R. R. Tolkien', 'English', '1937', '100 million'],
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator /> 
    <Calculator />     
    <Excel14 headers={top_level_headers} initialData={data}/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
