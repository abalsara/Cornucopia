# Test Structure Guide

## Quick Overview

Tests are organized in `__tests__/` by **feature** and **test type**:

```
__tests__/
├── [feature-name]/
│   ├── unit/           # Individual function tests
│   └── integration/    # Component/flow tests
```

## Running Tests

```bash
npm test
```

Tests automatically run on git commit via Husky hooks.

## Adding New Tests

### 1. Choose Location

Place tests in the appropriate directory:

- **Unit tests**: `__tests__/[feature]/unit/[name].spec.ts`
- **Integration tests**: `__tests__/[feature]/integration/[name]-flow.spec.tsx`

### 2. File Naming Convention

- Pattern: `[descriptive-name].spec.[ts|tsx]`
- Use `.ts` for pure logic tests
- Use `.tsx` for React component tests

### 3. Test Structure

```typescript
import { functionToTest } from '@/src/util/module';

describe('Feature Name', () => {
  it('should do expected behavior', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

## Examples

### Unit Test Example

File: `__tests__/auth/unit/auth.spec.ts`

```typescript
import { emailIsValid } from '@/src/util/auth';

describe('emailIsValid', () => {
  it('returns truthy for a valid email', () => {
    expect(emailIsValid('test@example.com')).toBeTruthy();
  });

  it("returns null for an email missing '@'", () => {
    expect(emailIsValid('testexample.com')).toBeNull();
  });
});
```

### Integration Test Example

File: `__tests__/auth/integration/auth-flow.spec.tsx`

```typescript
describe('Auth Flow Integration', () => {
  it('should complete full signup flow', async () => {
    // TODO: Implement signup flow test
    // 1. Render signup screen
    // 2. Fill in form fields
    // 3. Submit form
    // 4. Assert navigation to verification screen
  });
});
```

## Updating Existing Tests

1. **Find the test file**: Navigate to `__tests__/[feature]/[type]/`
2. **Locate the test**: Find the relevant `describe` or `it` block
3. **Update assertion**: Modify the `expect()` statement to match new behavior
4. **Run tests**: Execute `npm test` to verify changes

## Key Tools

- **Framework**: Jest (with `jest-expo` preset)
- **TypeScript**: Fully supported with types
- **Path Aliases**: Use `@/src/...` for imports

## Current Test Status

- **Unit tests**: Auth validation functions (complete)
- **Integration tests**: Scaffolded with TODOs for:
  - Auth flow
  - Donation flow
  - Navigation flow

## Tips

- Write unit tests for utility functions and business logic
- Write integration tests for user flows and component interactions
- Use descriptive test names: `it('should [expected behavior]')`
- Group related tests with `describe()` blocks
- Run tests before committing (enforced by Husky)
