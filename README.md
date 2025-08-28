# Todo App Frontend

A modern, responsive Todo List application built with Next.js 15, TypeScript, and Tailwind CSS. This project demonstrates full-stack development skills with a focus on clean architecture, modern UI/UX patterns, and robust API integration.

## Overview

This frontend application provides an intuitive interface for managing tasks with features like priority levels, due dates, and completion tracking. The design emphasizes user experience with smooth animations, responsive layouts, and a cohesive visual language that balances functionality with aesthetics.

## Key Features

- **Task Management**: Create, edit, and delete tasks with a streamlined workflow
- **Priority System**: Three-tier priority levels (Low, Medium, High) with visual indicators
- **Due Date Tracking**: Optional due dates with smart formatting (Today, Tomorrow, Overdue)
- **Completion Status**: Toggle task completion with immediate visual feedback
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism effects, gradient backgrounds, and smooth transitions

## Technical Implementation

### Frontend Architecture
- **Next.js 15**: Utilizes the App Router for improved performance and developer experience
- **TypeScript**: Full type safety across components, API calls, and data structures
- **Tailwind CSS**: Custom utility classes and responsive design system
- **State Management**: Local state with React hooks for optimal user experience

### API Integration
- **RESTful Design**: Clean separation between frontend and backend concerns
- **Error Handling**: Comprehensive error states and user feedback
- **Data Validation**: Client-side validation with server-side verification
- **Real-time Updates**: Immediate UI updates with server synchronization

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Backend API running (see backend repository)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd todo-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Configuration
Create a `.env.local` file with your backend API URL:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### Running the Application
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Project Structure

The codebase follows a modular architecture that promotes maintainability and scalability:

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx          # Home page with task overview
│   ├── tasks/            # Task management routes
│   │   ├── new/          # Task creation interface
│   │   └── [id]/edit/    # Task editing interface
│   └── layout.tsx        # Application layout and metadata
├── components/            # Reusable UI components
│   ├── TaskCard.tsx      # Individual task display component
│   └── TaskForm.tsx      # Task creation and editing forms
├── lib/                   # Core utilities and configurations
│   ├── api.ts            # API client and data fetching
│   ├── colors.ts         # Color system and theming
│   └── config.ts         # Application configuration
└── types/                 # TypeScript type definitions
    └── task.ts           # Task data models and interfaces
```

## API Endpoints

The frontend integrates with a backend API that provides:

- **Task Operations**: Full CRUD functionality for task management
- **Status Updates**: Toggle completion status with dedicated endpoints
- **Data Validation**: Server-side validation and error handling
- **Real-time Sync**: Immediate data consistency across client and server

## Design Decisions

### User Experience
- **Immediate Feedback**: Local state updates for responsive interactions
- **Visual Hierarchy**: Clear information architecture with consistent spacing
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Optimized rendering with Next.js features

### Technical Choices
- **Component Architecture**: Reusable components with clear separation of concerns
- **State Management**: Minimal state complexity with React hooks
- **Styling Approach**: Utility-first CSS with custom design system
- **Error Handling**: Graceful degradation and user-friendly error messages

## Development Workflow

### Code Quality
- **TypeScript**: Strict type checking for robust development
- **ESLint**: Code quality and consistency enforcement
- **Component Design**: Single responsibility principle for maintainability

### Testing Strategy
- **Component Testing**: Individual component validation
- **Integration Testing**: API interaction verification
- **User Testing**: Real-world usage scenario validation

## Backend Integration

This frontend connects to a separate backend repository that provides:
- Express.js API with TypeScript
- Prisma ORM for database operations
- MySQL database with optimized schemas
- Comprehensive validation and error handling

Backend Repository: [https://github.com/nrao04/todo-backend](https://github.com/nrao04/todo-backend)

## Future Enhancements

Potential areas for improvement and expansion:
- **Real-time Updates**: WebSocket integration for collaborative features
- **Advanced Filtering**: Search, sort, and filter capabilities
- **Data Export**: Task data export in various formats
- **Mobile App**: React Native implementation for native mobile experience

## Contributing

Contributions are welcome and should follow these guidelines:
1. Fork the repository and create a feature branch
2. Implement changes with appropriate testing
3. Ensure code quality and consistency
4. Submit a pull request with clear documentation

## License

This project is licensed under the ISC License.