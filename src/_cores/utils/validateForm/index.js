// simple reusable validator used by components
const isEmptyString = (v) => typeof v === 'string' && v.trim() === '';

const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = values[field];
    const rule = rules[field];

    // required: treat undefined/null/empty-string-or-only-whitespace as empty
    if (rule.required && (value === undefined || value === null || isEmptyString(value) || value === '')) {
      errors[field] = rule.requiredMessage || `${field} is required`;
      return;
    }

    // pattern (regex)
    if (rule.pattern && value && !rule.pattern.test(String(value))) {
      errors[field] = rule.patternMessage || `Invalid ${field}`;
      return;
    }

    // minLength (check on trimmed string for strings)
    if (rule.minLength && value !== undefined && value !== null) {
      const len = typeof value === 'string' ? value.trim().length : String(value).length;
      if (len < rule.minLength) {
        errors[field] = rule.minLengthMessage || `${field} is too short`;
        return;
      }
    }

    // match: compare with another field's value (exact equality)
    if (rule.match) {
      const otherValue = values[rule.match];
      // treat whitespace-trimmed equality for strings
      const a = typeof value === 'string' ? value.trim() : value;
      const b = typeof otherValue === 'string' ? otherValue.trim() : otherValue;
      if (a !== b) {
        errors[field] = rule.matchMessage || `${field} does not match ${rule.match}`;
        return;
      }
    }

    // custom validator function (optional) - return message string to set error
    if (typeof rule.validate === 'function') {
      const customMsg = rule.validate(value, values);
      if (customMsg) {
        errors[field] = customMsg;
        return;
      }
    }
  });

  return errors;
};

export default validateForm;
