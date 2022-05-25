
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

export const MenuBar = () => {
    const items = [
        {
            label: 'Calendario',
            icon: 'pi pi-fw pi-calendar-plus',
            url: '/calendar'

        },
        {
            label: 'Estadísticas',
            icon: 'pi pi-fw pi-chart-line',
            url: '/statistics'
        },
        {
            label: 'Recetario',
            icon: 'pi pi-fw pi-book',
            url: '/book'
        },
        {
            label: 'Trabajadores',
            icon: 'pi pi-fw pi-users',
            className: 'active',
            url: '/employees'
        },
        {
            label: 'Caja',
            icon: 'pi pi-fw pi-dollar',
            url: '/box'
        },
    ];

    const start = <h4 className="font-pastel pt-3">D.A.</h4>;

    return (
        <div className='container-menu'>
            <nav className="navbar navbar-light bg-rosa">
                <div className="container-fluid px-5">
                    <span className="c-blanco">Bienvenid@, Juanita Pérez</span>
                    <div className='d-flex'>
                        <div>

                            <span className='c-blanco'> Administrador</span>
                        </div>
                    </div>
                </div>
            </nav>



            <Menubar model={items} start={start} />

        </div>
    );
}
