import { useEffect } from "react";
import ProductCard from "../ProductCard";
import '../Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../../actions/productActions";

const Home = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products = [], error } = productList; // Default products to empty array

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div className="container">
            <h1 className="home-title">Latest Products</h1>
            
            {loading ? (
                <div>Loading products...</div>
            ) : error ? (
                <div style={{ color: 'red' }}>Error: {error}</div>
            ) : (
                <div className="vertical-scroll-wrapper">
                    <div className="product-grid vertical-grid">
                        {products.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                product={product} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;