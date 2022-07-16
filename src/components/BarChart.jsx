import { DataObjectSharp } from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import clsx from "clsx";
import { useMemo } from "react";
import { Bar, Chart } from "react-chartjs-2";

// Funciones de Conversion de Fechas y Sumas de Totales Mensuales

function obtenerMesByFecha(fecha) {
  var date = new Date(fecha);
  var mes = date.getMonth();

  return mes + 1;
}

function obtenerYearByFecha(fecha) {
  var date = new Date(fecha);
  var anio = date.getFullYear();
  return anio;
}

function obtenerGastos() {

  return fetch('http://localhost:8080/Estadisticas/getGastos')
    .then((response) => {
      return response.json().then((data) => {
        return data;
      }).catch((err) => {
        console.log(err);
      })
    });
}

function obtenerGanancias() {

  return fetch('http://localhost:8080/Estadisticas/getGanancias')
    .then((response) => {
      return response.json().then((data) => {
        return data;
      }).catch((err) => {
        console.log(err);
      })
    });
}

function arregloGastos(gastos) {

  //Inicializamos los gastos Por Mes
  let gastoEne = 0; let gastoFeb = 0; let gastoMar = 0; let gastoAbr = 0; let gastoMay = 0; let gastoJun = 0; let gastoJul = 0;
  let gastoAgo = 0; let gastoSep = 0; let gastoOct = 0; let gastoNov = 0; let gastoDic = 0;

  for (let i = 0; i < gastos.length; i++) {
    switch (obtenerMesByFecha(gastos[i].fechaGasto)) {
      case 1:
        gastoEne += gastos[i].gastoDiario;
        break;
      case 2:
        gastoFeb += gastos[i].gastoDiario;
        break;
      case 3:
        gastoMar += gastos[i].gastoDiario;
        break;
      case 4:
        gastoAbr += gastos[i].gastoDiario;
        break;
      case 5:
        gastoMay += gastos[i].gastoDiario;
        break;
      case 6:
        gastoJun += gastos[i].gastoDiario;
      case 7:
        gastoJul += gastos[i].gastoDiario;
        break;
      case 8:
        gastoAgo += gastos[i].gastoDiario;
        break;
      case 9:
        gastoSep += gastos[i].gastoDiario;
        break;
      case 10:
        gastoOct += gastos[i].gastoDiario;
        break;
      case 11:
        gastoNov += gastos[i].gastoDiario;
        break;
      case 12:
        gastoDic += gastos[i].gastoDiario;
        break;
      default:
        0
        break;
    }
  }

  var totales = [gastoEne, gastoFeb, gastoMar, gastoAbr, gastoMay, gastoJun, gastoJul, gastoAgo, gastoSep, gastoOct, gastoNov, gastoDic];
  return totales;
}

function arregloGanancias(ganancias) {
  //Inicializamos los gastos Por Mes
  let gastoEne = 0; let gastoFeb = 0; let gastoMar = 0; let gastoAbr = 0; let gastoMay = 0; let gastoJun = 0; let gastoJul = 0;
  let gastoAgo = 0; let gastoSep = 0; let gastoOct = 0; let gastoNov = 0; let gastoDic = 0;

  for (let i = 0; i < ganancias.length; i++) {
    switch (obtenerMesByFecha(ganancias[i].fechaGanancia)) {
      case 1:
        gastoEne += ganancias[i].gananciaDiaria;
        break;
      case 2:
        gastoFeb += ganancias[i].gananciaDiaria;
        break;
      case 3:
        gastoMar += ganancias[i].gananciaDiaria;
        break;
      case 4:
        gastoAbr += ganancias[i].gananciaDiaria;
        break;
      case 5:
        gastoMay += ganancias[i].gananciaDiaria;
        break;
      case 6:
        gastoJun += ganancias[i].gananciaDiaria;
      case 7:
        gastoJul += ganancias[i].gananciaDiaria;
        break;
      case 8:
        gastoAgo += ganancias[i].gananciaDiaria;
        break;
      case 9:
        gastoSep += ganancias[i].gananciaDiaria;
        break;
      case 10:
        gastoOct += ganancias[i].gananciaDiaria;
        break;
      case 11:
        gastoNov += ganancias[i].gananciaDiaria;
        break;
      case 12:
        gastoDic += ganancias[i].gananciaDiaria;
        break;
      default:
        0
        break;
    }
  }

  var totales = [gastoEne, gastoFeb, gastoMar, gastoAbr, gastoMay, gastoJun, gastoJul, gastoAgo, gastoSep, gastoOct, gastoNov, gastoDic];
  return totales;
}


// Datos en Json
var gastos = await obtenerGastos();
var ganancias = await obtenerGanancias();


//Declaramos el CHART y sus Configuraciones
var scores = arregloGastos(gastos); /*Gastos */
const scores2 = arregloGanancias(ganancias) /*Ganancias*/


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);



const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const options = {
  maintainAspectRatio: false,
  fill: true,
  indexAxis: 'y',
  scales: {
    y: {
      grid: {
        display: true,
      },
      min: 0,
    },
    x: {
      grid: {
        display: false,
      },
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};


export const BarChart = () => {
  obtenerGanancias();
  const data = useMemo(function () {
    return {
      datasets: [
        {
          barPercentage: 1,

          order: 2,
          label: "Gastos",
          tension: 0.1,
          data: scores,
          borderColor: "rgb(216, 51, 15)",
          backgroundColor: "rgb(216, 51, 15,0.3)",
          borderWidth: 1.5,
          borderRadius: 4
        },
        {
          barPercentage: 1,
          label: "Ganancias",
          tension: 0.3,
          data: scores2,
          borderColor: "rgb(7, 211, 60 )",
          backgroundColor: "rgb(7, 211, 60 ,0.3)",
          borderWidth: 1.5,
          borderRadius: 4

        },
      ],
      labels,
    };
  }, []);

  return (
    <div className="chart-container pt-5">
      <Bar data={data} options={options} />
    </div>
  );
};
