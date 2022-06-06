import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../components/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MenuBar } from "../components/MenuBar";
import { Video } from "../components/VideoPlayer";

export const BookTrabajador = () => {
  let emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };

  const [products, setProducts] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  const productService = new ProductService();

  useEffect(() => {
    productService.getProducts().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideViewDialog = () => {
    setSubmitted(false);
    setViewDialog(false);
  };

  const viewProduct = (product) => {
    setProduct({ ...product });
    setViewDialog(true);
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <div className="text-center">
        <img
          src={`images/product/${rowData.image}`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          alt={rowData.image}
          className="product-image"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="text-center">
          <Button
            icon="pi pi-eye"
            className="p-button-rounded p-button-info mx-2"
            onClick={() => viewProduct(rowData)}
          />
        </div>
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Búsqueda"
        />
      </span>
    </div>
  );

  return (
    <div>
      <MenuBar />
      <div className="datatable-crud-demo container pt-5">
        <Toast ref={toast} />

        <div className="card">
          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="image"
              align="center"
              header="Imagen"
              body={imageBodyTemplate}
            ></Column>
            <Column
              field="nombre"
              align="center"
              header="Nombre"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              field="categoria"
              align="center"
              header="Tipo"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={viewDialog}
          style={{ width: "60%" }}
          header="Receta"
          modal
          className="p-fluid"
          onHide={hideViewDialog}
        >
          {product.image && (
            <img
              src={`images/product/${product.image}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={product.image}
              className="product-image block m-auto pb-3"
            />
          )}
          <div className="field">
            <label htmlFor="name">Nombre</label>
          </div>
          <div className="field mt-3">
            <label htmlFor="description">Ingredientes</label>
          </div>
          <div className="field mt-3">
            <label htmlFor="description">Preparación</label>
          </div>
          <div className="field mt-3">
            <label className="mb-3">Tipo</label>
          </div>
          <div className="container" align="center">
            <div className="field mt-3">
              <label className="mb-3"> Video Explicativo</label>
              <Video url={product.video} />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
