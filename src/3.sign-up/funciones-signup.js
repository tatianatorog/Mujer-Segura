export const regularExpressions = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{8,12}$/, // 8 a 12 dígitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

export const fields = {
  username: false,
  email: false,
  password: false,
};

export const validateInputsValue = (regularExpressions, input, field) => {
  if (regularExpressions.test(input.value)) {
    fields[field] = true;
    return true;
  }
  fields[field] = false;
  return false;
};
