export const throwsException = (errorConstructor, message) => {
  throw new errorConstructor(message);
};
