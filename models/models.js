
//SCHEMA
async function schema(db) {
  console.log(`Run db schema function`)
  db.schema.hasTable('searches').then((exists) => {
    if (!exists) {
      console.log(`Creating table`)
      return db.schema.createTable('searches', (t) => {
        t.increments('id').primary()
        t.string('search', 500)
        t.integer('offset', 8)
        t.datetime('created_at')
        t.datetime('updated_at')
        t.timestamp('timestamp', { useTz: true }).defaultTo(db.fn.now())
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
  console.log(`Retrieve record number ${id}`)
  return db('searches').where({id}).select()
}

//RETRIEVEALL
async function retrieveAll(db) {
  console.log(`Retrieve all records`)
  return db.select().table('searches')
}

//UPDATE
async function update(db, id, search, offset) {
  // db.transaction(trx => {
  //   trx('searches')
  //     .where({id})
  //     .update({
  //       search: search,
  //       offset: offset,
  //       updated_at: new Date()
  //     })
  //     .returning('id')
  //     .then(trx.commit)
  //     .select()
  //     .catch(trx.rollback)
  // })
  console.log(`Update db record: ${id} with search criteria: ${search}`)
  db('searches')
    .where({ id })
    .update({
      search: search,
      offset: offset,
      updated_at: new Date()
    }).then( (response) => {
      console.log(`Record ${id} updated`)
      console.log(response)
      return response
    })
}

//DELETE

module.exports = {schema, insert, retrieve, retrieveAll, update}