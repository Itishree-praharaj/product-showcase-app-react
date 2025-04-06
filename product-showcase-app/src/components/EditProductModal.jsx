import React, { useState, useEffect, useRef } from "react";

const EditProductModal = ({ product, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const modalRef = useRef(null);
  const headerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.description && !isNaN(form.price)) {
      onSave({
        ...product,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const modal = modalRef.current;
      modal.style.left = `${e.clientX - offset.x}px`;
      modal.style.top = `${e.clientY - offset.y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 absolute"
        style={{ top: "100px", left: "calc(50% - 20rem)" }}
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:text-red-500"
          style={{ zIndex: 10 }}
        >
          &times;
        </button>


        <div
          ref={headerRef}
          onMouseDown={handleMouseDown}
          className="cursor-move text-lg font-semibold text-white bg-[#4a5a86] rounded-t-lg px-6 py-4 -mt-6 -mx-6"
        >
          Edit Product
        </div>


        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">
                Product Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Product Price<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium">
                Product Description<span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                rows={3}
                required
              />
            </div>
          </div>


          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4a5a86] text-white rounded hover:bg-[#3b4c70]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
