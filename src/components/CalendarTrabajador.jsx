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
const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
  [`&.${classes.firstRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  [`&.${classes.secondRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  [`&.${classes.thirdRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  [`&.${classes.header}`]: {
    height: '260px',
    backgroundSize: 'cover',
  },
}));
const resources = [{
  fieldName: 'priorityId',
  title: 'Priority',
  instances: [
    { text: 'EN TRÁNSITO', id: "En Transito", color: blue },
    { text: 'PREPARANDO', id: "Preparando", color: orange },
    { text: 'COMPLETADO', id: "Completado", color: green }
  ],
}];

const Header = (({
  children, appointmentData, ...restProps
}) => (
  <StyledAppointmentTooltipHeader
    {...restProps}
    className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
    appointmentData={appointmentData}
  >
    <StyledIconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => alert(JSON.stringify(appointmentData))}
      className={classes.commandButton}
      size="large"
    >
      <MoreIcon />
    </StyledIconButton>
  </StyledAppointmentTooltipHeader>
));


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
    };


    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
  }

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
    const { currentDate, data, confirmationVisible, startDayHour, endDayHour } =
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
          <AppointmentTooltip showCloseButton showDeleteButton />
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
              onClick={this.commitDeletedAppointment}
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
