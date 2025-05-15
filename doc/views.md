# Views

The project includes several main views organized in the `src/views` directory. Each view represents a major page in the application.

## Key Views

- **LoginView.vue**: Authentication page that handles user login
  - Uses Google OAuth for authentication
  - Displays version information
  - Manages scroll behavior during login
  - Composed of LoginItem and VersionDisplay components

- **ResultsView.vue**: Displays salary and position data
  - Shows user's salary information and comparisons
  - Includes filtering and data visualization
  - Handles user session and data fetching
  - Composed of multiple result components:
    - ResultsFilters
    - ResultsSalaryAmount
    - ResultsSalaryComparison

## View Features

### LoginView Features
- **Authentication**: Integrates with Google OAuth
- **UI/UX**: 
  - Disables scroll during login
  - Shows version information
  - Clean, focused interface
- **Components**:
  - LoginItem: Handles authentication form
  - VersionDisplay: Shows application version

### ResultsView Features
- **Data Display**:
  - Salary amount visualization
  - Salary comparison charts
  - Filterable data views
- **User Data**:
  - Session management
  - User profile information
  - Data submission status
- **Components**:
  - NavbarItem: Navigation
  - ResultsFilters: Data filtering
  - ResultsSalaryAmount: Salary display
  - ResultsSalaryComparison: Comparison charts
  - VersionDisplay: Version information

## View Structure

Each view follows a consistent structure:
1. **Template Section**:
   - HTML markup with component composition
   - Responsive layout design
   - Semantic HTML structure

2. **Script Section**:
   - TypeScript logic
   - Component imports
   - State management
   - Lifecycle hooks
   - Event handlers

3. **Style Section**:
   - Scoped CSS
   - Responsive design
   - Component-specific styles

4. **Component Integration**:
   - Reusable components
   - Props and events
   - Slot usage
   - Component communication

5. **State Management**:
   - Reactive state using Composition API
   - Computed properties
   - Watchers
   - Service integration