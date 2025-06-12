import React, { useState } from 'react';

const AddStockForm = ({ onAdd }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      productName: productName.trim(),
      quantity: Number(quantity),
      price: Number(price),
      category: category.trim(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Optional: Add basic validation here
    if (!newItem.productName || !newItem.category || newItem.quantity < 0 || newItem.price < 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    onAdd(newItem);

    // Reset form
    setProductName('');
    setQuantity('');
    setPrice('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Add New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddStockForm;
