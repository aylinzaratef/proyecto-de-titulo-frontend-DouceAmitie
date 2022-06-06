import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { ProductService } from "../../components/ProductService";
import { Rating } from "primereact/rating";
import "./cards.css";

export const Cards = () => {
  const [products, setProducts] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);

  const productService = new ProductService();

  useEffect(() => {
    productService.getProducts().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const renderGridItem = (data) => {
    return (
      <div className="col-md-12 col-sm-12 col-lg-4 col-xl-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-content">
            <img
              src={`images/product/${data.image}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <div className="product-name">{data.nombre}</div>
            <div className="product-description">{data.categoria}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  return (
    <div className="dataview-demo">
      <div className="">
        <DataView
          value={products}
          layout={layout}
          itemTemplate={itemTemplate}
        />
      </div>
    </div>
  );
};
