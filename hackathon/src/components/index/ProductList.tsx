import React, { useState } from 'react';
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h1 className="panel-title">List Products</h1>
      </div>
      <div className="panel-body" id="list-product">
        {products.map(product => (
          <div className="media product" key={product.id}>
            <div className="media-left">
              <a href=""><img className="media-object" src={product.image} alt={product.name} /></a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{product.name}</h4>
              <p>{product.description}</p>
              <span className="price">{product.price} USD</span>
              <button 
                className="btn btn-primary"
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
