# Components

The project includes several Vue components organized in the `src/components` directory. Components are designed to be reusable and maintainable.

## Key Components

### Layout Components
- **NavbarItem.vue**: Navigation bar component for site-wide navigation
- **VersionDisplay.vue**: Component for displaying the application version

### Authentication Components
- **LoginItem.vue**: Authentication form component

### Results Components
Located in the `results/` directory:
- **ResultsSalaryComparison.vue**: Component for comparing salary data
- **ResultsFilters.vue**: Component for filtering and searching results
- **ResultsSalaryAmount.vue**: Component for displaying salary amounts

### Icon Components
Located in the `icons/` directory:
- **IconTabu.vue**: Main application icon component

## Component Features

- **Props**: Components accept props for configuration and data
- **Events**: Components emit events for parent communication
- **Slots**: Components use slots for flexible content injection
- **Composition API**: Components use Vue 3 Composition API
- **TypeScript**: Strong typing with TypeScript interfaces

## Testing

The `__tests__` directory contains test files for components:
- Unit tests for component functionality
- Integration tests for component interactions
- Snapshot tests for UI consistency

## Component Guidelines

1. **Naming**: Components use PascalCase naming
2. **Structure**: Each component has its own directory with related files
3. **Documentation**: Components include JSDoc comments
4. **Props Validation**: Props are validated with TypeScript types
5. **Responsive Design**: Components are mobile-first and responsive
