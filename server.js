require('dotenv').load()
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')

const app = new Koa()
const router = new Router()
//console.log(`${router.routes}`)
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

// Routes
const routeAPI = require('./routes/routeAPI').routes
for (const routes of [ routeAPI ]) {
  routes(router)
}

router
//   .get('/', ctx => ctx.body = 'Welcome to Imagesearch API')
//   .post('/api/search/:search*', async ctx => {
//     console.log(`receiving input query: ${JSON.stringify(ctx.query)}`)
//     const { search, offset } = ctx.query
//     await insert(postgres(ctx), search, offset)
//     ctx.status = 200
//     ctx.body = await imageSearch(search, offset).catch(console.error)
//   })
//   .get('/api/search/:id', async ctx => {
//     const data = await retrieve(postgres(ctx), ctx.params.id)
//     ctx.status = 200
//     ctx.body = data  
//   })
  // .get('/api/search/history', async ctx => {
  //   const data = await retrieveAll(postgres(ctx))
  //   ctx.status = 200
  //   ctx.body = data
  // })
//   .put('/api/search/:id/:search*', async ctx => {
//     console.log(`receiving input query: ${JSON.stringify(ctx.query)}`)
//     console.log(`receiving input params: ${JSON.stringify(ctx.params)}`)
//     const { id } = ctx.params
//     const { search, offset } = ctx.query
//     await update(postgres(ctx), id, search, offset)
//     const data = await imageSearch(search, offset).catch(console.error)
//     ctx.status = 200
//     ctx.body = data
//   })
//   .delete('/api/search/:id', async ctx => {
//     const { id } = ctx.params
//     console.log(`Delete search record: ${id}`)
//     const searchRecord = await deleteId(postgres(ctx), ctx.params.id)
//     if (searchRecord.length === 0) {
//       ctx.body = 'Delete successful!'
//     }  
//   })
  //404 Error Handling
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