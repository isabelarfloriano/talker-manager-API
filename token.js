// Based on Activity 2 - 22.6 - Course - Trybe

const generateToken = () => {
  const token = new RegExp(/^[a-zA-Z0-9]{16}$/); // Esse regex aceita qualquer caractere de a - z, A - Z e 0 - 9 e seu tamanho deve ser de 16 caracteres.
  return token;
};

module.exports = generateToken;