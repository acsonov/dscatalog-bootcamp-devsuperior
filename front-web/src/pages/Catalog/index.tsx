import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from '../../core/types/Product';
import { makeRequest } from '../../core/utils/resquest';
import ProductCard from './components/ProductCard';
import './styles.scss';


const Catalog = () => {

    const [productsReponse, setProductsResponse] = useState<ProductsResponse>();
    console.log(productsReponse);

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 10
        }
        makeRequest({ url: '/products' })
            .then(response => setProductsResponse(response.data));

    }, []);


    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de Produtos</h1>
            <div className="catalog-products">
                {productsReponse?.content.map(product => (
                    <Link to = {`/products/${product.id}`} key = {product.id}>
                         <ProductCard product = {product} /> 
                    </Link>
                ))}
            </div>
        </div>

    );

};
export default Catalog;
