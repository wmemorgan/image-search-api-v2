require('dotenv').load()
const fs = require('fs')
const Koa = require('koa')
var bodyParser = require('koa-body')
const Router = require('koa-router')
const serve = require('koa-static')

// Database Connection
const { postgresMiddleware } = require('./db')
const { schema } = require('./models/models')

// Instantiate server and activate middleware
const app = new Koa()
  .use(bodyParser({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true
  }))
  .use(postgresMiddleware(schema))
  // Host static site
  .use(serve('./public'))
  .use(serve('./public/img'))
  .use(serve('./public/css'))
const port = process.env.PORT

// Route Setup
const router = new Router()
const routeAPI = require('./routes/routeAPI').routes
for (const routes of [ routeAPI ]) {
  routes(router)
}

//404 Error Handling
router
  .get('/*', ctx => {
    if (ctx.status === 404) {
      ctx.body = fs.readFileSync('./public/404.html', "utf8");
    }
  })

app.use(router.routes())  

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})