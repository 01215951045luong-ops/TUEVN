"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

export default function EditSonantPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [previewAudio, setPreviewAudio] = useState(null);
  
  const [form, setForm] = useState({
    name: '',
    audio: '',
    image: ''
  });

  // 1. Fetch dữ liệu từ database
  useEffect(() => {
    const fetchCurrentSonant = async () => {
      const { data, error } = await supabase
        .from('sonants')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setForm({
          name: data.name || '',
          audio: data.audio || '',
          image: data.image || ''
        });
      } else {
        alert("Không tìm thấy dữ liệu phụ âm này!");
        router.push('/admin/sonants/list');
      }
    };
    
    // Đã sửa lỗi gọi sai tên hàm (fetchCurrentSonant)
    fetchCurrentSonant(); 
  }, [id, router]);

  // 2. Xử lý Xem trước file (Preview)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setPreviewAudio(URL.createObjectURL(file));
    }
  };

  // 3. Xử lý Cập nhật
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedAudioUrl = form.audio;
      let updatedImageUrl = form.image;

      if (audioFile) {
        const audioName = `audios/${Date.now()}_${audioFile.name}`;
        const { error: upErr } = await supabase.storage.from('sonants').upload(audioName, audioFile);
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from('sonants').getPublicUrl(audioName);
        updatedAudioUrl = urlData.publicUrl;
      }

      if (imageFile) {
        const imgName = `images/${Date.now()}_${imageFile.name}`;
        const { error: upErr } = await supabase.storage.from('sonants').upload(imgName, imageFile);
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from('sonants').getPublicUrl(imgName);
        updatedImageUrl = urlData.publicUrl;
      }

      const { error: dbError } = await supabase
        .from('sonants')
        .update({
          name: form.name,
          audio: updatedAudioUrl,
          image: updatedImageUrl
        })
        .eq('id', id);

      if (dbError) throw dbError;

      alert("🎉 Cập nhật thành công!");
      router.push('/admin/sonant/list'); // Đã sửa lỗi route số nhiều
    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8">
      <div className="flex items-center justify-between mb-8 border-b-4 border-indigo-500 pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
            Chỉnh sửa Phụ âm
          </h1>
        </div>
        <button onClick={() => router.back()} className="text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase transition-colors">
          ← Quay lại
        </button>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50">
        
        {/* Nhập ký hiệu âm */}
        <div className="text-center space-y-2">
          <label className="text-[20px] font-black text-indigo-400 uppercase tracking-[0.3em]">Ký hiệu âm</label>
          <input 
            className="w-full text-8xl font-black text-center text-slate-800 border-b-4 border-slate-50 focus:border-indigo-500 outline-none transition-all py-4 focus:bg-indigo-50/20 rounded-3xl" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột Ảnh */}
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <span className="text-[20px] font-black text-slate-400 uppercase mb-4 tracking-widest">Hình ảnh</span>
            <img 
              src={previewImg || form.image || 'https://via.placeholder.com/150'} 
              className="w-32 h-32 object-cover rounded-2xl shadow-md border-4 border-white mb-4" 
              alt="preview" 
            />
            <input type="file" id="img-up" accept="image/*" onChange={handleImageChange} className="hidden" />
            <label htmlFor="img-up" className="cursor-pointer bg-white px-4 py-2 rounded-full text-[20px] font-black text-indigo-600 shadow hover:bg-indigo-600 hover:text-white transition-all uppercase border border-indigo-100">
              Chọn ảnh mới
            </label>
          </div>

          {/* Cột Audio - ĐÃ SỬA LỖI EMPTY STRING */}
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <span className="text-[20px] font-black text-slate-400 uppercase mb-4 tracking-widest">Âm thanh</span>
            <div className="w-full bg-white p-4 rounded-xl shadow-inner mb-4 min-h-[60px] flex items-center">
              {(previewAudio || form.audio) ? (
                <audio src={previewAudio || form.audio} controls className="w-full h-8" />
              ) : (
                <p className="w-full text-center text-[20px] text-slate-300 font-bold italic uppercase">Trống</p>
              )}
            </div>
            <input type="file" id="audio-up" accept="audio/*" onChange={handleAudioChange} className="hidden" />
            <label htmlFor="audio-up" className="cursor-pointer bg-white px-4 py-2 rounded-full text-[20px] font-black text-emerald-600 shadow hover:bg-emerald-600 hover:text-white transition-all uppercase border border-emerald-100">
              Chọn Audio mới
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full p-5 rounded-2xl text-white font-black text-xl shadow-xl transition-all transform active:scale-95 ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-indigo-200'}`}
        >
          {loading ? "ĐANG LƯU DỮ LIỆU..." : "XÁC NHẬN LƯU THAY ĐỔI"}
        </button>
      </form>
    </div>
  );
}