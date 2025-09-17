import bcrypt from 'bcrypt';

export async function seed(knex) {
  await knex('reservations').del();
  await knex('instruments').del();
  await knex('users').del();

  const passwordAdmin = await bcrypt.hash('Admin123!', 10);
  const passwordUser = await bcrypt.hash('User123!', 10);

  await knex('users').insert([
    {
      id: 1,
      name: '系统管理员',
      phone: '13800000000',
      email: 'admin@example.com',
      role: 'admin',
      password_hash: passwordAdmin,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: '张伟',
      phone: '13900000000',
      email: 'zhangwei@example.com',
      role: 'user',
      password_hash: passwordUser,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
