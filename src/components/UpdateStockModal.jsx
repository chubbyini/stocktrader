import React, { useState, useEffect } from 'react';

const UpdateStockModal = ({ isOpen, onClose, onUpdate, item }) => {
  const [quantity, setQuantity] = useState(item?.quantity || '');
  const [price, setPrice] = useState(item?.price || '');

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
      setPrice(item.price);
    }
  }, [item]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedItem = {
      ...item,
      quantity: Number(quantity),
      price: Number(price),
      updatedAt: Date.now(),
    };

    if (updatedItem.quantity < 0 || updatedItem.price < 0) {
      alert('Invalid input');
      return;
    }

    onUpdate(updatedItem);
    onClose(); // Close modal after successful update
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Product</h2>

        <form onSubmit={handleUpdate}>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>

          <label className="block mb-4">
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStockModal;
