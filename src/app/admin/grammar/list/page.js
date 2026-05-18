"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ListGrammarPage() {
  const [grammarList, setGrammarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // ✨ Trạng thái lưu từ khóa tìm kiếm ngữ pháp
  const itemsPerPage = 15; 

  useEffect(() => { fetchGrammars(); }, []);

  const fetchGrammars = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('grammars')
        .select('*')
        .order('lesson_no', { ascending: true })
        .order('id', { ascending: true });

      if (error) throw error;
      setGrammarList(data || []);
    } catch (err) {
      console.error("讀取語法資料失敗:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("您確定要刪除這條語法資料嗎？")) {
      try {
        const { error } = await supabase.from('grammars').delete().eq('id', id);
        if (error) throw error;
        fetchGrammars();
      } catch (err) {
        console.error("刪除失敗:", err.message);
      }
    }
  };

  // ✨ Bộ lọc tìm kiếm đa năng: Khớp theo Số bài học, Câu tiếng Việt hoặc Câu tiếng Trung
  const filteredGrammars = grammarList.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.lesson_no?.toString().includes(searchLower) || // Tìm theo bài (ví dụ: gõ "1" ra bài 1)
      item.sentence_vn?.toLowerCase().includes(searchLower) || // Tìm theo câu tiếng Việt
      item.sentence_cn?.toLowerCase().includes(searchLower)    // Tìm theo câu tiếng Trung
    );
  });

  // ✨ Reset trang về 1 bất cứ khi nào người dùng thay đổi từ khóa tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Tính toán phân trang dựa trên danh sách đã qua bộ lọc (filteredGrammars)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGrammars.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGrammars.length / itemsPerPage);

  return (
    <div className="w-full p-4 md:p-8 bg-[#fafafa] min-h-screen font-sans text-left text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* 頁首標題區塊 */}
        <div className="mb-8 flex justify-between items-center border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-black">
              語法教學管理
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              {searchTerm ? `關鍵字搜尋結果：共 ${filteredGrammars.length} 筆` : `目前系統內總計有 ${grammarList.length} 條語法句子`}
            </p>
          </div>
          <Link 
            href="/admin/grammar/add" 
            className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            + 新增語法
          </Link>
        </div>

        {/* ✨ THANH TÌM KIẾM - Đồng bộ giao diện tối giản đen trắng */}
        <div className="mb-6 bg-white rounded-2xl shadow-xs p-4 border border-gray-200/80">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="輸入課堂、越南文或中文句子進行搜尋..."
              className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black bg-gray-50/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Kính lúp bên trái */}
            <span className="absolute left-3.5 text-gray-400 text-sm"><i className="ri-search-line"></i></span>
            {/* Nút xóa nhanh từ khóa bên phải */}
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 text-gray-400 hover:text-black text-xs font-bold transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 資料表格卡片 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-fixed text-left">
              <thead>
                <tr className="bg-black text-white text-[15px] font-bold uppercase tracking-widest">
                  <th className="py-4 px-6 w-20 text-center">課</th>
                  <th className="py-4 px-6 w-[43%]">越南文句子</th>
                  <th className="py-4 px-6 w-[43%]">中文翻譯 </th>
                  <th className="py-4 px-4 text-center w-32">操作選項</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-20 text-center text-sm font-medium text-gray-400 tracking-wide animate-pulse">
                      資料載入中...
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-20 text-center text-sm font-medium text-gray-400">
                      {searchTerm ? "找不到符合關鍵字的語法資料。" : "目前尚無任何語法資料。"}
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-all">
                      {/* 課堂編號 */}
                      <td className="p-5 text-center align-middle">
                        <span className="inline-block bg-gray-100 text-black px-3 py-1.5 rounded-lg font-black font-mono text-base min-w-[40px]">
                          {item.lesson_no}
                        </span>
                      </td>
                      
                      {/* 越南文內容 */}
                      <td className="p-5 align-middle">
                        <p className="text-black font-bold leading-relaxed text-base tracking-wide">
                          {item.sentence_vn}
                        </p>
                      </td>

                      {/* 中文翻譯 */}
                      <td className="p-5 align-middle">
                        <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
                          {item.sentence_cn}
                        </p>
                      </td>

                      {/* 操作選項 */}
                      <td className="p-4 align-middle">
                        <div className="flex flex-col gap-1.5 items-center">
                          <Link 
                            href={`/admin/grammar/edit/${item.id}`} 
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

        {/* 底部精緻分頁區塊 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-1.5 items-center">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 border border-gray-200 rounded-xl font-bold bg-white text-xs text-gray-500 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all shadow-2xs"
            >
              上一頁
            </button>

            <div className="flex gap-1 p-1 max-w-[400px] overflow-x-auto">
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