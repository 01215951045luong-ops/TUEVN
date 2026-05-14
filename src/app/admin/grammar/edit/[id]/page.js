"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

export default function EditGrammarPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    lesson_no: '',
    sentence_vn: '',
    sentence_cn: ''
  });

  // 1. Lấy dữ liệu hiện tại từ database grammars
  useEffect(() => {
    const fetchGrammar = async () => {
      setFetching(true);
      const { data, error } = await supabase
        .from('grammars')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setForm({
          lesson_no: data.lesson_no || '',
          sentence_vn: data.sentence_vn || '',
          sentence_cn: data.sentence_cn || ''
        });
      } else {
        alert("❌ Không tìm thấy dữ liệu ngữ pháp này!");
        router.push('/admin/grammar/list');
      }
      setFetching(false);
    };
    
    if (id) fetchGrammar(); 
  }, [id, router]);

  // 2. Xử lý Cập nhật văn bản
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: dbError } = await supabase
        .from('grammars')
        .update({
          lesson_no: parseInt(form.lesson_no),
          sentence_vn: form.sentence_vn,
          sentence_cn: form.sentence_cn
        })
        .eq('id', id);

      if (dbError) throw dbError;

      alert("🎉 Cập nhật ngữ pháp thành công!");
      router.push('/admin/grammar/list'); 
    } catch (err) {
      alert("❌ Lỗi cập nhật: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center p-20 font-bold animate-bounce">ĐANG TẢI DỮ LIỆU...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8">
      <div className="flex items-center justify-between mb-8 border-b-4 border-emerald-500 pb-4">
        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
          Chỉnh sửa Ngữ pháp
        </h1>
        <button onClick={() => router.back()} className="text-slate-400 hover:text-emerald-600 font-bold text-xs uppercase transition-colors">
          ← Quay lại
        </button>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50">
        
        {/* Số bài học */}
        <div className="space-y-2">
          <label className="text-xl font-black text-emerald-600 uppercase tracking-[0.2em] ml-2">Bài học số</label>
          <input 
            type="number"
            className="w-full text-4xl font-black text-emerald-700 bg-slate-50 border-4 border-transparent focus:border-emerald-500 outline-none transition-all p-4 rounded-3xl shadow-inner" 
            value={form.lesson_no} 
            onChange={e => setForm({...form, lesson_no: e.target.value})} 
            required
          />
        </div>

        {/* Câu Tiếng Việt */}
        <div className="space-y-2">
          <label className="text-xl font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Câu Tiếng Việt (sentence_vn)</label>
          <textarea 
            rows="4"
            className="w-full text-lg font-bold text-slate-800 bg-slate-50 border-4 border-transparent focus:border-emerald-500 outline-none transition-all p-5 rounded-3xl shadow-inner" 
            value={form.sentence_vn} 
            onChange={e => setForm({...form, sentence_vn: e.target.value})} 
            required
          />
        </div>

        {/* Câu Tiếng Trung */}
        <div className="space-y-2">
          <label className="text-xl font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Câu Tiếng Trung (sentence_cn)</label>
          <textarea 
            rows="4"
            className="w-full text-lg font-bold text-slate-500 italic bg-slate-50 border-4 border-transparent focus:border-emerald-500 outline-none transition-all p-5 rounded-3xl shadow-inner" 
            value={form.sentence_cn} 
            onChange={e => setForm({...form, sentence_cn: e.target.value})} 
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full p-5 rounded-3xl text-white font-black text-xl shadow-xl transition-all transform active:scale-95 ${
            loading 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
          }`}
        >
          {loading ? "ĐANG LƯU THAY ĐỔI..." : "XÁC NHẬN CẬP NHẬT"}
        </button>
      </form>
    </div>
  );
}