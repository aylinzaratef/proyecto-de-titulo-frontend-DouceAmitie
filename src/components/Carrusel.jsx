import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { ProductService } from "../components/ProductService";

export const Carrusel = () => {
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "600px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productService = new ProductService();

  useEffect(() => {
    productService.getRecetas().then((data) => setProducts(data.slice(0, 9)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const productTemplate = (product, pastel) => {
    return (
      <div className="p-3 text-center">
        <img
          src={`${product.imagen}`}
          onError={(e) =>
          (e.target.src =
            '/public/images/errorfoto.png')
          }
          alt={product.name}
          className="product-image imagen-carrusel"
        />
        <div>
          <label><i>{product.nombre}</i></label>
        </div>
      </div>

    );
  };

  return (
    <div className="carousel-demo">
      <Carousel
        value={products}
        numVisible={4}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
      />
    </div>
  );
};
