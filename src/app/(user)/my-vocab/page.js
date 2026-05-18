'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export default function MyVocabPage() {
  const [learnedList, setLearnedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State 存放搜尋關鍵字
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Thêm useRef để quản lý thực thể Audio chống trùng lặp âm
  const audioRef = useRef(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
      }
    };
    getSession();
  }, []);

  useEffect(() => {
    if (user) {
      fetchLearnedData();
    }
  }, [user]);

  const fetchLearnedData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_vocabularies')
        .select(`
          status,
          vocabularies:vocab_id (
            id,
            vocabulary_vn,
            vocabulary_cn,
            sentence_vn,
            sentence_cn,
            audio_url
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedData = data
        .filter(item => item.vocabularies !== null)
        .map(item => item.vocabularies);

      setLearnedList(formattedData);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✨ Đã loại bỏ hoàn toàn window.confirm để thực hiện xóa ngay lập tức
  const handleResetLearning = async (vocabularyId) => {
    try {
      const { error } = await supabase
        .from('user_vocabularies')
        .delete()
        .eq('user_id', user.id)
        .eq('vocab_id', vocabularyId);

      if (error) throw error;
      setLearnedList(prev => prev.filter(item => item.id !== vocabularyId));
    } catch (err) {
      console.error("Lỗi khi xóa:", err.message);
    }
  };

  // HÀM PHÁT ÂM THANH AN TOÀN - CHỐNG LẶP ÂM / TRÙNG ÂM
  const handlePlayAudio = (audioUrl) => {
    if (!audioUrl) return;

    // Nếu có âm thanh đang phát, dừng lại ngay lập tức
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const fullUrl = audioUrl.startsWith('http') 
      ? audioUrl 
      : `https://your-project-id.supabase.co/storage/v1/object/public/vocabularies/audio/${audioUrl}`;
    
    const newAudio = new Audio(fullUrl);
    audioRef.current = newAudio;

    // Xử lý chặn lỗi AbortError từ trình duyệt khi nhấn liên tục
    const playPromise = newAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        if (error.name !== 'AbortError') {
          console.error("Lỗi phát âm thanh:", error);
        }
      });
    }
  };

  // 篩選功能：根據關鍵字過濾單字清單
  const filteredList = learnedList.filter(item => 
    item.vocabulary_vn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vocabulary_cn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-20 text-gray-500">資料載入中...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 text-gray-800 text-left">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-2">我的單字庫</h1>
        <p className="text-teal-600 font-bold italic mb-8">
          您已學習了 {learnedList.length} 個越南語單字
        </p>

        {/* 搜尋欄 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="搜尋已學習的單字（越文或中文）..."
              className="w-full border-2 border-teal-50 rounded-xl px-12 py-3 text-lg focus:border-teal-500 outline-none transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-3.5 text-xl"><i className="ri-search-line"></i></span>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 列表表格 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-12 bg-gray-900 py-4 px-6 text-white font-bold text-[15px] tracking-[0.2em] uppercase">
            <div className="col-span-1">編號</div>
            <div className="col-span-4">越南文</div>
            <div className="col-span-4">中文</div>
            <div className="col-span-3 text-right">操作選項</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredList.length === 0 ? (
              <div className="p-10 text-center text-gray-400 font-medium">
                {searchTerm ? "找不到符合關鍵字的單字。" : "您目前尚未收藏 any 單字。"}
              </div>
            ) : (
              filteredList.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 py-5 px-6 items-center hover:bg-teal-50 transition-all">
                  <div className="col-span-1 font-mono text-gray-400">{index + 1}</div>
                  <div className="col-span-4 text-xl font-bold text-gray-800">{item.vocabulary_vn}</div>
                  <div className="col-span-4 text-lg text-gray-500">{item.vocabulary_cn}</div>
                  
                  <div className="col-span-3 flex justify-end gap-4 items-center">
                    <button 
                      onClick={() => handlePlayAudio(item.audio_url)}
                      className="text-teal-500 hover:scale-125 transition-transform text-xl"
                      title="播放發音"
                    >
                      <i className="ri-megaphone-fill"></i>
                    </button>
                    
                    <button 
                      onClick={() => handleResetLearning(item.id)}
                      className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                    >
                      重新學習
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}