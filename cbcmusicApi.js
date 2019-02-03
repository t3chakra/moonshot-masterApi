const request = require('request-promise-native')
const routes = require('./routes')


const getLive = langPrefix => {
  return request({
    uri: `${routes.apiClient}/api/v1/${langPrefix}/music/live`,
    json: true
  })
}

module.exports = {
  getLive
}




