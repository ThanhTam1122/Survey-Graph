export type Population = {
  year: number;
  value: number;
  rate?: number;
};

export type PopulationCategory = {
  label: string;
  data: Population[];
};

export type PopulationCategories = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: PopulationCategory[];
  };
};

const isPopulation = (arg: unknown): arg is Population => {
  const p = arg as Population;

  return typeof p.year === 'number' && typeof p.value === 'number';
};

const isPopulationCategory = (arg: unknown): arg is PopulationCategory => {
  const pc = arg as PopulationCategory;

  return typeof pc.label === 'string' && pc.data.every((p) => isPopulation(p));
};

const isPopulationCategoies = (args: unknown): args is PopulationCategories => {
  const pcs = args as PopulationCategories;

  return (
    (typeof pcs.message === 'string' || pcs.message === null) &&
    typeof pcs.result.boundaryYear === 'number' &&
    pcs.result.data.every((pc) => isPopulationCategory(pc))
  );
};

export { isPopulation, isPopulationCategory, isPopulationCategoies };
