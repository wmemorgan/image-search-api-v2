require('dotenv').load()

const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const fs = require('fs')

const app = new Koa()
const router = new Router()
const port = process.env.PORT
const apikey = process.env.APIKEY

// Host static site
app.use(serve('./public'));
app.use(serve('./img'));

router
  .get('/', ctx => ctx.body = 'Welcome to Imagesearch API')
  .post('/api/search/:search*', ctx => {
    //console.log(`receiving input request: ${JSON.stringify(ctx.request)}`)
    console.log(`receiving input query: ${JSON.stringify(ctx.query)}`)
    console.log(`receiving input params: ${JSON.stringify(ctx.params)}`)
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