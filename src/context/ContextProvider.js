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
  const [filterByValue, setFilterByValue] = useState([]);
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
  const handleFilter = () => {
    setFilterByValue([
      ...filterByValue,
      {
        column: filter.column,
        comparison: filter.comparison,
        value: filter.value,
      },
    ]);
    const comparisons = ['maior que', 'menor que'];
    setFilter({ ...filter, name: '' });
    if (planetsFiltered.length === 0) {
      setPlanetsFiltered(
        planets.filter((planet) => {
          if (filter.comparison === comparisons[0]) {
            return +planet[filter.column] > +filter.value;
          }
          if (filter.comparison === comparisons[1]) {
            return +planet[filter.column] < +filter.value;
          }
          return +planet[filter.column] === +filter.value;
        }),
      );
    } else {
      setPlanetsFiltered(
        planetsFiltered.filter((planet) => {
          if (filter.comparison === comparisons[0]) {
            return +planet[filter.column] > +filter.value;
          }
          if (filter.comparison === comparisons[1]) {
            return +planet[filter.column] < +filter.value;
          }
          return +planet[filter.column] === +filter.value;
        }),
      );
    }
    setFilter({
      name: '',
      column: 'population',
      comparison: 'maior que',
      value: '0',
    });
  };
  const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const values = useMemo(() => ({
    planets,
    setPlanets,
    titles,
    setTitles,
    filter,
    setFilter,
    planetsFiltered,
    setPlanetsFiltered,
    handleFilter,
    columnOptions,
    setFilterByValue,
    filterByValue,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [planets, titles, filter, setFilter, planetsFiltered,
    setPlanetsFiltered, filterByValue, columnOptions]);
  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
