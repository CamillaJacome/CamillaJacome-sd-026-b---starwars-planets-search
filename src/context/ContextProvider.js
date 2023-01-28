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
  }, [setPlanets]);
  const handleFilter = () => {
    setFilterByValue([
      ...filterByValue,
      {
        column: filter.column,
        comparison: filter.comparison,
        value: filter.value,
      },
    ]);
    setPlanets(
      planets.filter((planet) => {
        if (filter.comparison === 'maior que') {
          return +planet[filter.column] > +filter.value;
        }
        if (filter.comparison === 'menor que') {
          return +planet[filter.column] < +filter.value;
        }
        return +planet[filter.column] === +filter.value;
      }),
    );
    setFilter({
      name: '',
      column: 'population',
      comparison: 'maior que',
      value: '0',
    });
  };
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const handleSort = () => {
    if (order.column === 'surface_water' || order.column === 'population') {
      if (order.sort === 'ASC') {
        setPlanets([
          ...planets
            .filter((planet) => planet[order.column] !== 'unknown')
            .sort((a, b) => a[order.column] - b[order.column]),
          ...planets.filter((planet) => planet[order.column] === 'unknown'),
        ]);
        setOrder({
          column: 'population',
          sort: 'ASC',
        });
      }
      if (order.sort === 'DESC') {
        setPlanets([
          ...planets
            .filter((planet) => planet[order.column] !== 'unknown')
            .sort((a, b) => b[order.column] - a[order.column]),
          ...planets.filter((planet) => planet[order.column] === 'unknown'),
        ]);
        setOrder({
          column: 'population',
          sort: 'ASC',
        });
      }
    }
    if (order.column !== 'surface_water' && order.column !== 'population') {
      if (order.sort === 'ASC') {
        setPlanets(planets.sort((a, b) => a[order.column] - b[order.column]));
        setOrder({
          column: 'population',
          sort: 'ASC',
        });
      }
      if (order.sort === 'DESC') {
        setPlanets(planets.sort((a, b) => b[order.column] - a[order.column]));
        setOrder({
          column: 'population',
          sort: 'ASC',
        });
      }
    }
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
    handleSort,
    order,
    setOrder,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [planets, titles, filter, setFilter, planetsFiltered,
    setPlanetsFiltered, filterByValue, columnOptions, order, setOrder]);
  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
