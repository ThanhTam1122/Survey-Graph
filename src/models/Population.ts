export type Population = {
  year: number;
  value: number;
};

export type PopulationCategory = {
  label: string;
  data: Population[];
};

export type Populations = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: PopulationCategory[];
  };
};
