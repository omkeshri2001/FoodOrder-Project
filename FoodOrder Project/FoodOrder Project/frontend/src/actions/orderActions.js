import {
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_PAYMENT_FAIL,
    CREATE_PAYMENT_REQUEST,
    MY_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
  } from "../constants/orderConstants";
  import axios from "axios";
  export const createOrder = (session_id) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_ORDER_REQUEST,
      });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/v1/eats/orders/new",
        { session_id },
        config
      );
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
    }
  };
  
  export const payment = (items, restaurant) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PAYMENT_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        {
          items,
          restaurant,
        },
        config
      );
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      dispatch({
        type: CREATE_PAYMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //my order
  
  export const myOrders = () => async (dispatch) => {
    try {
      dispatch({
        type: MY_ORDER_REQUEST,
      });
      const { data } = await axios.get("/api/v1/eats/orders/me/myOrders");
      dispatch({
        type: MY_ORDER_SUCCESS,
        payload: data.orders,
      });
    } catch (error) {
      dispatch({
        type: MY_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/eats/orders/${id}`);
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data.order,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //clear errors
  
  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  