export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type Prefectures = {
  message: string | null;
  result: Prefecture[];
};

const isPrefecture = (arg: unknown): arg is Prefecture => {
  const p = arg as Prefecture;

  return typeof p.prefCode === 'number' && typeof p.prefName === 'string';
};

const isPrefectures = (args: unknown): args is Prefectures => {
  const pl = args as Prefectures;

  return (
    (typeof pl.message === 'string' || pl.message === null) &&
    pl.result.every((p) => isPrefecture(p))
  );
};

export { isPrefecture, isPrefectures };
