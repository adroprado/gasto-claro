import { saveExpenses, loadExpenses } from './storage.js';

// --- VARIABLE GLOBAL ---
let currencySettings = { style: 'currency', currency: 'MXN' },
  currencyFormatting = new Intl.NumberFormat('es-MX', currencySettings);

let dbExpenses = [];

dbExpenses = loadExpenses(); // Los datos extraidos de localStorage, se los pasamos a nuestra database.

// Crear gasto
const createExpense = (name, amount) => {
  const newExpense = {
    id: Date.now(),
    expenseName: name.value,
    purchaseAmount: amount.value,
  };
  dbExpenses = [...dbExpenses, newExpense];
  saveExpenses(dbExpenses);
};

// Editar gasto
const saveChanges = (ID, modalName, modalAmount) => {
  dbExpenses = dbExpenses.map((expense) => {
    return expense.id === ID
      ? {
          ...expense,
          expenseName: modalName.value,
          purchaseAmount: modalAmount.value,
        }
      : expense;
  });

  saveExpenses(dbExpenses);
};

// Eliminar gasto
const deleteExpense = (ID) => {
  dbExpenses = dbExpenses.filter((expense) => expense.id !== ID);
  saveExpenses(dbExpenses);
};

export {
  createExpense,
  saveChanges,
  deleteExpense,
  currencyFormatting,
  dbExpenses,
};
