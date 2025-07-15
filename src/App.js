import './App.css';
import React from 'react';
import UserTable from './components/UserTable';

function App() {
  return (
    <div className="App">
      <h1>Таблица пользователей</h1>
      <UserTable/>
    </div>
  );
}

export default App;
