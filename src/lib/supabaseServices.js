import { supabase } from './supabase'

export const handleSaveVocab = async (formData, audioFile) => {
  let audioUrl = "";

  // 1. Upload file âm thanh (nếu có)
  if (audioFile) {
    const fileName = `${Date.now()}_${audioFile.name}`;
   // 1. Upload file lên Storage thành công
const { data: uploadData } = await supabase.storage
  .from('vocabularies')
  .upload(`audio/${fileName}`, audioFile);

// 2. LẤY LINK CÔNG KHAI (Public URL) - Bước này cực kỳ quan trọng
const { data: { publicUrl } } = supabase.storage
  .from('vocabularies')
  .getPublicUrl(`audio/${fileName}`);

// 3. LƯU LINK ĐÓ VÀO DATABASE
const { error: dbError } = await supabase
  .from('vocabularies')
  .insert([{ 
    vocabulary_vn: formData.vocabulary_vn,
    vocabulary_cn: formData.vocabulary_cn,
    sentence_vn: formData.sentence_vn,
    sentence_cn: formData.sentence_cn,
    audio_url: publicUrl // Link này phải được chèn vào đây
  }]);

  if (dbError) throw new Error("Lỗi lưu DB: " + dbError.message);
  
  return { success: true };
};
}