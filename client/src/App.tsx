import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserForm } from "./components/userform";
import { NavWrapped } from "./components/navwrapped";
import { CardWrapped } from "./components/cardwrapped";
import { SidebarWrapped } from "./components/sidebar.wrapped";
import { SidebarProvider } from "./components/ui/sidebar";
import { Cart } from "./components/cart";
import { Checkout } from "./components/checkout";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/siginUpForm";
import { PostsPage } from "./components/PostsPage";
import { Contact } from "./components/contact";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div
            className="min-h-[100vh] min-w-[100vw] bg-cover bg-center bg-no-repeat bg-fixed"
            style={{
              backgroundImage: "url(/images/bg-main-desktop.png)", // Using desktop version for better quality
            }}
          >
            <NavWrapped />
            <Routes>
              <Route
                path="/"
                element={
                  <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                    <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to ElectroStore
                      </h1>
                      <p className="text-xl text-gray-600 mb-6">
                        Your one-stop destination for cutting-edge electronics
                      </p>
                      <p className="text-gray-500">
                        Explore our products, read community posts, and find the
                        perfect tech for you
                      </p>
                    </div>
                  </div>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/shop"
                element={
                  <SidebarProvider>
                    <div className="flex">
                      <SidebarWrapped />
                      <main className="flex-1 p-6">
                        <CardWrapped />
                      </main>
                    </div>
                  </SidebarProvider>
                }
              />
              <Route
                path="/cart"
                element={
                  <div className="min-h-[calc(100vh-80px)]">
                    <Cart />
                  </div>
                }
              />
              <Route
                path="/checkout"
                element={
                  <div className="min-h-[calc(100vh-80px)]">
                    <Checkout />
                  </div>
                }
              />
              <Route path="/reviews" element={<PostsPage />} />
              <Route
                path="/login"
                element={
                  <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                    <LoginForm />
                  </div>
                }
              />
              <Route
                path="/signup"
                element={
                  <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                    <SignUpForm />
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
