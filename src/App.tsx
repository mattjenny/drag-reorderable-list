import React from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { MyComponent } from './MyComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <MyComponent />
    </div>
  );
}

export default App;
