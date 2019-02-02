const request = require('request-promise-native')
const routes = require('./routes')

const getTopStories = langPrefix => {
  return request({
    uri: `${routes.apiClient}/api/v1/${langPrefix}/news/top-stories`,
    json: true
  })
}

const getInternationalNews = langPrefix => {
  return request({
    uri: `${routes.apiClient}/api/v1/${langPrefix}/news/world`,
    json: true
  })
}

const getLocalNews = langPrefix => {
  return request({
    uri: `${routes.apiClient}/api/v1/${langPrefix}/news/local`,
    json: true
  })
}

module.exports = {
  getTopStories,
  getInternationalNews,
  getLocalNews
}




