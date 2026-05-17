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

  // 1. 從 grammars 資料表讀取目前的資料
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
        alert("X 找不到此筆語法資料！");
        router.push('/admin/grammar/list');
      }
      setFetching(false);
    };
    
    if (id) fetchGrammar(); 
  }, [id, router]);

  // 2. 處理文字更新
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

      alert(" 語法資料更新成功！");
      router.push('/admin/grammar/list'); 
    } catch (err) {
      alert(" X 更新失敗: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center p-20 font-bold animate-bounce text-slate-500 tracking-widest">資料載入中...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8">
      <div className="flex items-center justify-between mb-8 border-b-4 border-emerald-500 pb-4">
        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
          修改語法教學
        </h1>
        <button onClick={() => router.back()} className="text-slate-400 hover:text-emerald-600 font-bold text-xs uppercase transition-colors">
          ← 返回
        </button>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50">
        
        {/* 課堂編號 */}
        <div className="space-y-2">
          <label className="text-xl font-black text-emerald-600 uppercase tracking-[0.2em] ml-2">課堂編號</label>
          <input 
            type="number"
            className="w-full text-4xl font-black text-emerald-700 bg-slate-50 border-4 border-transparent focus:border-emerald-500 outline-none transition-all p-4 rounded-3xl shadow-inner" 
            value={form.lesson_no} 
            onChange={e => setForm({...form, lesson_no: e.target.value})} 
            required
          />
        </div>

        {/* 越南文句子 */}
        <div className="space-y-2">
          <label className="text-xl font-black text-slate-400 uppercase tracking-[0.2em] ml-2">越南文句子 (sentence_vn)</label>
          <textarea 
            rows="4"
            className="w-full text-lg font-bold text-slate-800 bg-slate-50 border-4 border-transparent focus:border-emerald-500 outline-none transition-all p-5 rounded-3xl shadow-inner" 
            value={form.sentence_vn} 
            onChange={e => setForm({...form, sentence_vn: e.target.value})} 
            required
          />
        </div>

        {/* 中文翻譯 */}
        <div className="space-y-2">
          <label className="text-xl font-black text-slate-400 uppercase tracking-[0.2em] ml-2">中文翻譯 (sentence_cn)</label>
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
          {loading ? "資料儲存中..." : "確認更新"}
        </button>
      </form>
    </div>
  );
}