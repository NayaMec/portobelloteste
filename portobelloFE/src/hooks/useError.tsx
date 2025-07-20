import { useState } from 'react';

interface FieldError {
  field: string;
  message: string;
}

export function useErrors() {
  const [errors, setErrors] = useState<FieldError[]>([]);

  function setError({ field, message }: FieldError) {
    const errorAlreadyExists = errors.find((error) => error.field === field);
    if (errorAlreadyExists) return;

    setErrors((prev) => [...prev, { field, message }]);
  }

  function removeError(fieldName: string) {
    setErrors((prev) => prev.filter((error) => error.field !== fieldName));
  }

  function getErrorMessageByFieldName(fieldName: string): string | undefined {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors,
  };
}
