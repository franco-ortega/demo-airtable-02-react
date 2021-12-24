import React, { useEffect, useState } from 'react';
import Map from './components/maps/Map';

const App = () => {

  const [maps, setMaps] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3500/maps')
      .then(res => res.json())
      .then(res => {
        Object.keys(res).forEach((key) => {
          Object.keys(res[key].fields).forEach((field) => {
            const replacedField = field.trim().replace(/\s+/g, "_");
            if (field !== replacedField) {
              res[key].fields[replacedField] = res[key].fields[field];
               delete res[key].fields[field]
            }
          });

       });

        setMaps(res);
      });
      
    }, []);

  const mapList = maps.map(map => (
    <Map
      key={map.id}
      {...map.fields}
    />
  ));

  if(!maps) return <h1>Loading...</h1>

  return (
    <div>
      <h1>Maps</h1>
      <ul>{mapList}</ul>
    </div>
  );
};

export default App;
