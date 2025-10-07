import axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});

        const { data } = await axios.get('https://masterpiece-lsvl.onrender.com/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (err) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: err.response && err.response.data.message ?err.response.data.message: err.message, })
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`https://masterpiece-lsvl.onrender.com/api/products/${id}`);
        console.log("Fetched product:", data); // should log the full product object
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

