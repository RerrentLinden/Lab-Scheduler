export async function seed(knex) {
  await knex('instruments').insert([
    {
      id: 1,
      name: '超高效液相色谱',
      code: 'HPLC-01',
      category: 'chemistry',
      room: 'B2-305',
      status: 'available',
      manager: '王敏',
      description: '用于小分子药物和代谢产物定量分析，支持多梯度洗脱。',
      last_service: '2024-04-10',
      next_maintenance: '2024-05-20',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: '实时荧光定量 PCR',
      code: 'PCR-02',
      category: 'biology',
      room: 'B1-210',
      status: 'available',
      manager: '陈虹',
      description: '用于核酸扩增与定量检测，配备 96 孔模块。',
      last_service: '2024-03-28',
      next_maintenance: '2024-06-01',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: '活细胞成像系统',
      code: 'CELL-03',
      category: 'imaging',
      room: 'A3-118',
      status: 'maintenance',
      manager: '刘洋',
      description: '实时监控细胞形态与迁移，支持多通道荧光。',
      last_service: '2024-05-08',
      next_maintenance: '2024-05-15',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: '气质联用仪',
      code: 'GCMS-04',
      category: 'chemistry',
      room: 'B2-110',
      status: 'available',
      manager: '张琪',
      description: '适用于挥发性有机物分析，带自动进样器。',
      last_service: '2024-04-22',
      next_maintenance: '2024-06-05',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
