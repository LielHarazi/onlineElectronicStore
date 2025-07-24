import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserForm } from "./components/userform";
import { NavWrapped } from "./components/navwrapped";
import { CardWrapped } from "./components/cardwrapped";
import { SidebarWrapped } from "./components/sidebar.wrapped";
import { SidebarProvider } from "./components/ui/sidebar";
import { ReviewCard } from "./components/reviewcard";
import { Cart } from "./components/cart";
import { Checkout } from "./components/checkout";
import { CartProvider } from "./context/CartContext";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/siginUpForm";
function App() {
  return (
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
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Welcome</h1>
                    <p className="text-gray-600">
                      Navigate using the menu above
                    </p>
                  </div>
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                  <UserForm />
                </div>
              }
            />
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
            <Route
              path="/reviews"
              element={
                <div className="min-h-[calc(100vh-80px)]">
                  <ReviewCard />
                </div>
              }
            />
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
  );
}

export default App;
