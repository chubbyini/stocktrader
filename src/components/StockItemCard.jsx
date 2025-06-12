import React from 'react';
import { formatCurrency } from '../utils/helpers';

const StockItemCard = ({ item, onEdit, onDelete }) => {
  const { productName, quantity, price, category, createdAt, updatedAt } = item;
  const isLowStock = quantity < 10;

  const showButtons = onEdit && onDelete;

  return (
    <div
      className={`relative bg-white shadow p-4 rounded-lg border ${
        isLowStock ? 'border-red-500' : 'border-gray-200'
      } hover:shadow-md transition`}
    >
      {/* Category Badge */}
      <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
        {category || 'Uncategorized'}
      </span>

      {/* Low Stock Badge */}
      {isLowStock && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
          Low Stock
        </span>
      )}

      <h3 className="text-lg font-semibold mb-2 mt-6">{productName}</h3>

      <p className="text-sm text-gray-600 mb-1">
        Quantity: <span className="font-medium">{quantity}</span>
      </p>
      <p className="text-sm text-gray-600 mb-1">
        Price: <span className="font-medium">{formatCurrency(price)}</span>
      </p>

      {/* Optional log info */}
      <p className="text-xs text-gray-400 mt-2">
        Added: {new Date(createdAt).toLocaleDateString()}
      </p>
      <p className="text-xs text-gray-400">
        Updated: {new Date(updatedAt).toLocaleDateString()}
      </p>

      {/* Buttons shown only if handlers are passed */}
      {showButtons && (
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => onEdit(item)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default StockItemCard;
