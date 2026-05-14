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
  
  // Khởi tạo form với giá trị rỗng để tránh lỗi Controlled/Uncontrolled
  const [form, setForm] = useState({
    vocabulary_vn: '',
    vocabulary_cn: '',
    sentence_vn: '',
    sentence_cn: '',
    audio_url: ''
  });

  // 1. Lấy dữ liệu cũ về
  useEffect(() => {
    const fetchCurrentVocab = async () => {
      const { data, error } = await supabase
        .from('vocabularies')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        // Đảm bảo các trường null được chuyển thành chuỗi rỗng
        setForm({
          vocabulary_vn: data.vocabulary_vn || '',
          vocabulary_cn: data.vocabulary_cn || '',
          sentence_vn: data.sentence_vn || '',
          sentence_cn: data.sentence_cn || '',
          audio_url: data.audio_url || ''
        });
      } else {
        alert("Không tìm thấy dữ liệu!");
        router.push('/admin/vocabulary/list');
      }
    };
    fetchCurrentVocab();
  }, [id, router]);

  // 2. Xử lý khi chọn file mới để nghe thử
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

  // 3. Xử lý Cập nhật
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let currentAudioUrl = form.audio_url;

      // Nếu có chọn file mới thì mới upload lên Storage
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

      // Cập nhật Database
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

      alert("🎉 Cập nhật thành công!");
      router.push('/admin/vocabulary/list');
    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <div className="mb-8 border-b-4 border-yellow-500 pb-4 text-center">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase">
          Chỉnh Sửa Từ Vựng
        </h1>
        <p className="text-slate-500 font-bold mt-2 italic text-sm">ID: {id}</p>
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-8">
        
        {/* Phần 1: Nội dung chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-blue-600 uppercase ml-1">🇻🇳 Tiếng Việt</label>
            <input 
              className="w-full border-2 border-slate-200 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-lg shadow-sm" 
              value={form.vocabulary_vn} 
              onChange={e => setForm({...form, vocabulary_vn: e.target.value})} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-red-600 uppercase ml-1">🇹🇼 Tiếng Trung</label>
            <input 
              className="w-full border-2 border-slate-200 p-4 rounded-xl focus:border-red-500 outline-none transition-all text-lg font-medium shadow-sm" 
              value={form.vocabulary_cn} 
              onChange={e => setForm({...form, vocabulary_cn: e.target.value})} 
              required 
            />
          </div>
        </div>

        {/* Phần 2: Quản lý Âm thanh */}
        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300">
          <label className="block text-lg font-bold text-slate-800 mb-4 uppercase">Âm thanh phát âm</label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Âm thanh hiện tại */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">Đang sử dụng:</p>
              {form.audio_url ? (
                <audio src={form.audio_url} controls className="w-full h-8" />
              ) : (
                <p className="text-sm text-red-400 italic">Chưa có tệp âm thanh</p>
              )}
            </div>

            {/* Upload file mới */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-black text-blue-400 mb-3 uppercase tracking-widest">Thay đổi tệp mới:</p>
              <input 
                type="file" 
                accept="audio/*" 
                onChange={handleFileChange}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
              {previewUrl && (
                <div className="mt-4 pt-4 border-t border-dashed border-slate-100">
                  <p className="text-[10px] font-bold text-green-600 uppercase mb-2">Nghe thử file mới:</p>
                  <audio src={previewUrl} controls className="w-full h-8" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Phần 3: Ví dụ minh họa (Đã đủ cả VN và CN) */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 block ml-1 uppercase">Câu ví dụ minh họa</label>
          <div className="space-y-4">
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
        </div>

        {/* Nút bấm điều hướng */}
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className={`flex-[2] p-5 rounded-2xl text-white font-black text-xl shadow-lg transition-all transform active:scale-95 ${loading ? 'bg-slate-400' : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:shadow-yellow-200'}`}
          >
            {loading ? "ĐANG LƯU..." : "XÁC NHẬN CẬP NHẬT"}
          </button>
          
          <button 
            type="button"
            onClick={() => router.push('/admin/vocabulary/list')}
            className="flex-1 px-4 py-5 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold hover:bg-slate-100 transition-all uppercase text-sm"
          >
            Hủy thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}