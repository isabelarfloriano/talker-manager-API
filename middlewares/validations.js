const HTTP_ERROR_STATUS = 400;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // from: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript

const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) { 
    return res.status(HTTP_ERROR_STATUS).json({ 
      message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return res.status(HTTP_ERROR_STATUS).json({ 
      message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) { 
    return res.status(HTTP_ERROR_STATUS).json({ 
      message: 'O campo "password" é obrigatório' });
  }

  console.log(password.length);

  if (password.length < 6) {
    return res.status(HTTP_ERROR_STATUS).json({ 
      message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};
  
const isValidToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido!' });
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
};