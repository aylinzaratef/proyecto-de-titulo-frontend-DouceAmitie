/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterMoment from "@mui/lab/AdapterMoment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import LocationOn from "@mui/icons-material/LocationOn";
import Notes from "@mui/icons-material/Notes";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ModalCliente } from "./ModalCliente";
import { ProductService } from "../components/ProductService";
import { blue, orange, green } from '@mui/material/colors';

const productService = new ProductService();

const p = Promise.resolve(productService.getPedidos());
var appointments = [];
try {
  appointments = await p;
} catch (err) {
  console.log(err);
}
p;
const c = Promise.resolve(productService.getClientes());
var clienteslist = [];
try {
  clienteslist = await c;
} catch (err) {
  console.log(err);
}
c;
const t = Promise.resolve(productService.getEmployees());
var trabajadorlist = [];
try {
  trabajadorlist = await t;
} catch (err) {
  console.log(err);
}
t;

const pl = Promise.resolve(productService.getPastel());
var pasteleslist = [];
try {
  pasteleslist = await pl;

} catch (err) {
  console.log(err);
}
pl;

const resources = [{
  fieldName: 'priorityId',
  title: 'Priority',
  instances: [
    { text: 'NUEVO PEDIDO', id: "En Transito", color: blue },
    { text: 'PREPARANDO', id: "Preparando", color: orange },
    { text: 'COMPLETADO', id: "Completado", color: green }
  ],
}];


const PREFIX = "Demo";
const classes = {
  content: `${PREFIX}-content`,
  header: `${PREFIX}-header`,
  closeButton: `${PREFIX}-closeButton`,
  buttonGroup: `${PREFIX}-buttonGroup`,
  button: `${PREFIX}-button`,
  picker: `${PREFIX}-picker`,
  wrapper: `${PREFIX}-wrapper`,
  icon: `${PREFIX}-icon`,
  textField: `${PREFIX}-textField`,
  addButton: `${PREFIX}-addButton`,
};

