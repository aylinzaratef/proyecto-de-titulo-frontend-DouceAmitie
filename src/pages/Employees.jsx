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
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import ReactTooltip from "react-tooltip";
export const Employees = () => {
  let emptyProduct = {
    rut: null,
    nombre: "",
    nombres: "",
    cargo: null,
    telefono: "",
    email: null,
    direccion: null,
    rutValido: true,
    emailValido: true
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  const productService = new ProductService();
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');





  useEffect(() => {
    productService.getEmployees().then((data) => setProducts(data));
    initFilters();
  }, []);

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
      'rut': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'nombre': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'cargo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'direccion': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    setGlobalFilterValue('');
  }


  const validarRut = (e) => {
    const val = (e.target && e.target.value) || "";
    let _trabajador = { ...product };
    if (fnRut.validaRut(e.target.value)) {
      _trabajador["rutValido"] = true;

    } else {
      _trabajador["rutValido"] = false;
    }
    _trabajador["rut"] = val;
    console.log("holaaaaaaaaaaaaaaa", _trabajador);
    setProduct(_trabajador);
  }

  const fnRut = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto) {
      rutCompleto = rutCompleto.replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;
      var tmp = rutCompleto.split('-');
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == 'K') digv = 'k';

      return (fnRut.dv(rut) == digv);
    },
    dv: function (T) {
      var M = 0, S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
      return S ? S - 1 : 'k';
    }
  }


  const validarEmail = (e) => {
    const val = (e.target && e.target.value) || "";
    let _trabajador = { ...product };
    let re = /^([\da-z_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
    if (re.exec(e.target.value)) {
      _trabajador["emailValido"] = true;

    } else {
      _trabajador["emailValido"] = false;
    }
    _trabajador["email"] = val;
    setProduct(_trabajador);
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

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  //agregar trabajador 
  const saveProduct = async (nuevo) => {
    setSubmitted(true);
    if (product.nombre.trim()) {
      let _products = [...products];
      let _product = { ...product };
      const index = findIndexById(product.rut);
      if (!nuevo) {
        var saveData = {};

        saveData.rut = _product.rut;
        saveData.nombre = _product.nombres;
        saveData.apellidoPaterno = _product.primerApellido;
        saveData.apellidoMaterno = _product.segundoApellido;
        if (_product.newPassword && _product.newPassword != "") {
          saveData.password = _product.newPassword;
        } else {
          saveData.password = _product.password;
        }
        saveData.telefono = "+569" + _product.telefono;
        saveData.email = _product.email;
        saveData.direccion = _product.direccion;
        saveData.fechaIngreso = fechaIngreso;
        saveData.permisos = parseInt(_product.permisos);

        let response = await fetch(
          "http://localhost:8080/Pasteleros/actualizar",
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

        var newResponse = await response.text();

        if (_product.permisos == "1") {
          _product.cargo = "Administrador";
        } else {
          _product.cargo = "Pastelero";
        }




        _product.nombre = _product.nombres + " " + _product.primerApellido + " " + _product.segundoApellido;



        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Completado",
          detail: "Datos Actualizados",
          life: 3000,
        });
        setEditDialog(false);
      } else {

        var saveData = {};

        saveData.rut = _product.rut;
        saveData.nombre = _product.nombre;
        saveData.apellidoPaterno = _product.apellidoPaterno;
        saveData.apellidoMaterno = _product.apellidoMaterno;
        saveData.password = _product.password;
        saveData.telefono = _product.telefono;
        saveData.email = _product.email;
        saveData.direccion = _product.direccion;
        saveData.fechaIngreso = fechaIngreso;
        saveData.permisos = parseInt(_product.cargo);

        console.log(saveData);

        let response = await fetch(
          "http://localhost:8080/Registro/registrar",
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

        var newResponse = await response.text();
        console.log(newResponse);
        if (_product.cargo == "1") {
          _product.cargo = "Administrador";
        } else {
          _product.cargo = "Pastelero";
        }

        _product.nombre = _product.nombre + " " + _product.apellidoPaterno + " " + _product.apellidoMaterno;
        _product.fechaIngreso = fechaIngreso;
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Completado",
          detail: "Trabajador Creado",
          life: 3000,
        });
        setProductDialog(false);
      }
      setProducts(_products);
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

    fetch(
      "http://localhost:8080/Pasteleros/eliminar/" + product.rut,
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
    console.log(product.rut);





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
  const onPermisosChange = (e) => {
    let _product = { ...product };
    _product["permisos"] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {

    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;
    console.log(_product);
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
      <div className="datatable-crud-demo container-fluid pt-5">
        <Toast ref={toast} />

        <div className="card">
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
            dataKey="rut"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            filters={filters}
            globalFilterFields={['rut', 'nombre', 'cargo', 'direccion']}
            header={header}
            responsiveLayout="scroll"
            className={"card-transparente-imp"}
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
              field="fechaIngreso"
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
          style={{


          }}
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
              onChange={(e) => { onInputChange(e, "rut"); validarRut(e) }}
              required
              autoFocus
              data-tip data-for="RutTooltip"
              className={classNames({ "p-invalid": submitted && !product.rut })}
            />
            {!product.rutValido ? (
              <p className="c-rojo">El rut ingresado no es válido, por favor ingrese otro. </p>
            ) : ""}

            {submitted && !product.rut && (
              <small className="p-error">Rut es requerido.</small>
            )}
            <ReactTooltip id="RutTooltip" place="top" type="info" effect="solid">

              Ingrese Rut con digito verificador, <b>sin</b> puntos y <b>con</b> guión.
            </ReactTooltip>
          </div>
          <div className="field mt-3">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              value={product.nombre}
              onChange={(e) => onInputChange(e, "nombre")}
              required
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
              className={classNames({
                "p-invalid": submitted && !product.apellidoMaterno,
              })}
            />
            {submitted && !product.apellidoMaterno && (
              <small className="p-error">Segundo Apellido es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="password">Contraseña</label>
            <InputText
              id="password"
              value={product.password}
              onChange={(e) => onInputChange(e, "password")}
              required
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
                  value="1"
                  onChange={onCategoryChange}
                  checked={product.cargo === "1"}
                />
                <label htmlFor="category1">Administrador</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category2"
                  name="cargo"
                  value="2"
                  onChange={onCategoryChange}
                  checked={product.cargo === "2"}
                />
                <label htmlFor="category2">Pastelero</label>
              </div>
            </div>
          </div>
          <div className="field mt-3">
            <label htmlFor="telefono">Teléfono</label>
            <div className="row">
              <div className="col-2">
                <label className="mt-2 px-3">+569</label>
              </div>
              <div className="col-10">
                <InputText
                  id="telefono"
                  value={product.telefono}
                  onChange={(e) => onInputChange(e, "telefono")}
                  required
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
            </div>
          </div>
          <div className="field mt-3">
            <label htmlFor="email">E-mail</label>
            <InputText
              id="email"
              value={product.email}
              onChange={(e) => { onInputChange(e, "email"); validarEmail(e) }}
              required
              className={classNames({
                "p-invalid": submitted && !product.email,
              })}
            />
            {!product.emailValido ? (
              <p className="c-rojo">El email ingresado no es válido, por favor ingrese otro. </p>
            ) : ""}
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
              readOnly
            />
          </div>
          <div className="field mt-3">
            <label htmlFor="nombres">Nombre</label>
            <InputText
              id="nombres"
              value={product.nombres}
              onChange={(e) => onInputChange(e, "nombres")}
              required
              className={classNames({
                "p-invalid": submitted && !product.nombres,
              })}
            />
            {submitted && !product.nombres && (
              <small className="p-error">Nombre es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="primerApellido">Primer Apellido</label>
            <InputText
              id="primerApellido"
              value={product.primerApellido}
              onChange={(e) => onInputChange(e, "primerApellido")}
              required
              className={classNames({
                "p-invalid": submitted && !product.primerApellido,
              })}
            />
            {submitted && !product.primerApellido && (
              <small className="p-error">Primer Apellido requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="segundoApellido">Segundo Apellido</label>
            <InputText
              id="segundoApellido"
              value={product.segundoApellido}
              onChange={(e) => onInputChange(e, "segundoApellido")}
              required
              className={classNames({
                "p-invalid": submitted && !product.segundoApellido,
              })}
            />
            {submitted && !product.segundoApellido && (
              <small className="p-error">Segundo Apellido es requerido.</small>
            )}
          </div>
          <div className="field mt-3">
            <label className="mb-3">Cargo</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="permisos1"
                  name="permisos"
                  value="1"
                  onChange={onPermisosChange}
                  checked={product.permisos === "1"}
                />
                <label htmlFor="category1">Administrador</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="permisos2"
                  name="permisos"
                  value="2"
                  onChange={onPermisosChange}
                  checked={product.permisos === "2"}
                />
                <label htmlFor="category2">Pastelero</label>
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
              className={classNames({
                "p-invalid": submitted && !product.direccion,
              })}
            />
            {submitted && !product.direccion && (
              <small className="p-error">Dirección es requerida.</small>
            )}
          </div>
          <div className="field mt-3">
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <InputText
              id="newPassword"
              value={product.newPassword}
              onChange={(e) => onInputChange(e, "newPassword")}

            />
          </div>
        </Dialog>
      </div>
    </div>
  );
};
