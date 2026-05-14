'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GrammarDetail() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // Vì folder của bạn tên là "1" nên ta cố định id này để fetch đúng bài 1
  const id = "6"; 

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
  {/* 1. 標題 (Tiêu đề) */}
  <div className="flex items-center gap-4 mb-8">
    <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-100">
      06
    </div>
    <h1 className="text-3xl md:text-4xl font-black text-gray-800">
        越語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-emerald-600">動詞 "Đi" (去) + VP</span>
    </h1>
  </div>

  <div className="space-y-12">
    {/* 2. 肯定句 (Khẳng định) */}
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-2 h-6 bg-emerald-500 rounded-full mr-3"></div>
        1. 肯定句 (Khẳng định)
      </h2>
      <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 mb-6">
        <p className="text-2xl font-black text-center text-gray-800">
          主語 (S) + <span className="text-emerald-600">đi</span> + 動作 (VP)
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-xl font-black text-emerald-600">Tớ đi chơi quần vợt.</p>
          <p className="text-xl text-gray-400 mt-1 italic">我去打網球。</p>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-xl font-black text-emerald-600">Anh ấy đi đá bóng.</p>
          <p className="text-xl text-gray-400 mt-1 italic">他去踢足球。</p>
        </div>
      </div>
    </section>

    {/* 3. 否定句 (Phủ định) */}
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-2 h-6 bg-rose-500 rounded-full mr-3"></div>
        2. 否定句 (Phủ định)
      </h2>
      <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 mb-6">
        <p className="text-2xl font-black text-center text-gray-800">
          S + <span className="text-rose-600">không đi</span> + VP
        </p>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-xl font-bold text-gray-700">Tôi <span className="text-rose-500">không đi</span> chơi bóng rổ.</p>
          <p className="text-xl text-gray-400 italic">我不去打籃球。</p>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-xl font-bold text-gray-700">Tớ <span className="text-rose-500">không đi</span> bơi sáng mai.</p>
          <p className="text-xl text-gray-400 italic">明天早上我不去游泳。</p>
        </div>
      </div>
    </section>

    {/* 4. 疑問句 (Nghi vấn) */}
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-2 h-6 bg-amber-500 rounded-full mr-3"></div>
        3. 疑問句 (Câu hỏi)
      </h2>
      <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 mb-6">
        <p className="text-2xl font-black text-center text-gray-800 italic">
          S + <span className="text-amber-600">đi ... không?</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-white border-2 border-amber-100 rounded-2xl">
          <p className="text-xl font-black text-gray-800">Cậu muốn <span className="text-amber-600">đi</span> xem phim <span className="text-amber-600">không</span>?</p>
          <p className="text-xl text-gray-400 mt-1 italic">你要去看電影嗎？</p>
        </div>
        <div className="p-5 bg-white border-2 border-amber-100 rounded-2xl">
          <p className="text-xl font-black text-gray-800">Cậu hay <span className="text-amber-600">đi</span> ăn món Việt <span className="text-amber-600">không</span>?</p>
          <p className="text-xl text-gray-400 mt-1 italic">你常去吃越南菜嗎？</p>
        </div>
      </div>
    </section>

    {/* 5. 老師的小錦囊 (Ghi chú) */}
    <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
      <p className="text-[25px] text-emerald-800 font-bold mb-3">💡 學習重點 (Key Points):</p>
      <ul className="text-emerald-700 space-y-2 text-base font-medium">
        <li>• <b>用法：</b>"Đi" 放在另一個動作之前，表示「去」做某事。</li>
        <li>• <b>否定：</b>直接在 "đi" 之前加上 <b>"không"</b>。</li>
        <li>• <b>結構：</b>這與漢語的「去＋動詞」語序完全一致，非常容易掌握！</li>
      </ul>
    </div>
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