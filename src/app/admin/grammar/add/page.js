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
      // 儲存至 grammars 資料表
      const { error } = await supabase.from('grammars').insert([
        { 
          lesson_no: parseInt(lessonNo), 
          sentence_vn: sentenceVn, 
          sentence_cn: sentenceCn 
        }
      ]);

      if (error) throw error;

      alert(" 語法資料新增成功！");
      
      // 清空輸入欄位以利連續輸入下一條資料
      setSentenceVn('');
      setSentenceCn('');

    } catch (err) {
      alert("X 錯誤: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <div className="mb-10 border-b-4 border-emerald-600 pb-2 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-800">
          新增語法教學
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 space-y-8">
        
       
        <div className="space-y-3">
          <label className="text-xl font-black text-emerald-700 uppercase ml-2 tracking-widest">1. 課號</label>
          <input 
            type="number"
            className="w-full border-4 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 outline-none transition-all text-2xl font-black bg-slate-50 shadow-inner" 
            placeholder="例如: 1" 
            value={lessonNo}
            onChange={e => setLessonNo(e.target.value)} 
            required 
          />
        </div>

        {/* 越南文句子 */}
        <div className="space-y-3">
          <label className="text-xl font-black text-emerald-700 uppercase ml-2 tracking-widest">2. 越南文句子</label>
          <textarea 
            rows="3"
            className="w-full border-4 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 outline-none transition-all text-lg font-bold bg-slate-50 shadow-inner" 
            placeholder="請輸入越南文語法句子內容..." 
            value={sentenceVn}
            onChange={e => setSentenceVn(e.target.value)} 
            required 
          />
        </div>

        {/* 中文翻譯 */}
        <div className="space-y-3">
          <label className="text-xl font-black text-emerald-700 uppercase ml-2 tracking-widest">3. 中文翻譯 </label>
          <textarea 
            rows="3"
            className="w-full border-4 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 outline-none transition-all text-lg font-bold bg-slate-50 shadow-inner" 
            placeholder="請輸入對應的中文翻譯內容..." 
            value={sentenceCn}
            onChange={e => setSentenceCn(e.target.value)} 
            required 
          />
        </div>

        {/* 按鈕系統 */}
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-[2] bg-emerald-600 text-white p-6 rounded-2xl font-black text-xl hover:bg-emerald-700 shadow-lg active:scale-95 transition-all disabled:bg-slate-400 uppercase"
          >
            {loading ? "資料儲存中..." : "確認儲存"}
          </button>
          
          <button 
            type="button" 
            onClick={() => router.push('/admin/grammar/list')} 
            className="flex-1 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all uppercase text-[15px]"
          >
            返回列表
          </button>
        </div>
      </form>
    </div>
  );
}