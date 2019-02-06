require('dotenv').load()
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')

const app = new Koa()
const router = new Router()

const port = process.env.PORT

// Database Connection
const { postgresMiddleware } = require('./db')
const { schema } = require('./models/models')
app.use(postgresMiddleware(schema))

// Host static site
app.use(serve('./public'));
app.use(serve('./public/img'));
app.use(serve('./public/css'));
app.use(serve('./public/js'));

// Route Setup
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

//404 Error Handling
router    
  .get('/*', ctx => {
    if (ctx.status === 404) {
      ctx.body = fs.readFileSync('./public/404.html', "utf8");
    }
  })

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})