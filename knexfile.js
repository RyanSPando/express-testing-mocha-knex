module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgresql://localhost/knex_kittens',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    },
  }
};
