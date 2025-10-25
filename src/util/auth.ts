/**
 * Validates a password against security requirements.
 *
 * The password must:
 * - Be at least 8 characters long.
 * - Contain at least one uppercase letter.
 * - Contain at least one lowercase letter.
 * - Contain at least one number.
 * - Not contain any spaces.
 *
 * @param password - The password string to validate.
 * @returns An error message string describing the first validation rule that fails,
 *          or an empty string if the password is valid.
 */
export const validatePassword = (password: string): string => {
  // Minimum length check
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  // Uppercase letter check
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }

  // Lowercase letter check
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }

  // Number check
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number.';
  }

  // No spaces check
  if (/\s/.test(password)) {
    return 'Password cannot contain spaces.';
  }

  return '';
};

/**
 * Validates whether a given string is a properly formatted email address.
 *
 * @param email - The email address string to validate.
 * @returns A boolean that is true iff the email is formatted properly.
 */

export const emailIsValid = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};
