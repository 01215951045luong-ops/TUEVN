"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

export default function EditVocabPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // 初始化 Form 預設為空字串，避免 Controlled/Uncontrolled 元件衝突
  const [form, setForm] = useState({
    vocabulary_vn: '',
    vocabulary_cn: '',
    sentence_vn: '',
    sentence_cn: '',
    audio_url: ''
  });

  // 1. 讀取原有單字資料
  useEffect(() => {
    const fetchCurrentVocab = async () => {
      const { data, error } = await supabase
        .from('vocabularies')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        // 確保 null 欄位會被轉換為空字串
        setForm({
          vocabulary_vn: data.vocabulary_vn || '',
          vocabulary_cn: data.vocabulary_cn || '',
          sentence_vn: data.sentence_vn || '',
          sentence_cn: data.sentence_cn || '',
          audio_url: data.audio_url || ''
        });
      } else {
        alert("找不到該單字資料！");
        router.push('/admin/vocabulary/list');
      }
    };
    fetchCurrentVocab();
  }, [id, router]);

  // 2. 處理新音檔選取與預聽
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  // 釋放記憶體暫存 URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // 3. 處理更新提交
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let currentAudioUrl = form.audio_url;

      // 如果有選擇新檔案，則上傳至 Storage
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `vocabulary/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('audios')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('audios')
          .getPublicUrl(filePath);
        
        currentAudioUrl = publicUrlData.publicUrl;
      }

      // 更新資料庫
      const { error: dbError } = await supabase
        .from('vocabularies')
        .update({
          vocabulary_vn: form.vocabulary_vn,
          vocabulary_cn: form.vocabulary_cn,
          sentence_vn: form.sentence_vn,
          sentence_cn: form.sentence_cn,
          audio_url: currentAudioUrl
        })
        .eq('id', id);

      if (dbError) throw dbError;

      alert(" 資料更新成功！");
      router.push('/admin/vocabulary/list');
    } catch (err) {
      alert("X 錯誤: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10 text-left">
      <div className="mb-8 border-b-4 border-yellow-500 pb-4 text-center">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase">
          修改單字內容
        </h1>
        <p className="text-slate-500 font-bold mt-2 italic text-sm">單字編號 (ID): {id}</p>
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-8">
        
        {/* 部分 1：核心內容 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-blue-600 uppercase ml-1">🇻🇳 越南文單字</label>
            <input 
              className="w-full border-2 border-slate-200 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-lg shadow-sm" 
              value={form.vocabulary_vn} 
              onChange={e => setForm({...form, vocabulary_vn: e.target.value})} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-red-600 uppercase ml-1">🇹🇼 中文翻譯（繁體）</label>
            <input 
              className="w-full border-2 border-slate-200 p-4 rounded-xl focus:border-red-500 outline-none transition-all text-lg font-medium shadow-sm" 
              value={form.vocabulary_cn} 
              onChange={e => setForm({...form, vocabulary_cn: e.target.value})} 
              required 
            />
          </div>
        </div>

        {/* 部分 2：音檔管理 */}
        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300">
          <label className="block text-lg font-bold text-slate-800 mb-4 uppercase">發音音檔管理</label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 目前使用的音檔 */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">目前使用音檔：</p>
              {form.audio_url ? (
                <audio src={form.audio_url} controls className="w-full h-8" />
              ) : (
                <p className="text-sm text-red-400 italic">目前無音檔資料</p>
              )}
            </div>

            {/* 上傳新音檔 */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-black text-blue-400 mb-3 uppercase tracking-widest">更換新音檔：</p>
              <input 
                type="file" 
                accept="audio/*" 
                onChange={handleFileChange}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
              {previewUrl && (
                <div className="mt-4 pt-4 border-t border-dashed border-slate-100">
                  <p className="text-[10px] font-bold text-green-600 uppercase mb-2">新音檔試聽：</p>
                  <audio src={previewUrl} controls className="w-full h-8" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 部分 3：例句說明 */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 block ml-1 uppercase">應用例句對照</label>
          <div className="space-y-4">
            <textarea 
              rows="2"
              className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-blue-400 outline-none transition-all bg-slate-50/50 shadow-inner" 
              placeholder="請輸入越南文應用例句..." 
              value={form.sentence_vn}
              onChange={e => setForm({...form, sentence_vn: e.target.value})} 
            />
            <textarea 
              rows="2"
              className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-red-400 outline-none transition-all bg-slate-50/50 shadow-inner" 
              placeholder="請輸入對應的中文翻譯例句..." 
              value={form.sentence_cn}
              onChange={e => setForm({...form, sentence_cn: e.target.value})} 
            />
          </div>
        </div>

        {/* 功能按鈕區 */}
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className={`flex-[2] p-5 rounded-2xl text-white font-black text-xl shadow-lg transition-all transform active:scale-95 ${loading ? 'bg-slate-400' : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:shadow-yellow-200'}`}
          >
            {loading ? "資料更新中..." : "確認更新"}
          </button>
          
          <button 
            type="button"
            onClick={() => router.push('/admin/vocabulary/list')}
            className="flex-1 px-4 py-5 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold hover:bg-slate-100 transition-all uppercase text-sm text-center"
          >
            取消變更
          </button>
        </div>
      </form>
    </div>
  );
}