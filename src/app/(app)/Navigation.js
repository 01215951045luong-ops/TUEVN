'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Navigation = ({ user }) => {
    const { logout } = useAuth()
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <nav className="bg-white border-b border-gray-100 font-sans">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between h-24"> {/* Tăng chiều cao header cho thoáng */}
                    <div className="flex items-center gap-10">
                        {/* Logo mới hoặc Tên thương hiệu bằng chữ */}
                        <Link href="/dashboard" className="flex items-center">
                           <span className="text-3xl font-[1000] text-[#f59e0b] tracking-tighter">
                               TUEVN
                           </span>
                        </Link>

                        {/* Navigation Links - Chữ to rõ hơn */}
                        <div className="hidden space-x-10 sm:flex h-full">
                            <Link
                                href="/dashboard"
                                className={`inline-flex items-center px-1 pt-1 border-b-4 text-xl font-bold transition duration-150 ease-in-out ${
                                    pathname === '/dashboard'
                                        ? 'border-[#f59e0b] text-gray-900'
                                        : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
                                }`}>
                                Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Settings & Logout */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6 gap-6">
                        <div className="text-xl font-bold text-gray-700 mr-4">
                            Chào, <span className="text-[#f59e0b]">{user?.name}</span>
                        </div>
                        
                        <button
                            onClick={logout}
                            className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 px-6 py-3 rounded-xl text-lg font-black transition-all">
                            登出 (Logout)
                        </button>
                    </div>

                    {/* Hamburger cho Mobile */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-3 rounded-xl text-gray-400 hover:bg-gray-100 focus:outline-none transition">
                            <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {open ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Menu cho Mobile */}
            {open && (
                <div className="sm:hidden bg-white border-t border-gray-100 p-6 space-y-4">
                    <Link href="/dashboard" className="block text-2xl font-black text-gray-800">
                        Dashboard
                    </Link>
                    <div className="pt-4 border-t border-gray-100">
                        <div className="text-xl font-bold text-gray-800">{user?.name}</div>
                        <div className="text-lg text-gray-500 mb-4">{user?.email}</div>
                        <button
                            onClick={logout}
                            className="w-full bg-red-50 text-red-600 font-black py-4 rounded-2xl text-xl">
                            登出 (Logout)
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation