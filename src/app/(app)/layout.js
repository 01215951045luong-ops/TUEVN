// src/app/(app)/layout.js
'use client'

import { useAuth } from '@/hooks/auth'
import Header from '@/components/Header' // Đảm bảo bạn dùng Header chính ở đây

export default function AppLayout({ children }) {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return null // Hoặc loading spinner
    }

    return (
        <div className="min-h-screen bg-gray-100">
          
            
            <main className="py-12">
                {children}
            </main>
        </div>
    )
}