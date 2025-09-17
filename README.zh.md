# 实验室预约平台

实验室预约平台是一套帮助科研团队协调共享仪器使用的 Web 应用。系统提供账号登录、设备台账、预约冲突校验以及基础使用统计，可通过 Docker Compose 快速部署。

## 功能概览

- **账号体系**：支持注册、登录、退出，会话存储于数据库，区分管理员与普通用户。
- **设备管理**：查看仪器清单、状态及维护计划，管理员可在线新增仪器记录。
- **预约日历**：按天浏览指定仪器的预约情况，校验最短提前时间、最长时长与冲突。
- **统计报表**：生成近月预约趋势、热门仪器排行以及取消率概览。
- **示例数据**：内置演示账号、仪器与预约条目，便于体验完整流程。

## 技术栈

- Node.js 20、Express 4、Nunjucks 模板
- Knex 查询构建器（生产使用 MySQL 8，测试默认 SQLite 内存库）
- 会话存储：`connect-session-knex`
- 业务规则测试：Vitest
- Docker / Docker Compose 用于容器化部署

## 目录结构

```
Lab-Scheduler/
├── backend/
│   ├── migrations/      # 数据库迁移脚本
│   ├── public/          # 静态资源（CSS、JS）
│   ├── seeds/           # 示例数据
│   ├── src/             # 应用核心代码（路由、控制器、服务等）
│   ├── tests/           # Vitest 测试
│   └── views/           # Nunjucks 模板
├── docker-compose.yml   # 应用 + MySQL 的编排文件
├── Dockerfile           # Node.js 应用镜像定义
├── README.md            # 英文说明
└── README.zh.md         # 中文说明（当前文档）
```

## 本地开发

1. 安装依赖：
   ```bash
   cd backend
   npm install
   ```
2. 复制环境变量样例并按需修改数据库连接：
   ```bash
   cp .env.example .env
   ```
3. 运行迁移与示例数据：
   ```bash
   npm run migrate
   npm run seed
   ```
4. 启动开发服务器：
   ```bash
   npm run dev
   ```
   默认访问地址为 `http://localhost:3000`。

### 默认账号

| 角色   | 邮箱                  | 密码       |
| ------ | --------------------- | ---------- |
| 管理员 | `admin@example.com`   | `Admin123!`|
| 普通用户 | `zhangwei@example.com` | `User123!` |

## 运行测试

```bash
npm test
```
Vitest 会在内存 SQLite 数据库中执行迁移与种子，验证预约冲突、时长与取消规则。

## Docker Compose 快速部署

仓库根目录提供 `docker-compose.yml`，包含 `app`（Node.js 服务）与 `db`（MySQL 8）：

```bash
docker compose up --build -d
```

- `app` 容器启动时会执行迁移，并在 `SEED_SAMPLE_DATA=true` 时写入示例数据。
- 应用监听 `http://localhost:8080`，数据库端口映射为 `3306`。
- 如不需要示例数据，可在 Compose 文件或环境变量中设置 `SEED_SAMPLE_DATA=false`。

## 后续方向

- 补充预约审批、签到与候补队列等高级流程
- 集成邮件 / 短信通知与操作审计
- 增加端到端测试覆盖关键业务场景

欢迎根据项目需求继续扩展功能。
