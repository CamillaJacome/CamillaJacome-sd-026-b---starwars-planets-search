import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetContext';

export default function Table() {
  const { filter, setFilter,
    planets, titles,
    planetsFiltered, setPlanetsFiltered,
    handleFilter,
    filterByValue,
    columnOptions,
    order,
    setOrder,
    handleSort,
  } = useContext(PlanetsContext);
  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ filter.name }
          onChange={ ({ target }) => {
            setFilter({ ...filter, name: target.value });
            setPlanetsFiltered([]);
          } }
        />
      </div>
      <div>
        <label htmlFor="column-filter">
          Columns
          <select
            id="column-filter"
            name="column-filter"
            data-testid="column-filter"
            value={ filter.column }
            onChange={ ({ target }) => setFilter({ ...filter, column: target.value }) }
          >
            {filterByValue.length === 0
              ? columnOptions.map((columnFilter) => (
                <option key={ columnFilter } value={ `${columnFilter}` }>
                  {columnFilter}
                </option>
              ))
              : columnOptions
                .filter(
                  (columnOption) => !filterByValue
                    .map((filterValue) => filterValue.column)
                    .includes(columnOption),
                )
                .map((columnFilter) => (
                  <option key={ columnFilter } value={ `${columnFilter}` }>
                    {columnFilter}
                  </option>
                ))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador
          <select
            id="comparison-filter"
            name="comparison-filter"
            value={ filter.comparison }
            data-testid="comparison-filter"
            onChange={ ({ target }) => (
              setFilter({ ...filter, comparison: target.value })) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          value={ filter.value }
          onChange={ ({ target }) => setFilter({ ...filter, value: target.value }) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleFilter }
        >
          Filtrar
        </button>
        <select
          name="column-sort"
          id="column-sort"
          data-testid="column-sort"
          onChange={ ({ target }) => setOrder({ ...order, column: target.value }) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="column-sort-input-asc">
          ASC
          <input
            type="radio"
            id="column-sort-input-asc"
            data-testid="column-sort-input-asc"
            value="ASC"
            checked={ order.sort === 'ASC' }
            onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          DESC
          <input
            type="radio"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            value="DESC"
            checked={ order.sort === 'DESC' }
            onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          Ordenar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {titles.map((title, index) => <th key={ `${title}${index}` }>{title}</th>)}
          </tr>
        </thead>
        <tbody>
          {planetsFiltered.length === 0
            ? planets
              .filter(({ name }) => name.includes(filter.name))
              .map((planet) => (
                <tr key={ planet.name }>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))
            : planetsFiltered.map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-filtered">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
