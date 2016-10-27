import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <NextApp />
      ,
      document.getElementById('root')
    );
  });
}
