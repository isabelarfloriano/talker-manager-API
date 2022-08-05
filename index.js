const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

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

app.get('/talker', async (req, res) => {
  const talkers = await readTalkerData();

  if (!talkers.length) return res.status(HTTP_OK_STATUS).json([]);

  return res.status(HTTP_OK_STATUS).json(talkers);
});