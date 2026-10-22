// --- VARIABLES QUE ALMACENAN ELEMENTOS DEL DOM ---
const $btnExpenses = document.querySelector('.btn-expenses'),
  $btnStatistics = document.querySelector('.btn-statistics'),
  $expensesSection = document.getElementById('expenses'),
  $statisticsSection = document.getElementById('statistics'),
  $form = document.getElementById('form-expenses'),
  $message = document.querySelector('.success-message'),
  $template = document.querySelector('.template').content,
  $fragment = document.createDocumentFragment(),
  $itemsContainer = document.querySelector('.item-container'),
  $emptyMessage = document.querySelector('.empty-state'),
  $totalExpenses = document.querySelector('.amount-information'),
  $totalRecords = document.querySelector('.record-information'),
  $search = document.getElementById('search'),
  $modalEdit = document.getElementById('modal-edit'),
  $modalExpenseName = $modalEdit.querySelector('.expense-name'),
  $modalPurchaseAmount = $modalEdit.querySelector('.purchase-amount'),
  $graph = document.querySelector('.canvas-graphic'),
  $graphEmptyState = document.querySelector('.empty-state'),
  $grandTotalStatistics = document.getElementById('grand-total'),
  $monthlyAverageStatistics = document.getElementById('monthly-average'),
  $totalExpensesStatistics = document.getElementById('total-expenses');

// --- SELECTORES ---
const EXPENSE_NAME = '.expense-name',
  PURCHASE_AMOUNT = '.purchase-amount',
  FIELD_SELECTOR = '.form-field [required]',
  ITEM_NAME = '.text-name',
  ITEM_EXPENSE = '.text-expense',
  ITEM_DATE = '.text-date',
  ITEM_BTN_EDIT = '.btn-edit',
  ITEM_BTN_DELETE = '.btn-delete',
  ITEM_MODAL_NAME = '.expense-name',
  ITEM_MODAL_EXPENSE = '.purchase-amount',
  ITEM_MODAL_ID = '[name="id"]',
  MODAL_BTN_SAVE = '.btn-save',
  MODAL_BTN_CANCEL = '.btn-cancel';

// --- SELECTORES DE ESTILOS ---
const ACTIVATE_BTN_MENU = 'is-active-btn',
  ACTIVATE_MENU_SECTIONS = 'is-active-sections',
  ACTIVATE_SUCCESS_MESSAGE = 'show-success',
  ACTIVATE_ERROR_MESSAGE = 'show-error',
  ACTIVATE_HIDDEN_MESSAGE = 'hidden-message',
  ACTIVATE_SHOW_MODAL = 'show-modal',
  ACTIVATE_GRAPH = 'show-graph',
  ACTIVATE_STATISTICS_MESSAGE = 'statistics-message';

// --- VARIABLE GLOBAL ---
let currencySettings = { style: 'currency', currency: 'MXN' },
  currencyFormatting = new Intl.NumberFormat('es-MX', currencySettings);

let myGraphicsCard;

let dbExpenses = [];

const menuNav = (e) => {
  if (e.target === $btnExpenses) {
    // Estilos a btns
    $btnExpenses.classList.add(ACTIVATE_BTN_MENU);
    $btnStatistics.classList.remove(ACTIVATE_BTN_MENU);
    // Estilos a secciones
    $expensesSection.classList.add(ACTIVATE_MENU_SECTIONS);
    $statisticsSection.classList.remove(ACTIVATE_MENU_SECTIONS);
  }

  if (e.target === $btnStatistics) {
    // Estilos a btns
    $btnStatistics.classList.add(ACTIVATE_BTN_MENU);
    $btnExpenses.classList.remove(ACTIVATE_BTN_MENU);
    // Estilos a secciones
    $statisticsSection.classList.add(ACTIVATE_MENU_SECTIONS);
    $expensesSection.classList.remove(ACTIVATE_MENU_SECTIONS);
  }
};

const saveExpensesLS = (data) => {
  const ls = localStorage;
  ls.setItem('expenses', JSON.stringify(data));
};

const loadExpense = () => {
  const ls = localStorage;
  let dataRecovered = JSON.parse(ls.getItem('expenses'));
  return dataRecovered || [];
};

dbExpenses = loadExpense();

const successMessage = () => {
  $form.reset();
  let timer;
  $message.classList.toggle(ACTIVATE_SUCCESS_MESSAGE);
  timer = setTimeout(() => {
    $message.classList.toggle(ACTIVATE_SUCCESS_MESSAGE);
  }, 1500);
  setTimeout(timer);
};

