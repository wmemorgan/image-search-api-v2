// Google Search API
const { google } = require('googleapis')
const apikey = process.env.APIKEY
const customsearch = google.customsearch('v1')

const imageSearch = async (search, offset) => {
  const results = await customsearch.cse.list({
    cx: '008245539995824095644:3f27vg6irlc',
    q: search,
    auth: apikey,
    searchType: 'image',
    start: offset,
  })

  const searchList = results.data.items
  const displayItems = searchList.map(item => {
    let itemDetails = {
      url: item.link,
      snippet: item.snippet,
      thumbnail: item.image.thumbnailLink,
      context: item.image.contextLink
    }
    return itemDetails
  })
  return displayItems
}

module.exports = { imageSearch }