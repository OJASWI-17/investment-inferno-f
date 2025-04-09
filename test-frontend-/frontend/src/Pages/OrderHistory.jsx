"use client"

import { useState, useEffect } from "react"
import { Search, ArrowDown, ArrowUp, Calendar } from "lucide-react"
import BG from '../assets/BgInferno.svg';
const ORDER_URL=import.meta.env.VITE_ORDERHISTORY

export default function OrderHistory() {
    const [activeFilter, setActiveFilter] = useState("All")
    const [orders, setOrders] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('jwt_token') // Get token from localStorage
    
            const response = await fetch(`${ORDER_URL}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`, // Add token here
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            
            if (!response.ok) throw new Error('Network error')
            const data = await response.json()
        console.log("Full response JSON:", data);
            setOrders(data.orders || [])
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    }
    
    // Initial fetch and set up polling
    useEffect(() => {
        fetchOrders() // Initial load
        const interval = setInterval(fetchOrders, 30000) // Update every 30 seconds
        
        return () => clearInterval(interval) // Clean up on unmount
    }, [])
    

    // Filter and search orders
    const filteredOrders = orders.filter(order => {
        const matchesFilter = activeFilter === "All" || 
                            (activeFilter === "Buy" && order.action === "BUY") || 
                            (activeFilter === "Sell" && order.action === "SELL")
        
        const matchesSearch = searchQuery === "" || 
                            order.stock.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            order.id?.toLowerCase().includes(searchQuery.toLowerCase())
        
        return matchesFilter && matchesSearch
    })

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-background"
            style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>

            <main className="container mx-auto px-13 py-8 pt-26">
                <div className="mb-8 px-13">
                    <h1 className="text-3xl font-bold text-white">Order History</h1>
                    <p className="text-white">Track all your trading activity</p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-850 p-6 px-14">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Transaction History</h2>

                        <div className="flex space-x-2 rounded-lg bg-gray-800 p-1">
                            {["All", "Buy", "Sell"].map((filter) => (
                                <button
                                    key={filter}
                                    className={`rounded-md px-4 py-2 ${activeFilter === filter ? "bg-gray-700" : "hover:bg-gray-700/50"}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by symbol or order ID..."
                                className="w-full rounded-lg bg-gray-800 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex space-x-2">
                            <button className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-3 text-gray-400 hover:bg-gray-700">
                                <span>All Statuses</span>
                                <ArrowDown className="ml-2 h-4 w-4" />
                            </button>
                            <button className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-3 text-gray-400 hover:bg-gray-700">
                                <span>All Time</span>
                                <ArrowDown className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800 text-left">
                                    <th className="pb-4 pl-4 pr-6 text-white">Order Type</th>
                                    <th className="px-6 pb-4 text-white">Action</th>
                                    <th className="px-6 pb-4 text-white">Symbol</th>
                                    <th className="px-6 pb-4 text-white">Quantity</th>
                                    <th className="px-6 pb-4 text-white">Price</th>
                                    <th className="px-6 pb-4 text-white">Status</th>
                                    <th className="px-6 pb-4 text-white">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id || order.timestamp} className="border-b border-gray-800 text-white">
                                            <td className="py-4 pl-4 pr-6">
                                                {order.type === 'LIMIT' ? 'Limit Order' : 'Market Order'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div
                                                    className={`flex items-center rounded-full px-3 py-1 text-xs font-medium ${order.action === "BUY" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}
                                                >
                                                    {order.action === "BUY" ? (
                                                        <ArrowUp className="mr-1 h-3 w-3" />
                                                    ) : (
                                                        <ArrowDown className="mr-1 h-3 w-3" />
                                                    )}
                                                    {order.action}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{order.stock}</td>
                                            <td className="px-6 py-4">{order.quantity}</td>
                                            <td className="px-6 py-4">${parseFloat(order.price).toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${order.status === "Executed" ? "bg-green-900/30 text-green-400" : "bg-blue-900/30 text-blue-400"}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                                    {order.timestamp}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-4 text-center text-gray-400">
                                            No orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}