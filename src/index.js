import "antd/dist/antd.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routers from "./Components/Routers";

ReactDOM.render(
  <React.Fragment>
    <Routers />
  </React.Fragment>,
  document.getElementById('root')
);

reportWebVitals();