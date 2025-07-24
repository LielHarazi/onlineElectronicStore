import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";

export function SidebarWrapped() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger />
        <h2 className="text-lg font-semibold px-2">Electronics Store</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center space-x-3 font-semibold text-xl p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input type="checkbox" className="w-6 h-6" id="smartphones" />
                  <label htmlFor="smartphones" className="cursor-pointer">
                    Smartphones
                  </label>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center space-x-3 font-semibold text-xl p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input type="checkbox" className="w-6 h-6" id="laptops" />
                  <label htmlFor="laptops" className="cursor-pointer">
                    Laptops
                  </label>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center space-x-3 font-semibold text-xl p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input type="checkbox" className="w-6 h-6" id="tablets" />
                  <label htmlFor="tablets" className="cursor-pointer">
                    Tablets
                  </label>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center space-x-3 font-semibold text-xl p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input type="checkbox" className="w-6 h-6" id="accessories" />
                  <label htmlFor="accessories" className="cursor-pointer">
                    Accessories
                  </label>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold">
            Brands
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center space-x-3 font-semibold text-xl p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input type="checkbox" className="w-6 h-6" id="apple" />
                  <label htmlFor="apple" className="cursor-pointer">
                    Apple
                  </label>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center space-x-3 font-semibold text-xl p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input type="checkbox" className="w-6 h-6" id="samsung" />
                  <label htmlFor="samsung" className="cursor-pointer">
                    Samsung
                  </label>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center space-x-3 font-semibold text-xl p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input type="checkbox" className="w-6 h-6" id="google" />
                  <label htmlFor="google" className="cursor-pointer">
                    Google
                  </label>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center space-x-3 font-semibold text-xl p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input type="checkbox" className="w-6 h-6" id="microsoft" />
                  <label htmlFor="microsoft" className="cursor-pointer">
                    Microsoft
                  </label>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
