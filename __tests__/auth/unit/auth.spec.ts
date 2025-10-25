import { emailIsValid, validatePassword } from '@/src/util/auth';

// Test emailIsValid
describe('emailIsValid', () => {
  it('returns truthy for a valid email', () => {
    expect(emailIsValid('test@example.com')).toBeTruthy();
    expect(emailIsValid('user.name+tag@domain.co.uk')).toBeTruthy();
    expect(emailIsValid('my_email123@sub.domain.org')).toBeTruthy();
  });

  it("returns null for an email missing '@'", () => {
    expect(emailIsValid('testexample.com')).toBeNull();
  });

  it('returns null for an email missing domain', () => {
    expect(emailIsValid('user@')).toBeNull();
  });

  it('returns null for an email missing username', () => {
    expect(emailIsValid('@domain.com')).toBeNull();
  });

  it('returns null for an email with spaces', () => {
    expect(emailIsValid('user name@domain.com')).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(emailIsValid('')).toBeNull();
  });

  it('returns null for a malformed domain', () => {
    expect(emailIsValid('user@domain')).toBeNull();
    expect(emailIsValid('user@domain..com')).toBeNull();
  });
});

// Test validatePassword
describe('validatePassword', () => {
  it('returns an error if the password is shorter than 8 characters', () => {
    expect(validatePassword('Ab1')).toBe('Password must be at least 8 characters long.');
  });

  it('returns an error if the password has no uppercase letters', () => {
    expect(validatePassword('password1')).toBe(
      'Password must contain at least one uppercase letter.',
    );
  });

  it('returns an error if the password has no lowercase letters', () => {
    expect(validatePassword('PASSWORD1')).toBe(
      'Password must contain at least one lowercase letter.',
    );
  });

  it('returns an error if the password has no numbers', () => {
    expect(validatePassword('Password')).toBe('Password must contain at least one number.');
  });

  it('returns an error if the password contains spaces', () => {
    expect(validatePassword('Password 1')).toBe('Password cannot contain spaces.');
  });

  it('returns an empty string if the password is valid', () => {
    expect(validatePassword('Valid123')).toBe('');
  });

  it('only returns the first validation error encountered', () => {
    // Too short and missing uppercase — should only return length error
    expect(validatePassword('abc1')).toBe('Password must be at least 8 characters long.');
  });
});
