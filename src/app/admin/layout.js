"use client"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path 
    ? "bg-blue-600 text-white" 
    : "text-gray-400 hover:text-white hover:bg-slate-800";

  // 處理登出邏輯
  const handleLogout = async () => {
    const confirmLogout = window.confirm("您確定要登出系統嗎？");
    if (confirmLogout) {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push('/login'); // 導向登入頁面
      } else {
        alert("登出失敗: " + error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - 左側選單 */}
      <aside className="w-72 bg-slate-900 text-white sticky top-0 h-screen flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-blue-400 uppercase tracking-wider">後台管理系統</h2>
        </div>

        {/* 選單區域 (支援垂直滾動) */}
        <nav className="p-4 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          {/* 主控面板 */}
          <div>
            <Link href="/admin" className={`block p-2 rounded-md text-sm transition ${isActive('/admin')}`}>
               主控面板 (Dashboard)
            </Link>
          </div>

          {/* 單字管理 */}
          <div>
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2"> 單字管理</p>
            <div className="space-y-1">
              <Link href="/admin/vocabulary/list" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/vocabulary/list')}`}>
                • 單字資料列表
              </Link>
              <Link href="/admin/vocabulary/add" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/vocabulary/add')}`}>
                • 新增單字資料
              </Link>
            </div>
          </div>

          {/* 字母與發音管理 */}
          <div>
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2"> 字母發音管理</p>
            <div className="space-y-1">
              <Link href="/admin/sonant/list" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/sonant/list')}`}>
                • 字母資料列表
              </Link>
              <Link href="/admin/sonant/add" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/sonant/add')}`}>
                • 新增字母資料
              </Link>
            </div>
          </div>

          {/* 語法管理 */}
          <div>
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2"> 語法管理</p>
            <div className="space-y-1">
              <Link href="/admin/grammar/list" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/grammar/list')}`}>
                • 語法教學列表
              </Link>
              <Link href="/admin/grammar/add" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/grammar/add')}`}>
                • 新增語法教學
              </Link>
            </div>
          </div>
          <div>
            <Link href="/admin/profiles" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/profiles')}`}>
              會員管理
            </Link>
          </div>
        </nav>
          
        {/* 登出按鈕 - 固定於左下角 */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-md text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-red-500/20 uppercase tracking-widest"
          >
             登出 
          </button>
        </div>
      </aside>

      {/* 右側內容顯示區 */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}