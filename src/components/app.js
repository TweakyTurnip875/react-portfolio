import React, { Component } from 'react';
import moment from 'moment';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Noah Smith portfolio</h1>
        <div>
          <h3>{moment().format('MMMM Do YYYY, h:mm:ss a')}</h3>
        </div>
      </div>
    );
  }
}
