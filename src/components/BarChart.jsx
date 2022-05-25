
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";


ChartJS.register(
    CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler
)

const scores = [6]  /*Gastos */
const scores2 = [5] /*Ganancias*/
const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const options = {
    maintainAspectRatio: false,
    fill: true,
    scales: {
        y: {

            grid: {
                display: true
            },
            min: 0
        },
        x: {
            grid: {
                display: false
            },
            min: 0
        }
    },
    plugins: {
        legend: {
            display: true
        }
    }
}


export const BarChart = () => {

    const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: "Gastos",
                    tension: 0.3,
                    data: scores,
                    borderColor: "rgb(75,192,192)",
                    backgroundColor: "rgb(75,192,192,0.3)",
                    pointBackgroundColor: "yellow"
                },
                {
                    label: "Ganancias",
                    tension: 0.3,
                    data: scores2,
                    borderColor: "rgb(75,192,192)",
                    backgroundColor: "rgb(75,192,192,0.3)",
                    pointBackgroundColor: "yellow"
                }
            ], labels
        }
    }, [])

    return (
        <div className="chart-container pt-5">
            <Bar data={data} options={options} />
        </div>
    );
};