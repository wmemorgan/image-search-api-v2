const { postgres } = require('../db')
const { insert, retrieve, retrieveAll, update, deleteId } = require('../models/models')

// Google Search API
const { imageSearch } = require('../controllers/searchAPI')

function routes (router) {
  router
    .get('/', ctx => ctx.body = 'Welcome to Imagesearch API')
    .post('/api/search/:search*', async ctx => {
      console.log(`receiving search query: ${JSON.stringify(ctx.request.body)}`)
      const { search, offset } = ctx.request.body
      if (search) {
        await insert(postgres(ctx), search, offset)
        ctx.status = 200
        ctx.body = await imageSearch(search, offset).catch(console.error)
      } else {
        ctx.status = 400
        ctx.body = `Bad input request`
      }
    })
    .get('/api/search/history', async ctx => {
      console.log(ctx.request)
      const data = await retrieveAll(postgres(ctx))
      ctx.status = 200
      ctx.body = data
    })
    .get('/api/search/:id', async ctx => {
      const data = await retrieve(postgres(ctx), ctx.params.id)
      ctx.status = 200
      ctx.body = data
    })
    .put('/api/search/:id/:search*', async ctx => {
      console.log(`receiving input query: ${JSON.stringify(ctx.query)}`)
      console.log(`receiving input params: ${JSON.stringify(ctx.params)}`)
      const { id } = ctx.params
      const { search, offset } = ctx.query
      await update(postgres(ctx), id, search, offset)
      const data = await imageSearch(search, offset).catch(console.error)
      ctx.status = 200
      ctx.body = data
    })
    .delete('/api/search/:id', async ctx => {
      const { id } = ctx.params
      console.log(`Delete search record: ${id}`)
      await deleteId(postgres(ctx), ctx.params.id)
      ctx.body = 'Delete successful!'
    })
}

module.exports = { routes }
