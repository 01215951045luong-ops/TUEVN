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

  // 1. Xử lý xem trước file (Preview)
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

  // Thu hồi bộ nhớ cho URL tạm
  useEffect(() => {
    return () => {
      if (previewAudio) URL.revokeObjectURL(previewAudio);
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewAudio, previewImage]);

  // 2. Hàm xử lý Lưu dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let audioUrl = '';
      let imageUrl = '';

      // Upload AUDIO vào thư mục 'audios' trong bucket 'sonants'
      if (audioFile) {
        const audioName = `audios/${Date.now()}_${audioFile.name}`;
        const { error: uploadErr } = await supabase.storage
          .from('sonants')
          .upload(audioName, audioFile);
        
        if (uploadErr) throw uploadErr;

        const { data: urlData } = supabase.storage.from('sonants').getPublicUrl(audioName);
        audioUrl = urlData.publicUrl;
      }

      // Upload IMAGE vào thư mục 'images' trong bucket 'sonants'
      if (imageFile) {
        const imgName = `images/${Date.now()}_${imageFile.name}`;
        const { error: uploadErr } = await supabase.storage
          .from('sonants')
          .upload(imgName, imageFile);

        if (uploadErr) throw uploadErr;

        const { data: urlData } = supabase.storage.from('sonants').getPublicUrl(imgName);
        imageUrl = urlData.publicUrl;
      }

      // Lưu thông tin vào bảng 'sonants'
      const { error } = await supabase.from('sonants').insert([
        { 
          name: name, 
          audio: audioUrl, 
          image: imageUrl 
        }
      ]);

      if (error) throw error;

      // THÀNH CÔNG: Thông báo và Reset Form để nhập tiếp
      alert("🎉 Đã thêm thành công! Mời bạn nhập chữ cái tiếp theo.");
      
      setName('');
      setAudioFile(null);
      setImageFile(null);
      setPreviewAudio(null);
      setPreviewImage(null);
      
      // Reset input file thủ công (vì trình duyệt không cho phép set state trực tiếp cho file)
      e.target.reset();

    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <div className="mb-10 border-b-4 border-blue-600 pb-2 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-800">
          Thêm Phụ Âm Mới
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 space-y-8">
        
        {/* Nhập ký hiệu chữ cái */}
        <div className="space-y-3">
          <label className="text-lg font-black text-blue-700 uppercase italic">1. Ký hiệu chữ cái</label>
          <input 
            className="w-full border-4 border-slate-50 p-5 rounded-2xl focus:border-blue-500 outline-none transition-all text-5xl font-black text-center bg-slate-50 shadow-inner" 
            placeholder="A, B, C..." 
            value={name}
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>

        {/* Upload Hình ảnh */}
        <div className="p-6 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 text-center">
          <label className="block text-lg font-black text-blue-700 mb-4 uppercase">2. Hình ảnh minh họa</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 text-sm" />
          {previewImage && (
            <div className="relative inline-block">
              <img src={previewImage} className="h-40 w-40 object-cover rounded-2xl border-4 border-white shadow-xl mx-auto" alt="Preview" />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-md">✓</div>
            </div>
          )}
        </div>

        {/* Upload Âm thanh */}
        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
          <label className="block text-lg font-black text-slate-700 mb-4 uppercase">3. Âm thanh phát âm</label>
          <input type="file" accept="audio/*" onChange={handleAudioChange} className="mb-4 text-sm" />
          {previewAudio && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <audio src={previewAudio} controls className="w-full" />
            </div>
          )}
        </div>

        {/* Hệ thống nút bấm */}
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-[2] bg-blue-600 text-white p-6 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-lg active:scale-95 transition-all disabled:bg-slate-400 uppercase"
          >
            {loading ? "ĐANG TẢI LÊN..." : "XÁC NHẬN LƯU"}
          </button>
          
          <button 
            type="button" 
            onClick={() => router.push('/admin/sonant/list')} 
            className="flex-1 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all uppercase text-sm"
          >
            Xem danh sách
          </button>
        </div>
      </form>
    </div>
  );
}