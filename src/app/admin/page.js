'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVocab: 0,
    totalUsers: 0,
    totalGrammar: 0,  // 新增語法統計狀態
    totalSonant: 0    // 新增字母統計狀態
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemData();
  }, []);

  const fetchSystemData = async () => {
    try {
      setLoading(true);
      
      // 同步執行安全查詢，包含 vocabularies, profiles, grammars, sonants 四張資料表
      const [vocabRes, userRes, grammarRes, sonantRes] = await Promise.all([
        supabase.from('vocabularies').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('grammars').select('*', { count: 'exact', head: true }), // 查詢語法總量
        supabase.from('sonants').select('*', { count: 'exact', head: true })   // 查詢字母總量
      ]);

      // 若 Supabase 發生錯誤，將錯誤訊息印在主機板（Console）以利偵錯
      if (vocabRes.error) console.error("vocabularies 資料表錯誤:", vocabRes.error.message);
      if (userRes.error) console.error("profiles 資料表錯誤:", userRes.error.message);
      if (grammarRes.error) console.error("grammars 資料表錯誤:", grammarRes.error.message);
      if (sonantRes.error) console.error("sonants 資料表錯誤:", sonantRes.error.message);

      setStats({
        totalVocab: vocabRes.count || 0,
        totalUsers: userRes.count || 0,
        totalGrammar: grammarRes.count || 0,
        totalSonant: sonantRes.count || 0
      });
    } catch (err) {
      console.error("後台管理頁面系統整體錯誤:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-xl text-gray-600 tracking-widest">系統資料載入中...</div>;

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-8 text-left text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 歡迎首頁區塊 */}
        <header className="mb-10">
          <h1 className="text-3xl font-black text-black tracking-tight uppercase">歡迎登入管理後台</h1>
          <p className="text-gray-500 mt-2 text-sm">以下為系統目前的整體運行數據與統計現況。</p>
        </header>

        {/* 數據統計卡片區塊 - 已調整為 md:grid-cols-4 以容納 4 張卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* 卡片 1: 總單字量 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">總單字數量</p>
            <p className="text-4xl font-black text-blue-600">{stats.totalVocab}</p>
          </div>

          {/* 卡片 2: 總語法句數 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">總語法句數</p>
            <p className="text-4xl font-black text-emerald-600">{stats.totalGrammar}</p>
          </div>

          {/* 卡片 3: 總字母發音數 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">總字母發音數</p>
            <p className="text-4xl font-black text-amber-500">{stats.totalSonant}</p>
          </div>

          {/* 卡片 4: 註冊會員數 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">註冊會員總數</p>
            <p className="text-4xl font-black text-purple-600">{stats.totalUsers}</p>
          </div>

        </div>

      </div>
    </div>
  );
}