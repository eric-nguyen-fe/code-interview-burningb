import React from 'react';
import { ProductItem } from 'shared/interfaces/product';

interface CardProductProps {
  product: ProductItem;
}

const CardProduct: React.FC<CardProductProps> = React.memo(({ product }) => {
  return (
    <div className="m-product_item">
      <div className="m-product_item_image">
        <img
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
      <div className="m-product_item_body">
        <h4 className="m-product_item-title">{product.title}</h4>
        <p className="m-product_item-text">{product.description}</p>
        <p className="m-product_item-price">{product.price}$</p>
      </div>
    </div>
  );
})

CardProduct.defaultProps = {
};

export default CardProduct;