const StyledDiv = styled("div")(({ theme }) => ({
  [`& .${classes.icon}`]: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.textField}`]: {
    width: "100%",
  },
  [`& .${classes.content}`]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [`& .${classes.closeButton}`]: {
    float: "right",
  },
  [`& .${classes.picker}`]: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
    width: "50%",
  },
  [`& .${classes.wrapper}`]: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.buttonGroup}`]: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
  },
}));
const StyledFab = styled(Fab)(({ theme }) => ({
  [`&.${classes.addButton}`]: {
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const pastelesIDList = [];

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
      pastelList: [], pastelesIDList,
      clienteID: 0,
      pastelID: 0,
      cantidadID: 0,
      dataPasteles: [],
      listaclientes: clienteslist
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  async commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {

      this.state.dataPasteles.map(pastel => delete pastel.nombre);

      var saveData = {};
      // saveData.pasteles = pasteles;
      saveData.direccion_Entrega = appointment.location;
      saveData.observaciones_Pedido = appointment.observaciones_pedido;
      saveData.estado = "En Transito";
      const entrega = new Date(appointment.startDate);
      entrega.setHours(entrega.getHours() - 4);
      saveData.fecha_Entrega = entrega.toISOString();
      saveData.datos_cliente = appointment.cliente;
      saveData.datos_encargado = appointment.trabajador;
      saveData.pasteles = this.state.dataPasteles;
      //TODO: AQUI HAY ATAO MI PANA


      console.log("soy el guardado ", saveData);
      let response = await fetch(
        "http://localhost:8080/Pedidos/ingresarPedido",
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

      appointment.title = saveData.datos_cliente;
      appointment.priorityId = "En Transito";
      //FIN CREAR PEDIDO
      commitChanges({ [type]: appointment });

    }
    this.setState({
      appointmentChanges: {},
    });
  };

  render() {
    const {
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges, pastelList, clienteID, trabajadorID, pastelID, cantidadID, dataPasteles, listaclientes } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment("added")
      : () => this.commitAppointment("changed");

    const selectEditorProps = (field) => ({
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.renderValue,
        }),
    });

    const textEditorProps = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value,
        }),
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const pickerEditorProps = (field) => ({
      // keyboard: true,
      value: displayAppointmentData[field],
      onChange: (date) =>
        this.changeAppointment({
          field: [field],
          changes: date
            ? date.toDate()
            : new Date(displayAppointmentData[field]),
        }),
      ampm: false,
      inputFormat: "DD/MM/YYYY",
      onError: () => null,
    });
    const startDatePickerProps = pickerEditorProps("startDate");

    const endDatePickerProps = pickerEditorProps("endDate");

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };





    const handleChange = (event) => {

      const {
        target: { value },
      } = event;


      this.setState({
        pastelList: typeof value === "string" ? value.split(",") : value,

      });
      this.changeAppointment({
        field: "title",
        changes: typeof value === "string" ? value : value.join(","),
      });

      console.log(event);
    };

    const userHandleChange = (event) => {
      const {
        target: { value },
      } = event;
      this.setState({
        clienteID: value,
      });
      this.changeAppointment({
        field: "cliente",
        changes: value,
      });
    };

    const userHandleChangeTrabajador = (event) => {
      const {
        target: { value },
      } = event;
      this.setState({
        trabajadorID: value,
      });
      this.changeAppointment({
        field: "trabajador",
        changes: value,
      });
    };

    const userHandleChangePastel = (event) => {
      const {
        target: { value },
      } = event;
      this.setState({
        pastelID: value,
      });
      this.changeAppointment({
        field: "pastel",
        changes: value,
      });
    };

    const userHandleChangeCantidad = (event) => {
      const {
        target: { value },
      } = event;
      this.setState({
        cantidadID: value,
      });
      this.changeAppointment({
        field: "cantidad",
        changes: value,
      });
    };


    const pushToArrayList = (prop) => {
      this.setState({ listaclientes: listaclientes.concat(prop) })
    }

    return (


      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize={false}
        onHide={onHide}
      >
        <StyledDiv>
          <div className={classes.header}>
            <IconButton
              className={classes.closeButton}
              onClick={cancelChanges}
              size="large"
            >
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className="row">
              <div className="col-6">
                <div className={classes.wrapper}>
                  <Create className={classes.icon} color="action" />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-pastel">Pasteles</InputLabel>
                    <Select
                      labelId="demo-simple-select-label-pastel"
                      id="demo-simple-select-pastel"
                      value={pastelID}
                      label="Cliente"
                      onChange={userHandleChangePastel}
                    >
                      {Object.keys(pasteleslist).map((key) => (

                        <MenuItem key={key} value={pasteleslist[key].idPastel}>{pasteleslist[key].nombre}</MenuItem>
                      ))}

                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-4">
                <div className={classes.wrapper}>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-cantidad">Cantidad</InputLabel>
                    <Select
                      labelId="demo-simple-select-label-cantidad"
                      id="demo-simple-select-cantidad"
                      value={cantidadID}
                      label="Cliente"
                      onChange={userHandleChangeCantidad}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>

                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-2">
                <button className="btn btn-rosado mt-3" onClick={() => {
                  const pastel = pasteleslist.find(x => x.idPastel == pastelID)
                  this.setState({
                    dataPasteles: this.state.dataPasteles.concat({
                      nombre: pastel.nombre || "", cantidad: cantidadID, id_Pastel: pastelID, valor: pastel.valor || " "
                    })
                  })
                }}>+</button>
              </div>
              <div className="col-12 my-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">Nombre Pastel </th>
                      <th className="text-center" scope="col">Cantidad</th>
                      <th className="text-center" scope="col">Precio Unitario</th>
                      <th className="text-center" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="listaPasteles">
                    {Object.keys(this.state.dataPasteles).map((key) => {
                      return (
                        <tr key={key}>
                          <td className="text-center">{this.state.dataPasteles[key].nombre}</td>
                          <td className="text-center">{this.state.dataPasteles[key].cantidad}</td>
                          <td className="text-center">{new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(this.state.dataPasteles[key].valor)}</td>
                          <td className="text-center"><button className="btn btn-rosado" onClick={() =>
                            this.setState({
                              dataPasteles: dataPasteles.filter(x => x != dataPasteles[key])
                            })
                          }>Eliminar</button></td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
            </div>




            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Fecha de entrega"
                  renderInput={(props) => (
                    <TextField className={classes.textField} {...props} />
                  )}
                  {...startDatePickerProps}
                />
              </LocalizationProvider>
            </div>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={clienteID}
                  label="Cliente"
                  onChange={userHandleChange}
                >
                  {Object.keys(listaclientes).map((key) => (
                    <MenuItem key="clienteID" value={listaclientes[key].rut}>{listaclientes[key].nombre}</MenuItem>
                  ))}



                </Select>
              </FormControl>
              <ModalCliente setList={pushToArrayList} />
              {/*list={clienteslist} setList={this.setState.} */}
            </div>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="disabled" />
              <TextField {...textEditorProps("location")} label={"Ubicación"} />
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField
                {...textEditorProps("observaciones_pedido")}
                multiline
                rows="6"
                label={"Observaciones pedido"}
              />
            </div>

            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label-trabajador">Trabajador</InputLabel>
                <Select
                  labelId="demo-simple-select-label-trabajador"
                  id="demo-simple-select-trabajador"
                  value={trabajadorID}
                  label="Cliente"
                  onChange={userHandleChangeTrabajador}
                >
                  {Object.keys(trabajadorlist).map((key) => (

                    <MenuItem key="trabajadorID" value={trabajadorlist[key].rut}>{trabajadorlist[key].nombre}</MenuItem>

                  ))}

                </Select>
              </FormControl>
            </div>


          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button + " mx-2"}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment("deleted");
                }}
              >
                Eliminar
              </Button>
            )}
            <button
              type="button"
              className="btn btn-primary btn-rosa"
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? "+ Ingresar Pedido" : "Guardar"}
            </button>
          </div>
        </StyledDiv>
      </AppointmentForm.Overlay>
    );
  }
}

/* eslint-disable-next-line react/no-multi-comp */
export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 10,
      endDayHour: 22,
      isNewAppointment: false,
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility =
      this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange =
      this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment =
        data.filter(
          (appointment) =>
            editingAppointment && appointment.id === editingAppointment.id
        )[0] || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(
        (appointment) => appointment.id !== deletedAppointmentId
      );

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;

    return (
      <Paper>
        <Scheduler data={data} locale={"es-ES"}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            displayName="SEMANA"
          />
          <MonthView displayName="MES" />
          <EditRecurrenceMenu />
          <Appointments />
          <Resources
            data={resources}
            mainResourceName="priorityId"
          />
          <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
          <Toolbar />
          <DateNavigator />
          <TodayButton />

          <ViewSwitcher />

          <AppointmentForm

            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
        </Scheduler>
        <StyledFab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </StyledFab>
        <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
          <DialogTitle>Eliminar Pedido</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que desea eliminar este pedido?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.toggleConfirmationVisible}
              color="primary"
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              onClick={this.commitDeletedAppointment}
              color="secondary"
              variant="outlined"
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}
