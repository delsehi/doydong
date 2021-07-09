import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bulma/css/bulma.min.css'
import Context from './Context/Context'

ReactDOM.render(
  <React.StrictMode>
    <Context>
    <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);
