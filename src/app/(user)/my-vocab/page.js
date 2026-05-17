'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function MyVocabPage() {
  const [learnedList, setLearnedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State để lưu từ khóa tìm kiếm
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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

  const handleResetLearning = async (vocabularyId) => {
    if (!window.confirm("Bạn muốn học lại từ này?")) return;
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

  // HÀM LỌC DANH SÁCH THEO TỪ KHÓA
  const filteredList = learnedList.filter(item => 
    item.vocabulary_vn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vocabulary_cn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-20 text-gray-500">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 text-gray-800 text-left">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-2">KHO TỪ CỦA TÔI</h1>
        <p className="text-teal-600 font-bold italic mb-8">
          Bạn đã học được {learnedList.length} từ vựng
        </p>

        {/* THANH TÌM KIẾM MỚI THÊM */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng đã học (Việt hoặc Trung)..."
              className="w-full border-2 border-teal-50 rounded-xl px-12 py-3 text-lg focus:border-teal-500 outline-none transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-3.5 text-xl">🔍</span>
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

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-12 bg-gray-900 py-4 px-6 text-white font-bold text-[11px] tracking-[0.2em] uppercase">
            <div className="col-span-1">STT</div>
            <div className="col-span-4">TIẾNG VIỆT</div>
            <div className="col-span-4">TIẾNG TRUNG</div>
            <div className="col-span-3 text-right">HÀNH ĐỘNG</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredList.length === 0 ? (
              <div className="p-10 text-center text-gray-400 font-medium">
                {searchTerm ? "Không tìm thấy từ vựng nào khớp với từ khóa." : "Bạn chưa lưu từ vựng nào."}
              </div>
            ) : (
              filteredList.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 py-5 px-6 items-center hover:bg-teal-50 transition-all">
                  <div className="col-span-1 font-mono text-gray-400">{index + 1}</div>
                  <div className="col-span-4 text-xl font-bold text-gray-800">{item.vocabulary_vn}</div>
                  <div className="col-span-4 text-lg text-gray-500">{item.vocabulary_cn}</div>
                  
                  <div className="col-span-3 flex justify-end gap-4 items-center">
                    <button 
                      onClick={() => {
                        const audio = new Audio(item.audio_url.startsWith('http') ? item.audio_url : `https://your-project-id.supabase.co/storage/v1/object/public/vocabularies/audio/${item.audio_url}`);
                        audio.play();
                      }}
                      className="text-teal-500 hover:scale-125 transition-transform text-xl"
                    >
                      🔊
                    </button>
                    
                    <button 
                      onClick={() => handleResetLearning(item.id)}
                      className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                    >
                      Học lại
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