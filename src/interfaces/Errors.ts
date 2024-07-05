enum TypeHttpErrors {
  "FAILED_DB_CONNECTION" = "Failed while it was trying to connect with database",
  "FAILED_DB_CASTING_DATA_TYPE" = "Failed to cast the data type(invalid data type sent)",
  "SERVER_ERROR" = "Internal server error",
  "RESOURCE_NOT_FOUND" = "The resource doesn't exist or url parameters are incorrect",
  "VALIDATION_ERROR" = "The data sent is invalid or it hasn't valid format",
  "INVALID_ACCESS_TOKEN" = "The token wasn't provided or wasn't included",
  "JWT_TOKEN_ERROR" = "The token has malformed or doesn't have a right format",
  "JWT_GENERAL_ERROR" = "Error while it was generated access token, try it later",
}

interface HttpError extends Error {
  status?: number;
  type?: TypeHttpErrors;
}

export { HttpError, TypeHttpErrors };
