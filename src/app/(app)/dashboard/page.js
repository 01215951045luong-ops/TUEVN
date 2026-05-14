'use client'

import { useAuth } from '@/hooks/auth'
import useSWR from 'swr'
import axios from '@/lib/axios'
import Link from 'next/link'

const Dashboard = () => {
    
    const { user } = useAuth({ middleware: 'auth' })

    
    const { data: stats, error } = useSWR('/api/dashboard/stats', () =>
        axios.get('/api/dashboard/stats').then(res => res.data)
    )

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-2xl font-black text-purple-600">載入中...</div>
            </div>
        )
    }

    return (
        <div className="py-12 bg-[#f9fafb] min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* 歡迎標題 (Header) */}
                <div className="flex items-center gap-5 mb-10 animate-fadeIn">
                    <div className="w-16 h-16 bg-gradient-to-tr from-[#7c3aed] to-[#a855f7] rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-purple-200">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-gray-500 font-medium italic">歡迎回來，</p>
                        <h1 className="text-3xl font-[1000] text-gray-900 leading-tight">
                            {user.name}
                        </h1>
                    </div>
                </div>

                {/* 數據統計卡片區域 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    
                    {/* 已學習單字卡片 - 連結至我的單字庫 */}
                    <Link href="/my-vocab" className="block group">
                        <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                            
                            {/* 裝飾圖標 */}
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-4xl font-black text-gray-800">
                                    {/* 顯示從 API 獲取的數量 */}
                                    {stats ? stats.learned_count : '...'}
                                </h3>
                                <p className="text-gray-500 font-bold mt-1 uppercase text-xl tracking-wider">已學習單字</p>
                            </div>

                            {/* 右上角箭頭導向圖示 */}
                            <div className="absolute top-8 right-8 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>

                            {/* 背景懸停效果 */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity"></div>
                        </div>
                    </Link>
                </div>

                {/* 個人資料區塊 */}
                <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] rounded-[2.5rem] border border-gray-50 p-10 max-w-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3 text-orange-500 font-black text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            個人資料
                        </div>
                        <button className="text-orange-400 font-bold text-xl hover:underline transition-all">編輯資料</button>
                    </div>

                    <div className="space-y-6">
                        <div className="group">
                            <p className="text-gray-400 text-[20px] font-black uppercase tracking-[0.2em] mb-1 group-hover:text-orange-400 transition-colors">電子郵件</p>
                            <p className="text-gray-700 font-bold">{user.email}</p>
                        </div>
                        <div className="group">
                            <p className="text-gray-400 text-[20px] font-black uppercase tracking-[0.2em] mb-1 group-hover:text-orange-400 transition-colors">加入日期</p>
                            <p className="text-gray-700 font-bold uppercase">
                                {new Date(user.created_at).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                        <div className="group">
                            <p className="text-gray-400 text-[20px] font-black uppercase tracking-[0.2em] mb-1 group-hover:text-orange-400 transition-colors">帳號狀態</p>
                            <div className="flex items-center gap-2 text-emerald-500 font-bold">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                使用中
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard