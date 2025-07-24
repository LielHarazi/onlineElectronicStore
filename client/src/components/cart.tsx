import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export function CartDialog({ children }: { children: ReactNode }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Your Cart</DialogTitle>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <p className="text-gray-500">Add some items to get started!</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.category} | {item.brand}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 p-0"
                        >
                          +
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {item.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Total: $
                          {(
                            parseFloat(
                              item.price.replace("$", "").replace(",", "")
                            ) * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">
                    Total: ${getTotalPrice().toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={clearCart}>
                      Clear Cart
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Keep the original Cart component for the route
export function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Your Cart
        </h1>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-300 mb-4">Your cart is empty</p>
          <p className="text-gray-400">Add some items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Your Cart
      </h1>

      <div className="grid gap-6">
        {cartItems.map((item) => (
          <Card key={item.id} className="flex flex-col sm:flex-row">
            <CardContent className="flex-1 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Category: {item.category} | Brand: {item.brand}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">
                      {item.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: $
                      {(
                        parseFloat(
                          item.price.replace("$", "").replace(",", "")
                        ) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total: ${getTotalPrice().toFixed(2)}</span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
