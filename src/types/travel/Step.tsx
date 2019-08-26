export type StepType = {
  price: number | null;
  hasBeenPayed: boolean;
  hasBeenReserved: boolean;
  nbPers: number;
  commentary: string;
};

export const defaultStep: StepType = {
  price: null,
  hasBeenPayed: false,
  hasBeenReserved: false,
  nbPers: 1,
  commentary: ""
};
