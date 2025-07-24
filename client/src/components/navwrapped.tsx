import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

export function NavWrapped() {
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
                    to="/login"
                    className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-100 rounded-md transition-all duration-200"
                  >
                    Login
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/signup"
                    className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-100 rounded-md transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
