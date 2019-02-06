import PgAsync from 'pg-async'
const one = require('once')

//const pgAsync = new PgAsync();
const dbURI = process.env.DBCONNECT

const postgresMiddleware = () => {
  const pg = new PgAsync({ connectionString: dbURI })
  console.log(`DB connection sucessfull!`, pg)
  //const setupSchema = one(setup)
  return async (ctx, next) => {
    //await setupSchema(pg, schema)
    
    ctx._postgres = pg
    return await next()
  }
}

const postgres = (ctx) => {
  return ctx._postgres
}

module.exports = { postgresMiddleware, postgres }