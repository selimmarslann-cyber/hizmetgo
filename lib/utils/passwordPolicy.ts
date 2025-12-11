/**
 * Password Policy Validation
 */

export interface PasswordPolicyResult {
  valid: boolean;
  errors: string[];
}

const MIN_LENGTH = 8;
const MAX_LENGTH = 128;
const REQUIRE_UPPERCASE = true;
const REQUIRE_LOWERCASE = true;
const REQUIRE_NUMBER = true;
const REQUIRE_SPECIAL = false; // Optional for now

/**
 * Validate password against policy
 */
export function validatePassword(password: string): PasswordPolicyResult {
  const errors: string[] = [];

  if (password.length < MIN_LENGTH) {
    errors.push(`Şifre en az ${MIN_LENGTH} karakter olmalıdır`);
  }

  if (password.length > MAX_LENGTH) {
    errors.push(`Şifre en fazla ${MAX_LENGTH} karakter olabilir`);
  }

  if (REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermelidir');
  }

  if (REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermelidir');
  }

  if (REQUIRE_NUMBER && !/[0-9]/.test(password)) {
    errors.push('Şifre en az bir rakam içermelidir');
  }

  if (REQUIRE_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Şifre en az bir özel karakter içermelidir');
  }

  // Check for common weak passwords
  const commonPasswords = [
    'password',
    '12345678',
    'qwerty',
    'abc123',
    'password123',
  ];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Bu şifre çok yaygın kullanılıyor, lütfen daha güçlü bir şifre seçin');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get password strength score (0-4)
 */
export function getPasswordStrength(password: string): number {
  let score = 0;

  if (password.length >= MIN_LENGTH) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  return Math.min(score, 4);
}

