enum TypeHttpErrors {
  "FAILED_DB_CONNECTION" = "Failed while it was trying to connect with database",
  "FAILED_DB_CASTING_DATA_TYPE" = "Failed to cast the data type(invalid data type sent)",
  "SERVER_ERROR" = "Internal server error",
  "RESOURCE_NOT_FOUND" = "The resource doesn't exist or url parameters are incorrect",
  "VALIDATION_ERROR" = "The data sent is invalid or it hasn't valid format",
}

interface HttpError extends Error {
  status?: number;
  type?: TypeHttpErrors;
}

export { HttpError, TypeHttpErrors };
