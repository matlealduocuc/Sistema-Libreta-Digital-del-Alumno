export const validateDv = (runLimpio: string, dv: string) => {
  let total = 0;
  let factor = 2;

  for (let i = runLimpio.length - 1; i >= 0; i--) {
    total += parseInt(runLimpio[i], 10) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const remainder = 11 - (total % 11);
  const dvExpected =
    remainder === 11 ? "0" : remainder === 10 ? "K" : remainder.toString();

  return dvExpected.toUpperCase() === dv.toUpperCase();
};

export const formatRut = (rut: string) => {
  const cleanRut = rut.replace(/[^0-9kK]/g, "");
  if (cleanRut.length <= 9) {
    let body = cleanRut.slice(0, -1);
    const verifier = cleanRut.slice(-1);

    body = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return verifier.length < 1 ? `${body}` : `${body}-${verifier}`;
  } else return rut.slice(0, 12);
};
