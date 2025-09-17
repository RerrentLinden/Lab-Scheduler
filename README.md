# Lab Scheduler

Lab Scheduler 是一个用于科研仪器预约与管理的全栈应用，支持用户注册登录、设备台账维护、预约冲突校验以及基础统计分析。系统采用服务端渲染的响应式界面，可通过 Docker Compose 一键部署。

## 主要功能

- **账号体系**：支持注册、登录与登出，区分普通用户和管理员角色。
- **设备台账**：展示仪器信息、状态与维护计划，管理员可在线新增设备。
- **预约管理**：按日查看指定仪器的预约情况，校验最短提前时间、最长时长及冲突。
- **统计报表**：输出近月预约趋势、热门仪器排行与取消率概览。
- **示例数据**：提供预置账号、仪器与预约，便于评估与演示。

## 技术栈

- Node.js 20、Express 4、Nunjucks 模板渲染
- Knex 查询构建器，生产使用 MySQL 8，测试默认 SQLite 内存库
- 会话存储基于 `connect-session-knex`
- Vitest 作为业务规则测试框架
- Docker & Docker Compose 编排应用与数据库服务

## 目录结构

```
Lab-Scheduler/
├── backend/                 # Node.js 应用源码
│   ├── migrations/          # 数据库迁移脚本
│   ├── public/              # 静态资源（CSS/JS）
│   ├── seeds/               # 示例数据
│   ├── src/                 # 应用主代码（路由、控制器、服务等）
│   ├── tests/               # Vitest 测试
│   └── views/               # Nunjucks 模板
├── docker-compose.yml       # 本地或生产部署编排文件
├── Dockerfile               # 应用容器镜像定义
├── README.md                # 英文说明（当前文档）
└── README.zh.md             # 中文说明
```

## 本地运行

1. 进入 `backend/` 并安装依赖：
   ```bash
   cd backend
   npm install
   ```
2. 复制环境变量样例：
   ```bash
   cp .env.example .env
   ```
   根据实际 MySQL 设置调整 `DB_HOST`、`DB_USER` 等字段。
3. 执行数据库迁移与示例数据填充：
   ```bash
   npm run migrate
   npm run seed
   ```
4. 启动开发服务器：
   ```bash
   npm run dev
   ```
   默认监听 `http://localhost:3000`。

### 预置账号

- 管理员：`admin@example.com` / `Admin123!`
- 普通用户：`zhangwei@example.com` / `User123!`

## 测试

在 `backend/` 目录运行：
```bash
npm test
```
Vitest 会使用内存 SQLite 自动迁移与填充数据，用于校验预约业务规则。

## Docker Compose 部署

仓库根目录提供 `docker-compose.yml`，包含 `app`（Node.js）与 `db`（MySQL）两个服务：

```bash
docker compose up --build -d
```

- 首次启动会执行迁移并根据 `SEED_SAMPLE_DATA` 环境变量写入示例数据。
- 应用默认暴露在 `http://localhost:8080`，MySQL 对外端口为 `3306`。
- 如不希望填充示例数据，可将 `SEED_SAMPLE_DATA` 设为 `false`。

## 后续规划

- 增补预约审批、签到与等待队列等高级流程
- 引入通知中心（邮件 / 短信）与日志审计
- 扩展自动化测试覆盖页面渲染与接口

如需更多中文说明，请参阅 `README.zh.md`。
