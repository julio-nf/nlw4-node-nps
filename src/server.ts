import express from 'express';

const app = express();

// http://localhost:3333/users
app.get('/users', (req, res) => {
  return res.json({
    message: 'Hello World - NLW04'
  });
})

app.post('/', (req, res) => {
  return res.json({
    message: 'Os dados foram salvos com sucesso!'
  });
})

app.listen(3333, () => console.log('Server is running...'))
