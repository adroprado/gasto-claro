import menuNav from './js/menu.js';
import {
  $modalEdit,
  createExpense,
  saveChanges,
  deleteExpense,
  ITEM_BTN_DELETE,
  MODAL_BTN_SAVE,
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

  if (e.target.matches(MODAL_BTN_CANCEL))
    $modalEdit.classList.remove(ACTIVATE_SHOW_MODAL);

  if (e.target.matches(MODAL_BTN_SAVE)) {
    saveChanges(e);
    expensesView();
    statisticsInfoCardView();
    graphView();
  }

  if (e.target.matches(ITEM_BTN_DELETE)) {
    deleteExpense(e);
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
