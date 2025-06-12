import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

import LowStockWarning from '../components/LowStockWarning';
import AddStockForm from '../components/AddStockForm';
import StockList from '../components/StockList';
import UpdateStockModal from '../components/UpdateStockModal';
import Spinner from '../components/Spinner'; // 👈 replaced Loader

const Dashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  // Real-time fetch
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'stocks'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching stocks:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAdd = async (newItem) => {
    try {
      await addDoc(collection(db, 'stocks'), {
        ...newItem,
        userId: user.uid,
      });
    } catch (err) {
      console.error("Add failed:", err);
      alert("Failed to add item.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await deleteDoc(doc(db, 'stocks', id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete item.");
    }
  };

  const handleEditClick = (item) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const itemRef = doc(db, 'stocks', updatedItem.id);
      await updateDoc(itemRef, {
        quantity: updatedItem.quantity,
        price: updatedItem.price,
        updatedAt: updatedItem.updatedAt,
      });
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update item.");
    }
  };

  if (loading) return <Spinner />; // 👈 updated here

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalValue = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <LowStockWarning items={items} />

      <div className="flex gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow w-1/3">
          <p className="text-sm text-gray-600">Total Quantity</p>
          <p className="text-xl font-semibold">{totalQuantity}</p>
        </div>
        <div className="bg-white p-4 rounded shadow w-1/3">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-xl font-semibold">₦{totalValue.toLocaleString()}</p>
        </div>
      </div>

      <AddStockForm onAdd={handleAdd} />

      <StockList
        items={items}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      <UpdateStockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={itemToEdit}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Dashboard;
