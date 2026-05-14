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
    setLoading(true);
    const { data } = await supabase
      .from('sonants')
      .select('*')
      .order('id', { ascending: true });
    setSonantsList(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Xóa mục này nhé?")) {
      await supabase.from('sonants').delete().eq('id', id);
      fetchSonants();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sonantsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sonantsList.length / itemsPerPage);

  return (
    <div className="w-full p-4 bg-[#f4f4f4] min-h-screen font-sans">
      <div className="mb-4">
        <h1 className="text-2xl font-serif text-gray-800 border-b-2 border-blue-500 inline-block pb-1">
          Danh sách phụ âm
        </h1>
      </div>

      <div className="bg-white overflow-hidden shadow-sm border border-gray-300">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black text-white text-[12px] font-bold uppercase tracking-wider">
              <th className="py-3 px-4 border-r border-gray-800 w-20 text-center">ID</th>
              <th className="py-3 px-4 border-r border-gray-800 text-center w-1/4">TÊN ÂM TIẾT</th>
              <th className="py-3 px-4 border-r border-gray-800 text-center">HÌNH ẢNH</th>
              <th className="py-3 px-4 border-r border-gray-800 text-center">ÂM THANH</th>
              <th className="py-3 px-4 text-center w-32">TÙY CHỈNH</th>
            </tr>
          </thead>
          
          <tbody className="bg-[#f9f9f9]">
            {loading ? (
              <tr><td colSpan="5" className="p-10 text-center italic">Đang tải...</td></tr>
            ) : (
              currentItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="p-4 text-center text-sm font-bold text-gray-500">{item.id}</td>
                  
                  {/* TÊN ÂM TIẾT: Đã chỉnh lên text-5xl và font-black để cực kỳ to */}
                  <td className="p-4 text-center">
                    <span className="text-5xl font-black text-gray-800 tracking-tighter uppercase">
                      {item.name}
                    </span>
                  </td>

                  <td className="p-2 text-center">
                    {item.image ? (
                      <div className="inline-block border-2 border-gray-400 p-1 bg-white shadow-sm">
                         <img src={item.image} alt="" className="w-20 h-20 object-cover block" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 mx-auto flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    {item.audio && (
                      <audio src={item.audio} controls className="h-9 mx-auto w-56" />
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-1 justify-center">
                      <Link 
                        href={`/admin/sonant/edit/${item.id}`} 
                        className="bg-[#28a745] text-white px-3 py-1 rounded text-xs font-bold hover:bg-green-700 shadow-sm"
                      >
                        Sửa
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="bg-[#dc3545] text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-700 shadow-sm"
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

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm font-bold border ${
                currentPage === i + 1 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
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