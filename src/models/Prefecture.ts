export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type Prefectures = {
  message: string | null;
  result: Prefecture[];
};
