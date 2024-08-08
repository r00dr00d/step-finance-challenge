
export const UI_AMOUNT_TO_AMOUNT_QTY = 1000000000;

export const stepToXStep = (step: number, price: number) => {
  return step * (1 / price);
}

export const xStepToStep = (xStep: number, price: number) => {
  return xStep * price;
}