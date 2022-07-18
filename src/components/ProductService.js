{ /*AQUI SE IMPORTAN LOS DATOS DE LA API PARA QUE SEAN REFLEJADOS EN LAS VISTAS*/ }

function obtenerMesByFecha(fecha) {
    var date = new Date(fecha);
    var mes = date.getMonth();
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"
        , "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return mes + 1;
}
function obtenerNombreMes(mes) {
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"
        , "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[parseInt(mes) - 1];
}
export class ProductService {

    getProductosDestacados() {
        return fetch('data/products-small.json').then(res => res.json()).then(d => d.data);
    }

    getTestimonios() {
        return fetch('data/products.json').then(res => res.json()).then(d => d.data);
    }








    getEmployees = async () => {
        var trabajadores = []; //OBJETO QUE RECIBE LOS DATOS DESDE LA URL API 
        let data = await fetch('http://localhost:8080/Pasteleros/getAll', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "origin-list"
            }
        }).then(data => {
            return data.json();
        });

        Object.keys(data).forEach(function (key) {
            let newData = {};
            newData.rut = data[key].rut;
            newData.nombre = data[key].nombre + " " + data[key].apellidoPaterno + " " + data[key].apellidoMaterno;
            newData.cargo = data[key].permisos == 1 ? "Administrador" : "Pastelero";
            newData.permisos = String(data[key].permisos);
            newData.telefono = data[key].telefono;
            newData.email = data[key].email;
            newData.direccion = data[key].direccion;
            newData.fechaIngreso = data[key].fechaIngreso;
            newData.nombres = data[key].nombre;
            newData.primerApellido = data[key].apellidoPaterno;
            newData.segundoApellido = data[key].apellidoMaterno;
            newData.password = data[key].password;
            trabajadores.push(newData);


        });

        return trabajadores;

    }

    getPedidos = async () => {
        var pedidos = []; //OBJETO
        let data = await fetch('http://localhost:8080/Pedidos/getPedidos', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "origin-list"
            }
        }).then(data => {
            return data.json();
        });
        Object.keys(data).forEach(function (key) {

            let newData = {};
            newData.startDate = data[key].fecha_Entrega;
            let endDate = data[key].fecha_Entrega.split("T");
            let fecha = endDate[0] + "T";
            let horas = endDate[1].split(":");
            let hora = parseInt(horas[0]) + 1 //AQUI SE SUMAN LAS HORAS PARA HACER MAS GRANDE EL CUADRADITO
            newData.endDate = fecha + hora + ":" + horas[1] + ":" + horas[2];
            for (let index = 0; index < data[key].pasteles.length; index++) {
                data[key].nombresPasteles[index] = data[key].nombresPasteles[index] + "(x" + data[key].pasteles[index].cantidad + ")";
            }
            newData.title = data[key].nombresPasteles.join(", ");
            newData.priorityId = data[key].estado;
            newData.rutTrabajador = data[key].datos_encargado.split(",")[0];
            newData.datos_encargado = data[key].datos_encargado;
            newData.datos_cliente = data[key].datos_cliente;
            newData.id_Pedido = data[key].id_Pedido;
            newData.observaciones_Pedido = data[key].observaciones_Pedido;
            newData.fecha_Entrega = data[key].fecha_Entrega;
            newData.nombresPasteles = data[key].nombresPasteles;
            newData.valor_total = data[key].valor_total;
            newData.pasteles = data[key].pasteles;
            newData.direccion_Entrega = data[key].direccion_Entrega;
            pedidos.push(newData);
        });
        return pedidos;
    }


    getRecetas = async () => {
        var recetas = []; //OBJETO
        let data = await fetch('http://localhost:8080/Recetas/getRecetas', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "origin-list"
            }
        }).then(data => {
            return data.json();
        });

        Object.keys(data).forEach(function (key) {
            let newData = {};
            newData.imagen = data[key].imagen;
            newData.nombre = data[key].nombre;
            newData.categoria = data[key].categoria;
            newData.ingredientes = data[key].ingredientes;
            newData.preparacion = data[key].preparacion;
            newData.video = data[key].urlVideo;
            newData.id_Pastel = data[key].id_Pastel;
            newData.descripcion = data[key].descripcion;
            newData.idReceta = data[key].idReceta;
            console.log(data);
            recetas.push(newData);
        });

        return recetas;

    }


    getRecetasCarrusel = async () => {
        var recetas = []; //OBJETO
        let data = await fetch('http://localhost:8080/Recetas/getRecetas', {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "origin-list"
            }
        }).then(data => {
            return data.json();
        });
        let pasteles = await fetch('http://localhost:8080/Recetas/getPasteles', {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "origin-list"
            }
        }).then(data => {
            return data.json();
        });
        console.log("pasteles", pasteles);
        Object.keys(data).forEach(function (key) {
            let newData = {};

            newData.imagen = data[key].imagen;
            newData.nombre = data[key].nombre;
            newData.categoria = data[key].categoria;
            newData.ingredientes = data[key].ingredientes;
            newData.preparacion = data[key].preparacion;
            newData.video = data[key].urlVideo;
            newData.id_Pastel = data[key].id_Pastel;
            newData.descripcion = pasteles[key].descripcion;
            newData.idReceta = data[key].idReceta;
            recetas.push(newData);
        });
        console.log(recetas);
        return recetas;

    }


    getClientes = async () => {

        var cliente = []; //OBJETO QUE RECIBE LOS DATOS DESDE LA URL API 


        let data = await fetch('http://localhost:8080/Pedidos/getClientes', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "origin-list"
            }
        }).then(data => {
            return data.json();
        });

        Object.keys(data).forEach(function (key) {
            let newData = {};
            newData.rut = data[key].rut;
            newData.nombre = data[key].nombre + " " + data[key].apellidoPaterno + " " + data[key].apellidoMaterno;
            newData.telefono = data[key].telefono;
            newData.email = data[key].email;
            cliente.push(newData);
        });

        return cliente;

    }


    getPastel = async () => {
        var pasteles = []; //ARREGLO BASICO
        let data = await fetch('http://localhost:8080/Recetas/getPasteles', { //OBTIENE INFORMACION DESDE BACK 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "origin-list"
            }
        }).then(data => { //ASIGNA VALORES QUE ESTAN EN EL PARENTESIS CON DATA CURSIVA
            return data.json(); // TRANSFORMA LOS DATOS DEL BACK EN JSON Y ASIGNA A DATA CURSIVA UWU 
        });

        Object.keys(data).forEach(function (key) {  //BACK RETORNA JSON ESTA ES LA MANERA DE RECORRERLO
            let newData = {};  //INICIALIZANDO OBJETO
            newData.idPastel = data[key].idPastel; //A NEWDATA  SE LE CREA UN INDICE (QUE EN ESTE CASO ES IDPASTEL) Y A ESE INDICE SE LE ASIGNA UN VALOR QUE VIENE DESDE EL BACK EN ESTE CASO ES DATA[KEY]
            newData.nombre = data[key].nombre;
            newData.precio = data[key].precio;
            newData.descripcion = data[key].descripcion;
            pasteles.push(newData); //AGREGA AL ARREGLO
        });
        return pasteles; //RETORNA EN VISTA
    }
    getLogin = async (rut, password) => {
        let data = await fetch('http://localhost:8080/Login/login', { //OBTIENE INFORMACION DESDE BACK 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "origin-list"
            },
            body: JSON.stringify({ rut: rut, password: password })

        }).then(data => { //ASIGNA VALORES QUE ESTAN EN EL PARENTESIS CON DATA CURSIVA
            return data.json(); // TRANSFORMA LOS DATOS DEL BACK EN JSON Y ASIGNA A DATA CURSIVA UWU 
        });
        return data; //RETORNA EN VISTA

    }



    getPedidosTrabajador = async () => {
        var pedidos = []; //OBJETO
        let data = await fetch('http://localhost:8080/Pedidos/getPedidos', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "origin-list"
            }
        }).then(data => {
            return data.json();
        });
        Object.keys(data).forEach(function (key) {
            let newData = data[key];
            newData.startDate = data[key].fecha_Entrega;
            let endDate = data[key].fecha_Entrega.split("T");
            let fecha = endDate[0] + "T";
            let horas = endDate[1].split(":");
            let hora = parseInt(horas[0]) + 1 //AQUI SE SUMAN LAS HORAS PARA HACER MAS GRANDE EL CUADRADITO
            newData.endDate = fecha + hora + ":" + horas[1] + ":" + horas[2];
            for (let index = 0; index < data[key].pasteles.length; index++) {
                data[key].nombresPasteles[index] = data[key].nombresPasteles[index] + "(x" + data[key].pasteles[index].cantidad + ")";
            }
            newData.title = data[key].nombresPasteles.join(", ");
            newData.priorityId = data[key].estado;
            newData.rutTrabajador = data[key].datos_encargado.split(",")[0];
            newData.observaciones_Pedido = data[key].observaciones_Pedido;


            pedidos.push(newData);


        });


        return pedidos;

    }

    getGanancias = async () => {
        let dataMaxima = [];
        let dataMaximaAnio = [];
        let anios = { "2018": 0, "2019": 1, "2020": 2, "2021": 3, "2022": 4 };

        for (var i = 0; i < 5; i++) {
            dataMaximaAnio[i] = 0;
        }
        let data = await fetch('http://localhost:8080/Estadisticas/getGanancias')
            .then((response) => {
                return response.json().then((data) => {
                    return data;
                }).catch((err) => {
                    console.log(err);
                })
            });

        Object.keys(data).forEach(function (key) {
            let fecha = data[key].fechaGanancia.split("-");
            dataMaximaAnio[anios[fecha[0]]] = dataMaximaAnio[anios[fecha[0]]] == undefined ? dataMaximaAnio[anios[fecha[0]]] : dataMaximaAnio[anios[fecha[0]]] + data[key].gananciaDiaria;
            dataMaxima[fecha[0]] = dataMaxima[fecha[0]] != undefined ? dataMaxima[fecha[0]] : [0, 0, 0, 0, 0, 0, 0
                , 0, 0, 0, 0, 0];
            dataMaxima[fecha[0]][parseInt(fecha[1]) - 1] = dataMaxima[fecha[0]][parseInt(fecha[1]) - 1] != undefined ? dataMaxima[fecha[0]][parseInt(fecha[1]) - 1] + data[key].gananciaDiaria : data[key].gananciaDiaria;
        });

        return { dataMaxima: dataMaxima, dataMaximaAnio: dataMaximaAnio };
    }
    getGastos = async () => {
        let dataMaxima = [];
        let dataMaximaAnio = [];
        let anios = { "2018": 0, "2019": 1, "2020": 2, "2021": 3, "2022": 4 };

        for (var i = 0; i < 5; i++) {
            dataMaximaAnio[i] = 0;
        }
        let data = await fetch('http://localhost:8080/Estadisticas/getGastos')
            .then((response) => {
                return response.json().then((data) => {
                    return data;
                }).catch((err) => {
                    console.log(err);
                })
            });

        Object.keys(data).forEach(function (key) {
            let fecha = data[key].fechaGasto.split("-");
            dataMaximaAnio[anios[fecha[0]]] = dataMaximaAnio[anios[fecha[0]]] == undefined ? dataMaximaAnio[anios[fecha[0]]] : dataMaximaAnio[anios[fecha[0]]] + data[key].gastoDiario;
            dataMaxima[fecha[0]] = dataMaxima[fecha[0]] != undefined ? dataMaxima[fecha[0]] : [0, 0, 0, 0, 0, 0, 0
                , 0, 0, 0, 0, 0];
            dataMaxima[fecha[0]][parseInt(fecha[1]) - 1] = dataMaxima[fecha[0]][parseInt(fecha[1]) - 1] != undefined ? dataMaxima[fecha[0]][parseInt(fecha[1]) - 1] + data[key].gastoDiario : data[key].gastoDiario;
        });

        return { dataMaxima: dataMaxima, dataMaximaAnio: dataMaximaAnio };
    }
}