import { FC } from "react";
import { ProductItem } from "./ProductItem";

interface Props {
  products: Array<{
    id: number;
    productName: string;
    price: number;
  }>;
}

export const SearchResult: FC<Props> = ({ products }) => {
  return (
    <div>
      {products?.map((result) => (
        <ProductItem product={result} key={result.id} />
      ))}
    </div>
  );
};
