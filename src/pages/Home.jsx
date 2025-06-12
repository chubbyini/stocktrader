import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import StockItemCard from '../components/StockItemCard';
import Spinner from '../components/Spinner'; // 👈 replaced Loader

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'stocks'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch public items:", err);
        alert("Something went wrong loading items.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicItems();
  }, []);

  if (loading) return <Spinner />; // 👈 updated here

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Stock</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map(item => (
            <StockItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
