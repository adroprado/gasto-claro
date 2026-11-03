import { saveExpenses, loadExpenses } from './storage.js';

// --- VARIABLES QUE ALMACENAN ELEMENTOS DEL DOM ---
const $form = document.getElementById('form-expenses'),
  $modalEdit = document.getElementById('modal-edit'),
  $modalExpenseName = $modalEdit.querySelector('.expense-name'),
  $modalPurchaseAmount = $modalEdit.querySelector('.purchase-amount');

// --- SELECTORES ---
const EXPENSE_NAME = '.expense-name',
  PURCHASE_AMOUNT = '.purchase-amount',
  ITEM_BTN_DELETE = '.btn-delete',
  ITEM_MODAL_NAME = '.expense-name',
  ITEM_MODAL_EXPENSE = '.purchase-amount',
  ITEM_MODAL_ID = '[name="id"]',
  MODAL_BTN_SAVE = '.btn-save',
  MODAL_BTN_CANCEL = '.btn-cancel';

// --- SELECTORES DE ESTILOS ---
const ACTIVATE_SHOW_MODAL = 'show-modal';

// --- VARIABLE GLOBAL ---
let currencySettings = { style: 'currency', currency: 'MXN' },
  currencyFormatting = new Intl.NumberFormat('es-MX', currencySettings);

let dbExpenses = [];

dbExpenses = loadExpenses(); // Los datos extraidos de localStorage, se los pasamos a nuestra database.

const createExpense = () => {
  const newExpense = {
    id: Date.now(),
    expenseName: $form.querySelector(EXPENSE_NAME).value,
    purchaseAmount: $form.querySelector(PURCHASE_AMOUNT).value,
  };
  dbExpenses = [...dbExpenses, newExpense];
  saveExpenses(dbExpenses);
  $form.reset();
};

// Guardar cambios de edición de gasto
const saveChanges = (e) => {
  const ID = Number($modalEdit.querySelector(ITEM_MODAL_ID).value);

  dbExpenses = dbExpenses.map((expense) => {
    return expense.id === ID
      ? {
          ...expense,
          expenseName: $modalExpenseName.value,
          purchaseAmount: $modalPurchaseAmount.value,
        }
      : expense;
  });

  saveExpenses(dbExpenses);

  $modalEdit.querySelector(ITEM_MODAL_NAME).value = '';
  $modalEdit.querySelector(ITEM_MODAL_EXPENSE).value = '';
  $modalEdit.querySelector('input[name="id"]').value = '';
  $modalEdit.classList.remove(ACTIVATE_SHOW_MODAL);
};

// Eliminar gasto
const deleteExpense = (e) => {
  const ID = Number(e.target.dataset.id);
  if (e.target.matches(ITEM_BTN_DELETE)) {
    dbExpenses = dbExpenses.filter((expense) => expense.id !== ID);
    saveExpenses(dbExpenses);
  }
};

export {
  createExpense,
  saveChanges,
  deleteExpense,
  $form,
  $modalEdit,
  ITEM_BTN_DELETE,
  MODAL_BTN_SAVE,
  MODAL_BTN_CANCEL,
  ACTIVATE_SHOW_MODAL,
  currencyFormatting,
  dbExpenses,
};
