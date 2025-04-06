import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import EditProductModal from "./EditProductModal";


const ProductGrid = ({ products, setProducts, onEdit }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEdit = (index) => setEditIndex(index);
  
    const handleSaveEdit = (updatedProduct) => {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = updatedProduct;
      setProducts(updatedProducts);
      setEditIndex(null);
    };

  const handleDelete = (index) => {
    setProductToDelete(index);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    if (productToDelete !== null) {
      const updatedProducts = products.filter((_, idx) => idx !== productToDelete);
      setProducts(updatedProducts);
      setShowConfirmDelete(false);
      setProductToDelete(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No products found.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                ₹{product.price}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEdit(index)} 
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(index)} 
                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editIndex !== null && (
        <EditProductModal
          product={products[editIndex]}
          onSave={handleSaveEdit}
          onClose={() => setEditIndex(null)}
        />
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-30">
          <div className="bg-white p-6 rounded w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
