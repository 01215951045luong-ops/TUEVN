'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVocab: 0,
    totalUsers: 0,
    totalLearned: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemData();
  }, []);

  const fetchSystemData = async () => {
    try {
      setLoading(true);
      
      // Thực hiện truy vấn an toàn, bóc tách error của từng request độc lập
      const [vocabRes, userRes, learnedRes] = await Promise.all([
        supabase.from('vocabularies').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('user_vocabularies').select('*', { count: 'exact', head: true })
      ]);

      // Kiểm tra nếu có lỗi từ Supabase thì in ra console để debug chứ không làm sập giao diện
      if (vocabRes.error) console.error("Lỗi bảng vocabularies:", vocabRes.error.message);
      if (userRes.error) console.error("Lỗi bảng profiles:", userRes.error.message);
      if (learnedRes.error) console.error("Lỗi bảng user_vocabularies:", learnedRes.error.message);

      setStats({
        totalVocab: vocabRes.count || 0,
        totalUsers: userRes.count || 0,
        totalLearned: learnedRes.count || 0
      });
    } catch (err) {
      // Tránh lỗi gọi err.message nếu err bị undefined
      console.error("Lỗi hệ thống tổng thể của trang Admin:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-xl text-gray-600">Đang tải dữ liệu quản trị...</div>;

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-8 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Lời chào đơn giản */}
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">CHÀO MỪNG QUẢN TRỊ VIÊN</h1>
          <p className="text-gray-500 mt-2">Dưới đây là tình hình hoạt động tổng quát của hệ thống.</p>
        </header>

        {/* Các thẻ thống kê số liệu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tổng số từ vựng</p>
            <p className="text-4xl font-black text-blue-600">{stats.totalVocab}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Người dùng đăng ký</p>
            <p className="text-4xl font-black text-purple-600">{stats.totalUsers}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tiến độ học tập</p>
            <p className="text-4xl font-black text-emerald-600">{stats.totalLearned}</p>
          </div>

        </div>

      </div>
    </div>
  );
}