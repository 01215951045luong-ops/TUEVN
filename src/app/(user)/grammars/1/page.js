
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// 1. Import supabase client (Đảm bảo bạn đã tạo file này trong thư mục lib hoặc utils)
import { supabase } from '@/lib/supabase'; 

export default function GrammarDetail() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // lesson_no tương ứng với bài học của bạn
  const lessonNo = 1; 

  useEffect(() => {
    async function fetchGrammarData() {
      try {
        setLoading(true);
        
        // 2. Gọi trực tiếp từ Supabase thay vì fetch(127.0.0.1:8000)
        // Lấy dữ liệu từ bảng 'grammars' nơi lesson_no bằng 1
        const { data, error } = await supabase
          .from('grammars')
          .select('*')
          .eq('lesson_no', lessonNo);

        if (error) throw error;

        console.log("Dữ liệu từ Supabase:", data);
        setExamples(data || []);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu từ Supabase:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGrammarData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-500 font-bold hover:text-black mb-8"
        >
          ← 返回
        </button>

        {/* --- PHẦN NỘI DUNG NGỮ PHÁP (GIỮ NGUYÊN GIAO DIỆN CỦA BẠN) --- */}
        <article className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 mb-10">
  {/* 標題 */}
  <div className="flex items-center gap-4 mb-8">
    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">
      01
    </div>
    <h1 className="text-3xl md:text-4xl font-black text-gray-800">
       越語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-blue-600">判斷句 "Là" (是)</span>
    </h1>
  </div>

  <div className="space-y-10">
    {/* 1. 基本概念 */}
    <section>
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
        基本概念
      </h2>
      <p className="text-xl text-gray-600 leading-relaxed">
        在越南語中，<span className="font-bold text-red-500 text-2xl px-2">"Là"</span> 相當於漢語的 <span className="font-bold">「是」</span>。它主要用於連接主語和謂語，用來表示身份、職業、國籍或定義。
      </p>
    </section>

{/* --- 2. 句型結構 (Cấu trúc câu) --- */}
<section className="space-y-8">
  <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center">
    <span className="text-blue-600 mr-3">|</span> 2. 句型結構 (Cấu trúc câu)
  </h2>

  <div className="space-y-6">
    
    {/* --- 肯定句 --- */}
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <span className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4 block">肯定式 (Khẳng định)</span>
      
      {/* Công thức tổng quát */}
      <p className="text-2xl font-black text-gray-800 mb-4">
        主語 + <span className="text-blue-600">là</span> + 賓語 (名詞)
      </p>
      
      {/* Ví dụ nằm bên dưới */}
      <div className="pl-4 border-l-2 border-gray-100">
        <p className="text-xl font-bold text-gray-700">Tôi là sinh viên.</p>
        <p className="text-xl text-gray-400 italic mt-1">我是學生。</p>
      </div>
    </div>

    {/* --- 否定句 --- */}
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <span className="text-xl font-black text-red-500 uppercase tracking-widest mb-4 block">否定式 (Phủ định)</span>
      
      {/* Công thức tổng quát */}
      <p className="text-2xl font-black text-gray-800 mb-4">
        主語 + <span className="text-red-600">không phải là</span> + 賓語
      </p>
      
      {/* Ví dụ nằm bên dưới */}
      <div className="pl-4 border-l-2 border-gray-100">
        <p className="text-xl font-bold text-gray-700">Tôi không phải là bác sĩ.</p>
        <p className="text-xl text-gray-400 italic mt-1">我不是醫生。</p>
      </div>
    </div>

    {/* --- 疑問句 --- */}
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <span className="text-xl font-black text-orange-500 uppercase tracking-widest mb-4 block">疑問式 (Nghi vấn)</span>
      
      {/* Công thức tổng quát */}
      <p className="text-2xl font-black text-gray-800 mb-4 text-orange-600">
         主語 + có phải là + 賓語 + không?
      </p>
      
      {/* Ví dụ nằm bên dưới */}
      <div className="pl-4 border-l-2 border-gray-100">
        <p className="text-xl font-bold text-gray-700">Bạn có phải là người Việt Nam không?</p>
        <p className="text-xl text-gray-400 italic mt-1">你是越南人嗎？</p>
      </div>

      <p className="text-[20px] text-orange-600 font-bold mt-4 bg-orange-50 p-2 rounded-lg inline-block">
        ⚠️ 注意：越語不說 "là không là"
      </p>
    </div>

  </div>
</section>
  </div>
</article>

        {/* --- DANH SÁCH VÍ DỤ TỪ SUPABASE --- */}
        <section>
          <h3 className="text-3xl font-black text-gray-800 mb-8 flex items-center">
            <span className="text-blue-600 mr-3">|</span> 實戰例子 (Ví dụ thực tế)
          </h3>

          {loading ? (
            <div className="animate-pulse flex space-y-4 flex-col">
              <div className="h-24 bg-gray-200 rounded-[2rem]"></div>
              <div className="h-24 bg-gray-200 rounded-[2rem]"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {examples.map((item, index) => (
                <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 shadow-sm hover:border-blue-100 transition-all">
                  <div className="flex items-center gap-8">
                    <span className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0 shadow-lg shadow-blue-100">
                      {index + 1}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
                      <div className="flex flex-col">
                        <span className="text-[15px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2">越南語</span>
                        <p className="text-xl font-black text-gray-800 leading-tight">
                          {item.sentence_vn}
                        </p>
                      </div>

                      <div className="flex flex-col border-l-2 border-gray-100 md:pl-12">
                        <span className="text-[15px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">中文對照</span>
                        <p className="text-xl font-bold text-gray-600 leading-tight">
                          {item.sentence_cn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {examples.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                  <p className="text-xl text-gray-400 font-bold">目前沒有相關例句。</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}