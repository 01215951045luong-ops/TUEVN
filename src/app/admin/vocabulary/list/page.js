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
    setLoading(true);
    const { data } = await supabase
      .from('vocabularies')
      .select('*')
      .order('id', { ascending: false });
    setVocabList(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Xóa mục này nhé?")) {
      await supabase.from('vocabularies').delete().eq('id', id);
      fetchVocab();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vocabList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vocabList.length / itemsPerPage);

  return (
    <div className="w-full p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-serif inline-block border-b-4 border-black pb-2 uppercase tracking-tighter font-black">
          bang tu vung
        </h1>
      </div>

      <div className="bg-white shadow-md border border-gray-300 overflow-hidden">
        <table className="w-full text-left table-fixed border-collapse">
          <thead>
            {/* Header giữ màu đen, chữ trắng nhưng cho to lên một chút */}
            <tr className="bg-black text-white text-[13px] font-black uppercase tracking-widest">
              <th className="p-4 border-r border-gray-700 w-16 text-center">ID</th>
              <th className="p-4 border-r border-gray-700 w-[15%]">TIENG VIET</th>
              <th className="p-4 border-r border-gray-700 w-[15%]">TIENG TRUNG</th>
              <th className="p-4 border-r border-gray-700 w-[18%] text-center">AM THANH</th>
              <th className="p-4 border-r border-gray-700 w-[22%]">CAU TIENG VIET</th>
              <th className="p-4 border-r border-gray-700 w-[22%]">CAU TIENG TRUNG</th>
              <th className="p-4 w-32 text-center">tuy chinh</th>
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="p-20 text-center text-2xl text-gray-400">Đang tải dữ liệu...</td></tr>
            ) : (
              currentItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                  <td className="p-4 text-center text-gray-400 font-bold">{item.id}</td>
                  
                  {/* Tiếng Việt: Chữ to và đậm */}
                  <td className="p-4 font-serif text-xl font-bold text-blue-800">
                    {item.vocabulary_vn}
                  </td>
                  
                  {/* Tiếng Trung: Chữ Hán cho cực to (text-3xl) để dễ học */}
                  <td className="p-4 font-serif text-3xl font-black text-red-700">
                    {item.vocabulary_cn}
                  </td>

                  <td className="p-4 text-center">
                    {item.audio_url && (
                      <audio src={item.audio_url} controls className="h-9 w-full max-w-[180px] mx-auto" />
                    )}
                  </td>

                  {/* Câu ví dụ: Chữ cỡ vừa (text-lg) dễ đọc */}
                  <td className="p-4 text-gray-700 font-serif text-lg leading-snug">
                    {item.sentence_vn}
                  </td>

                  <td className="p-4 text-gray-600 font-serif text-lg leading-snug">
                    {item.sentence_cn}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col gap-2 items-center">
                      <Link 
                        href={`/admin/vocabulary/edit/${item.id}`} 
                        className="bg-green-600 hover:bg-green-700 text-white w-20 py-1.5 rounded text-center text-xs font-black uppercase shadow-sm"
                      >
                        sua
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="bg-red-600 hover:bg-red-700 text-white w-20 py-1.5 rounded text-center text-xs font-black uppercase shadow-sm"
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

      {/* Phân trang to rõ */}
      <div className="flex justify-center mt-10 gap-2">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 border-2 rounded-lg font-bold hover:bg-gray-100"
        >
          « 
        </button>
        
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-5 py-2 rounded-lg text-lg font-black transition-all ${
              currentPage === i + 1 
              ? 'bg-blue-600 text-white scale-110 shadow-lg' 
              : 'bg-white border-2 text-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 border-2 rounded-lg font-bold hover:bg-gray-100"
        >
          »
        </button>
      </div>
    </div>
  );
}