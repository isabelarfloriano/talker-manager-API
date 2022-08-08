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
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
  async (req, res) => {
    const talkerInfos = req.body;
    const data = await readTalkerData();
    const newTalker = { ...talkerInfos, id: data.length + 1 };
    data.push(newTalker);

    // console.log(talkerInfos);
    // console.log('velha', data);
    // console.log('new talker', newTalker);
    // console.log('nova', data);

    await writeTalkerData(data);
    return res.status(201).json(newTalker);
  },
);

app.put(
  '/talker/:id',
  isValidToken,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
  async (req, res) => {
    const { id } = req.params;
    const newTalker = req.body;
    const data = await readTalkerData();

    const findTalker = data.find((talker) => talker.id === Number(id));

    if (!findTalker) return res.status(404).send('Talker não encontrado'); 

    newTalker.id = Number(id);
    data[id - 1] = newTalker;
    await writeTalkerData(data);

    return res.status(HTTP_OK_STATUS).json(newTalker);
  },
);