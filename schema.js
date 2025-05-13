// drizzle/usuarios.ts
const { pgTable, serial, text } = require('drizzle-orm/pg-core');

const personas = pgTable('personas', {
  id: serial('id').primaryKey(),
  nombre: text('nombre').notNull(),
  curp: text('curp').notNull().unique(),
  telefono: text('telefono'),
  email: text('email'),
});

module.exports = { personas };

