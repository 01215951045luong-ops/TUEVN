'use client';
import React from 'react';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';

const DashboardPage = () => {
  const { user } = useAuth();
  
  // 1. Logic lấy tên hiển thị: Ưu tiên display_name từ metadata, nếu không có mới dùng phần trước @ của email
  const fullName = user?.user_metadata?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Người dùng';
  
  // 2. Lấy chữ cái đầu để làm Avatar (Tránh hiện số 0)
  const avatarLetter = fullName.charAt(0).toUpperCase();

  // 3. Định dạng ngày tham gia (Lấy từ created_at của Supabase)
  const joinDate = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
    : '2026年3月15日'; // Ngày mặc định nếu không load kịp

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Lời chào - Đã sửa lỗi hiển thị tên */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
            {avatarLetter}
          </div>
          <div>
            <p className="text-gray-500 font-medium">歡迎回來,</p>
            <h1 className="text-3xl font-black text-gray-900">{fullName}</h1>
          </div>
        </div>

        {/* --- HÀNG THẺ CHÍNH (CARDS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link href="/my-vocab" className="group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className="ri-book-mark-line text-2xl"></i>
              </div>
              <i className="ri-arrow-right-s-line text-gray-300 text-xl"></i>
            </div>
            <h3 className="text-gray-400 font-bold mb-1">我的詞彙</h3>
            <p className="text-2xl font-black text-gray-800">我的詞彙</p>
          </Link>

          <Link href="/sonants" className="group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                <i className="ri-mic-line text-2xl"></i>
              </div>
              <i className="ri-arrow-right-s-line text-gray-300 text-xl"></i>
            </div>
            <h3 className="text-gray-400 font-bold mb-1">發音字母</h3>
            <p className="text-2xl font-black text-gray-800">發音字母</p>
          </Link>

          <Link href="/grammars" className="group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <i className="ri-paragraph text-2xl"></i>
              </div>
              <i className="ri-arrow-right-s-line text-gray-300 text-xl"></i>
            </div>
            <h3 className="text-gray-400 font-bold mb-1">語法學習</h3>
            <p className="text-2xl font-black text-gray-800">語法學習</p>
          </Link>
        </div>

        {/* --- THÔNG TIN CÁ NHÂN - ĐÃ THAY ROLE THÀNH NGÀY THAM GIA --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-2 mb-6 text-orange-500">
            <i className="ri-user-settings-line text-xl"></i>
            <h2 className="text-xl font-black text-gray-800">個人資料 </h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <i className="ri-mail-line text-gray-400 text-xl"></i>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
                <p className="font-bold text-gray-700">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <i className="ri-calendar-check-line text-gray-400 text-xl"></i>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">加入日期</p>
                <p className="font-bold text-gray-700">{joinDate}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;