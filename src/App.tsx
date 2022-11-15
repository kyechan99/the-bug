import React from 'react';
import './App.scss';
import './_grid.scss';
import { Road } from './components/Road/Road';

function App() {
  // const [mapData, setMapData] = React.useState<Number>();
  const arr = [
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1]
  ]

  return (
    <div className="App container-sm">
      <div className="row">
        {
          arr.map( (v) => {
            return v.map(el => {
              return <Road>{el}</Road>;
            })
          })
        }
      </div>
    </div>
  );
}

export default App;
