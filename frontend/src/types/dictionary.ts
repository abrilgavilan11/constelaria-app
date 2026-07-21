export interface Sign {
  _id: string;
  name: string;
  element: string;
  quality: string;
  ruler: string;
  symbol: string;
  description: string;
}

export interface Planet {
  _id: string;
  name: string;
  type: string;
  symbol: string;
  description: string;
}

export interface House {
  _id: string;
  number: number;
  name: string;
  description: string;
}
