import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export function NavWrapped() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full px-8">
        <div className="flex h-20 items-center justify-between w-full">
          {/* Navigation Menu - Left side */}
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-8">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/contact"
                    className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-100 rounded-md transition-all duration-200"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/shop"
                    className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-100 rounded-md transition-all duration-200"
                  >
                    Shop
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/reviews"
                    className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-100 rounded-md transition-all duration-200"
                  >
                    Reviews
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/cart"
                    className="relative px-6 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-100 rounded-md transition-all duration-200"
                  >
                    Cart
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* User Authentication - Right side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-lg font-medium text-gray-700 bg-blue-50 px-4 py-2 rounded-lg">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-100 rounded-md transition-all duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-100 rounded-md transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
