'use client';

import { useState } from "react"
import { Sidebar } from "../sidebar/sideBar"
import { Menu } from "lucide-react"
import { DashboardOverview } from "./dashBoardOverview"
import { Analytics } from "./analytics"
import { ProductList } from "../product/productList"
import { OrderList } from "../order/orderList"
import { CustomerList } from "../customer/customer"




 const Dashboard  = () => {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-800 "
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === 'dashboard' && (
              <>
                <DashboardOverview />
                <Analytics />
              </>
            )}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'products' && <ProductList />}
            {activeTab === 'orders' && <OrderList />}
            {activeTab === 'customers' && <CustomerList />}
          </main>
        </div>
      </div>
    )
  }

  export default Dashboard