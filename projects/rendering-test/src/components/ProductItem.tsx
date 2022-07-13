import { FC, memo } from "react";

interface Props {
  product: {
    id: number;
    productName: string;
    price: number;
  };
}

export const ProductItemComponent: FC<Props> = ({ product }) => {
  return (
    <div>
      {product.productName} - <strong>{product.price}</strong>
    </div>
  );
};

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
