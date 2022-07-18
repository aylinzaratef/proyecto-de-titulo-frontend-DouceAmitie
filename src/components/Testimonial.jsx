import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { ProductService } from "../components/ProductService";

export const Testimonial = () => {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: "1024px",
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: "600px",
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: "480px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService.getTestimonios().then((data) => setProducts(data.slice(0, 9)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const productTemplate = (client) => {
        return (
            <div class="item">
                <div class="testimonial-quote-wrap">
                    <div class="media author-info mb-3">
                        <div class="author-img mr-3">
                            <img src={client.image} alt="client" class="img-fluid" />
                        </div>
                        <div class="media-body text-white">
                            <h5 class="mb-0 text-white mt-4">{client.nombre}</h5>
                        </div>
                        <i class="fas fa-quote-right text-white"></i>
                    </div>
                    <div class="client-say text-white pt-5">
                        <p>{client.comentario}</p>
                    </div>
                </div>
            </div>

        );
    };

    return (
        <div class="testimonial-content-wrap">
            <div class="owl-carousel owl-theme client-testimonial-1 dot-indicator testimonial-shape">
                <div className="carousel-demo">
                    <Carousel
                        value={products}
                        numVisible={1}
                        numScroll={1}
                        responsiveOptions={responsiveOptions}
                        className="custom-carousel"
                        circular
                        autoplayInterval={5000}
                        itemTemplate={productTemplate}
                    />
                </div>
            </div>
        </div>

    );
};
