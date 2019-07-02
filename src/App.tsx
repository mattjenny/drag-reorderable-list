import React from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { DragReorderableList } from './DragReorderableList';

const App: React.FC = () => {
  return (
    <div className="App">
      <DragReorderableList />
    </div>
  );
}

export default App;
