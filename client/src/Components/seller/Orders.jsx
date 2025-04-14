import React from 'react';
import { motion } from 'framer-motion';
import axios from '../selleraxios';
import toast from 'react-hot-toast';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const Orders = ({ orders, setOrders, loading }) => {
  const statusOptions = [
    'order confirmed',
    'processing',
    'shipped',
    'out for delivery',
    'delivered',
    'cancelled',
    'returned',
  ];

  const getNextStatus = (currentStatus) => {
    const currentIndex = statusOptions.indexOf(currentStatus);
    if (currentIndex === -1 || currentStatus === 'cancelled' || currentStatus === 'returned') {
      return currentStatus;
    }
    return statusOptions[Math.min(currentIndex + 1, statusOptions.length - 3)];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'order confirmed':
        return 'text-blue-600';
      case 'processing':
        return 'text-indigo-600';
      case 'shipped':
        return 'text-purple-600';
      case 'out for delivery':
        return 'text-orange-600';
      case 'delivered':
        return 'text-emerald-600';
      case 'cancelled':
        return 'text-red-600';
      case 'returned':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleUpdateOrderStatus = async (id, currentStatus) => {
    const newStatus = getNextStatus(currentStatus);
    if (newStatus === currentStatus) {
      toast.error('No further status updates available');
      return;
    }

    try {
      const response = await axios.put(`/api/seller/auth/orders/${id}`, { status: newStatus });
      setOrders(orders.map((o) => (o._id === id ? response.data.data.order : o)));
      toast.success(`Order updated to "${newStatus}"`);
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
      {loading ? (
        <div className="text-center text-gray-600 animate-pulse text-lg">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No orders found</div>
      ) : (
        orders.map((order) => (
          <motion.div
            key={order._id}
            variants={fadeIn}
            className="bg-blue-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Order #{order.orderId.slice(-6)}</h3>
                <p className="text-sm text-gray-600">
                  Total: ₹{order.total.toFixed(2)} |{' '}
                  <span className={getStatusColor(order.status)}>{order.status}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Payment: {order.paymentMethod} (
                  {order.onlineAmount > 0 && `Online: ₹${order.onlineAmount.toFixed(2)}`}
                  {order.onlineAmount > 0 && order.codAmount > 0 && ' + '}
                  {order.codAmount > 0 && `COD: ₹${order.codAmount.toFixed(2)}`})
                </p>
                <p className="text-sm text-gray-600">Shipping: ₹{order.shipping.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Items: {order.items.length}</p>
                <p className="text-sm text-gray-600">
                  Payment Status:{' '}
                  <span
                    className={
                      order.paymentStatus === 'completed'
                        ? 'text-emerald-600'
                        : order.paymentStatus === 'pending'
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleUpdateOrderStatus(order._id, order.status)}
                className={`px-4 py-2 text-sm rounded-xl text-white shadow-sm transition-all duration-200 ${
                  order.status === 'delivered' || order.status === 'cancelled' || order.status === 'returned'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={order.status === 'delivered' || order.status === 'cancelled' || order.status === 'returned'}
                aria-label={`Update order status to ${getNextStatus(order.status)}`}
              >
                {order.status === 'delivered'
                  ? 'Delivered'
                  : order.status === 'cancelled'
                  ? 'Cancelled'
                  : order.status === 'returned'
                  ? 'Returned'
                  : `Mark as ${getNextStatus(order.status)}`}
              </motion.button>
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-700">Items:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} (Qty: {item.quantity}, Size: {item.size}, Color: {item.color}, ₹
                    {item.price.toFixed(2)})
                    {item.onlineAmount > 0 && ` [Online: ₹${item.onlineAmount.toFixed(2)}]`}
                    {item.codAmount > 0 && ` [COD: ₹${item.codAmount.toFixed(2)}]`}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default Orders;