import menuNav from './js/menu.js';
import formValidations from './js/form-validations.js';
import { saveExpenses, loadExpenses } from './js/storage.js';
import {
  successMessageView,
  expensesView,
  editFormView,
  statisticsInfoCardView,
} from './js/expense-view.js';
import { graphView } from './js/statistics.js';
import { searchExpense } from './js/searcher.js';

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
export let currencySettings = { style: 'currency', currency: 'MXN' },
  currencyFormatting = new Intl.NumberFormat('es-MX', currencySettings);

export let dbExpenses = [];

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
  if (e.target.matches(MODAL_BTN_SAVE)) {
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

    expensesView();
    saveExpenses(dbExpenses);
    statisticsInfoCardView();
    graphView();
    $modalEdit.querySelector(ITEM_MODAL_NAME).value = '';
    $modalEdit.querySelector(ITEM_MODAL_EXPENSE).value = '';
    $modalEdit.querySelector('input[name="id"]').value = '';
    $modalEdit.classList.remove(ACTIVATE_SHOW_MODAL);
  }
};

// Eliminar gasto
const deleteExpense = (e) => {
  const ID = Number(e.target.dataset.id);
  if (e.target.matches(ITEM_BTN_DELETE)) {
    dbExpenses = dbExpenses.filter((expense) => expense.id !== ID);
    saveExpenses(dbExpenses);
  }
  expensesView();
  statisticsInfoCardView();
  graphView();
};

// --- DELEGACIÓN DE EVENTOS ---
// Evento "submit"
document.addEventListener('submit', (e) => {
  e.preventDefault();

  const ID = Number(e.target.elements.id.value);

  // Crear nuevo elemento "gasto"
  if (!ID) {
    createExpense();
    successMessageView();
    expensesView();
    statisticsInfoCardView();
    graphView();
  }
});

// Evento "click"
document.addEventListener('click', (e) => {
  menuNav(e);

  editFormView(e);
  deleteExpense(e);
  if (e.target.matches(MODAL_BTN_CANCEL))
    $modalEdit.classList.remove(ACTIVATE_SHOW_MODAL);
  saveChanges(e);
});

// Evento "keyup"
document.addEventListener('keyup', (e) => {
  formValidations(e);
  searchExpense(e);
});

(document.addEventListener('DOMContentLoaded', expensesView()),
  statisticsInfoCardView(),
  graphView());
