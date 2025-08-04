# User Management Panel

A full-stack application for managing users with features like user creation, editing, deletion, and role management. The project consists of a React frontend and a GraphQL backend.

## Project Overview

### Frontend Features

- User CRUD operations
- Role-based user management (Admin, Moderator, User)
- User status management (Active, Banned, Pending)
- Email uniqueness validation
- Responsive design
- Dark/Light theme support with persistence
- Filterable and sortable user table
- Form validation

### Backend Features

- GraphQL API with queries and mutations
- User data management (currently using in-memory storage)
- Email uniqueness validation
- Role-based user structure
- Status management for users
- Type-safe implementation

### Data Storage

Currently, the application uses in-memory storage (JavaScript array) for data, which means:

- Data is not persistent and will be reset when the server restarts
- All data is stored in RAM
- Suitable for development and testing, but not for production

#### Adding a Database (Recommended for Production)

To make the application production-ready, you should implement one of these databases:

1. **MongoDB**:

   ```bash
   cd backend
   npm install mongoose
   ```

   - Perfect for document-based data
   - Great for Node.js applications
   - Easy to implement with minimal schema changes

2. **PostgreSQL**:

   ```bash
   cd backend
   npm install @prisma/client
   npm install prisma --save-dev
   ```

   - Robust relational database
   - Strong data consistency
   - Great for complex queries

3. **SQLite** (for small deployments):
   ```bash
   cd backend
   npm install sqlite3
   npm install typeorm
   ```
   - Self-contained, serverless
   - Zero-configuration required
   - Perfect for small to medium applications

To implement a database:

1. Create database configuration:

   ```typescript
   export const dbConfig = {};
   ```

2. Update environment variables:

   ```env
   DATABASE_URL=your_database_connection_string
   ```

3. Update user model to use database:

   ```typescript
   export const UserModel = {};
   ```

4. Add migration scripts:
   ```json
   {
     "scripts": {
       "migrate": "your_migration_command",
       "seed": "your_seed_command"
     }
   }
   ```

## Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for development and building
- **Ant Design (antd)** for UI components
- **AG Grid** for table functionality
- **Apollo Client** for GraphQL integration
- **Emotion** for styled components
- **date-fns** for date formatting

### Backend

- **Node.js** with TypeScript
- **Apollo Server** for GraphQL implementation
- **Express** as the web server
- **CORS** for cross-origin resource sharing

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Project Structure

```
user-management-panel/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── entities/
│   │   ├── features/
│   │   ├── pages/
│   │   └── shared/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── resolvers/
│   │   ├── schemas/
│   │   └── index.ts
│   └── package.json
```

## Local Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/user-management-panel.git
   cd user-management-panel
   ```

2. Set up the backend:

   ```bash
   cd backend
   npm install
   echo "PORT=4000" > .env
   npm run dev
   ```

   The backend server should start at `http://localhost:4000` with GraphQL playground at `http://localhost:4000/graphql`

3. Set up the frontend (in a new terminal):

   ```bash
   cd frontend
   npm install
   echo "VITE_API_URL=http://localhost:4000/graphql" > .env
   npm run dev
   ```

   The frontend development server should start at `http://localhost:5173`

### Troubleshooting Common Issues

1. Port Already in Use:

   ```bash
   PORT=4001
   VITE_API_URL=http://localhost:4001/graphql
   ```

2. Node Version Issues:

   ```bash
   node --version
   nvm install 16
   nvm use 16
   ```

3. Dependencies Installation Issues:

   ```bash
   npm cache clean --force
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

### Verifying the Setup

1. Backend Health Check:

   - Open `http://localhost:4000/graphql` in your browser
   - You should see the GraphQL playground
   - Try the query:
     ```graphql
     query {
       users {
         id
         name
         email
       }
     }
     ```

2. Frontend Health Check:
   - Open `http://localhost:5173` in your browser
   - You should see the user management interface
   - Try creating a new user
   - Check if the table displays user data

### Development Tools

For better development experience, ensure you have:

- VS Code or similar IDE
- React Developer Tools browser extension
- Apollo Client Developer Tools browser extension

## Available Scripts

### Backend

In the `backend` directory:

- `npm run dev`: Start development server with hot reload
- `npm run build`: Create production build
- `npm start`: Start production server
- `npm run type-check`: Run TypeScript type checking

### Frontend

In the `frontend` directory:

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

## API Schema

### Types

```graphql
enum UserRole {
  admin
  moderator
  user
}

enum UserStatus {
  active
  banned
  pending
}

type User {
  id: ID!
  name: String!
  email: String!
  role: UserRole!
  status: UserStatus!
  createdAt: String!
}

input UserInput {
  name: String!
  email: String!
  role: UserRole!
  status: UserStatus!
}
```

### Queries and Mutations

```graphql
type Query {
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(input: UserInput!): User!
  updateUser(id: ID!, input: UserInput!): User!
  deleteUser(id: ID!): Boolean!
}
```

## Environment Variables

### Backend (.env)

```env
PORT=4000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:4000/graphql
```

## Development

The application uses a development setup with hot reloading:

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:4000`
- GraphQL playground is available at `http://localhost:4000/graphql`

## Production Deployment

1. Build the backend:

   ```bash
   cd backend
   npm run build
   ```

2. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```

3. The frontend build will be in `frontend/dist`
4. The backend build will be in `backend/dist`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your own purposes.
