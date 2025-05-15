# TypeScript Types

The project uses TypeScript for type safety and better developer experience. This document outlines the type definitions used throughout the application.

## Core Types

### APIResponse
```typescript
export type APIResponse<T> = {
  success: boolean
  content: T
  status?: number
}
```
- Generic type for API responses
- Used across all API calls
- Provides consistent error handling

## Results Types

### TechOption
```typescript
export type TechOption = {
  value: string
  label: string
}
```
- Represents technology options in filters
- Used in ResultsFilters component

### CountrySalaryOption
```typescript
export type CountrySalaryOption = {
  value: string
  label: string
}
```
- Represents country salary options
- Used in salary comparison

### ContractTypeOption
```typescript
export type ContractTypeOption = {
  value: string
  label: string
}
```
- Represents contract type options
- Used in salary calculations

## User Types

### UserData
```typescript
type UserData = {
  name: string
  unique_id: string
}
```
- Represents user profile data
- Used in authentication and results display

## Service Types

### SubmissionData
```typescript
type SubmissionData = {
  position_group: string
  position: string
  seniority: string
  tech: string
  contract_type: string
  country_salary: string
}
```
- Represents user submission data
- Used in results processing

### AdditionalPositionData
```typescript
type AdditionalPositionData = {
  additional_position_group: string
  additional_position: string
}
```
- Represents additional position information
- Used in salary calculations

## Type Usage

1. **API Integration**:
   - All API calls use `APIResponse<T>`
   - Provides type safety for API data

2. **Component Props**:
   - Components use specific types for props
   - Ensures correct data structure

3. **State Management**:
   - Reactive state uses TypeScript types
   - Computed properties are properly typed

4. **Service Layer**:
   - Service functions use typed parameters
   - Return types are explicitly defined

## Best Practices

1. **Type Inference**:
   - Use type inference where possible
   - Explicit types for public APIs

2. **Type Safety**:
   - Avoid `any` type
   - Use specific types for better safety

3. **Documentation**:
   - Document complex types
   - Use JSDoc for type documentation

4. **Type Organization**:
   - Group related types
   - Use type aliases for clarity 