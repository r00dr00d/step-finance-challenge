
export const UI_AMOUNT_TO_AMOUNT_QTY = 1000000000;

export const stepToXStep = (step: number, price: number) => {
  return step * (1 / price);
}

export const xStepToStep = (xStep: number, price: number) => {
  return xStep * price;
}

export const validateStakeAmount = (input: { type: 'step' | 'xstep', qty: number }, price: number, amount: number, loading: boolean) : [boolean, string] => {
  const step = input.type === 'step' ? input.qty : xStepToStep(input.qty, price);

  if (loading)
    return [true, 'Approve transactions from your wallet']

  if (step === 0)
    return [true, `Enter an amount`]

  if (step > amount)
    return [true, `Insufficient STEP balance`]


  return [false, ''];
}

export const validateUnstakeAmount = (input: { type: 'step' | 'xstep', qty: number }, price: number, amount: number, loading: boolean) : [boolean, string] => {
  const xStep = input.type === 'xstep' ? input.qty : stepToXStep(input.qty, price);

  if (loading)
    return [true, 'Approve transactions from your wallet']
  
  if (xStep === 0)
    return [true, `Enter an amount`]

  if (xStep > amount)
    return [true, `Insufficient xSTEP balance`]


  return [false, ''];
}

export const parseInput = (input: string | number, type: 'step' | 'xstep') => {
  if (input === '.' || input === '..')
    return { type, qty: 0, str: '.' };

  const formattedValue = String(input).replace(/[^0-9.]/g, '').replace(/(?<=\..*)\./g, '')

  return { type, qty: Number(formattedValue), str: formattedValue };
}