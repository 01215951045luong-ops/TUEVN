"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ListVocabPage() {
  const [vocabList, setVocabList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25; 

  useEffect(() => { fetchVocab(); }, []);

  const fetchVocab = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vocabularies')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      setVocabList(data || []);
    } catch (err) {
      console.error("讀取單字資料失敗:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("您確定要刪除此項目嗎？")) {
      try {
        const { error } = await supabase.from('vocabularies').delete().eq('id', id);
        if (error) throw error;
        fetchVocab();
      } catch (err) {
        console.error("刪除失敗:", err.message);
      }
    }
  };

  const getAudioUrl = (audioPath) => {
    if (!audioPath) return '';
    if (audioPath.startsWith('http')) return audioPath;
    return `https://ooszzkahxixtzflayhsc.supabase.co/storage/v1/object/public/vocabularies/audio/${audioPath}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vocabList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vocabList.length / itemsPerPage);

  return (
    <div className="w-full p-4 md:p-8 bg-[#fafafa] min-h-screen text-left text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 頁首標題區塊 - 完全同步黑白極簡風 */}
        <div className="mb-8 flex justify-between items-center border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-black text-black uppercase tracking-tight">
              單字管理
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              目前系統內總計有 {vocabList.length} 個單字資料
            </p>
          </div>
          <Link 
            href="/admin/vocabulary/add" 
            className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            + 新增單字
          </Link>
        </div>

        {/* 資料表格卡片 - 統一精緻表格樣式 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed border-collapse">
              <thead>
                <tr className="bg-black text-white text-[15px] font-bold uppercase tracking-widest">
                  <th className="p-4 w-16 text-center">ID</th>
                  <th className="p-4 w-[15%]">越南文</th>
                  <th className="p-4 w-[15%]">中文</th>
                  <th className="p-4 w-[18%] text-center">發音音檔</th>
                  <th className="p-4 w-[22%]">越南文例句</th>
                  <th className="p-4 w-[22%]">中文例句</th>
                  <th className="p-4 w-28 text-center">操作選項</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="p-20 text-center text-sm font-medium text-gray-400 tracking-wide animate-pulse">
                      資料載入中...
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-20 text-center text-sm font-medium text-gray-400">
                      目前尚無任何單字資料。
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-all">
                      {/* ID 欄位 */}
                      <td className="p-4 text-center align-middle text-gray-400 font-mono font-bold text-sm">
                        {item.id}
                      </td>
                      
                      {/* 越南文單字 */}
                      <td className="p-4 align-middle text-base font-bold text-black break-words tracking-wide">
                        {item.vocabulary_vn}
                      </td>
                      
                      {/* 中文單字 */}
                      <td className="p-4 align-middle text-[15px] font-medium text-gray-800 break-words">
                        {item.vocabulary_cn}
                      </td>

                      {/* 音檔撥放器 */}
                      <td className="p-4 text-center align-middle">
                        {item.audio_url ? (
                          <audio 
                            src={getAudioUrl(item.audio_url)} 
                            controls 
                            className="h-8 w-full max-w-[150px] mx-auto" 
                          />
                        ) : (
                          <span className="text-xs text-gray-300 italic">無音檔</span>
                        )}
                      </td>

                      {/* 越南文例句 */}
                      <td className="p-4 align-middle text-gray-600 text-sm leading-relaxed break-words">
                        {item.sentence_vn}
                      </td>

                      {/* 中文例句 */}
                      <td className="p-4 align-middle text-gray-500 text-sm leading-relaxed break-words">
                        {item.sentence_cn}
                      </td>

                      {/* 操作選項 - 修改為跟上一頁一樣的垂直排列、乾淨白底黑字風格 */}
                      <td className="p-4 align-middle">
                        <div className="flex flex-col gap-1.5 items-center">
                          <Link 
                            href={`/admin/vocabulary/edit/${item.id}`} 
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
                  className={`w-9 h-9 rounded-xl text-xs font-bold flex-shrink-0 transition-all ${
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