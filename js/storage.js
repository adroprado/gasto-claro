const ls = localStorage;

const saveExpenses = (data) => ls.setItem('expenses', JSON.stringify(data));

const loadExpenses = () => {
  let dataRecovered = JSON.parse(ls.getItem('expenses'));
  return dataRecovered || [];
};

export { saveExpenses, loadExpenses };
