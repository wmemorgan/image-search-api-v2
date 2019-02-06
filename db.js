const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DBCONNECT,
    ssl: true,
  }
})

const setup = async (pg, schema) => {
  await pg.transaction(async tx => {
    const { drop, create } = schema
    if (drop) {
      for (const q of drop) {
        await tx.query
      }
    }
    if (create) {
      for (const q of create) {
        await tx.query(q)
      }
    }
  })
}

const postgresMiddleware = (schema) => {
  // const pg = new PgAsync({ connectionString: "postgres://postgres@localhost:5432/securedb" })
  // const setupSchema = one(setup)
  return async (err, ctx, next) => {
    if (err) {
      console.log("Unable to connect to the database", err);
    } else {
      await setup(db, schema)
      console.log("Connection established");
      ctx._postgres = db
      return await next()
    }
  }
}

const postgres = (ctx) => {
  return ctx._postgres
}

module.exports = { postgresMiddleware, postgres, setup }




