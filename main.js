import menuNav from './js/menu.js';
import {
  $modalEdit,
  createExpense,
  saveChanges,
  deleteExpense,
  MODAL_BTN_CANCEL,
  ACTIVATE_SHOW_MODAL,
} from './js/expenses.js';
import formValidations from './js/form-validations.js';
import {
  successMessageView,
  expensesView,
  editFormView,
  statisticsInfoCardView,
} from './js/expense-view.js';
import { searchExpense } from './js/searcher.js';
import { graphView } from './js/statistics.js';

// --- DELEGACIÓN DE EVENTOS ---
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
