const express = require('express')
const request = require('request-promise-native')
const routes = require('./routes')
const controller = require('./controller')

const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const intentToUI = {
  "top 5 stories": controller.getTopStories,
  "international news": controller.getInternationalNews,
  "local news": controller.getLocalNews
}

app.get('/', (req, res) => res.send('This is moonshot master api '))

app.post('/post', function (req, res) {

const userLanguage = req.body.language || 'en'

const requestBody = {
  request: req.body.text,
  language: userLanguage
}

return request({
  uri: routes.moonshotNlu,
  method: 'POST',
  body: requestBody,
  json: true
})

.then(intentObj => {
  const client = intentToUI[intentObj.intent]
  return client(userLanguage)
})

.then(data => {
  return res.send(data)
})

})

app.listen(port, () => console.log(`Server is listening on port ${port}`))