import { useState } from "react";
import { z } from "zod";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const checkoutSchema = z.object({
  cardNumber: z
    .string()
    .min(1)
    .regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
  expiryDate: z
    .string()
    .min(1)
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z
    .string()
    .min(1)
    .regex(/^\d{3}$/, "CVV must be exactly 3 digits"),
  cardholderName: z.string().min(2, "Name must be at least 2 characters"),
});

export function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    let formatted = value;
    switch (field) {
      case "cardNumber":
        formatted = value.replace(/\D/g, "").slice(0, 16);
        break;
      case "expiryDate":
        const digits = value.replace(/\D/g, "");
        formatted =
          digits.length >= 2
            ? `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
            : digits;
        break;
      case "cvv":
        formatted = value.replace(/\D/g, "").slice(0, 3);
        break;
      case "cardholderName":
        formatted = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 30);
        break;
    }
    setFormData((prev) => ({ ...prev, [field]: formatted }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const formatCardNumber = (n: string) =>
    n
      .padEnd(16, "0")
      .replace(/(.{4})/g, "$1 ")
      .trim() || "0000 0000 0000 0000";
  const formatDisplayDate = (d: string) => d.padEnd(5, "0") || "00/00";

  const validateForm = () => {
    try {
      checkoutSchema.parse(formData);
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const formErrors: Record<string, string> = {};
        e.issues.forEach((i) => {
          if (i.path[0]) formErrors[i.path[0] as string] = i.message;
        });
        setErrors(formErrors);
      }
      return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    await new Promise((res) => setTimeout(res, 2000));
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-3xl font-bold text-white mb-4">Order Complete!</h1>
      <p className="text-white text-lg mb-8">Thank you for your purchase.</p>
      <Button
        onClick={() => (window.location.href = "/shop")}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Continue Shopping
      </Button>
    </div>
  );

  const renderEmpty = () => (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-white mb-4">Checkout</h1>
      <p className="text-white text-lg mb-4">Your cart is empty</p>
      <Button
        onClick={() => (window.location.href = "/shop")}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Go to Shop
      </Button>
    </div>
  );

  const renderForm = () => (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Card Preview Section */}
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Front Card */}
        <div className="w-80 h-48 bg-[url('/images/bg-card-front.png')] bg-cover bg-center rounded-xl shadow-xl text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-transparent to-pink-600/20" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="w-10 h-6 bg-white rounded opacity-90" />
              <div className="flex space-x-1">
                <div className="w-6 h-6 border-2 border-white rounded-full opacity-80" />
                <div className="w-6 h-6 border-2 border-white rounded-full bg-white opacity-90" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-lg font-mono tracking-wider">
                {formatCardNumber(formData.cardNumber)}
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-gray-200 uppercase tracking-wide">
                    Card Holder
                  </div>
                  <div className="text-sm font-medium uppercase">
                    {formData.cardholderName || "baba bobo"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-200 uppercase tracking-wide">
                    Expires
                  </div>
                  <div className="text-sm font-medium">
                    {formatDisplayDate(formData.expiryDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Card */}
        <div className="w-80 h-48 bg-[url('/images/bg-card-back.png')] bg-cover bg-center rounded-xl shadow-xl text-white p-6 relative overflow-hidden">
          <div className="absolute top-4 left-0 w-full h-8 bg-gray-800" />
          <div className="absolute bottom-[5.4rem] right-6">
            <div className="w-16 h-6 bg-gray-300 rounded border border-gray-300 flex items-center justify-center">
              <span className="text-gray-800 text-sm font-mono tracking-wider">
                {formData.cvv || ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["cardholderName", "cardNumber"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1">
                  {field === "cardholderName"
                    ? "Cardholder Name"
                    : "Card Number"}
                </label>
                <input
                  type="text"
                  value={formData[field as keyof typeof formData]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className={`w-full p-3 border rounded-md ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={
                    field === "cardholderName"
                      ? "e.g. Jane Appleseed"
                      : "e.g. 1234 5678 9123 0000"
                  }
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Exp. Date (MM/YY)",
                  field: "expiryDate",
                  placeholder: "MM/YY",
                },
                { label: "CVC", field: "cvv", placeholder: "e.g. 123" },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className={`w-full p-3 border rounded-md ${
                      errors[field] ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder={placeholder}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 mt-6"
            >
              {isProcessing
                ? "Processing..."
                : `Confirm - $${getTotalPrice().toFixed(2)}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Interactive Card Details Form
      </h1>
      {orderComplete
        ? renderSuccess()
        : cartItems.length === 0
        ? renderEmpty()
        : renderForm()}
    </div>
  );
}
