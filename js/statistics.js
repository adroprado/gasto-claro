// --- VARIABLES QUE ALMACENAN ELEMENTOS DEL DOM ---
const $graph = document.querySelector('.canvas-graphic');

// --- VARIABLE GLOBAL ---
let currencySettings = { style: 'currency', currency: 'MXN' },
  currencyFormatting = new Intl.NumberFormat('es-MX', currencySettings);

let myGraphicsCard;

//Cálculo mensual
const monthlyData = (LIST) => {
  const monthlyData = new Map();

  LIST.forEach((expense) => {
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

export function graphView(expenses) {
  if (myGraphicsCard) {
    myGraphicsCard.destroy();
    myGraphicsCard = null;
  }

  if (expenses.length === 0) return;

  const chartData = monthlyData(expenses);

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
}
