import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import EditProductModal from "./EditProductModal";


const ProductTable = ({ products, setProducts }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...products].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setProducts(sorted);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "⇅";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="mt-4">
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-700 text-white text-sm">
            <tr>
              <th
                className="p-4 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Product Name <span className="ml-1">{getSortIcon("name")}</span>
              </th>
              <th
                className="p-4 text-left cursor-pointer"
                onClick={() => handleSort("description")}
              >
                Product Description<span className="ml-1">{getSortIcon("description")}</span>
              </th>
              <th
                className="p-4 text-left cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Product Price <span className="ml-1">{getSortIcon("price")}</span>
              </th>
              <th className="p-4 text-left">Actions ⇅</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index} className="even:bg-gray-100">

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {product.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>{product.name}</div>
                    </div>
                  </td>


                  <td className="p-4">{product.description}</td>


                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {product.price}
                    </span>
                  </td>


                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleEdit(index)} className=" flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(index)} className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 ">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
          <div className="bg-white p-6 rounded w-80">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</h2>
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
    </div>
  );
};

export default ProductTable;
