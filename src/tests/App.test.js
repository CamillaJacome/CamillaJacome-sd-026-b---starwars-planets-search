import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

describe('', () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });
  test('se a API foi chamada', () => {
    render(<App />);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });
  test('se existe o input de filtro', () => { 
    render(<App />);
    const inputSearch = screen.getByTestId('name-filter');
    expect(inputSearch).toBeInTheDocument();
  });
  test('se existe filtros para valores numéricos', () => {
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
  test('se o filtro de planetas pelo nome funciona buscando por aa', async () => { 
    render(<App />);
    const inputSearch = screen.getByTestId('name-filter');
    userEvent.type(inputSearch, 'aa');
    const Alderaan = await screen.findByRole('cell', {name: /Alderaan/i});
    expect(Alderaan).toBeInTheDocument();
  });
  test('se o filtro de planetas pelo nome funciona buscando por oo', async () => { 
    render(<App />);
    const inputSearch = screen.getByTestId('name-filter');
    userEvent.type(inputSearch, 'oo');
    const Tatooine = await screen.findByRole('cell', {name: /Tatooine/i});
    expect(Tatooine).toBeInTheDocument();
    const Naboo = await screen.findByRole('cell', {name: /Naboo/i});
    expect(Naboo).toBeInTheDocument();
  });
  test('se o filtro maior que funciona', async () => { 
    // render(<App />);
    await act(async () => {
      render(<App />);
    });
    const valueInput = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(
      screen.getByTestId('column-filter'),
      // screen.getByRole('option', { name: /population/i }),
      screen.getAllByText(/population/i)[0],
    );
    userEvent.selectOptions(
      screen.getByTestId('comparison-filter'),
      screen.getByRole('option', { name: /maior que/i }),
    );
    userEvent.type(valueInput, '100000000000')
    userEvent.click(buttonFilter);
    // const Coruscant = await screen.findByRole('cell', {name: /Coruscant/i});
   // expect(Coruscant).toBeInTheDocument();
    const cell = screen.getByTestId('planet-name');
    expect(cell.innerHTML).toBe('Coruscant');
   });
   test('se o filtro menor que funciona', async () => {
    // render(<App />);
    // act(() => render(<App />));
    // await act(async () => render(<App />));
    await act(async () => {
      render(<App />);
    });
    const valueInput = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    act(()=> {
      userEvent.selectOptions(
      screen.getByTestId('column-filter'),
      // screen.getByRole('option', { name: /population/i }),
      screen.getAllByText(/population/i)[0],
    );
    userEvent.selectOptions(
      screen.getByTestId('comparison-filter'),
      screen.getByRole('option', { name: /menor que/i }),
    );
    userEvent.type(valueInput, '200000');
    userEvent.click(buttonFilter);
    })
    // const YavinIV = await screen.findByRole('cell', {name: /Yavin IV/i});
    // expect(YavinIV).toBeInTheDocument();
    const cell = screen.getByTestId('planet-name');
    expect(cell.innerHTML).toBe('Yavin IV');
  });
} );
describe('testa a ordenação',() => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });
  test('se existe os inputs de ornenação', async () => { 
    await act(async () => {
      render(<App />);
    });
    const inputOptions = screen.getByTestId('column-sort');
    const inputASC = screen.getByTestId('column-sort-input-asc');
    const inputDESC =  screen.getByTestId('column-sort-input-desc');
    expect(inputOptions).toBeInTheDocument();
    expect(inputASC).toBeInTheDocument();
    expect(inputDESC).toBeInTheDocument();
  });
  test('se ordena de forma asc', async() => { 
    await act(async () => {
      render(<App />);
    });
    const inputASC = screen.getByTestId('column-sort-input-asc');
    const button = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(
      screen.getByTestId('column-sort'),
      screen.getAllByText(/population/i)[1],
    ); 
    userEvent.click(inputASC);
    userEvent.click(button);
    // const firstElement = await screen.findAllByRole('cell', {name: /Yavin IV/i});
    const firstElement = await screen.findAllByRole('cell');
    // console.log(typeof firstElement);
    expect(firstElement[0].innerHTML).toBe('Yavin IV');
    
   });
   test('se ordena de forma desc', async() => { 
    await act(async () => {
      render(<App />);
    });
    const inputASC = screen.getByTestId('column-sort-input-desc');
    const button = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(
      screen.getByTestId('column-sort'),
      screen.getAllByText(/population/i)[1],
    ); 
    userEvent.click(inputASC);
    userEvent.click(button);
    // const firstElement = await screen.findAllByRole('cell', {name: /Yavin IV/i});
    const firstElement = await screen.findAllByRole('cell');
    // console.log(typeof firstElement);
    expect(firstElement[0].innerHTML).toBe('Coruscant');
    
   });
});
