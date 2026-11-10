import { saveExpenses, loadExpenses } from './storage.js';

// --- VARIABLE GLOBAL ---
let dbExpenses = [];

dbExpenses = loadExpenses(); // Los datos extraidos de localStorage, se los pasamos a nuestra database.

const getExpenses = () => [...dbExpenses];

// Crear gasto
const createExpense = (name, amount) => {
  const newExpense = {
    id: Date.now(),
    expenseName: name,
    purchaseAmount: amount,
  };
  dbExpenses = [...dbExpenses, newExpense];
  saveExpenses(dbExpenses);
};

// Editar gasto
const saveChanges = (ID, name, amount) => {
  dbExpenses = dbExpenses.map((expense) => {
    return expense.id === ID
      ? {
          ...expense,
          expenseName: name,
          purchaseAmount: amount,
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

export { createExpense, saveChanges, deleteExpense, getExpenses };
