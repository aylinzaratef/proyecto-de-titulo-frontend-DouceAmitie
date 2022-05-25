
import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.css";                  //core css
import "primeicons/primeicons.css";


export const Header = () => {
    return (
        <div className="">
            <nav class="navbar navbar-light bg-rosa">
                <div class="container-fluid px-5">
                    <span class="c-blanco">Douce Amitié</span>
                    <div className='d-flex'>
                        <div>
                            <a className='c-blanco' href='/login'> <i className='pi pi-key'></i> </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
