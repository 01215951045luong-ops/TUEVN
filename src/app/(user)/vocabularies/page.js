'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; 

export default function VocabPage() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null); 

  const PAGE_SIZE = 50; 

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    checkUser();
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, user]);

  const fetchData = async (page) => {
    try {
      setIsLoading(true);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from('vocabularies')
        .select('*', { count: 'exact' });

      if (user) {
        const { data: learnedIds } = await supabase
          .from('user_vocabularies') 
          .select('vocab_id')
          .eq('user_id', user.id);
        
        if (learnedIds && learnedIds.length > 0) {
          const ids = learnedIds.map(item => item.vocab_id);
          query = query.not('id', 'in', `(${ids.join(',')})`);
        }
      }

      const { data, error, count } = await query
        .order('id', { ascending: true })
        .range(from, to);

      if (error) throw error;
      setList(data || []);
      setLastPage(Math.ceil((count || 0) / PAGE_SIZE));
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = (item) => {
    const rawUrl = item.audio_url; 
    if (!rawUrl) return;

    let finalUrl = '';
    if (rawUrl.startsWith('http')) {
      finalUrl = rawUrl;
    } else {
      const { data } = supabase.storage
        .from('vocabularies') 
        .getPublicUrl(`audio/${rawUrl}`);
      finalUrl = data.publicUrl;
    }

    const audio = new Audio(finalUrl);
    audio.play().catch(e => console.error("Lỗi âm thanh:", e.message));
  };

  const handleMarkAsLearned = async (e, vocabularyId) => {
    e.stopPropagation();
    if (!user) return; 
    try {
      const { error } = await supabase
        .from('user_vocabularies') 
        .insert([{ user_id: user.id, vocab_id: vocabularyId }]);
      
      if (error) throw error;
      setList(prevList => prevList.filter(item => item.id !== vocabularyId));
    } catch (err) {
      console.error("Lỗi khi lưu:", err.message);
    }
  };

  const filteredList = list.filter((item, index) => {
    const search = searchTerm.toLowerCase();
    const stt = (index + 1 + (currentPage - 1) * PAGE_SIZE).toString();
    return (
      stt.includes(search) || 
      item.vocabulary_vn?.toLowerCase().includes(search) || 
      item.vocabulary_cn?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* 智能篩選系統 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100 text-left">
          <label className="text-lg font-bold text-teal-600 mb-3 block italic">
            智能篩選系統
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="請輸入序號或單字進行搜尋..."
              className="w-full border-2 border-teal-100 rounded-xl px-12 py-4 text-lg focus:border-teal-500 outline-none shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-5 text-xl"><i className="ri-search-line"></i></span>
          </div>
        </div>

        {/* 標題與分頁 */}
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl font-black text-gray-900 uppercase">單字列表</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
              disabled={currentPage === 1 || isLoading}
              className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              上一頁
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(p + 1, lastPage))}
              disabled={currentPage === lastPage || isLoading}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 disabled:opacity-30 transition-all"
            >
              下一頁
            </button>
          </div>
        </div>

        {/* 數據表格 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-12 bg-gray-900 py-4 px-6 text-white font-bold text-[15px] tracking-[0.2em] uppercase">
            <div className="col-span-1">{user ? '已學' : '序號'}</div>
            <div className="col-span-5 text-left">越南文</div>
            <div className="col-span-5 text-left">中文</div>
            <div className="col-span-1 text-right">詳情</div>
          </div>

          <div className="divide-y divide-gray-100 text-left">
            {filteredList.map((item, index) => (
              <div key={item.id} className="group">
                <div 
                  className="grid grid-cols-12 py-5 px-6 cursor-pointer hover:bg-teal-50 items-center transition-all"
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                >
                  <div className="col-span-1 flex justify-start">
                    {user ? (
                      <input type="checkbox" className="w-6 h-6 accent-teal-600 cursor-pointer"
                             onChange={(e) => handleMarkAsLearned(e, item.id)}
                             onClick={(e) => e.stopPropagation()} />
                    ) : (
                      <span className="font-mono text-gray-400">{index + 1 + (currentPage - 1) * PAGE_SIZE}</span>
                    )}
                  </div>
                  <div className="col-span-5 text-xl font-bold text-gray-800">{item.vocabulary_vn}</div>
                  <div className="col-span-5 text-lg text-gray-500">{item.vocabulary_cn}</div>
                  <div className="col-span-1 text-right text-teal-400 font-bold text-2xl">{openId === item.id ? '−' : '+'}</div>
                </div>

                {openId === item.id && (
                  <div className="bg-[#fcfdfd] p-6 border-t border-teal-100 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-white rounded-2xl shadow-sm border-l-4 border-teal-500">
                        <p className="text-[15px] font-black text-teal-500 uppercase mb-2">越南文例句</p>
                        <p className="text-lg italic text-gray-700 leading-relaxed">{item.sentence_vn || "暫無資料"}</p>
                      </div>
                      <div className="p-5 bg-white rounded-2xl shadow-sm border-l-4 border-gray-300">
                        <p className="text-[15px] font-black text-gray-400 uppercase mb-2">中文例句</p>
                        <p className="text-lg text-gray-600 leading-relaxed">{item.sentence_cn || "暫無資料"}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handlePlayAudio(item); }}
                        className="bg-teal-500 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-teal-600 active:scale-95 transition-all flex items-center gap-2"
                      >
                        <span><i className="ri-megaphone-fill"></i></span> 播放發音
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}