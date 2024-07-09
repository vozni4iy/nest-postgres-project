# NestJS + PostgreSQL Project

## Overview

This is a demo project to showcase the integration of NestJS with PostgreSQL. It demonstrates basic CRUD operations, error handling, and logging using NestJS. The project also highlights coding style and best practices using ESLint, Prettier, TypeScript, and Trivago.

## Features

- Integration of NestJS with PostgreSQL using TypeORM
- Users and Books modules with full CRUD operations
- Basic error handling and logging middleware
- Code style enforcement with ESLint and Prettier
- Tests written with Jest

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/vozni4iy/nestjs-postgres-project.git
   cd nestjs-postgres-project
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Setup postgresql:

   ```sh
   brew install postgresql
   brew services start postgresql
   createdb nestjs_postgres
   ```

## Scripts

```sh
npm run start: dev
```

start the project

```sh
npm run lint
npm run format
```

use linter and prettier for better dev experience

```sh
npm run test
```

run tests for app, users and books

## License

This project is licensed under the ISC License.

Author: Ihor Skakun
