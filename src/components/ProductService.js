{ /*AQUI SE IMPORTAN LOS DATOS DE LA API*/ }


export class ProductService {

    getProductosDestacados() {
        return fetch('data/products-small.json').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
        return fetch('data/products.json').then(res => res.json()).then(d => d.data);
    }

    getEmployees = async () => {

        var trabajadores = []; //OBJETO


        let data = await fetch('https://springgcp2-353703.rj.r.appspot.com/Registro/getAll', {
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
            newData.telefono = " ";
            newData.email = " ";
            newData.direccion = "";
            newData.fechacontrata = data[key].fechaIngreso;

            trabajadores.push(newData);
        });

        return trabajadores;

    }
}