# Results Components

The results components are a set of specialized components used in the ResultsView to display and filter salary and position data.

## Components

### ResultsFilters.vue
- **Purpose**: Provides filtering capabilities for salary and position data
- **Features**:
  - Multiple filter categories
  - Dynamic filter options
  - Real-time filtering
  - Responsive design
- **Props**:
  - `filters`: Filter configuration
  - `selectedFilters`: Currently selected filters
- **Events**:
  - `update:filters`: Emitted when filters change
  - `reset`: Emitted when filters are reset

### ResultsSalaryAmount.vue
- **Purpose**: Displays salary amount information
- **Features**:
  - Salary visualization
  - Currency formatting
  - Responsive layout
- **Props**:
  - `salaryData`: Salary information to display
  - `currency`: Currency format
- **Events**:
  - `update`: Emitted when salary data changes

### ResultsSalaryComparison.vue
- **Purpose**: Shows salary comparison charts
- **Features**:
  - Chart visualization
  - Multiple comparison metrics
  - Interactive elements
- **Props**:
  - `comparisonData`: Data for comparison
  - `metrics`: Comparison metrics
- **Events**:
  - `select`: Emitted when a comparison is selected

## Component Integration

The results components work together to provide a comprehensive salary and position data view:

1. **Data Flow**:
   - ResultsFilters controls the data filtering
   - Filtered data is passed to ResultsSalaryAmount and ResultsSalaryComparison
   - Components update in real-time based on filter changes

2. **State Management**:
   - Components use Vue's Composition API
   - Shared state through props and events
   - Computed properties for derived data

3. **Styling**:
   - Consistent design language
   - Responsive layouts
   - Accessible UI elements

## Usage Example

```vue
<template>
  <div class="results-container">
    <ResultsFilters
      :filters="filters"
      :selected-filters="selectedFilters"
      @update:filters="handleFilterUpdate"
      @reset="handleFilterReset"
    />
    <ResultsSalaryAmount
      :salary-data="filteredSalaryData"
      :currency="currency"
      @update="handleSalaryUpdate"
    />
    <ResultsSalaryComparison
      :comparison-data="filteredComparisonData"
      :metrics="metrics"
      @select="handleComparisonSelect"
    />
  </div>
</template>
``` 