{ /*AQUI SE IMPORTAN LOS DATOS DE LA API*/ }


export class ProductService {

    getProductosDestacados() {
        return fetch('data/products-small.json').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
        return fetch('data/products.json').then(res => res.json()).then(d => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('data/products-orders-small.json').then(res => res.json()).then(d => d.data);
    }

    getEmployees() {
        return fetch('data/employees.json').then(res => res.json()).then(d => d.data)
    }
}