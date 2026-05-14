'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GrammarDetail() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // Vì folder của bạn tên là "1" nên ta cố định id này để fetch đúng bài 1
  const id = "2"; 

  useEffect(() => {
    // Gọi đến API Laravel đã chạy thành công của bạn
    fetch(`http://127.0.0.1:8000/api/grammars/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Lỗi Server");
        return res.json();
      })
      .then(data => {
        console.log("Dữ liệu từ database:", data);
        setExamples(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi kết nối API:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-500 font-bold hover:text-black mb-8"
        >
          ← QUAY LẠI
        </button>

        {/* --- NỘI DUNG NGỮ PHÁP --- */}
        {/* --- 語法內容部分 (NGỮ PHÁP TIẾNG VIỆT) --- */}
{/* --- 語法內容部分 (NGỮ PHÁP TIẾNG VIỆT) --- */}
        <article className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 mb-10">
          {/* 標題 */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-teal-100">
              02
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-800">
                越語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-teal-600">所有格結構 "Của" (的)</span>
            </h1>
          </div>

          <div className="space-y-10">
            {/* 1. 基本概念 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-teal-500 rounded-full mr-3"></div>
                基本概念
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                在越南語中，表示所有關係（的）主要使用 <span className="font-bold text-teal-600 text-2xl px-2">"Của"</span>。
                <br />
                <span className="text-orange-600 font-bold">⚠️ 重要提示：</span> 越南語的語序與漢語<span className="underline decoration-orange-300">完全相反</span>。
              </p>
            </section>

            {/* 2. 句型結構 (Cấu trúc câu) */}
            <section className="space-y-8">
              <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center">
                <span className="text-teal-600 mr-3">|</span> 2. 句型結構 (Cấu trúc câu)
              </h2>

              <div className="space-y-6">
                
                {/* --- 基礎結構 --- */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-xl font-black text-teal-500 uppercase tracking-widest mb-4 block">標準式 (Standard)</span>
                  
                  {/* Công thức tổng quát */}
                  <p className="text-2xl font-black text-gray-800 mb-4">
                    被所有者 (物/人) + <span className="text-teal-600">của</span> + 所有者 (主語)
                  </p>
                  
                  {/* Ví dụ nằm bên dưới */}
                  <div className="pl-4 border-l-2 border-teal-200">
                    <p className="text-xl font-bold text-gray-700">Sách <span className="text-teal-600">của</span> tôi.</p>
                    <p className="text-xl text-gray-400 italic mt-1">我的書。</p>
                  </div>
                  <div className="pl-4 border-l-2 border-teal-200 mt-4">
                    <p className="text-xl font-bold text-gray-700">Ảnh <span className="text-teal-600">của</span> các bạn.</p>
                    <p className="text-xl text-gray-400 italic mt-1">你們的照片。</p>
                  </div>
                </div>

                {/* --- 省略用法 --- */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-xl font-black text-gray-400 uppercase tracking-widest mb-4 block">省略式 (Optional)</span>
                  
                  <p className="text-lg text-gray-600 mb-4">
                    當表示親密關係（如家人）或所屬機構時，可以省略 <span className="font-bold text-teal-600">"của"</span>。
                  </p>

                  {/* Công thức tổng quát */}
                  <p className="text-2xl font-black text-gray-800 mb-4">
                    被所有者 + 主語
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="pl-4 border-l-2 border-gray-200 bg-gray-50 p-3 rounded-r-xl">
                      <p className="text-xl font-bold text-gray-700">Mẹ tôi</p>
                      <p className="text-base text-gray-400 italic">我媽媽 (省略 của)</p>
                    </div>
                    <div className="pl-4 border-l-2 border-gray-200 bg-gray-50 p-3 rounded-r-xl">
                      <p className="text-xl font-bold text-gray-700">Nhà anh ấy</p>
                      <p className="text-base text-gray-400 italic">他家</p>
                    </div>
                  </div>
                </div>

                {/* --- Ghi chú đặc biệt --- */}
                <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                  <p className="text-[18px] text-teal-800 font-bold mb-2">
                    💡 老師的小錦囊:
                  </p>
                  <ul className="text-teal-700 space-y-2 text-lg">
                    <li>• 記得要把「東西」放在前面，「主人」放在後面。</li>
                    <li>• 如果不確定能不能省略，加上 <b>"của"</b> 永遠是最安全的！</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </article>

        {/* --- DANH SÁCH VÍ DỤ TỪ DATABASE --- */}
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
                  {/* Số thứ tự tròn trịa */}
                  <span className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0 shadow-lg shadow-blue-100">
                    {index + 1}
                  </span>

                  {/* Chia 2 cột ngang nhau */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
                    
                    {/* Cột Tiếng Việt - Chữ text-xl */}
                    <div className="flex flex-col">
                      <span className="text-[15px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2">越南語</span>
                      <p className="text-xl font-black text-gray-800 leading-tight">
                        {item.sentence_vn}
                      </p>
                    </div>

                    {/* Cột Tiếng Trung - Chữ text-xl */}
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
                <p className="text-gray-300">Chưa có ví dụ nào cho bài này.</p>
              </div>
            )}
          </div>
        )}
        </section>
            </div>
          </div>
  );
}