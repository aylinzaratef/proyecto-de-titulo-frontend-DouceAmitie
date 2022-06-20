import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../components/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MenuBar } from "../components/MenuBar";

export const Employees = () => {
  let emptyProduct = {
    rut: null,
    nombre: "",
    cargo: null,
    telefono: "",
    email: null,
    direccion: null,
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const productService = new ProductService();

  useEffect(() => {
    productService.getEmployees().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  //agregar trabajador 
  const saveProduct = () => {
    setSubmitted(true);
    if (product.nombre.trim()) {
      let _products = [...products];
      let _product = { ...product };
      const index = findIndexById(product.rut);
      if (index >= 0) {
        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Completado",
          detail: "Datos Actualizados",
          life: 3000,
        });
        setEditDialog(false);
      } else {

        const processForm = async (e) => {
          e.preventDefault()
          const resp = await fetch(
            "https://springgcp2-353703.rj.r.appspot.com/Registro/registrar",
            {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                "rut": rut, "nombre": nombre, "apellidoPaterno": apellidoPaterno, "apellidoMaterno": apellidoMaterno,
                "password": password, "telefono": telefono, "email": email, "direccion": direccion, "fechaIngreso": fechaIngreso, "permisos": category
              })
            }
          )
          const data = await resp.json().then((data) => {
            console.log(data)
            _products.push(_product);
            toast.current.show({
              severity: "success",
              summary: "Completado",
              detail: "Trabajador Creado",
              life: 3000,
            });
            setProductDialog(false);
          })
          setProduct(_product);
        }

        /* var saveData = {};
         saveData.rut = "12623878-9";
         saveData.nombre = "Patricia";
         saveData.apellido_Paterno = "Fernandez";
         saveData.apellido_Materno = "Vidal";
         saveData.password = "123456"
         saveData.fecha_Ingreso = "2016-08-13"
         saveData.id_Rol = 2;
         console.log(saveData);
         fetch("https://springgcp2-353703.rj.r.appspot.com/Registro/registrar", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "Accept": "application/json",
             "X-Request-With": "XMLHttpRequest",
             "Access-Control-Allow-Origin": "origin-list",
           },
           body: JSON.stringify(saveData),
         }).then((data) => {
           console.log(data)
           _products.push(_product);
           toast.current.show({
             severity: "success",
             summary: "Completado",
             detail: "Trabajador Creado",
             life: 3000,
           });
           setProductDialog(false);
         });*/
      }



    }
  };

  //FECHA PARA TRABAJADORES
  let date = new Date();
  var fechaIngreso = date.toISOString().split('T')[0];




  const editProduct = (product) => {
    setProduct({ ...product });
    setEditDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.rut !== product.rut);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Completado",
      detail: "Eliminado",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].rut === id) {
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
    _product["cargo"] = e.value;
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
          label="Agregar trabajador"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
      </React.Fragment>
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
      <div className="datatable-crud-demo container-fluid pt-5">
        <Toast ref={toast} />

        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="rut"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="rut"
              align="center"
              header="Rut"
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="nombre"
              align="center"
              header="Nombre"
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              field="cargo"
              align="center"
              header="Cargo"
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="telefono"
              align="center"
              header="Teléfono"
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="email"
              align="center"
              header="E-mail"
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="direccion"
              align="center"
              header="Dirección"
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              field="fechacontrata"
              align="center"
              header="Contrato"
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>
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
                ¿Está seguro que desea eliminar <b>{product.nombre}</b>?
              </span>
            )}
          </div>
        </Dialog>
        {/*AGREGAR TRABAJADOR   */}
        <Dialog
          visible={productDialog}
          style={{ width: "60%" }}
          header="Nuevo Trabajador"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="rut">Rut</label>
            <InputText
              id="rut"
              value={product.rut}
              onChange={(e) => onInputChange(e, "rut")}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !product.rut })}
            />
            {submitted && !product.rut && (
              <small className="p-error">Rut es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
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
            <label htmlFor="apellidoPaterno">Primer Apellido</label>
            <InputText
              id="apellidoPaterno"
              value={product.apellidoPaterno}
              onChange={(e) => onInputChange(e, "apellidoPaterno")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.apellidoPaterno,
              })}
            />
            {submitted && !product.apellidoPaterno && (
              <small className="p-error">Primer apellido es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="apellidoMaterno">Segundo Apellido</label>
            <InputText
              id="apellidoMaterno"
              value={product.apellidoMaterno}
              onChange={(e) => onInputChange(e, "apellidoMaterno")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.apellidoMaterno,
              })}
            />
            {submitted && !product.apellidoMaterno && (
              <small className="p-error">Nombre es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="password">Contraseña</label>
            <InputText
              id="password"
              value={product.password}
              onChange={(e) => onInputChange(e, "password")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.password,
              })}
            />
            {submitted && !product.password && (
              <small className="p-error">Contraseña es requerida.</small>
            )}
          </div>
          <div className="field mt-3">
            <label className="mb-3">Cargo</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category1"
                  name="cargo"
                  value="Administrador"
                  onChange={onCategoryChange}
                  checked={product.cargo === "Administrador"}
                />
                <label htmlFor="category1">Administrador</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category2"
                  name="cargo"
                  value="Pastelero"
                  onChange={onCategoryChange}
                  checked={product.cargo === "Pastelero"}
                />
                <label htmlFor="category2">Pastelero</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category3"
                  name="cargo"
                  value="Repartidor"
                  onChange={onCategoryChange}
                  checked={product.cargo === "Repartidor"}
                />
                <label htmlFor="category3">Repartidor</label>
              </div>
            </div>
          </div>
          <div className="field mt-3">
            <label htmlFor="telefono">Teléfono</label>
            <InputText
              id="telefono"
              value={product.telefono}
              onChange={(e) => onInputChange(e, "telefono")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.telefono,
              })}
            />
            {submitted && !product.telefono && (
              <small className="p-error">
                Número de teléfono es requerido.
              </small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="email">E-mail</label>
            <InputText
              id="email"
              value={product.email}
              onChange={(e) => onInputChange(e, "email")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.email,
              })}
            />
            {submitted && !product.email && (
              <small className="p-error">E-mail es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="direccion">Dirección</label>
            <InputText
              id="direccion"
              value={product.direccion}
              onChange={(e) => onInputChange(e, "direccion")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.direccion,
              })}
            />
            {submitted && !product.direccion && (
              <small className="p-error">Dirección es requerida.</small>
            )}
          </div>
        </Dialog>
        {/*EDITAR TRABAJADOR   */}
        <Dialog
          visible={editDialog}
          style={{ width: "60%" }}
          header="Editar Trabajador"
          modal
          className="p-fluid"
          footer={productDialogFooter2}
          onHide={hideEditDialog}
        >
          <div className="field">
            <label htmlFor="rut">Rut</label>
            <InputText
              id="rut"
              value={product.rut}
              onChange={(e) => onInputChange(e, "rut")}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !product.rut })}
            />
            {submitted && !product.rut && (
              <small className="p-error">Rut es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="nombre">Nombre Completo</label>
            <InputText
              id="nombre"
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
            <label className="mb-3">Cargo</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category1"
                  name="category"
                  value="Adminitrador"
                  onChange={onCategoryChange}
                  checked={product.category === "Administrador"}
                />
                <label htmlFor="category1">Adminitrador</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category2"
                  name="category"
                  value="Pastelero"
                  onChange={onCategoryChange}
                  checked={product.category === "Pastelero"}
                />
                <label htmlFor="category2">Pastelero</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category3"
                  name="category"
                  value="Repartidor"
                  onChange={onCategoryChange}
                  checked={product.category === "Repartidor"}
                />
                <label htmlFor="category3">Repartidor</label>
              </div>
            </div>
          </div>
          <div className="field mt-3">
            <label htmlFor="telefono">Teléfono</label>
            <InputText
              id="telefono"
              value={product.telefono}
              onChange={(e) => onInputChange(e, "telefono")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.telefono,
              })}
            />
            {submitted && !product.telefono && (
              <small className="p-error">
                Número de teléfono es requerido.
              </small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="email">E-mail</label>
            <InputText
              id="email"
              value={product.email}
              onChange={(e) => onInputChange(e, "email")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.email,
              })}
            />
            {submitted && !product.email && (
              <small className="p-error">E-mail es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="direccion">Dirección</label>
            <InputText
              id="direccion"
              value={product.direccion}
              onChange={(e) => onInputChange(e, "direccion")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.direccion,
              })}
            />
            {submitted && !product.direccion && (
              <small className="p-error">Dirección es requerida.</small>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};
