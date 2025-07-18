# Recurring Date Picker Component

## Overview

This is a React TypeScript application that implements a comprehensive recurring date picker component, similar to those found in scheduling applications like TickTick. The project is a frontend-only application built with modern web technologies, featuring a clean and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern React architecture with the following key design decisions:

### Frontend Architecture
- **React with TypeScript**: Chosen for type safety and better developer experience
- **Vite**: Selected as the build tool for fast development and optimized production builds
- **Client-side routing**: Uses Wouter for lightweight routing
- **Component-based architecture**: Modular component structure for maintainability

### State Management
- **Zustand**: Lightweight state management solution for handling recurrence configuration
- **React Query**: Server state management and caching (though currently minimal backend interaction)
- **Local component state**: For UI-specific state management

### Styling and UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Headless UI components for accessibility and consistent behavior
- **Shadcn/ui**: Pre-built component library built on Radix UI and Tailwind
- **Responsive design**: Mobile-first approach with breakpoint-based layouts

## Key Components

### Recurring Date Picker Components
1. **RecurringDatePicker**: Main container component that orchestrates all sub-components
2. **RecurrenceOptions**: Allows selection between Daily, Weekly, Monthly, and Yearly patterns
3. **RecurrenceSettings**: Configures interval settings (every X days/weeks/months/years)
4. **DaySelector**: Multi-select weekdays for weekly recurrence
5. **MonthlyPatternPicker**: Handles monthly pattern selection (day of month, day of week, last day)
6. **DateRangePicker**: Start and end date selection
7. **MiniCalendarPreview**: Visual calendar showing selected recurring dates
8. **SummaryPreview**: Human-readable summary of the configured recurrence

### UI Components
- Comprehensive set of reusable UI components from Shadcn/ui
- Consistent styling and behavior across the application
- Accessibility-focused design patterns

## Data Flow

### State Management Flow
1. **Zustand Store**: Central store (`recurrenceStore`) manages all recurrence-related state
2. **Component Updates**: Components subscribe to specific store slices for optimal re-rendering
3. **Computed Properties**: Store includes computed functions for generating recurring dates and summary text
4. **Type Safety**: Full TypeScript integration ensures type safety throughout the data flow

### Component Communication
- Parent-child prop passing for simple data flow
- Zustand hooks for cross-component state sharing
- Event handlers for user interactions

## External Dependencies

### Core Dependencies
- **React ecosystem**: React, React DOM, React Hook Form
- **State management**: Zustand, TanStack React Query
- **UI libraries**: Radix UI components, Lucide React icons
- **Utilities**: date-fns for date manipulation, class-variance-authority for styling variants
- **Development tools**: Vite, TypeScript, ESLint configurations

### Backend Infrastructure (Minimal)
- **Express server**: Basic server setup for potential future API endpoints
- **Database**: Configured for PostgreSQL with Drizzle ORM (though primarily frontend-focused)
- **Session management**: Basic session handling setup

## Deployment Strategy

### Development
- **Vite dev server**: Hot module replacement for rapid development
- **TypeScript compilation**: Real-time type checking
- **Tailwind CSS**: JIT compilation for optimal development experience

### Production Build
- **Vite build**: Optimized production bundle with code splitting
- **Static asset optimization**: Minification and compression
- **Express server**: Serves static files and provides API endpoints

### Architecture Decisions Rationale

1. **Zustand over Redux**: Chosen for its simplicity and minimal boilerplate while providing powerful state management capabilities
2. **Tailwind CSS**: Selected for rapid development and consistent design system
3. **Radix UI**: Provides accessible, unstyled components that can be customized with Tailwind
4. **TypeScript**: Ensures type safety and better developer experience
5. **Vite**: Fast build tool with excellent TypeScript and React support
6. **Frontend-first approach**: Prioritizes user experience with minimal backend dependencies

The application demonstrates modern React patterns with a focus on user experience, accessibility, and maintainable code structure.