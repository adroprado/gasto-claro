export const filterExpenses = (expenses, searchTerm) => {
  const normalizedSearchTerm = searchTerm.toLowerCase();
  return expenses.filter((expense) =>
    expense.expenseName.toLowerCase().includes(normalizedSearchTerm),
  );
};
