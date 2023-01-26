import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetContext';

export default function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [titles, setTitles] = useState([
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const fetchPlanets = async () => {
      const url = 'https://swapi.dev/api/planets';
      const response = await fetch(url);
      const json = await response.json();
      const { results } = json;
      const planetsList = results.map((result) => {
        const { residents, ...planet } = result;
        return planet;
      });
      setPlanets(planetsList);
    };
    fetchPlanets();
  }, [planets]);
  const values = useMemo(() => ({
    planets,
    setPlanets,
    titles,
    setTitles,
    filter,
    setFilter,
  }), [planets, titles, filter, setFilter]);
  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
