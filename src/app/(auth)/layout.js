import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'

export const metadata = {
    title: 'Vietnamese Learning - Auth',
}

const Layout = ({ children }) => {
    return (
        <div className="text-gray-900 antialiased bg-[#f8fafc]">
            {/* Trả về children trực tiếp để trang Register/Login tự do tùy chỉnh giao diện */}
            {children}
        </div>
    )
}

export default Layout