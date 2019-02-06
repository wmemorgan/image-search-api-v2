
//SCHEMA
async function schema (db) {
  console.log(`Run db schema function`)
  db.schema.hasTable('searches').then( (exists) => {
    if (!exists) {
      console.log(`Creating table`)
      return db.schema.createTable('searches', (t) => {
        t.increments('id').primary()
        t.string('search', 500)
        t.integer('offset', 8)
        t.timestamp('created_at', { useTz: true }).defaultTo(db.fn.now())
        t.timestamp('updated_at', { useTz: true }).defaultTo(db.fn.now())
      })
    } else {
      console.log(`Table already exists`)
    }
  })
}

//INSERT
async function insert(db, search, offset) {
  db.transaction(trx => {
    trx('searches')
    .insert({
      search: search,
      offset: offset,
      created_at: new Date()
    })
    .returning('id')
    .then(trx.commit)
    .catch(trx.rollback)
  })
}

//RETRIEVE
async function retrieve(db, id) {
  return db.raw(
    `SELECT * FROM searches WHERE id = $1`,
    id
  )
}

//RETRIEVEALL
async function retrieveAll(db) {
  return db.rows(
    `SELECT * FROM searches`
  )
}

//UPDATE
async function update(db, search, offset, id) {
  return db.raw(
    `UPDATE users SET search=$1, offset=$2, updated_at=NOW() WHERE id=$3 RETURNING id, name, address`,
    search, offset, id
  )
}

//DELETE

module.exports = {schema, insert, retrieve, retrieveAll, update}