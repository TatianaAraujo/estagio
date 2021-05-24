import React from 'react';
import { Switch,Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import ListaDeDoentes from './pages/ListaDeDoentes';
import FichaDoDoente from './pages/FichaDoDoente';

function App() {
  return (
      <Switch>
        <Route path="/FichaDoDoente" component={FichaDoDoente}/>
        <Route path="/ListaDeDoentes" component={ListaDeDoentes}/>
        <Route path="/" component={Login} />
      </Switch>
  );
}

export default App;
