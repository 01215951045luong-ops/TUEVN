"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddSonantPage() {
  const [name, setName] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewAudio, setPreviewAudio] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. 處理檔案預覽 (Preview)
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setPreviewAudio(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // 釋放記憶體暫存 URL
  useEffect(() => {
    return () => {
      if (previewAudio) URL.revokeObjectURL(previewAudio);
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewAudio, previewImage]);

  // 2. 處理表單提交與資料儲存
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let audioUrl = '';
      let imageUrl = '';

      // 上傳音檔至 Bucket 'sonants' 的 'audios' 資料夾
      if (audioFile) {
        const audioName = `audios/${Date.now()}_${audioFile.name}`;
        const { error: uploadErr } = await supabase.storage
          .from('sonants')
          .upload(audioName, audioFile);
        
        if (uploadErr) throw uploadErr;

        const { data: urlData } = supabase.storage.from('sonants').getPublicUrl(audioName);
        audioUrl = urlData.publicUrl;
      }

      // 上傳圖片至 Bucket 'sonants' 的 'images' 資料夾
      if (imageFile) {
        const imgName = `images/${Date.now()}_${imageFile.name}`;
        const { error: uploadErr } = await supabase.storage
          .from('sonants')
          .upload(imgName, imageFile);

        if (uploadErr) throw uploadErr;

        const { data: urlData } = supabase.storage.from('sonants').getPublicUrl(imgName);
        imageUrl = urlData.publicUrl;
      }

      // 將資料新增至 'sonants' 資料表
      const { error } = await supabase.from('sonants').insert([
        { 
          name: name, 
          audio: audioUrl, 
          image: imageUrl 
        }
      ]);

      if (error) throw error;

      // 成功提示並重設表單以便繼續輸入
      alert(" 新增成功！請繼續輸入下一個字母。");
      
      setName('');
      setAudioFile(null);
      setImageFile(null);
      setPreviewAudio(null);
      setPreviewImage(null);
      
      // 重設畫面的檔案輸入框
      e.target.reset();

    } catch (err) {
      alert("X 錯誤: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 text-left">
      <div className="mb-10 border-b-4 border-blue-600 pb-2 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-800">
          新增子音字母
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 space-y-8">
        
        {/* 輸入字母符號 */}
        <div className="space-y-3">
          <label className="text-lg font-black text-blue-700 uppercase italic">1. 子音字母符號</label>
          <input 
            className="w-full border-4 border-slate-50 p-5 rounded-2xl focus:border-blue-500 outline-none transition-all text-5xl font-black text-center bg-slate-50 shadow-inner" 
            placeholder="例如：B, C, D..." 
            value={name}
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>

        {/* 上傳圖片 */}
        <div className="p-6 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 text-center">
          <label className="block text-lg font-black text-blue-700 mb-4 uppercase">2. 示範圖片</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 text-sm mx-auto block cursor-pointer" />
          {previewImage && (
            <div className="relative inline-block">
              <img src={previewImage} className="h-40 w-40 object-cover rounded-2xl border-4 border-white shadow-xl mx-auto" alt="Preview" />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-md font-bold">✓</div>
            </div>
          )}
        </div>

        {/* 上傳音檔 */}
        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
          <label className="block text-lg font-black text-slate-700 mb-4 uppercase">3. 發音音檔</label>
          <input type="file" accept="audio/*" onChange={handleAudioChange} className="mb-4 text-sm mx-auto block cursor-pointer" />
          {previewAudio && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <audio src={previewAudio} controls className="w-full" />
            </div>
          )}
        </div>

        {/* 功能按鈕區塊 */}
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-[2] bg-blue-600 text-white p-6 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-lg active:scale-95 transition-all disabled:bg-slate-400 uppercase tracking-wider"
          >
            {loading ? "資料上傳中..." : "確認儲存"}
          </button>
          
          <button 
            type="button" 
            onClick={() => router.push('/admin/sonant/list')} 
            className="flex-1 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all uppercase text-sm text-center"
          >
            返回列表
          </button>
        </div>
      </form>
    </div>
  );
}