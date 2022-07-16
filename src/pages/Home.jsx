import Calendar from "../components/Calendar";
import { MenuBar } from "../components/MenuBar";

export const Home = () => {
  return (
    <div>
      <MenuBar />
      <div className="pt-3 pt-lg-0 todo-rosa mt-3">
        <img
          src={`images/logo.png`}
          className="img-calendario d-none d-lg-block d-xl-block"
        />
        <Calendar />
      </div>
    </div>
  );
};
