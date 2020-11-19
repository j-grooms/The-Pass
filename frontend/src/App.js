import React from 'react';
import {Route} from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage/index'

function App() {
  return (
    <React.Fragment>
      <Route path="/login" component={LoginFormPage} />
    </React.Fragment>
  );
}

export default App;
