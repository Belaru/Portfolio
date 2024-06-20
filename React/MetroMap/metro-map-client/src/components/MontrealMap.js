import { useState } from 'react';
import {Pannel} from './Pannel.js';
import {Map} from './Map.js';
// See https://www.youtube.com/watch?v=jD6813wGdBA if you want to customize the map
// further (optional)

/**
 * Represents the client page for metro map
 * @returns user-friendly metro display
 */
export default function MontrealMap() {
  const [points, setPoints] = useState([-74, 45]);
  
  return (
    <div className="ui-container">
      <div className="ui-controls">
        <Pannel showMap={setPoints}/>
      </div>
      <Map points={points}/>
    </div>
  );
}