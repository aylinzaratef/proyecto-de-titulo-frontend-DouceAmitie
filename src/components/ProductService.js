{ /*AQUI SE IMPORTAN LOS DATOS DE LA API PARA QUE SEAN REFLEJADOS EN LAS VISTAS*/ }


export class ProductService {

    getProductosDestacados() {
        return fetch('data/products-small.json').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
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
            newData.telefono = data[key].telefono;
            newData.email = data[key].email;
            newData.direccion = data[key].direccion;
            newData.fechaIngreso = data[key].fechaIngreso;

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
            let nombrePastel = "";
            data[key].nombresPasteles.forEach(pastel => {
                nombrePastel = nombrePastel + pastel + ", ";
            })
            newData.title = "Pedido Nro: " + data[key].id_Pedido + " " + data[key].datos_cliente +
                ", Dirección: " + data[key].direccion_Entrega + ", Productos: " + nombrePastel + " Encargado: "
                + data[key].datos_encargado + ", Valor Total: " + data[key].valor_total;
            newData.priorityId = data[key].estado;
            newData.rutTrabajador = data[key].datos_encargado.split(",")[0];

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
            newData.id = data[key].id_Pastel;


            recetas.push(newData);
        });

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
            newData.valor = data[key].precio;
            pasteles.push(newData); //AGREGA AL ARREGLO

        });

        return pasteles; //RETORNA EN VISTA

    }
}