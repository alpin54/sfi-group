// -- libraries
import { useState } from 'react';

// -- utils
import validateForm from '@utils/validateForm';

const useFormValidation = (initialValues, rules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // update values and validate against the new state immediately
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      setTouched((t) => ({ ...t, [name]: true }));
      setErrors(validateForm(next, rules));
      return next;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    // validate current values on blur
    setErrors((prev) => {
      const nextErr = validateForm(values, rules);
      return nextErr;
    });
  };

  const sanitizeValues = (vals) => {
    return Object.keys(vals).reduce((acc, key) => {
      const val = vals[key];
      if (typeof val === 'string') {
        let v = val.trim();
        // heuristic: lowercase email-like fields
        if (key.toLowerCase().includes('email')) {
          v = v.toLowerCase();
        }
        acc[key] = v;
      } else {
        acc[key] = val;
      }
      return acc;
    }, {});
  };

  const handleSubmit = (onValid) => (e) => {
    e.preventDefault();

    // sanitize before validating/submitting
    const sanitized = sanitizeValues(values);

    const validationErrors = validateForm(sanitized, rules);
    setErrors(validationErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(validationErrors).length === 0) {
      onValid(sanitized);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setErrors
  };
};

export default useFormValidation;
