import { dbExpenses } from '../main.js';
import { expensesView } from './expense-view.js';

// --- VARIABLES QUE ALMACENAN ELEMENTOS DEL DOM ---
const $search = document.getElementById('search');

// Filtrado de busqueda
const filterSearch = (findingExpense) => {
  return dbExpenses.filter((expense) =>
    expense.expenseName.toLowerCase().includes(findingExpense),
  );
};
// Buscador de gasto
export const searchExpense = (e) => {
  if (e.target === $search) {
    const searchTerm = $search.value.toLowerCase(); // el gasto que busca el usuario
    const filterFound = filterSearch(searchTerm); // se almacena en una variable el gasto filtrado (encontrado)
    expensesView(filterFound); // se pasa cómo valor del parámetro "dataToDisplay" para usarse, si es que se manda una busqueda, de lo contrario, la función "listOfExpenses" usa, "dbExpenses", si el usuario no realiza una busqueda.
  }
};
