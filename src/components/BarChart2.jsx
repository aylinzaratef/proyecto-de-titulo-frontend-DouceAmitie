import React, { useState, useEffect, useRef } from "react";
import { Chart } from 'primereact/chart';
import { ProductService } from "../components/ProductService";
const productService = new ProductService();
const p = Promise.resolve(productService.getGanancias());
var ganancias = [];
var datosGanancia = [];
var datosGananciaAnio = [];
try {
    ganancias = await p;
    if (ganancias) {
        datosGanancia = ganancias.dataMaxima[2022]
        datosGananciaAnio = ganancias.dataMaximaAnio;
    }
} catch (err) {
    console.log(err);
}
p;
const q = Promise.resolve(productService.getGastos());
var gastos = [];
var datosGastos = [];
var datosGastosAnio = [];
try {
    gastos = await q;
    if (gastos) {
        datosGastos = gastos.dataMaxima[2022]
        datosGastosAnio = gastos.dataMaximaAnio;
        console.log(datosGastosAnio)
    }
    console.log(gastos);
} catch (err) {
    console.log(err);
}
q;

export const BarChart2 = () => {
    const [totalesGastos, setTotalesGastos] = useState(datosGastos);
    const [totalesGanancias, setTotalesGanancias] = useState(datosGanancia);
    const [totalesGananciasAnio, setTotalesGananciasAnio] = useState(datosGananciaAnio);
    const [totalesGastosAnio, setTotalesGastosAnio] = useState(datosGastosAnio);
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
    const [basicData, setBasicData] = useState({});

    useEffect(() => {
        setBasicData({
            labels: labels,
            datasets: [
                {
                    label: 'Gastos',
                    backgroundColor: 'rgba(255, 99, 132)',
                    borderColor: 'rgb(204, 22, 61 )',
                    data: totalesGastos,
                    borderWidth: 2,
                    innerHeight: 6

                },
                {
                    label: 'Ganancias',
                    backgroundColor: 'rgba(75, 192, 192)',
                    borderColor: 'rgb(94, 139, 139)',
                    data: totalesGanancias,
                    borderWidth: 2
                }
            ]
        });
    }, []);
    const changeChar = (e) => {
        console.log(totalesGastosAnio)
        if (e.target.value == 2) {
            setBasicData({
                labels: [2018, 2019, 2020, 2021, 2022],
                datasets: [
                    {
                        label: 'Gastos',
                        backgroundColor: 'rgba(255, 99, 132)',
                        borderColor: 'rgb(204, 22, 61 )',
                        data: totalesGastosAnio,
                        borderWidth: 2,
                        innerHeight: 6

                    },
                    {
                        label: 'Ganancias',
                        backgroundColor: 'rgba(75, 192, 192)',
                        borderColor: 'rgb(94, 139, 139)',
                        data: totalesGananciasAnio,
                        borderWidth: 2
                    }
                ]
            });
        } else {
            setBasicData({
                labels: labels,
                datasets: [
                    {
                        label: 'Gastos',
                        backgroundColor: 'rgba(255, 99, 132)',
                        borderColor: 'rgb(204, 22, 61 )',
                        data: totalesGastos,
                        borderWidth: 2,
                        innerHeight: 6

                    },
                    {
                        label: 'Ganancias',
                        backgroundColor: 'rgba(75, 192, 192)',
                        borderColor: 'rgb(94, 139, 139)',
                        data: totalesGanancias,
                        borderWidth: 2
                    }
                ]
            });
        }

    }

    const getLightTheme = () => {
        let horizontalOptions = {
            indexAxis: 'x',
            maintainAspectRatio: false,
            aspectRatio: .4,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#dd1d5f'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#dd1d5f'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
        return {
            horizontalOptions
        }
    }

    const { horizontalOptions } = getLightTheme();

    return (
        <div>
            <div className="row">
                <div className="col-3 mt-3 mx-5">
                    <select className="form-select input-form" onChange={(e) => changeChar(e)}>
                        <option value={1}>Mensuales</option>
                        <option value={2}>Anuales</option>
                    </select>

                </div>

            </div>
            <div className="card mt-3 mx-5">
                <Chart type="bar" data={basicData} options={horizontalOptions} />
            </div>
        </div>
    )
}
