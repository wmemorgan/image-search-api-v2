const one = require('once')
const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
})

const setup = async (db, schema) => {
  await schema(db)
}

const postgresMiddleware = (schema) => {
  const setupSchema = one(setup)  
  return async (ctx, next) => {
    await setupSchema(db, schema)
    console.log("Database connection established");
    ctx._postgres = db
    return await next()
  }
}

const postgres = (ctx) => {
  return ctx._postgres
}

module.exports = { postgresMiddleware, postgres }




