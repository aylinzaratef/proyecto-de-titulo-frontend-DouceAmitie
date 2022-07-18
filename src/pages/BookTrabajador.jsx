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
import ReactTooltip from "react-tooltip";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
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
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState(null);
  useEffect(() => {
    productService.getRecetas().then((data) => setProducts(data));
    initFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearFilter = () => {
    initFilters();
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const initFilters = () => {
    setFilters({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'nombre': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'categoria': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    setGlobalFilterValue('');
  }




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
          src={`${rowData.imagen}`}
          onError={(e) =>
          (e.target.src =
            '/public/images/errorfoto.png')
          }
          alt={rowData.imagen}
          className="product-image imagen-tabla"
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
            data-tip data-for="VerTooltip"
          />
          <ReactTooltip id="VerTooltip" place="top" type="info" effect="solid">
            Ver
          </ReactTooltip>
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
          onChange={onGlobalFilterChange}
          placeholder="Búsqueda"
          className="input-form"
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
          <img
            src={`images/logo.png`}
            className="img-calendario d-none d-lg-block d-xl-block"
          />
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
            filters={filters}
            globalFilterFields={['nombre', 'categoria']}
            header={header}
            responsiveLayout="scroll"
            className={"card-transparente-imp"}
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
          style={{
            width: "85%",
            height: "150%"
          }}
          header={product.nombre}
          modal
          className="p-fluid"
          onHide={hideViewDialog}
        >
          <div className="row">
            <div className="col-12 col-lg-3 col-xl-3">
              {product.imagen && (
                <div className="text-left">
                  <img
                    src={`${product.imagen}`}
                    onError={(e) =>
                    (e.target.src =
                      '/public/images/errorfoto.png')
                    }
                    alt={product.imagen}
                    className="product-image block m-auto pb-3 imagen-vista"
                  />
                </div>
              )}
            </div>
            <div className="col-12 col-lg-9 col-xl-9">
              <div className="field mt-3">
                <label className="mb-2"><b>Tipo: </b></label>
                <label className="mx-2">{product.categoria}</label>
              </div>
              <div className="field mt-3">
                <label htmlFor="description"><b>Ingredientes:</b></label>
                <p>{product.ingredientes}</p>
              </div>
              <div className="field mt-3">
                <label htmlFor="description"><b>Preparación:</b></label>
                <p>{product.preparacion}</p>
              </div>

            </div>

          </div>


          <div className="container" align="center">
            <div className="field mt-3">
              <label className="mb-3"> <b>Video Explicativo</b></label>
              <Video url={product.video} />
            </div>
          </div>
        </Dialog>

      </div>
    </div>
  );
};
