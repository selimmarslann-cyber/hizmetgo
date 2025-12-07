/**
 * Form Validation Utilities
 * Real-time validation helpers
 */

export interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Create a validator function
 */
export function createValidator(rules: ValidationRule[]) {
  return (value: any): ValidationResult => {
    const errors: string[] = [];

    for (const rule of rules) {
      if (!rule.test(value)) {
        errors.push(rule.message);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: (message = "Bu alan zorunludur"): ValidationRule => ({
    test: (value) => {
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined;
    },
    message,
  }),

  email: (message = "Geçerli bir e-posta adresi girin"): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Optional field
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Optional field
      return String(value).length >= min;
    },
    message: message || `En az ${min} karakter olmalıdır`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Optional field
      return String(value).length <= max;
    },
    message: message || `En fazla ${max} karakter olabilir`,
  }),

  min: (min: number, message?: string): ValidationRule => ({
    test: (value) => {
      if (value === null || value === undefined || value === "") return true;
      const num = Number(value);
      return !isNaN(num) && num >= min;
    },
    message: message || `En az ${min} olmalıdır`,
  }),

  max: (max: number, message?: string): ValidationRule => ({
    test: (value) => {
      if (value === null || value === undefined || value === "") return true;
      const num = Number(value);
      return !isNaN(num) && num <= max;
    },
    message: message || `En fazla ${max} olabilir`,
  }),

  phone: (message = "Geçerli bir telefon numarası girin"): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Optional field
      const phoneRegex = /^[0-9]{10,15}$/;
      return phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""));
    },
    message,
  }),

  iban: (message = "Geçerli bir IBAN girin"): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Optional field
      const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4,30}$/;
      return ibanRegex.test(value.replace(/\s/g, "").toUpperCase());
    },
    message,
  }),
};

/**
 * Real-time validation hook (for React)
 */
export function useFieldValidation(
  value: any,
  rules: ValidationRule[],
  validateOnChange = true,
) {
  const validator = createValidator(rules);
  const result = validator(value);

  return {
    ...result,
    showError: validateOnChange && !result.valid,
  };
}
