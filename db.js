// db.ts
const {drizzle} = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const schema = require('./schema.js'); // Importa el esquema de la base de datos

console.log( process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: 'postgres://neondb_owner:npg_MB9rOw7HTucx@ep-white-union-a593rotb-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
});

const db = drizzle(pool, { schema });

module.exports = { db };
