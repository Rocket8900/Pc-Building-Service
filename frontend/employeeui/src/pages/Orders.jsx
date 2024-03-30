import React, { useState, useEffect } from 'react';
import {getOrdersAPI} from '../api/order.api'
import OrdersGroup from '../components/orders/OrdersGroup';
import Layout from '../layout/Layout';

function Orders() {

    const [orders, setorders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const ordersData = await getOrdersAPI(); 
            console.log(ordersData, "here it is")
            setorders(ordersData.data.orders); 
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
        fetchOrders(); 
      }, []);

      console.log(orders)

    return (
      <Layout>
        <div className="">
            <OrdersGroup orders={orders}></OrdersGroup>
        </div>
        </Layout>
    );
}

export default Orders;