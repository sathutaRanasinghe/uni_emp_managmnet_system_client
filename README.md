# University Employee Management System Client

This is the frontend client for the University Employee Management System, built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- User authentication (Login/Register)
- Role-based dashboards (Admin, HR, Lecturer, Student)
- Employee and student management modals
- Responsive UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

## Project Structure
```
src/
  api/            # API calls
  components/     # React components
    dashboards/   # Dashboard components by role
    modals/       # Modal components
  context/        # React context providers
  data/           # Mock data
  hooks/          # Custom hooks
  types/          # TypeScript types
```

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License
MIT
