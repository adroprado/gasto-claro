import { dbExpenses, currencyFormatting } from '../main.js';

// --- VARIABLES QUE ALMACENAN ELEMENTOS DEL DOM ---
const $message = document.querySelector('.success-message'),
  $form = document.getElementById('form-expenses'),
  $template = document.querySelector('.template').content,
  $fragment = document.createDocumentFragment(),
  $itemsContainer = document.querySelector('.item-container'),
  $emptyMessage = document.querySelector('.empty-state'),
  $totalExpenses = document.querySelector('.amount-information'),
  $totalRecords = document.querySelector('.record-information'),
  $modalEdit = document.getElementById('modal-edit'),
  $graph = document.querySelector('.canvas-graphic'),
  $graphEmptyState = document.querySelector('.empty-state'),
  $grandTotalStatistics = document.getElementById('grand-total'),
  $monthlyAverageStatistics = document.getElementById('monthly-average'),
  $totalExpensesStatistics = document.getElementById('total-expenses');

// --- SELECTORES ---
const ITEM_NAME = '.text-name',
  ITEM_EXPENSE = '.text-expense',
  ITEM_DATE = '.text-date',
  ITEM_BTN_EDIT = '.btn-edit',
  ITEM_BTN_DELETE = '.btn-delete',
  ITEM_MODAL_NAME = '.expense-name',
  ITEM_MODAL_EXPENSE = '.purchase-amount',
  ITEM_MODAL_ID = '[name="id"]';

// --- SELECTORES DE ESTILOS ---
const ACTIVATE_SUCCESS_MESSAGE = 'show-success',
  ACTIVATE_HIDDEN_MESSAGE = 'hidden-message',
  ACTIVATE_SHOW_MODAL = 'show-modal',
  ACTIVATE_GRAPH = 'show-graph',
  ACTIVATE_STATISTICS_MESSAGE = 'statistics-message';

function successMessageView() {
  $form.reset();
  let timer;
  $message.classList.toggle(ACTIVATE_SUCCESS_MESSAGE);
  timer = setTimeout(() => {
    $message.classList.toggle(ACTIVATE_SUCCESS_MESSAGE);
  }, 1500);
  setTimeout(timer);
}

function expensesView(dataToDisplay = dbExpenses) {
  $itemsContainer.innerHTML = '';
  if (dataToDisplay.length === 0) {
    $emptyMessage.classList.remove(ACTIVATE_HIDDEN_MESSAGE);
    $totalExpenses.textContent = currencyFormatting.format(0);
    $totalRecords.textContent = 0;
  } else {
    $emptyMessage.classList.add(ACTIVATE_HIDDEN_MESSAGE);
    dataToDisplay.forEach((expense) => {
      let $cloneRow = document.importNode($template, true);
      $cloneRow.querySelector(ITEM_NAME).textContent = expense.expenseName;
      $cloneRow.querySelector(ITEM_EXPENSE).textContent =
        currencyFormatting.format(expense.purchaseAmount);
      $cloneRow.querySelector(ITEM_DATE).textContent =
        new Date().toLocaleDateString();
      $cloneRow.querySelector(ITEM_BTN_EDIT).dataset.id = expense.id;
      $cloneRow.querySelector(ITEM_BTN_DELETE).dataset.id = expense.id;

      $fragment.appendChild($cloneRow);
    });
    $itemsContainer.appendChild($fragment);

    // Cálculo total
    const totalSum = dataToDisplay.reduce((accumulator, expense) => {
      return (accumulator += parseFloat(expense.purchaseAmount));
    }, 0);
    $totalExpenses.textContent = currencyFormatting.format(totalSum);

    // Cálculo registros
    const totalRecords = dataToDisplay.length;
    $totalRecords.textContent = totalRecords;
  }
}

function editFormView(e) {
  if (e.target.matches(ITEM_BTN_EDIT)) {
    $modalEdit.classList.add(ACTIVATE_SHOW_MODAL);
    const ID = Number(e.target.dataset.id);

    dbExpenses.find((expense) => {
      if (expense.id === ID) {
        $modalEdit.querySelector(ITEM_MODAL_NAME).value = expense.expenseName;
        $modalEdit.querySelector(ITEM_MODAL_EXPENSE).value =
          expense.purchaseAmount;
        $modalEdit.querySelector(ITEM_MODAL_ID).value = expense.id;
      }
    });
  }
}

// Estadística tarjetas
function statisticsInfoCardView() {
  if (dbExpenses.length === 0) {
    $graph.classList.add(ACTIVATE_GRAPH);
    $graphEmptyState.classList.remove(ACTIVATE_STATISTICS_MESSAGE);
    // Reset tarjeta de información, si, no hay gastos
    $totalExpensesStatistics.textContent = currencyFormatting.format(0);
    $monthlyAverageStatistics.textContent = 0;
    $grandTotalStatistics.textContent = currencyFormatting.format(0);
  } else {
    $graph.classList.remove(ACTIVATE_GRAPH);
    $graphEmptyState.classList.add(ACTIVATE_STATISTICS_MESSAGE);

    // Cálculo total
    const totalSum = dbExpenses.reduce((accumulator, expense) => {
      return (accumulator += parseFloat(expense.purchaseAmount));
    }, 0);
    $grandTotalStatistics.textContent = currencyFormatting.format(totalSum);

    // Cálculo registros
    const totalRecords = dbExpenses.length;
    $totalExpensesStatistics.textContent = totalRecords;

    // Cálculo promedio mensual
    const monthlyAverage = totalSum / totalRecords || 0;
    $monthlyAverageStatistics.textContent =
      currencyFormatting.format(monthlyAverage);
  }
}

export {
  successMessageView,
  expensesView,
  editFormView,
  statisticsInfoCardView,
};
