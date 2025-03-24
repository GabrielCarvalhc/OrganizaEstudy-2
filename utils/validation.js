export function validateMateria({ nome }) {
  const errors = {};
  const nomeRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{3,50}$/;
  
  if (!nome.trim()) {
    errors.nome = 'O nome da matéria é obrigatório';
  } else if (!nomeRegex.test(nome)) {
    errors.nome = 'O nome deve conter entre 3 e 50 caracteres (apenas letras e espaços)';
  }
  
  return errors;
}