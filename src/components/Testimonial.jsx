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
        productService.getProducts().then((data) => setProducts(data.slice(0, 9)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const productTemplate = (client) => {
        return (
            <div class="item">
                <div class="testimonial-quote-wrap">
                    <div class="media author-info mb-3">
                        <div class="author-img mr-3">
                            <img src="images/reseñas/anamaria.jpg" alt="client" class="img-fluid" />
                        </div>
                        <div class="media-body text-white">
                            <h5 class="mb-0 text-white mt-4">Ana Maria</h5>
                        </div>
                        <i class="fas fa-quote-right text-white"></i>
                    </div>
                    <div class="client-say text-white pt-5">
                        <p>"Me encanta la forma en la que trabajan, desde el momento en que agendo una cita son muy amables y son muy flexibles en el precio. Muy buenos trabajadores y muy confiables a la hora de acerlos entrar a mi casa. Excelente servicio! :)"</p>
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
                        autoplayInterval={2000}
                        itemTemplate={productTemplate}
                    />
                </div>
            </div>
        </div>

    );
};
