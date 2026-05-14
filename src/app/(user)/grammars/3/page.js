'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GrammarDetail() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // Vì folder của bạn tên là "1" nên ta cố định id này để fetch đúng bài 1
  const id = "3"; 

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
    <div className="w-12 h-12 bg-teal-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-teal-100">
      03
    </div>
    <h1 className="text-3xl md:text-4xl font-black text-gray-800">
        越語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-teal-600">人稱代詞與家族稱呼</span>
    </h1>
  </div>

  <div className="space-y-12">
    {/* 2. 基本概念 (Khái niệm cơ bản) */}
    <section>
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <div className="w-2 h-6 bg-teal-500 rounded-full mr-3"></div>
        基本概念
      </h2>
      <p className="text-xl text-gray-600 leading-relaxed">
        越南語的人稱代詞非常豐富，會根據對方的<span className="font-bold text-teal-600">年齡、性別以及社會地位</span>而改變。正確的稱呼是越南文化中「禮貌」的核心。
      </p>
    </section>

    {/* 3. 人稱代詞對照表 (Bảng đại từ 10 cặp) */}
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="text-teal-600 mr-3">|</span> 常用人稱代詞對照
      </h2>
      
      <div className="overflow-hidden rounded-[2rem] border-2 border-gray-100 shadow-sm bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="p-4 text-left text-2xl font-black text-gray-400 uppercase tracking-widest pl-8 ">對象</th>
              <th className="p-4 text-center text-2xl font-black text-teal-600 uppercase tracking-widest  ">我稱呼自己 (S)</th>
              <th className="p-4 text-center text-2xl font-black text-orange-600 uppercase tracking-widest pr-8  ">我稱呼對方 (You)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* 1. Bố Mẹ */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">父母親</td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Con</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Bố / Mẹ</td>
            </tr>
            {/* 2. Bác */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">伯父/伯母 <br/><span className="text-[10px] text-gray-400 font-normal">(比父母大)</span></td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Cháu / Con</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Bác</td>
            </tr>
            {/* 3. Chú Cô */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">叔叔/阿姨 <br/><span className="text-[10px] text-gray-400 font-normal">(比父母小)</span></td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Cháu / Con</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Chú / Cô</td>
            </tr>
            {/* 4. Anh Chị */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">哥哥 / 姐姐</td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Em</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Anh / Chị</td>
            </tr>
            {/* 5. Em */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">弟弟 / 妹妹</td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Anh / Chị</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Em</td>
            </tr>
            {/* 6. Thầy */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">男老師</td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Em</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Thầy</td>
            </tr>
            {/* 7. Cô (Giáo) */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">女老師</td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Em</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Cô</td>
            </tr>
            {/* 8. Bạn */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">朋友 / 同輩</td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Tôi / Mình</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Bạn / Cậu</td>
            </tr>
            <tr className="hover:bg-teal-50/30 transition-colors">
                <td className="p-6 pl-8 font-bold text-gray-700 text-2xl">
                哥哥輩 
                </td>
                <td className="p-6 text-center font-black text-3xl text-teal-600">Em</td>
                <td className="p-6 text-center font-black text-3xl text-orange-600 pr-8">Anh</td>
            </tr>

            {/* 2. Chị - Em */}
            <tr className="hover:bg-teal-50/30 transition-colors">
                <td className="p-6 pl-8 font-bold text-gray-700  text-2xl">
                姐姐輩 
                </td>
                <td className="p-6 text-center font-black text-3xl text-teal-600">Em</td>
                <td className="p-6 text-center font-black text-3xl text-orange-600 pr-8">Chị</td>
            </tr>

            {/* 3. Anh/Chị - Em */}
            <tr className="hover:bg-teal-50/30 transition-colors">
                <td className="p-6 pl-8 font-bold text-gray-700  text-2xl">
                晚輩 
                </td>
                <td className="p-6 text-center font-black text-3xl text-teal-600">Anh / Chị</td>
                <td className="p-6 text-center font-black text-3xl text-orange-600 pr-8">Em</td>
            </tr>
            {/* 9. Ông Bà */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">爺爺 / 奶奶</td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Cháu</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Ông / Bà</td>
            </tr>
            {/* 10. Cháu */}
            <tr className="hover:bg-teal-50/30 transition-colors">
              <td className="p-4 pl-8 font-bold text-gray-700 text-2xl">孫子 / 小孩</td>
              <td className="p-4 text-center font-black text-2xl text-teal-600">Ông / Bà</td>
              <td className="p-4 text-center font-black text-2xl text-orange-600 pr-8">Cháu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    {/* 4. 老師的小錦囊 (Ghi chú) */}
    <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 shadow-sm">
      <p className="text-[18px] text-amber-800 font-bold mb-3 text-2xl">💡 學習重點 (Key Points):</p>
      <ul className="text-amber-700 space-y-4 text-base font-medium text-2xl">
        <li className="flex gap-2 text-2xl">
          <span className="text-amber-400 font-black">●</span>
          <span>在家庭中，對父母長輩說話一定要自稱為 <b>Con</b> 或 <b>Cháu</b> 以示尊敬。</span>
        </li>
        <li className="flex gap-2 text-2xl">
          <span className="text-amber-400 font-black">●</span>
          <span>稱呼他人之前，要先判斷年齡：<b>Bác</b> (比父母大)、<b>Chú/Cô</b> (比父母小)。</span>
        </li>
        <li className="flex gap-2 text-2xl">
          <span className="text-amber-400 font-black">●</span>
          <span>即便在校園，對待老師也要像對待長輩一樣稱呼 <b>Thầy/Cô</b>。</span>
        </li>
      </ul>
    </div>
  </div>
</article>

      </div>
    </div>
  );
}