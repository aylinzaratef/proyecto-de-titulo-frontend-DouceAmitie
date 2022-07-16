import { MenuBar } from '../components/MenuBar'
import { BarChart2 } from '../components/BarChart2'


export const Stadistic = () => {
    return (
        <div>
            <MenuBar />
            <div className="pt-3 pt-lg-0 mt-3">
                <img
                    src={`images/logo.png`}
                    className="img-calendario d-none d-lg-block d-xl-block"
                />
                <BarChart2 />
            </div>

        </div>
    )
}
