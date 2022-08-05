const HTTP_ERROR_STATUS = 400;
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i; // from: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

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

  if (!password.length >= 6) {
    return res.status(HTTP_ERROR_STATUS).json({ 
      message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};
  
module.exports = {
  isValidEmail,
  isValidPassword,
};