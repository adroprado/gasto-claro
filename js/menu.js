export default function menuNav(e) {
  // --- VARIABLES QUE ALMACENAN ELEMENTOS DEL DOM ---
  const $btnExpenses = document.querySelector('.btn-expenses'),
    $btnStatistics = document.querySelector('.btn-statistics'),
    $expensesSection = document.getElementById('expenses'),
    $statisticsSection = document.getElementById('statistics');

  // --- SELECTORES DE ESTILOS ---
  const ACTIVATE_BTN_MENU = 'is-active-btn',
    ACTIVATE_MENU_SECTIONS = 'is-active-sections';

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
}
