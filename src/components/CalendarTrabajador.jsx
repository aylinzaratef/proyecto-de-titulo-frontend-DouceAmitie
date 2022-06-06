import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
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

import { appointments } from "./appointments";

export default class CalendarTrabajador extends React.PureComponent {
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
      startDayHour: 9,
      endDayHour: 19,
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
