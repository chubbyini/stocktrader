import React from 'react';

const LowStockWarning = ({ items }) => {
  const lowStockItems = items.filter(item => item.quantity <= 5);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded mb-4">
      <p className="font-semibold">Low Stock Alert:</p>
      <ul className="list-disc list-inside text-sm">
        {lowStockItems.map((item) => (
          <li key={item.id}>
            <span className="font-medium">{item.name}</span> — {item.quantity} left
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStockWarning;
