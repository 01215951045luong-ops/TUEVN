"use client"
import { useState, useEffect } from 'react'
import { handleSaveVocab } from '@/lib/supabaseServices'
import { useRouter } from 'next/navigation'

export default function AddVocabPage() {
  // KHẮC PHỤC LỖI image_2c9f36.png: Luôn để giá trị mặc định là chuỗi rỗng ''
  const [form, setForm] = useState({ 
    vocabulary_vn: '', 
    vocabulary_cn: '', 
    sentence_vn: '', 
    sentence_cn: '' 
  });
  
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Xử lý khi chọn file âm thanh
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  // Thu hồi bộ nhớ URL tạm
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Xử lý gửi dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Gọi service lưu vào Supabase
      await handleSaveVocab(form, file);
      
      alert("🎉 Đã thêm thành công! Mời bạn nhập từ tiếp theo.");

      // RESET FORM: Đưa tất cả về rỗng để nhập tiếp mà không cần chuyển trang
      setForm({ 
        vocabulary_vn: '', 
        vocabulary_cn: '', 
        sentence_vn: '', 
        sentence_cn: '' 
      });
      setFile(null);
      setPreviewUrl(null);
      
      // Reset input file trên giao diện
      e.target.reset(); 

    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <div className="mb-8 border-b-4 border-indigo-600 pb-4">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase">
          Thêm Từ Vựng Mới
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-8">
        
        {/* Phần 1: Nội dung chính (Từ vựng) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-blue-600 uppercase ml-1">🇻🇳 Tiếng Việt</label>
            <input 
              className="w-full border-2 border-slate-200 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-lg shadow-sm" 
              placeholder="Ví dụ: Xin chào" 
              value={form.vocabulary_vn} // Controlled input
              onChange={e => setForm({...form, vocabulary_vn: e.target.value})} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-red-600 uppercase ml-1">🇹🇼 Tiếng Trung</label>
            <input 
              className="w-full border-2 border-slate-200 p-4 rounded-xl focus:border-red-500 outline-none transition-all text-lg font-medium shadow-sm" 
              placeholder="Ví dụ: 你好" 
              value={form.vocabulary_cn} // Controlled input
              onChange={e => setForm({...form, vocabulary_cn: e.target.value})} 
              required 
            />
          </div>
        </div>

        {/* Phần 2: Âm thanh & Nghe thử */}
        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300">
          <div className="flex items-center justify-between mb-4">
            <label className="text-lg font-bold text-slate-800 uppercase">Tệp phát âm</label>
            {file && <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold uppercase">Sẵn sàng</span>}
          </div>

          <input 
            type="file" 
            accept="audio/*" 
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-slate-800 file:text-white hover:file:bg-black cursor-pointer"
            onChange={handleFileChange} 
          />

          {previewUrl && (
            <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm animate-in fade-in duration-500">
              <p className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Nghe thử:</p>
              <audio src={previewUrl} controls className="w-full h-10" />
            </div>
          )}
        </div>

        {/* Phần 3: Ví dụ minh họa */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 block ml-1 uppercase">Câu ví dụ minh họa</label>
          <textarea 
            rows="2"
            className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-blue-400 outline-none transition-all bg-slate-50/50 shadow-inner" 
            placeholder="Câu ví dụ bằng Tiếng Việt..." 
            value={form.sentence_vn}
            onChange={e => setForm({...form, sentence_vn: e.target.value})} 
          />
          <textarea 
            rows="2"
            className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-red-400 outline-none transition-all bg-slate-50/50 shadow-inner" 
            placeholder="Câu ví dụ bằng Tiếng Trung..." 
            value={form.sentence_cn}
            onChange={e => setForm({...form, sentence_cn: e.target.value})} 
          />
        </div>

        {/* Nút bấm */}
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className={`flex-[2] p-5 rounded-2xl text-white font-black text-xl shadow-lg transition-all transform active:scale-95 ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-indigo-200'}`}
          >
            {loading ? "ĐANG LƯU..." : "XÁC NHẬN LƯU"}
          </button>
          
          <button 
            type="button"
            onClick={() => router.push('/admin/vocabulary/list')}
            className="flex-1 px-4 py-5 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold hover:bg-slate-100 transition-all uppercase text-sm"
          >
            Danh sách
          </button>
        </div>
      </form>
    </div>
  );
}