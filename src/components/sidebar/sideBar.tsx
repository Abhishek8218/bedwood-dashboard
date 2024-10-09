import React from "react"

import { BarChart3, ChartBarStacked, Home, Package, ShoppingCart, Users, X } from 'lucide-react'
import { SidebarProps } from "@/src/types/type"

export const  Sidebar =({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }: SidebarProps) =>  {
    const navItems = [
      { name: 'Dashboard', icon: Home, value: 'dashboard' },
      { name: 'Analytics', icon: BarChart3, value: 'analytics' },
      { name: 'Products', icon: Package, value: 'products' },
      { name: 'Category', icon: ChartBarStacked, value: 'category' },
      { name: 'Orders', icon: ShoppingCart, value: 'orders' },
      { name: 'Associate', icon: Users, value: 'associate' },
    ]
    const handleLogout = () => {
      // Remove the access_token cookie
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      window.location.href = '/auth/login';
      
      // You can also redirect the user to a login page or perform any additional logout actions here
    };

    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-700 text-white p-6 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">BedWood</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden hover:borde rounded-full hover:bg-gray-600">
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() => {
                    setActiveTab(item.value)
                    setIsSidebarOpen(false)
                  }}
                  className={`flex items-center w-full py-2 px-4 rounded transition-colors ${
                    activeTab === item.value ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-600 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button className="mt-8 w-full py-2 px-4 bg-gray-600 text-white rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    )
  }