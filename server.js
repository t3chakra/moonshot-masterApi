const express = require('express')
const request = require('request-promise-native')
const routes = require('./routes')
const newsApi = require('./newsApi')

const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const intentToClient = {
  "top 5 stories": newsApi.getTopStories,
  "international news": newsApi.getInternationalNews,
  "local news": newsApi.getLocalNews
}

app.get('/', (req, res) => res.send('This is moonshot master api '))

app.post('/post', (req, res) => {

  const userLanguage = req.body.language || 'en'

  const requestBody = {
    request: req.body.text,
    language: userLanguage
  }

  return request({
    uri: routes.nlu,
    method: 'POST',
    body: requestBody,
    json: true
  })

  .then(intentObj => {
    const client = intentToClient[intentObj.intent]
    return client(userLanguage)
  })

  .then(data => res.send(data))

})

app.listen(port, () => console.log(`Server is listening on port ${port}`))