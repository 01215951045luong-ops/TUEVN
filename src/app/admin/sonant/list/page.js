"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ListSonantsPage() {
  const [sonantsList, setSonantsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25; 

  useEffect(() => { fetchSonants(); }, []);

  const fetchSonants = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sonants')
        .select('*')
        .order('id', { ascending: true });
        
      if (error) throw error;
      setSonantsList(data || []);
    } catch (err) {
      console.error("Lỗi fetch dữ liệu:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("您確定要刪除此項目嗎？")) {
      try {
        const { error } = await supabase.from('sonants').delete().eq('id', id);
        if (error) throw error;
        fetchSonants();
      } catch (err) {
        console.error("Lỗi khi xóa:", err.message);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sonantsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sonantsList.length / itemsPerPage);

  return (
    <div className="w-full p-4 md:p-8 bg-[#fafafa] min-h-screen text-left text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Tiêu đề trang - Phong cách Đen Trắng tối giản */}
        <div className="mb-8 flex justify-between items-center border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-black">
              子音字母管理
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              目前系統內共有 {sonantsList.length} 個子音項目
            </p>
          </div>
          <Link 
            href="/admin/sonant/add" 
            className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            + 新增子音
          </Link>
        </div>

        {/* Bảng dữ liệu thiết kế tràn viền tinh tế */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-fixed text-left">
              <thead>
                <tr className="bg-black text-white text-[15px] font-bold uppercase tracking-widest">
                  <th className="py-4 px-4 w-16 text-center">ID</th>
                  <th className="py-4 px-4 text-center w-1/4">音節字母 (子音)</th>
                  <th className="py-4 px-4 text-center w-[20%]">示範圖片</th>
                  <th className="py-4 px-4 text-center">發音音檔</th>
                  <th className="py-4 px-4 text-center w-32">操作選項</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-sm font-medium text-gray-400 tracking-wide animate-pulse">
                      資料載入中...
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-sm font-medium text-gray-400">
                      目前沒有任何子音資料。
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-all">
                      {/* ID định dạng font Mono gọn gàng */}
                      <td className="p-4 text-center text-xs font-mono font-bold text-gray-400">
                        {item.id}
                      </td>
                      
                      {/* TÊN ÂM TIẾT: Font chữ Đen đậm nổi bật siêu to */}
                      <td className="p-4 text-center">
                        <span className="text-5xl font-black text-black tracking-tighter uppercase font-serif">
                          {item.name}
                        </span>
                      </td>

                      {/* HÌNH ẢNH: Khung bo góc nhẹ tinh tế */}
                      <td className="p-3 text-center">
                        {item.image ? (
                          <div className="inline-block rounded-xl border border-gray-200 p-1 bg-white shadow-sm overflow-hidden">
                             <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-lg block" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-xl mx-auto flex items-center justify-center text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                            無圖片
                          </div>
                        )}
                      </td>

                      {/* ÂM THANH */}
                      <td className="p-4 text-center">
                        {item.audio ? (
                          <audio src={item.audio} controls className="h-8 mx-auto w-52 opacity-90 hover:opacity-100 transition-opacity" />
                        ) : (
                          <span className="text-xs text-gray-300 italic">無音檔資料</span>
                        )}
                      </td>

                      {/* TÙY CHỈNH: Nút bấm Đen - Trắng phong cách tối giản */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1.5 items-center">
                          <Link 
                            href={`/admin/sonant/edit/${item.id}`} 
                            className="w-20 py-1.5 border border-gray-200 text-gray-700 bg-white hover:bg-black hover:text-white hover:border-black rounded-lg text-center text-xs font-bold transition-all shadow-2xs"
                          >
                            修改
                          </Link>
                          <button 
                            onClick={() => handleDelete(item.id)} 
                            className="w-20 py-1.5 border border-gray-200 text-red-500 bg-white hover:bg-red-50 hover:border-red-200 rounded-lg text-center text-xs font-bold transition-all shadow-2xs"
                          >
                            刪除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PHÂN TRANG: Phong cách tối giản hiện đại */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-1.5 items-center">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 border border-gray-200 rounded-xl font-bold bg-white text-xs text-gray-500 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all shadow-2xs"
            >
              上一頁
            </button>

            <div className="flex gap-1 p-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === i + 1 
                    ? 'bg-black text-white shadow-sm scale-105' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 border border-gray-200 rounded-xl font-bold bg-white text-xs text-gray-500 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all shadow-2xs"
            >
              下一頁
            </button>
          </div>
        )}

      </div>
    </div>
  );
}