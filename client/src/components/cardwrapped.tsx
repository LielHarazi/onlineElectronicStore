import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { CartDialog } from "./cart";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  brand: string;
}

const products: Product[] = [
  {
    id: "1",
    title: "iPhone 15 Pro",
    description: "Latest Apple smartphone with Pro features",
    price: "$999",
    category: "smartphones",
    brand: "apple",
  },
  {
    id: "2",
    title: "MacBook Air M3",
    description: "Powerful and lightweight laptop for professionals",
    price: "$1,299",
    category: "laptops",
    brand: "apple",
  },
  {
    id: "3",
    title: "Galaxy S24 Ultra",
    description: "Samsung's flagship smartphone with S Pen",
    price: "$1,199",
    category: "smartphones",
    brand: "samsung",
  },
  {
    id: "4",
    title: "Surface Laptop 5",
    description: "Premium Windows laptop for productivity",
    price: "$1,099",
    category: "laptops",
    brand: "microsoft",
  },
  {
    id: "5",
    title: "iPad Air",
    description: "Versatile tablet for work and creativity",
    price: "$599",
    category: "tablets",
    brand: "apple",
  },
  {
    id: "6",
    title: "Pixel 8 Pro",
    description: "Google's AI-powered smartphone",
    price: "$899",
    category: "smartphones",
    brand: "google",
  },
  {
    id: "7",
    title: "Galaxy Tab S9",
    description: "Premium Android tablet with S Pen",
    price: "$749",
    category: "tablets",
    brand: "samsung",
  },
  {
    id: "8",
    title: "AirPods Pro 2",
    description: "Premium wireless earbuds with noise cancellation",
    price: "$249",
    category: "accessories",
    brand: "apple",
  },
];

export function CardWrapped() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const { addToCart, cartItems, getTotalItems } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const getCartQuantity = (productId: string) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  useEffect(() => {
    const updateFilters = () => {
      // Get all checked categories
      const checkedCategories = Array.from(
        document.querySelectorAll(
          'input[type="checkbox"][id^="smartphones"], input[type="checkbox"][id^="laptops"], input[type="checkbox"][id^="tablets"], input[type="checkbox"][id^="accessories"]'
        )
      )
        .filter((checkbox: any) => checkbox.checked)
        .map((checkbox: any) => checkbox.id);

      // Get all checked brands
      const checkedBrands = Array.from(
        document.querySelectorAll(
          'input[type="checkbox"][id^="apple"], input[type="checkbox"][id^="samsung"], input[type="checkbox"][id^="google"], input[type="checkbox"][id^="microsoft"]'
        )
      )
        .filter((checkbox: any) => checkbox.checked)
        .map((checkbox: any) => checkbox.id);

      // Filter products
      const filtered = products.filter((product) => {
        const categoryMatch =
          checkedCategories.length === 0 ||
          checkedCategories.includes(product.category);
        const brandMatch =
          checkedBrands.length === 0 || checkedBrands.includes(product.brand);
        return categoryMatch && brandMatch;
      });

      setFilteredProducts(filtered);
    };

    // Listen for checkbox changes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateFilters);
    });

    // Initial filter
    updateFilters();

    // Cleanup
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", updateFilters);
      });
    };
  }, []);

  const formatCategoryName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      smartphones: "Smartphones",
      laptops: "Laptops",
      tablets: "Tablets",
      accessories: "Accessories",
    };
    return categoryNames[category] || category;
  };

  const formatBrandName = (brand: string) => {
    const brandNames: { [key: string]: string } = {
      apple: "Apple",
      samsung: "Samsung",
      google: "Google",
      microsoft: "Microsoft",
    };
    return brandNames[brand] || brand;
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-bold text-center">
          Our Products ({filteredProducts.length})
        </h2>

        {/* Cart Dialog Button */}
        <CartDialog>
          <Button
            variant="outline"
            className="relative bg-white hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <img
                src="/images/cart.logo-removebg-preview.png"
                alt="Cart"
                className="h-6 w-6 object-contain"
              />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
          </Button>
        </CartDialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-green-600">
                {product.price}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Category: {formatCategoryName(product.category)} | Brand:{" "}
                {formatBrandName(product.brand)}
              </p>
              <div className="mt-4">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Add to Cart{" "}
                  {getCartQuantity(product.id) > 0
                    ? `(${getCartQuantity(product.id)})`
                    : ""}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products match your selected filters.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filter selection.
          </p>
        </div>
      )}
    </div>
  );
}
