import React from 'react';
import './App.css';
import ContextProvider from './context/ContextProvider';
import Table from './Compoments/Table';

function App() {
  return (
    <div>
      <ContextProvider>
        <Table />
      </ContextProvider>
    </div>
  );
}

export default App;
