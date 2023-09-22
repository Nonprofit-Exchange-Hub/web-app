import { ValidationError, StringSchema, BooleanSchema } from 'yup';

const getError = (
  rule: StringSchema | BooleanSchema,
  value: string | undefined,
): string | undefined | null => {
  try {
    rule.validateSync(value);
    return null;
  } catch (error) {
    if (error instanceof ValidationError) {
      return error.message;
    }
  }
};

export { getError };
