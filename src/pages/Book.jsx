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
import { height } from "@mui/system";
import ReactTooltip from "react-tooltip";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
export const Book = () => {
  let emptyProduct = {

  };

  const [products, setProducts] = useState(null);
  const [pasteles, setPasteles] = useState(null);
  const [pastelSeleccionado, setPastelSeleccionado] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  const productService = new ProductService();
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');


  useEffect(() => {
    productService.getRecetas().then((data) => setProducts(data));
    productService.getPastel().then((data) => setPasteles(data));
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

  const saveProduct = async (nuevo) => {
    setSubmitted(true);

    if (product.nombre.trim()) {
      let _products = [...products];
      let _product = { ...product };
      let _pasteles = [...pasteles];
      let _pastelSeleccionado = { ...pastelSeleccionado };
      if (!nuevo) {
        const index = findIndexById(product.idReceta);
        var saveData = {};
        saveData.imagen = _product.imagen;
        saveData.nombre = _product.nombre;
        saveData.categoria = _product.categoria;
        saveData.ingredientes = _product.ingredientes;
        saveData.preparacion = _product.preparacion;
        saveData.urlVideo = _product.video;
        saveData.idReceta = _product.idReceta;
        saveData.id_Pastel = _product.id_Pastel;
        let response = await fetch(
          "https://douceamitiequilpuegcp.rj.r.appspot.com/Recetas/actualizarReceta",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-Request-With": "XMLHttpRequest",
              "Access-Control-Allow-Origin": "origin-list",
            },
            body: JSON.stringify(saveData),
          }
        );

        const indexPastel = findIndexByIdPastel(pastelSeleccionado.idPastel);
        var saveDataPastel = {};
        saveDataPastel.precio = pastelSeleccionado.precio;
        saveDataPastel.descripcion = pastelSeleccionado.descripcion;
        saveDataPastel.idPastel = pastelSeleccionado.idPastel;
        saveDataPastel.nombre = _product.nombre;
        console.log(pastelSeleccionado);

        let responsePastel = await fetch(
          "https://douceamitiequilpuegcp.rj.r.appspot.com/Recetas/actualizarPastel",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-Request-With": "XMLHttpRequest",
              "Access-Control-Allow-Origin": "origin-list",
            },
            body: JSON.stringify(saveDataPastel),
          }
        );



        _products[index] = _product;
        _pasteles[indexPastel] = _pastelSeleccionado;
        console.log("soy indexpastel", _pastelSeleccionado);
        toast.current.show({
          severity: "success",
          summary: "Completado",
          detail: "Receta Actualizada",
          life: 3000,
        });
        setEditDialog(false);
      } else {

        //GUARDAR RECETA 
        var saveData = {};

        saveData.imagen = _product.imagen;
        saveData.nombre = _product.nombre;
        saveData.categoria = _product.categoria;
        saveData.ingredientes = _product.ingredientes;
        saveData.preparacion = _product.preparacion;
        saveData.precio = _product.precio;
        saveData.descripcion = _product.descripcion;
        saveData.urlVideo = _product.video;


        let response = await fetch(
          "https://douceamitiequilpuegcp.rj.r.appspot.com/Recetas/ingresarReceta",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-Request-With": "XMLHttpRequest",
              "Access-Control-Allow-Origin": "origin-list",
            },
            body: JSON.stringify(saveData),
          }
        );
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
      setPasteles(_pasteles);
    }
  };

  const editProduct = (product) => {
    console.log(product);
    let pastel = pasteles.find((data) => {
      return data.idPastel == product.id_Pastel
    })
    setPastelSeleccionado(pastel)
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
    let _products = products.filter((val) => val.idReceta !== product.idReceta);
    fetch(
      "https://douceamitiequilpuegcp.rj.r.appspot.com/Recetas/eliminarReceta/" + product.idReceta,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Request-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "origin-list",
        }

      }

    );

    fetch(
      "https://douceamitiequilpuegcp.rj.r.appspot.com/Recetas/eliminarPastel/" + product.id_Pastel,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Request-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "origin-list",
        }

      }

    );


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
      if (products[i].idReceta === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const findIndexByIdPastel = (id) => {
    let index = -1;
    for (let i = 0; i < pasteles.length; i++) {
      if (pasteles[i].idPastel === id) {
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

  const onInputChangePastel = (e, name) => {

    setPastelSeleccionado({ ...pastelSeleccionado, [name]: e.target.value });
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
          src={`${rowData.imagen}`}
          onError={(e) =>
          (e.target.src = '/public/images/errorfoto.png'
          )
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
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mx-2"
            onClick={() => editProduct(rowData)}
            data-tip data-for="EditarTooltip"
          />
          <ReactTooltip id="EditarTooltip" place="top" type="success" effect="solid">
            Editar
          </ReactTooltip>
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger mx-2"
            onClick={() => confirmDeleteProduct(rowData)}
            data-tip data-for="EliminarTooltip"
          />
          <ReactTooltip id="EliminarTooltip" place="top" type="error" effect="solid">
            Eliminar
          </ReactTooltip>
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
        onClick={() => saveProduct(true)}
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
        onClick={() => saveProduct(false)}
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
        <div className="card card-transparente">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
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
              style={{ minWidth: "10rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={productDialog}
          style={{
            width: "85%",
            height: "150%"
          }}
          header="Nueva Receta"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >

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
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category5"
                  name="categoria"
                  value="Queque"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Queque"}
                />
                <label htmlFor="category5">Queque</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category6"
                  name="categoria"
                  value="Pastel"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Pastel"}
                />
                <label htmlFor="category6">Pastel</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category7"
                  name="categoria"
                  value="Dulces"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Dulces"}
                />
                <label htmlFor="category7">Dulces y Bombones</label>
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
              <div className="field">
                <label htmlFor="name">URL Imagen</label>
                <InputText
                  id="imagen"
                  value={product.imagen}
                  onChange={(e) => onInputChange(e, "imagen")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.imagen,
                  })}
                />
                {submitted && !product.imagen && (
                  <small className="p-error">URL de imagen es requerido.</small>
                )}
              </div>
            </div>
            <div className="imagen-vista text-right">
              {product.imagen && (
                <img
                  src={`${product.imagen}`}
                  onError={(e) =>
                  (e.target.src =
                    '/public/images/errorfoto.png')
                  }
                  alt={product.imagen}
                  className="product-image block m-auto pb-3 imagen-vista"
                />
              )}
            </div>

            <div className="col-12 mt-3">
              <h5>
                Datos del pastel
              </h5>
            </div>
            <div className="field">
              <label htmlFor="precio">Precio Unitario</label>
              <InputText
                id="precio"
                value={product.precio}
                onChange={(e) => onInputChange(e, "precio")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.precio,
                })}
              />
              {submitted && !product.precio && (
                <small className="p-error">Precio es requerido.</small>
              )}
            </div>
            <div className="field mt-3">
              <label htmlFor="descripcion">Descripción</label>
              <InputTextarea
                id="descripcion"
                value={product.descripcion}
                onChange={(e) => onInputChange(e, "descripcion")}
                required
                rows={3}
                cols={20}
              />
            </div>
          </div>
        </Dialog>

        {/*EDITAR RECETA */}
        <Dialog
          visible={editDialog}
          style={{
            width: "85%",
            height: "150%"
          }}
          header="Editar receta"
          modal
          className="p-fluid"
          footer={productDialogFooter2}
          onHide={hideEditDialog}
        >
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
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category5"
                  name="categoria"
                  value="Queque"
                  onChange={onCategoryChange}
                  checked={product.categoria === "Queque"}
                />
                <label htmlFor="category5">Queque</label>
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
              <div className="field">
                <label htmlFor="name">URL Imagen</label>
                <InputText
                  id="imagen"
                  value={product.imagen}
                  onChange={(e) => onInputChange(e, "imagen")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.imagen,
                  })}
                />
                {submitted && !product.imagen && (
                  <small className="p-error">URL de imagen es requerida.</small>
                )}
              </div>
            </div>
            <div className="imagen-vista text-right">
              {product.imagen && (
                <img
                  src={`${product.imagen}`}
                  onError={(e) =>
                  (e.target.src =
                    '/public/images/errorfoto.png')
                  }
                  alt={product.imagen}
                  className="product-image block m-auto pb-3 imagen-vista"
                />
              )}
            </div>
            <div className="col-12 mt-3">
              <h5>
                Datos del pastel
              </h5>
            </div>
            <div className="field">
              <label htmlFor="precio">Precio Unitario</label>
              <InputText
                id="precio"
                value={pastelSeleccionado?.precio}
                onChange={(e) => onInputChangePastel(e, "precio")}
                required
                className={classNames({
                  "p-invalid": submitted && !pastelSeleccionado?.precio,
                })}
              />
              {submitted && !pastelSeleccionado?.precio && (
                <small className="p-error">Precio es requerido.</small>
              )}
            </div>
            <div className="field mt-3">
              <label htmlFor="descripcion">Descripción</label>
              <InputTextarea
                id="descripcion"
                value={pastelSeleccionado?.descripcion}
                onChange={(e) => onInputChangePastel(e, "descripcion")}
                required
                rows={3}
                cols={20}
              />
            </div>
          </div>
        </Dialog>

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
