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
- User data management with in-memory storage
- Email uniqueness validation
- Role-based user structure
- Status management for users
- Type-safe implementation

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
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── app/          # App-wide providers and configuration
│   │   ├── assets/       # Static assets
│   │   ├── entities/     # Entity-specific code (User)
│   │   ├── features/     # Feature components
│   │   ├── pages/        # Page components
│   │   └── shared/       # Shared utilities and components
│   └── package.json
│
├── backend/              # Node.js backend application
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── models/      # Data models
│   │   ├── resolvers/   # GraphQL resolvers
│   │   ├── schemas/     # GraphQL schema definitions
│   │   └── index.ts     # Server entry point
│   └── package.json
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd user-management-panel
   ```

2. Set up the backend:

   ```bash
   cd backend
   npm install
   # Create .env file
   echo "PORT=4000" > .env
   # Start the development server
   npm run dev
   ```

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   # Create .env file
   echo "VITE_API_URL=http://localhost:4000/graphql" > .env
   # Start the development server
   npm run dev
   ```

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
