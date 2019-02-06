require('dotenv').load()

const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const fs = require('fs')

const app = new Koa()
const router = new Router()
const port = process.env.PORT

// Database Connection
const { postgresMiddleware, postgres } = require('./db')
const { schema, insert, retrieve, retrieveAll, update } = require('./models/models')
app.use(postgresMiddleware(schema))

// Google Search API
const { google } = require('googleapis')
const apikey = process.env.APIKEY
const customsearch = google.customsearch('v1');

// Host static site
app.use(serve('./public'));
app.use(serve('./img'));

// Google Search API
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
  console.log(displayItems)
  return displayItems 
}

router
  .get('/', ctx => ctx.body = 'Welcome to Imagesearch API')
  .post('/api/search/:search*', async ctx => {
    console.log(`receiving input query: ${JSON.stringify(ctx.query)}`)
    const { search, offset } = ctx.query
    //const id = await insert(postgres(ctx), search, offset)
    ctx.status = 200
    ctx.body = await imageSearch(search, offset).catch(console.error)
  })
  //404 Error Handling
  .get('/*', ctx => {
    if (ctx.status === 404) {
      ctx.body = fs.readFileSync('./public/404.html', "utf8");
    }
  })

app.use(router.routes())  

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})