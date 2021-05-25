export const validate = (schema, objectToValidate) => {
    const validation = schema.validate(objectToValidate);
    if (validation.error) {
      return {
        error: validation.error.details[0].message,
      };
    }
    return objectToValidate;
}
