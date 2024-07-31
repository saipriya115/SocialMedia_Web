import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from "./context/AuthContext"
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
//so i am gonna wrap this app ,so app is children ,so we are sharing all these values with app(state.user,dispatch are the values
//provided in authcontext)