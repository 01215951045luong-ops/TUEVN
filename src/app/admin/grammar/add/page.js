"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddGrammarPage() {
  const [lessonNo, setLessonNo] = useState('');
  const [sentenceVn, setSentenceVn] = useState('');
  const [sentenceCn, setSentenceCn] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Lưu vào bảng 'grammars' (tên bảng trong Database vẫn thường là số nhiều theo image_2c1bb6.png)
      const { error } = await supabase.from('grammars').insert([
        { 
          lesson_no: parseInt(lessonNo), 
          sentence_vn: sentenceVn, 
          sentence_cn: sentenceCn 
        }
      ]);

      if (error) throw error;

      alert("🎉 Đã thêm ngữ pháp thành công!");
      
      // Reset nội dung câu để nhập câu tiếp theo
      setSentenceVn('');
      setSentenceCn('');

    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <div className="mb-10 border-b-4 border-emerald-600 pb-2 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-800">
          Thêm Ngữ Pháp Mới
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 space-y-8">
        
        {/* Số bài học */}
        <div className="space-y-3">
          <label className="text-xs font-black text-emerald-700 uppercase ml-2 tracking-widest">1. Bài học số (Lesson No)</label>
          <input 
            type="number"
            className="w-full border-4 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 outline-none transition-all text-2xl font-black bg-slate-50 shadow-inner" 
            placeholder="Ví dụ: 1" 
            value={lessonNo}
            onChange={e => setLessonNo(e.target.value)} 
            required 
          />
        </div>

        {/* Câu tiếng Việt */}
        <div className="space-y-3">
          <label className="text-xs font-black text-emerald-700 uppercase ml-2 tracking-widest">2. Câu tiếng Việt (sentence_vn)</label>
          <textarea 
            rows="3"
            className="w-full border-4 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 outline-none transition-all text-lg font-bold bg-slate-50 shadow-inner" 
            placeholder="Nhập nội dung câu tiếng Việt..." 
            value={sentenceVn}
            onChange={e => setSentenceVn(e.target.value)} 
            required 
          />
        </div>

        {/* Câu tiếng Trung/Dịch */}
        <div className="space-y-3">
          <label className="text-xs font-black text-emerald-700 uppercase ml-2 tracking-widest">3. Câu tiếng Trung (sentence_cn)</label>
          <textarea 
            rows="3"
            className="w-full border-4 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 outline-none transition-all text-lg font-bold bg-slate-50 shadow-inner" 
            placeholder="Nhập nội dung câu dịch tương ứng..." 
            value={sentenceCn}
            onChange={e => setSentenceCn(e.target.value)} 
            required 
          />
        </div>

        {/* Hệ thống nút bấm */}
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-[2] bg-emerald-600 text-white p-6 rounded-2xl font-black text-xl hover:bg-emerald-700 shadow-lg active:scale-95 transition-all disabled:bg-slate-400 uppercase"
          >
            {loading ? "ĐANG LƯU..." : "XÁC NHẬN LƯU"}
          </button>
          
          <button 
            type="button" 
            // ĐÃ SỬA: Chuyển hướng về đúng thư mục 'grammar' (không có s)
            onClick={() => router.push('/admin/grammar/list')} 
            className="flex-1 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all uppercase text-[10px]"
          >
            Danh sách
          </button>
        </div>
      </form>
    </div>
  );
}