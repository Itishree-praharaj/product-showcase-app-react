import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import ProductGrid from "./components/ProductGrid";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";


const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Rice", description: "Basmati white rice", price: 40, category: "Groceries" },
    { id: 2, name: "Milk", description: "1 litre of fresh cow milk", price: 25, category: "Groceries" },
    { id: 3, name: "Eggs", description: "Dozen organic eggs", price: 60, category: "Groceries" },
    { id: 4, name: "Bread", description: "Whole wheat bread loaf", price: 30, category: "Groceries" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  const handleLogin = (userData) => {
    if (!userData.username || !userData.password) {
      setLoginError("Username and password are required.");
      return;
    }

    if (
      userData.username !== "admin@gmail.com" ||
      userData.password !== "Admin@123"
    ) {
      setLoginError("Invalid credentials. Please try again.");
      return;
    }

    setUser({ name: "Admin", email: userData.username });
    setLoginError("");
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
  };

  // Add a handler to add new products
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: prevProducts.length + 1 },
    ]);
  };

  const filteredProducts = products.filter((product) =>
    Object.values(product)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-indigo-100 to-indigo-200">
      {!user && (
        <LoginModal
          isOpen={showLogin}
          isLoggedIn={!!user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onClose={() => setShowLogin(false)}
          loginError={loginError}
        />
      )}

      {user && (
        <div className="p-4 w-full h-full min-h-screen">
          <Header
            onAddProduct={() => setShowAddModal(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            user={user}
            onLogout={handleLogout}
          />

          <div className="overflow-x-auto">
            {viewMode === "table" ? (
              <ProductTable
                products={filteredProducts}
                setProducts={setProducts}
              />
            ) : (
              <ProductGrid
                products={filteredProducts}
                setProducts={setProducts}
              />
            )}
          </div>

          <AddProductModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddProduct}
          />
        </div>
      )}
    </div>
  );
};

export default App;
