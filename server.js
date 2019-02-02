const express = require('express')
const request = require('request-promise-native')
const routes = require('./routes')
const newsApi = require('./newsApi')
const sportsApi = require('./sportsApi')
const radioApi = require('./radioApi')
const musicApi = require('./musicApi')

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
  "news-top-stories": newsApi.getTopStories,
  "news-international": newsApi.getInternationalNews,
  "news-local": newsApi.getLocalNews,
  "sports-top-stories":sportsApi.getTopStories,
  "radio-live":radioApi.getLive,
  "music-live":musicApi.getLive
}

app.get('/', (req, res) => res.send('This is moonshot master api '))

app.post('/post', (req, res) => {

  const userLanguage = req.body.language || 'en'

  const requestBody = {
    request: req.body.text,
    language: userLanguage
  }
  console.log("I got ", requestBody)

  return request({
    uri: routes.nlu,
    method: 'POST',
    body: requestBody,
    json: true
  })
 
  .then(intentObj => {
    const client = intentToClient[intentObj.intent]
    console.log("Intent is ", intentObj.intent)
    return client(userLanguage)
  })

  .then(data => res.send(data))
  console.log("I am sending to UI ", data)

})

app.listen(port, () => console.log(`Server is listening on port ${port}`))