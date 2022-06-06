import CalendarTrabajador from "../components/CalendarTrabajador";
import { MenuBar } from "../components/MenuBar";

export const HomeTrabajador = () => {
  return (
    <div>
      <MenuBar />
      <div className="pt-3 pt-lg-0">
        <img
          src={`images/logo.png`}
          className="img-calendario d-none d-lg-block d-xl-block"
        />
        <CalendarTrabajador />
      </div>
    </div>
  );
};
