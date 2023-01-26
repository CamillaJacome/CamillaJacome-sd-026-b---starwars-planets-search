import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetContext';

export default function ContextProvider({ children }) {
  const [filter, setFilter] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
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
  const [comparisonRender, setComparisonRender] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

  const values = useMemo(() => ({
    planets,
    setPlanets,
    titles,
    setTitles,
    filter,
    setFilter,
    planetsFiltered,
    setPlanetsFiltered,
    comparisonRender,
    setComparisonRender,
  }), [planets, titles, filter, setFilter, planetsFiltered, setPlanetsFiltered,
    comparisonRender]);
  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
