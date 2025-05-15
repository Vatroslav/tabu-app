# Testing

The project uses Vitest for unit testing and Vue Test Utils for component testing. This document outlines the testing setup and practices.

## Test Setup

### Configuration
- **Vitest**: Configured in `vitest.config.ts`
- **Vue Test Utils**: Configured in test setup files
- **Test Environment**: JSDOM for DOM simulation

### Test Structure
```
src/
├── components/
│   └── __tests__/      # Component tests
├── services/
│   └── __tests__/      # Service tests
└── views/
    └── __tests__/      # View tests
```

## Testing Tools

### Vitest
- Unit testing framework
- Fast test execution
- Built-in coverage reporting
- Watch mode for development

### Vue Test Utils
- Component testing utilities
- Mounting and rendering components
- Event simulation
- Props and slots testing

### JSDOM
- DOM simulation
- Browser-like environment
- Window and document APIs

## Test Types

### Component Tests
- Testing component rendering
- Testing props and events
- Testing user interactions
- Testing computed properties

### Service Tests
- Testing API calls
- Testing data transformations
- Testing error handling
- Testing authentication

### View Tests
- Testing route integration
- Testing view composition
- Testing navigation
- Testing state management

## Test Examples

### Component Test
```typescript
import { mount } from '@vue/test-utils'
import LoginItem from '@/components/LoginItem.vue'

describe('LoginItem', () => {
  it('renders properly', () => {
    const wrapper = mount(LoginItem)
    expect(wrapper.text()).toContain('Login')
  })
})
```

### Service Test
```typescript
import { describe, it, expect } from 'vitest'
import { checkEmail } from '@/services/auth/google'

describe('Google Auth', () => {
  it('handles successful login', async () => {
    const result = await checkEmail('test', 'test@example.com', 'credential')
    expect(result.success).toBe(true)
  })
})
```

## Best Practices

1. **Test Organization**:
   - Group related tests
   - Use descriptive test names
   - Follow test naming conventions

2. **Test Coverage**:
   - Aim for high coverage
   - Focus on critical paths
   - Test edge cases

3. **Test Performance**:
   - Keep tests fast
   - Use proper cleanup
   - Avoid unnecessary DOM operations

4. **Test Maintenance**:
   - Keep tests up to date
   - Document test requirements
   - Review test coverage regularly

## Running Tests

### Commands
- `npm run test:unit`: Run all tests
- `npm run test:unit:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage

### CI Integration
- Tests run on pull requests
- Coverage requirements enforced
- Test results reported 