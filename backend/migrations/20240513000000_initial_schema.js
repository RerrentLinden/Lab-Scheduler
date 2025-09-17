export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('phone');
    table.string('email').notNullable().unique();
    table.string('role').notNullable().defaultTo('user');
    table.string('password_hash').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('instruments', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('code').notNullable().unique();
    table.string('category');
    table.string('room');
    table.string('status').notNullable().defaultTo('available');
    table.string('manager');
    table.text('description');
    table.date('last_service');
    table.date('next_maintenance');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('reservations', (table) => {
    table.increments('id').primary();
    table.integer('instrument_id').unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.dateTime('start_time').notNullable();
    table.dateTime('end_time').notNullable();
    table.string('status').notNullable().defaultTo('confirmed');
    table.text('notes');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    table
      .foreign('instrument_id')
      .references('id')
      .inTable('instruments')
      .onDelete('CASCADE');
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.index(['instrument_id', 'start_time']);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('reservations');
  await knex.schema.dropTableIfExists('instruments');
  await knex.schema.dropTableIfExists('users');
}
