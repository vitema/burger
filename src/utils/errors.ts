export const getErrorMessage = (error: unknown):  string => {
  let msg = "unknown error";
  if (typeof error === "string") {
    msg = error;
  }
  return msg;
};
