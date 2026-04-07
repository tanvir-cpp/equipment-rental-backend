# Equipment Rental Backend - NestJS

This project now includes:

- Admin CRUD with database operations
- JWT authentication and route guards
- Bcrypt password hashing
- HttpException / NotFoundException / BadRequestException usage
- ValidationPipe and DTO validation
- One-to-Many relationships:
  - Category -> Equipments
  - Customer -> Rentals
- Many-to-Many relationship:
  - Rental <-> Equipments

## Setup

```bash
npm install
npm run start:dev
```

## Database

PostgreSQL defaults used in `src/app.module.ts`:

- host: `localhost`
- port: `5432`
- username: `postgres`
- password: `tiger`
- database: `equipment_rental`

You can override them using environment variables:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`

## Main routes

### Admin
- `POST /admin/createuser`
- `POST /admin/login`
- `GET /admin/users`
- `GET /admin/user/:id`
- `PUT /admin/upUser/:id`
- `PUT /admin/update-email/:id`
- `PATCH /admin/deactivate/:id`
- `DELETE /admin/delete/:id`
- `GET /admin/profile`

### Equipment / Category / Customer / Rental
- `POST /equipment/categories`
- `GET /equipment/categories`
- `GET /equipment/category/:categoryId`
- `POST /equipment`
- `GET /equipment`
- `GET /equipment/:id`
- `PATCH /equipment/:id`
- `DELETE /equipment/:id`
- `POST /equipment/customers`
- `GET /equipment/customers/all`
- `POST /equipment/rentals`
- `GET /equipment/rentals/all`
- `GET /equipment/rentals/:id`
- `PATCH /equipment/rentals/:id/return`
- `DELETE /equipment/rentals/:id`

## Auth

Login with `POST /admin/login` and send the returned token as:

```bash
Authorization: Bearer <token>
```

All `/equipment/*` routes and most admin routes are protected.
