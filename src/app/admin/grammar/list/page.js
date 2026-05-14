"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ListGrammarPage() {
  const [grammarList, setGrammarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Giảm số lượng hiển thị mỗi trang vì câu ngữ pháp thường dài

  useEffect(() => { fetchGrammars(); }, []);

  const fetchGrammars = async () => {
    setLoading(true);
    // Truy vấn bảng 'grammars' và sắp xếp theo bài học (lesson_no)
    const { data } = await supabase
      .from('grammars')
      .select('*')
      .order('lesson_no', { ascending: true })
      .order('id', { ascending: true });
    setGrammarList(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa câu ngữ pháp này không?")) {
      await supabase.from('grammars').delete().eq('id', id);
      fetchGrammars();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = grammarList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(grammarList.length / itemsPerPage);

  return (
    <div className="w-full p-6 bg-[#f8fafc] min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-slate-800 border-b-4 border-emerald-500 pb-1 uppercase tracking-tighter">
          Quản lý Ngữ pháp
        </h1>
        <Link 
          href="/admin/grammar/add" 
          className="bg-emerald-600 text-white px-6 py-2 rounded-full font-black text-sm hover:bg-emerald-700 shadow-lg transition-all active:scale-95"
        >
          + THÊM MỚI
        </Link>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em]">
              <th className="py-4 px-6 w-20 text-center">Bài</th>
              <th className="py-4 px-6 w-1/3">Tiếng Việt (sentence_vn)</th>
              <th className="py-4 px-6 w-1/3">Tiếng Trung (sentence_cn)</th>
              <th className="py-4 px-6 text-center">Thao tác</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="4" className="p-20 text-center font-bold text-slate-400 animate-pulse uppercase tracking-widest">Đang tải dữ liệu...</td></tr>
            ) : grammarList.length === 0 ? (
              <tr><td colSpan="4" className="p-20 text-center text-slate-400 italic">Chưa có dữ liệu ngữ pháp.</td></tr>
            ) : (
              currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 text-center">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg font-black text-lg">
                      {item.lesson_no}
                    </span>
                  </td>
                  
                  <td className="p-6">
                    <p className="text-slate-800 font-bold leading-relaxed text-sm">
                      {item.sentence_vn}
                    </p>
                  </td>

                  <td className="p-6">
                    <p className="text-slate-500 font-medium leading-relaxed text-sm italic">
                      {item.sentence_cn}
                    </p>
                  </td>

                  <td className="p-6">
                    <div className="flex gap-2 justify-center">
                      <Link 
                        href={`/admin/grammar/edit/${item.id}`} 
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest border border-blue-100"
                      >
                        Sửa
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest border border-red-100"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl text-sm font-black transition-all shadow-sm ${
                currentPage === i + 1 
                ? 'bg-emerald-600 text-white scale-110 shadow-emerald-200' 
                : 'bg-white text-slate-400 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}