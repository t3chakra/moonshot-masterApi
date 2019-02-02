const getTopStories = langPrefix => {
  return request({
    uri: `${routes.moonshotApiClient}/api/v1/${langPrefix}/news/top-stories`,
    json: true
  })
}

const getInternationalNews = langPrefix => {
  return request({
    uri: `${routes.moonshotApiClient}/api/v1/${langPrefix}/news/world`,
    json: true
  })
}

const getLocalNews = langPrefix => {
  return request({
    uri: `${routes.moonshotApiClient}/api/v1/${langPrefix}/news/local`,
    json: true
  })
}




