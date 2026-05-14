'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';

export default function MyVocabPage() {
  const [learnedList, setLearnedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const { user } = useAuth();

  const fetchLearnedData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/vocabularies/learned`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        // RẤT QUAN TRỌNG: Gửi kèm Cookie/Session để tránh lỗi 401
        credentials: 'include' 
      });

      if (res.ok) {
        const data = await res.json();
        setLearnedList(data);
      }
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLearnedData();
    }
  }, [user]);

  const handleUnlearn = async (vocabularyId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/vocabularies/unlearn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ vocabulary_id: vocabularyId }),
        credentials: 'include'
      });

      if (res.ok) {
        setLearnedList(prev => prev.filter(item => item.id !== vocabularyId));
      }
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-gray-400 italic">Vui lòng đăng nhập để xem kho từ vựng.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase">Kho từ của tôi</h1>
            <p className="text-teal-600 italic">Bạn đã học được {learnedList.length} từ vựng</p>
          </div>
          <button 
            onClick={() => window.location.href = '/vocabularies'}
            className="text-sm font-bold text-gray-400 hover:text-teal-600 transition-colors"
          >
            ← Quay lại học từ mới
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
          <div className="grid grid-cols-12 bg-gray-900 py-4 px-6 text-white font-bold uppercase text-xs tracking-widest">
            <div className="col-span-1">STT</div>
            <div className="col-span-5 text-left">Tiếng Việt</div>
            <div className="col-span-4 text-left">Tiếng Trung</div>
            <div className="col-span-2 text-right">Hành động</div>
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-20 text-center text-gray-400">Đang tải...</div>
            ) : learnedList.length > 0 ? (
              learnedList.map((item, index) => (
                <div key={item.id}>
                  <div 
                    className="grid grid-cols-12 py-5 px-6 hover:bg-gray-50 items-center transition-all cursor-pointer"
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  >
                    <div className="col-span-1 font-mono text-gray-300">{index + 1}</div>
                    <div className="col-span-5 text-xl font-bold text-left">{item.vocabulary_vn}</div>
                    <div className="col-span-4 text-lg text-gray-600 text-left">{item.vocabulary_cn}</div>
                    <div className="col-span-2 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnlearn(item.id);
                        }}
                        className="text-[10px] bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 px-3 py-1 rounded-full font-black uppercase transition-all"
                      >
                        Học lại
                      </button>
                    </div>
                  </div>

                  {openId === item.id && (
                    <div className="bg-gray-50 p-6 border-t animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-teal-500 text-left">
                          <p className="text-[10px] font-black text-teal-500 uppercase mb-1">Ví dụ Tiếng Việt</p>
                          <p className="text-lg italic text-gray-800">{item.sentence_vn || "Chưa có câu ví dụ"}</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-gray-400 text-left">
                          <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Ví dụ Tiếng Trung</p>
                          <p className="text-lg text-gray-700">{item.sentence_cn || "尚未有資料"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-20 text-center text-gray-400 font-medium italic">
                Danh sách trống. Hãy quay lại trang từ vựng để đánh dấu từ đã thuộc!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}