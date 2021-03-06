const URL = 'https://eu1.locationiq.com/v1/search.php'
const axios = require('axios')

const replaceNordic = string => string.toLowerCase().replace('ä', 'a').replace('å', 'a').replace('ö', 'o')

const getCoordinates = async (searchString) => {
  return axios.get(URL, {
    params: {
      key: process.env.LOCATION_IQ_KEY,
      q: replaceNordic(searchString),
      format: 'json',
      limit: 1
    }
  })
    .then((res) => res)
    .catch((err) => {
      if (err.response.data.error === 'Unable to geocode') return null
      throw new Error(err)
    })
}

module.exports = getCoordinates
