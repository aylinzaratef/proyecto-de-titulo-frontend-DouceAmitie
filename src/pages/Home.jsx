import Calendar from "../components/Calendar";
import { Header } from "../components/Header";
import { MenuBar } from "../components/MenuBar";
export const Home = () => {
    return (
        <div>
            <MenuBar />
            <div className="pt-3 pt-lg-0">
                <Calendar />
            </div>
        </div>
    );
};
