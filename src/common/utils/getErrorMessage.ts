import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown): null | string {
  if (isAxiosError(error)) {
    if (
      error.response?.status === 401 &&
      error.request.responseURL.endsWith("/me")
    ) {
      return null;
    }
    return error?.response?.data?.error ?? error.message;
  }
  if (error instanceof Error) {
    return `Native error: ${error.message}`;
  }
  return JSON.stringify(error);
}
