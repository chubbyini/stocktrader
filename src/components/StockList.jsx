import React from 'react';
import StockItemCard from './StockItemCard';

const StockList = ({ items, onEdit, onDelete }) => {
  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No stock items available. Add new items to get started.
      </p>
    );
  }

  // Optional: sort by most recently updated
  const sortedItems = [...items].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {sortedItems.map(item => (
        <StockItemCard
          key={item.id}
          item={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
};

export default StockList;
