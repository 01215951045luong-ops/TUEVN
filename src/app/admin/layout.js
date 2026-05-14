"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-slate-800";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Menu bên trái */}
      <aside className="w-72 bg-slate-900 text-white sticky top-0 h-screen overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-blue-400">HỆ THỐNG ADMIN</h2>
        </div>

        <nav className="p-4 space-y-6">
          {/* PHẦN TỪ VỰNG */}
          <div>
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2"> Vocabulary</p>
            <div className="space-y-1">
              <Link href="/admin/vocabulary/list" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/vocabulary/list')}`}>
                • Danh sách từ vựng
              </Link>
              <Link href="/admin/vocabulary/add" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/vocabulary/add')}`}>
                • Thêm từ mới
              </Link>
            </div>
          </div>

          {/* PHẦN CHỮ CÁI / ÂM TIẾT */}
          <div>
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2"> Sonant</p>
            <div className="space-y-1">
              <Link href="/admin/sonant/list" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/sonant/list')}`}>
                • Danh sách chữ cái
              </Link>
              <Link href="/admin/sonant/add" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/sonant/add')}`}>
                • Thêm chữ cái mới
              </Link>
            </div>
          </div>

          {/* PHẦN NGỮ PHÁP */}
          <div>
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2"> Grammar</p>
            <div className="space-y-1">
              <Link href="/admin/grammar/list" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/grammar/list')}`}>
                • Danh sách ngữ pháp
              </Link>
              <Link href="/admin/grammar/add" className={`block p-2 rounded-md text-sm transition ${isActive('/admin/grammar/add')}`}>
                • Thêm cấu trúc mới
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Nội dung bên phải */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}