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
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const isNameValid = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: 'O campo "name" é obrigatório',
    }); 
  }

  if (name.length < 3) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    }); 
  }

  next();
};

const isAgeValid = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: 'O campo "age" é obrigatório',
    }); 
  }

  if (age < 18) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    }); 
  }

  next();
};

const isTalkValid = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: 'O campo "talk" é obrigatório',
    }); 
  }

  next();
};

const isWatchedAtValid = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i; // Based on Bonus Activity - 22.5 - Course - Trybe

  if (!watchedAt) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: 'O campo "watchedAt" é obrigatório',
    }); 
  }

  if (!dateRegex.test(watchedAt)) {
  return res.status(HTTP_ERROR_STATUS).json({
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  }); 
  }

  next();
};

const isRateValid = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate === undefined) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: 'O campo "rate" é obrigatório',
    }); 
  }

  if (rate < 1 || rate > 5) {
  return res.status(HTTP_ERROR_STATUS).json({
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  }); 
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
};