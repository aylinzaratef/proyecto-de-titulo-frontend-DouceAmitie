import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../components/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MenuBar } from "../components/MenuBar";
import { Video } from "../components/VideoPlayer";

export const Book = () => {
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
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const productService = new ProductService();

  useEffect(() => {
    productService.getProducts().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  //PEDIDOS TRAE FECHA Y HORA
  let date = new Date();
  var FechaIngreso = date.toISOString();

  console.log(FechaIngreso);

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      console.log(base64data);
    };
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideEditDialog = () => {
    setSubmitted(false);
    setEditDialog(false);
  };
  const hideViewDialog = () => {
    setSubmitted(false);
    setViewDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.nombre.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Completado",
          detail: "Receta Actualizada",
          life: 3000,
        });
        setEditDialog(false);
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Completado",
          detail: "Receta Agregada",
          life: 3000,
        });
        setProductDialog(false);
      }

      setProducts(_products);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setEditDialog(true);
  };
  const viewProduct = (product) => {
    setProduct({ ...product });
    setViewDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Completado",
      detail: "Receta Eliminada",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };
    _product["categoria"] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Agregar receta"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
      </React.Fragment>
    );
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
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mx-2"
            onClick={() => editProduct(rowData)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger mx-2"
            onClick={() => confirmDeleteProduct(rowData)}
          />
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
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const productDialogFooter2 = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideEditDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  return (
    <div>
      <MenuBar />
      <div className="datatable-crud-demo container pt-5">
        <Toast ref={toast} />

        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

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
          visible={productDialog}
          style={{ width: "60%" }}
          header="Nueva Receta"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
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
            <InputText
              id="name"
              value={product.nombre}
              onChange={(e) => onInputChange(e, "nombre")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.nombre,
              })}
            />
            {submitted && !product.nombre && (
              <small className="p-error">Nombre es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="description">Ingredientes</label>
            <InputTextarea
              id="description"
              value={product.ingredientes}
              onChange={(e) => onInputChange(e, "ingredientes")}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div className="field mt-3">
            <label htmlFor="description">Preparación</label>
            <InputTextarea
              id="description"
              value={product.preparacion}
              onChange={(e) => onInputChange(e, "preparacion")}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div className="field mt-3">
            <label className="mb-3">Categoría</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category1"
                  name="categoria"
                  value="Torta"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Torta"}
                />
                <label htmlFor="category1">Torta</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category2"
                  name="categoria"
                  value="Tartaleta"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Tartaleta"}
                />
                <label htmlFor="category2">Tartaleta</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category3"
                  name="categoria"
                  value="Masa"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Masa"}
                />
                <label htmlFor="category3">Masa</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category4"
                  name="categoria"
                  value="Bizcocho"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Bizcocho"}
                />
                <label htmlFor="category4">Bizcocho</label>
              </div>
            </div>
          </div>
          <div className="field mt-3 row">
            <div className="col-6">
              <div className="field">
                <label htmlFor="name">URL Video</label>
                <InputText
                  id="video"
                  value={product.video}
                  onChange={(e) => onInputChange(e, "video")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.video,
                  })}
                />
                {submitted && !product.video && (
                  <small className="p-error">URL de video es requerido.</small>
                )}
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="imagen"> Imagen</label>
              <FileUpload
                chooseLabel="Cargar..."
                mode="basic"
                name="imagen[]"
                url="https://primefaces.org/primereact/showcase/upload.php"
                accept="image/*"
                customUpload
                uploadHandler={customBase64Uploader}
              />
            </div>
          </div>
        </Dialog>

        {/*EDITAR RECETA */}
        <Dialog
          visible={editDialog}
          style={{ width: "60%" }}
          header="Editar receta"
          modal
          className="p-fluid"
          footer={productDialogFooter2}
          onHide={hideEditDialog}
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
            <InputText
              id="name"
              value={product.nombre}
              onChange={(e) => onInputChange(e, "nombre")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.nombre,
              })}
            />
            {submitted && !product.nombre && (
              <small className="p-error">Nombre es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="ingredientes">Ingredientes</label>
            <InputTextarea
              id="ingredientes"
              value={product.ingredientes}
              onChange={(e) => onInputChange(e, "ingredientes")}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div className="field mt-3">
            <label htmlFor="preparacion">Preparación</label>
            <InputTextarea
              id="preparacion"
              value={product.preparacion}
              onChange={(e) => onInputChange(e, "preparacion")}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div className="field mt-3">
            <label className="mb-3">Categoría</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category1"
                  name="categoria"
                  value="Torta"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Torta"}
                />
                <label htmlFor="category1">Torta</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category2"
                  name="categoria"
                  value="Tartaleta"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Tartaleta"}
                />
                <label htmlFor="category2">Tartaleta</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category3"
                  name="categoria"
                  value="Masa"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Masa"}
                />
                <label htmlFor="category3">Masa</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category4"
                  name="categoria"
                  value="Bizcocho"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Bizcocho"}
                />
                <label htmlFor="category4">Bizcocho</label>
              </div>
            </div>
          </div>
          <div className="field mt-3 row">
            <div className="col-6">
              <div className="field">
                <label htmlFor="name">URL Video</label>
                <InputText
                  id="video"
                  value={product.video}
                  onChange={(e) => onInputChange(e, "video")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.video,
                  })}
                />
                {submitted && !product.video && (
                  <small className="p-error">URL de video es requerido.</small>
                )}
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="imagen"> Imagen</label>
              <FileUpload
                chooseLabel="Cargar..."
                mode="basic"
                name="imagen[]"
                url="https://primefaces.org/primereact/showcase/upload.php"
                accept="image/*"
                customUpload
                uploadHandler={customBase64Uploader}
              />
            </div>
          </div>
        </Dialog>

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

        <Dialog
          visible={deleteProductDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                ¿Está seguro que desea eliminar <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};
