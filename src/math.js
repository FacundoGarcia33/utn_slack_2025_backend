export const math = (a, b) => {
  if (a === undefined || b === undefined) {
    //el throw lo que hace es arrojar un error
    throw new Error("Ambos valores deben estar definidos");
  }
  return a + b;
};
