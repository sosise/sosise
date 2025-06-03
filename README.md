# Sosise Framework 🚀

[Sosise](https://github.com/sosise/sosise) is an **elegant**, **expressive**, and **feature-rich** web application framework for Node.js — inspired by Laravel. It provides a powerful boilerplate and tools to help you build modern, maintainable applications with ease.

<a href="https://sosise.github.io/sosise-docs"><img src="https://img.shields.io/badge/docs-latest-blue.svg?style=for-the-badge" alt="Documentation"></a>
<a href="https://www.npmjs.com/package/sosise-core"><img src="https://img.shields.io/npm/v/sosise-core.svg?style=for-the-badge" alt="npm"></a>
<a href="LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge" alt="License"></a>

[![GitHub stars](https://img.shields.io/github/stars/sosise/sosise?style=social)](https://github.com/sosise/sosise)

## 📑 Table of Contents

- ⚡ [Features](#features)
- 🚀 [Getting Started](#getting-started)
- 🗂️ [Project Structure](#project-structure)
- 🔑 [Key Concepts](#key-concepts)
- 🐳 [Docker Support](#docker-support)
- 📚 [Documentation](#documentation)
- 🤝 [Contributing](#contributing)
- 📄 [License](#license)

## ⚡ Features

- 🌐 **Expressive Routing & Middleware** — Intuitive API powered by Express.js.  
- 🗄️ **Database Migrations & Seeders** — Built-in support using Knex.js for multiple SQL engines.  
- 🧩 **IoC Container & Service Providers** — Manage dependencies with ease.  
- ⚙️ **Rich Configuration** — Session, cache, queue, mailer, logging, and more out of the box.  
- 🔄 **Background Queues** — BullMQ-based job queues for asynchronous processing.  
- 📖 **Documentation Generator** — Integrated support for Docsify documentation.  
- 🧪 **Testing Environment** — Pre-configured testing setup with unit and feature tests.  
- 🐋 **Docker Support** — Official Docker image and Docker Compose files.  

## 🚀 Getting Started

🎬 Install the CLI tool and scaffold a new project:

```bash
npm install -g sosise-cli
sosise new my-app
cd my-app
npm install
npm run start
```

🎉 You now have a fully configured Sosise application up and running.

## 🗂️ Project Structure

```text
my-app/
├── app/                # Application source code (controllers, services, console commands, etc.)
├── config/             # Configuration files (database, cache, mail, queue, session, etc.)
├── database/           # Migrations & seeders
├── docs/               # Documentation (Docsify)
├── docker/             # Docker build files & scripts
├── public/             # Public assets
├── resources/          # Views & frontend assets
└── src/                # Framework core (auto-generated)
```

For a deeper dive into the directory layout, see the [Directory Structure guide](https://sosise.github.io/sosise-docs/getting-started/directory-structure).

## 🔑 Key Concepts

### 🌐 Routing & Controllers

Define clean, expressive routes in `src/routes`:

```ts
router.get('/', (request: Request, response: Response, next: NextFunction) => {
    indexController.index(request, response, next);
});
```

### 🗄️ Database & ORM

Use Knex.js for migrations and fluent query building:

```bash
# Create a new migration
npm run migrate:make create_users_table
npm run migrate
```

### ⚡ Caching & Sessions

Configure cache and session in `config/cache.ts` and `config/session.ts` respectively.

### 📧 Mail & Logging

Send emails via the built-in mailer and configure logging channels in `config/mailer.ts` and `config/logging.ts`.

### 🎯 Queues & Workers

Define background jobs using BullMQ in `app/Console/QueueWorkers`.

## 🐳 Docker Support

🐳 Build and run with Docker:

```bash
./build-docker-image.sh
docker-compose up
```

Ensure your `.env` and `cron` files are present for proper operation inside containers.

## 📚 Documentation

🔗 Full documentation and API reference are available at:
> 🔗 https://sosise.github.io/sosise-docs

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/sosise/sosise).

## 📄 License

MIT © Sosise Contributors