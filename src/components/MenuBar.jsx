
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { authContext } from '../context/contextUser'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const MenuBar = () => {
    const { currentUser, setCurrentUser } = useContext(authContext)
    const navigate = useNavigate()
    var items = []
    if (currentUser.perfil == "admin") {
        items = [
            {
                label: 'Calendario',
                icon: 'pi pi-fw pi-calendar-plus',
                command: (event) => {
                    navigate('/home');
                }

            },
            {
                label: 'Estadísticas',
                icon: 'pi pi-fw pi-chart-line',
                command: (event) => {
                    navigate('/statistics');
                }
            },
            {
                label: 'Recetario',
                icon: 'pi pi-fw pi-book',
                command: (event) => {
                    navigate('/book');
                }
            },
            {
                label: 'Trabajadores',
                icon: 'pi pi-fw pi-users',
                className: 'active',
                command: (event) => {
                    navigate('/employees');
                }
            },
            {
                label: 'Caja',
                icon: 'pi pi-fw pi-dollar',
                command: (event) => {
                    navigate('/box');
                }
            },
        ];
    } else {
        items = [
            {
                label: 'Calendario',
                icon: 'pi pi-fw pi-calendar-plus',
                command: (event) => {
                    navigate('/home');
                }
            },
            {
                label: 'Recetario',
                icon: 'pi pi-fw pi-book',
                command: (event) => {
                    navigate('/book');
                }
            }
        ];
    }




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