// Validación formulario
const errorMessage = (e) => {
  if (e.target.matches(FIELD_SELECTOR)) {
    let input = e.target; // Almacena el input en cuestion
    let rulePattern = input.pattern; // Almacena el patron del input en cuestion

    if (rulePattern) {
      let regex = new RegExp(rulePattern);

      if (!regex.exec(input.value)) {
        input.classList.add(ACTIVATE_ERROR_MESSAGE);
        input.nextElementSibling.classList.add(ACTIVATE_ERROR_MESSAGE);
      } else {
        input.classList.remove(ACTIVATE_ERROR_MESSAGE);
        input.nextElementSibling.classList.remove(ACTIVATE_ERROR_MESSAGE);
      }
    }
  }
};

const createExpense = () => {
  const newExpense = {
    id: Date.now(),
    expenseName: $form.querySelector(EXPENSE_NAME).value,
    purchaseAmount: $form.querySelector(PURCHASE_AMOUNT).value,
  };
  dbExpenses = [...dbExpenses, newExpense];
  saveExpensesLS(dbExpenses);
  $form.reset();
};

const listOfExpenses = (dataToDisplay = dbExpenses) => {
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
};

// Filtrado de busqueda
const filterSearch = (findingExpense) => {
  return dbExpenses.filter((expense) =>
    expense.expenseName.toLowerCase().includes(findingExpense),
  );
};
// Buscador de gasto
const searchExpense = (e) => {
  if (e.target === $search) {
    const searchTerm = $search.value.toLowerCase(); // el gasto que busca el usuario
    const filterFound = filterSearch(searchTerm); // se almacena en una variable el gasto filtrado (encontrado)
    listOfExpenses(filterFound); // se pasa cómo valor del parámetro "dataToDisplay" para usarse, si es que se manda una busqueda, de lo contrario, la función "listOfExpenses" usa, "dbExpenses", si el usuario no realiza una busqueda.
  }
};

// Editar gasto
const editExpense = (e) => {
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

    listOfExpenses();
    saveExpensesLS(dbExpenses);
    statisticsCards();
    graph();
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
    saveExpensesLS(dbExpenses);
  }
  listOfExpenses();
  statisticsCards();
  graph();
};

// Estadística tarjetas
const statisticsCards = () => {
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
};

//Cálculo mensual
const monthlyData = () => {
  const monthlyData = new Map();

  dbExpenses.forEach((expense) => {
    const date = new Date(expense.id); // el id lo establezco a una fecha entendible para humanos

    const monthCode = date.toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric',
    });

    const currentTotal = monthlyData.get(monthCode) || 0;

    monthlyData.set(
      monthCode,
      currentTotal + parseFloat(expense.purchaseAmount),
    );
  });

  return Array.from(monthlyData.entries()).map(([month, year]) => ({
    month,
    year,
  }));
};

// Crear función para preparar datos para gráfica
const dataGraph = (chartData) => {
  chartData.sort((a, b) => {
    return new Date(a.month).getTime() - new Date(b.month).getTime();
  });

  const xAxisMonthLabel = chartData.map((item) => item.month);

  const yAxisTotalLabel = chartData.map((item) => item.year);

  return { xAxisMonthLabel, yAxisTotalLabel };
};

const graph = () => {
  if (myGraphicsCard) {
    myGraphicsCard.destroy();
    myGraphicsCard = null;
  }

  if (dbExpenses === 0) return;

  const chartData = monthlyData();

  const { xAxisMonthLabel, yAxisTotalLabel } = dataGraph(chartData);

  myGraphicsCard = new Chart($graph, {
    type: 'bar', // Puede ser 'line', 'pie', 'bar', etc. 📊
    data: {
      labels: xAxisMonthLabel, // Tus meses ordenados
      datasets: [
        {
          //label: 'Gastos por Mes',
          label: currencyFormatting.format(yAxisTotalLabel),
          data: yAxisTotalLabel, // Tus montos sumados
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          // backgroundColor: 'rgba(147, 51, 234, 0.5)', // modo oscuro
          // borderColor: 'rgba(147,51,234,1)', // modo oscuro
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true, // Asegura que el eje Y empiece en 0
        },
      },
    },
  });
};

// --- DELEGACIÓN DE EVENTOS ---
// Evento "submit"
document.addEventListener('submit', (e) => {
  e.preventDefault();

  const ID = Number(e.target.elements.id.value);

  // Crear nuevo elemento "gasto"
  if (!ID) {
    createExpense();
    successMessage();
    listOfExpenses();
    statisticsCards();
    graph();
  }
});

// Evento "click"
document.addEventListener('click', (e) => {
  menuNav(e);

  editExpense(e);
  deleteExpense(e);
  if (e.target.matches(MODAL_BTN_CANCEL))
    $modalEdit.classList.remove(ACTIVATE_SHOW_MODAL);
  saveChanges(e);
});

// Evento "keyup"
document.addEventListener('keyup', (e) => {
  errorMessage(e);
  searchExpense(e);
});

(document.addEventListener('DOMContentLoaded', listOfExpenses()),
  statisticsCards(),
  graph());
