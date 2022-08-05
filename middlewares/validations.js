const HTTP_ERROR_STATUS = 400;

const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) { 
    return res.status(HTTP_ERROR_STATUS).send({ 
      message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(HTTP_ERROR_STATUS).send({ 
      message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) { 
    return res.status(HTTP_ERROR_STATUS).send({ 
      message: 'O campo "password" é obrigatório' });
  }

  if (password.length >= 6) {
    return res.status(HTTP_ERROR_STATUS).send({ 
      message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};
  
module.exports = {
  isValidEmail,
  isValidPassword,
};