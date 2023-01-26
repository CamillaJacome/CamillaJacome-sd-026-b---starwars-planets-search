import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetContext';

export default function Table() {
  const { planets, titles } = useContext(PlanetsContext);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {titles.map((title, index) => <th key={ `${title}${index}` }>{title}</th>)}
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={ planet.name }>
              <th>{planet.name}</th>
              <th>{planet.rotation_period}</th>
              <th>{planet.orbital_period}</th>
              <th>{planet.diameter}</th>
              <th>{planet.climate}</th>
              <th>{planet.gravity}</th>
              <th>{planet.terrain}</th>
              <th>{planet.surface_water}</th>
              <th>{planet.population}</th>
              <th>{planet.films}</th>
              <th>{planet.created}</th>
              <th>{planet.edited}</th>
              <th>{planet.url}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
