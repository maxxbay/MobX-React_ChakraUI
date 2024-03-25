export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category?: string;
};

export type Column = {
  header: string;
  accessorKey: string;
};
