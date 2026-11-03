import menuNav from './js/menu.js';
import { createExpense, saveChanges, deleteExpense } from './js/expenses.js';
import formValidations from './js/form-validations.js';
import {
  successMessageView,
  expensesView,
  editFormView,
  statisticsInfoCardView,
} from './js/expense-view.js';
import { searchExpense } from './js/searcher.js';
import { graphView } from './js/statistics.js';

// --- ELEMENTOS DEL DOM ---
const $form = document.getElementById('form-expenses'),
  $modalEdit = document.getElementById('modal-edit'),
  $modalExpenseName = $modalEdit.querySelector('.expense-name'),
  $modalPurchaseAmount = $modalEdit.querySelector('.purchase-amount');

// --- SELECTORES ---
const EXPENSE_NAME = '.expense-name',
  PURCHASE_AMOUNT = '.purchase-amount',
  ITEM_MODAL_NAME = '.expense-name',
  ITEM_MODAL_EXPENSE = '.purchase-amount',
  ITEM_MODAL_ID = '[name="id"]',
  ITEM_BTN_DELETE = '.btn-delete',
  MODAL_BTN_SAVE = '.btn-save',
  MODAL_BTN_CANCEL = '.btn-cancel';

// --- SELECTORES DE ESTILOS ---
const ACTIVATE_SHOW_MODAL = 'show-modal';

// --- VARIABLE GLOBAL ---
const name = $form.querySelector(EXPENSE_NAME),
  amount = $form.querySelector(PURCHASE_AMOUNT);

// --- EVENTOS ---
document.addEventListener('submit', (e) => {
  e.preventDefault();

  const ID = Number(e.target.elements.id.value);

  // Si el id oculto del formulario, no hace referencia a un id a editar, creamos un nuevo elemento (gasto)
  if (!ID) {
    createExpense(name, amount);
    successMessageView();
    expensesView();
    statisticsInfoCardView();
    graphView();
    $form.reset();
  }
});

// Evento "click"
document.addEventListener('click', (e) => {
  menuNav(e);
  editFormView(e);

  if (e.target.matches(MODAL_BTN_CANCEL))
    $modalEdit.classList.remove(ACTIVATE_SHOW_MODAL);

  if (e.target.matches(MODAL_BTN_SAVE)) {
    const ID = Number($modalEdit.querySelector(ITEM_MODAL_ID).value);
    saveChanges(ID, $modalExpenseName, $modalPurchaseAmount);
    expensesView();
    statisticsInfoCardView();
    graphView();

    $modalEdit.querySelector(ITEM_MODAL_NAME).value = '';
    $modalEdit.querySelector(ITEM_MODAL_EXPENSE).value = '';
    $modalEdit.querySelector('input[name="id"]').value = '';
    $modalEdit.classList.remove(ACTIVATE_SHOW_MODAL);
  }

  if (e.target.matches(ITEM_BTN_DELETE)) {
    const ID = Number(e.target.dataset.id);
    deleteExpense(ID);
    expensesView();
    statisticsInfoCardView();
    graphView();
  }
});

// Evento "keyup"
document.addEventListener('keyup', (e) => {
  formValidations(e);
  searchExpense(e);
});

// Evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  expensesView();
  statisticsInfoCardView();
  graphView();
});
