import { ServerErrors } from "../interfaces";

// wrap entire error and returns a new server error
export const handleError = (
  error?: ServerErrors.HttpError
): ServerErrors.HttpError => {
  return error || (new Error() as ServerErrors.HttpError);
};
