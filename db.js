const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DBCONNECT,
    ssl: false,
  }
})


const setup = async (db, schema) => {
  await schema(db)
}

const postgresMiddleware = (schema) => {  
  return async (ctx, next) => {
    await setup(db, schema)
    console.log("Database connection established");
    ctx._postgres = db
    return await next()
  }
}

const postgres = (ctx) => {
  return ctx._postgres
}

module.exports = { postgresMiddleware, postgres }




