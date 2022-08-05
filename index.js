const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const generateToken = require('./token');
const {   
  isValidEmail,
  isValidPassword,
  isValidToken,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
} = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
// fim trecho Trybe

async function readTalkerData() {
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

async function writeTalkerData(newData) {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(newData));
  } catch (err) {
    console.log(err);
  }
}

app.get('/talker', async (req, res) => {
  const talkers = await readTalkerData();

  if (!talkers.length) return res.status(HTTP_OK_STATUS).json([]);

  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkerData();

  const talker = talkers.find((talk) => talk.id === Number(id));

  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(talker);
});

app.post(
  '/login',
  isValidEmail,
  isValidPassword,
  isTalkValid,
  (req, res) => {
    const token = generateToken();
    return res.status(HTTP_OK_STATUS).send({ token }); 
  },    
);

app.post(
  '/talker',
  isValidToken,
  isNameValid,
  isAgeValid,
  isWatchedAtValid,
  isRateValid,
  async (req, res) => {
    const talkerInfos = req.body;
    const currentData = await readTalkerData();
    const id = currentData.length + 1;
    const newTalker = { ...talkerInfos, id };
    const newData = currentData.push(newTalker);

    await writeTalkerData(newData);
    res.status(201).json(newTalker);
  },
);