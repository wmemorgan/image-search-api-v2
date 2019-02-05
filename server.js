require('dotenv').load()

const Koa = require('koa')
const Router = require('koa-router')
//const serve = require('koa-static')


const app = new Koa()
const router = new Router()
const port = process.env.PORT
const apikey = process.env.APIKEY

// Host static site
// app.use(serve('./public'));
// app.use(serve('./img'));

router.get('/', ctx => ctx.body = 'Welcome to Imagesearch API')
  // //404 Error Handling
  // .get('/*', ctx => {
  //   // ctx.status = 404
  //   if (ctx.status === 404) {
  //     ctx.status = 404
  //     ctx.body = fs.readFileSync('./public/404.html', "utf8");
  //   }
  // })

app.use(router.routes())  
app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})