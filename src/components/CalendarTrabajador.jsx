import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import { blue, orange, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import {
  Scheduler,
  Toolbar,
  Resources,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  DragDropProvider,
  EditRecurrenceMenu,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import classNames from 'clsx';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
const PREFIX = "Demo";
const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};


const getClassByLocation = (location) => {
  if (location === 'Room 1') return classes.firstRoom;
  if (location === 'Room 2') return classes.secondRoom;
  return classes.thirdRoom;
};

const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
  [`&.${classes.firstRoom}`]: {

  },
  [`&.${classes.secondRoom}`]: {

  },
  [`&.${classes.thirdRoom}`]: {

  },
  [`&.${classes.header}`]: {
    height: '60px',
  },
}));
const resources = [{
  fieldName: 'priorityId',
  title: 'Priority',
  instances: [
    { text: 'NUEVO PEDIDO', id: "En Transito", color: blue },
    { text: 'PREPARANDO', id: "Preparando", color: orange },
    { text: 'COMPLETADO', id: "Completado", color: green }
  ],
}];


const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
}));



export default class CalendarTrabajador extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 10,
      endDayHour: 22,
      isNewAppointment: false,
      finalizarData: {}
    };



    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.commitChanges = this.commitChanges.bind(this);


  }
  setFinalizarData(saveData) {
    this.setState({ finalizarData: saveData })
  }
  Header = (({
    children, appointmentData, ...restProps
  }) => (
    <StyledAppointmentTooltipHeader
      {...restProps}
      className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
      appointmentData={appointmentData}
    >
      <StyledIconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => this.commitChanges({ changed: true }, appointmentData, "Preparando")}
        className={classes.commandButton}
        size="large"
      >
        <LocalDiningIcon />
      </StyledIconButton>
      <StyledIconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => { this.setFinalizarData(appointmentData); this.toggleConfirmationVisible() }}
        className={classes.commandButton}
        size="large"
      >
        <CheckIcon />
      </StyledIconButton>
    </StyledAppointmentTooltipHeader>
  ));
  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
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

  commitChanges({ added, changed, deleted }, saveData = {}, estado = "") {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        console.log("soy el guardado ", saveData);
        saveData.priorityId = estado
        let actualizarData = {}
        actualizarData.direccion_Entrega = saveData.direccion_Entrega;
        actualizarData.id_Pedido = saveData.id_Pedido;
        actualizarData.observaciones_Pedido = saveData.observaciones_Pedido;
        actualizarData.estado = estado;
        actualizarData.fecha_Entrega = saveData.fecha_Entrega;
        actualizarData.datos_cliente = saveData.datos_cliente.split(",")[0];
        actualizarData.datos_encargado = saveData.datos_encargado.split(",")[0];
        actualizarData.pasteles = saveData.pasteles;
        actualizarData.nombresPasteles = saveData.nombresPasteles;
        actualizarData.valor_total = saveData.valor_total;

        fetch(
          "http://localhost:8080/Pedidos/actualizarPedido",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-Request-With": "XMLHttpRequest",
              "Access-Control-Allow-Origin": "origin-list",
            },
            body: JSON.stringify(actualizarData),
          }

        );

        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );

        if (estado == "Completado") {
          this.toggleConfirmationVisible()
        }
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const { currentDate, data, confirmationVisible, startDayHour, endDayHour, finalizarData } =
      this.state;

    return (
      <Paper>
        <Scheduler data={data} locale={"es-ES"}>
          <ViewState currentDate={currentDate} />
          <EditingState onCommitChanges={this.commitChanges} />
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
          <AppointmentTooltip showCloseButton headerComponent={this.Header} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />

          <ViewSwitcher />
          <DragDropProvider />
        </Scheduler>
        <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
          <DialogTitle>Finalizar Pedido</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que desea finalizar este pedido?
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
              onClick={() => { this.commitChanges({ changed: true }, finalizarData, "Completado"); }}
              color="secondary"
              variant="outlined"
            >
              Finalizar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}
