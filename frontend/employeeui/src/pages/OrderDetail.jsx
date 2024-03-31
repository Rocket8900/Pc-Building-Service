import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {getOrderByIdAPI} from '../api/order.api'
import Layout from '../layout/Layout';

function OrderDetail() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [searchParam] = useSearchParams();
    const OrderID = searchParam.get('id');

    useEffect(() => {
        const fetchOrderbyID = async () => {
            try {
                const orderData = await getOrderByIdAPI(OrderID);
                setOrderDetails(orderData.data); 
            } catch (error) {
                console.error('Error fetching repairs:', error);
            }
        };
        fetchOrderbyID(); 
    }, [OrderID]);

    return (
        <Layout>
            <div className="">
                <table className="table-auto w-full">
                    <tbody>
                        <tr>
                            <td className='font-bold'>Customer ID</td>
                            <td>{orderDetails.customer_id}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Ordered date</td>
                            <td>{orderDetails.date}</td>
                        </tr>
                        {orderDetails.order_item && orderDetails.order_item.map((order, index) => (
                            <tr key={index}>
                                <td colSpan="2">
                                    <div className="mb-4">
                                        <h3 className="text-md font-semibold mb-2">{order.pc_name}</h3>
                                        <h3 className="text-md font-semibold mb-2">${order.price}</h3>
                                        <ul>
                                            {order.parts.map((part, partIndex) => (
                                                <li key={partIndex} className="flex justify-between">
                                                    <span>{part.parts_name}</span>
                                                    <span>${part.parts_price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default OrderDetail;
