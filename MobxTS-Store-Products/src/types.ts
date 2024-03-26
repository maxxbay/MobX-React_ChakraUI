export type Product = {
  id: string;
  name: string;
  price: number | null;
  description: string;
  category?: string;
};

export type Column = {
  header: string;
  accessorKey: string;
};
