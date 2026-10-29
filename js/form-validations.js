// Validación formulario
export default function formValidations(e) {
  // --- SELECTORES ---
  const FIELD_SELECTOR = '.form-field [required]';
  // --- SELECTORES DE ESTILOS ---
  const ACTIVATE_ERROR_MESSAGE = 'show-error';

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
}
