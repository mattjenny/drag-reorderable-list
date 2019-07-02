import React from 'react';
import './App.css';
import { DragReorderableList } from './DragReorderableList';

const App: React.FC = () => {
  return (
    <div className="App">
      <DragReorderableList />
    </div>
  );
}

export default App;
