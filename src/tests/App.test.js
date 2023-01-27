import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'

const mock = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(testData),
  });
};

test('se a API foi chamada', () => {
  render(<App />);
  jest.spyOn(global, 'fetch');
  render(<App />);
  // verifica a chamada da api
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
});
test('se existe o input de filtro', () => { 
  mock();
  render(<App />);
  const inputSearch = screen.getByTestId('name-filter');
  expect(inputSearch).toBeInTheDocument();
});
test('se existe filtros para valores numéricos', () => {
  mock();
  render(<App />);
  const inputDropdown = screen.getByTestId('column-filter');
  const inputFaixaValor = screen.getByTestId('comparison-filter');
  const inputValueFilter = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  expect(inputDropdown).toBeInTheDocument();
  expect(inputFaixaValor).toBeInTheDocument();
  expect(inputValueFilter).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();
});