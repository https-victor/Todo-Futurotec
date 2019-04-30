import React, { Component } from 'react';
import Todos from './components/Todos'
import 'antd/dist/antd.css';  
import './App.css';


class App extends Component {

  render() {
    return (
      <div className='App'>
        <header>
          Título
        </header>
        <main>
          <Todos />
        </main>
        <footer>
          Rodapé
        </footer>
      </div>
    );
  }


}

export default App;