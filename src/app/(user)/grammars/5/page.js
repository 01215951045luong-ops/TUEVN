
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// 1. Import supabase client
import { supabase } from '@/lib/supabase'; 

export default function GrammarDetail() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Cố định lesson_no là 5 cho bài học về phó từ "Đều"
  const lessonNo = 5; 

  useEffect(() => {
    async function fetchGrammarData() {
      try {
        setLoading(true);
        
        // 3. Truy vấn Supabase lấy các ví dụ của bài 5
        const { data, error } = await supabase
          .from('grammars')
          .select('*')
          .eq('lesson_no', lessonNo)
          .order('id', { ascending: true });

        if (error) throw error;

        setExamples(data || []);
      } catch (err) {
        console.error("Lỗi Supabase:", err.message);
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

        {/* --- NỘI DUNG NGỮ PHÁP --- */}
            <article className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 mb-10">
    {/* 1. 標題 (Tiêu đề) */}
    <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-100">
        05
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-800">
            越語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-indigo-600">副詞 "Đều" (都)</span>
        </h1>
    </div>

    <div className="space-y-12">
        {/* 2. 肯定句 (Khẳng định) */}
        <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></div>
            1. 肯定句 (Khẳng định)
        </h2>
        <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 mb-6">
            <p className="text-2xl font-black text-center text-gray-800">
            主語 (複數) + <span className="text-indigo-600">đều</span> + 動詞 / 形容詞
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <p className="text-xl font-black text-indigo-600">Chúng tôi đều họ Trần.</p>
            <p className="text-xl text-gray-400 mt-1 italic">我們都姓陳。</p>
            </div>
            <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <p className="text-xl font-black text-indigo-600">Họ đều rất đẹp.</p>
            <p className="text-xl text-gray-400 mt-1 italic">他們都很漂亮。</p>
            </div>
        </div>
        </section>

        {/* 3. 否定句 (Phủ định) */}
        <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-2 h-6 bg-pink-500 rounded-full mr-3"></div>
            2. 否定句 (Phủ định)
        </h2>
        <div className="bg-pink-50/50 p-6 rounded-3xl border border-pink-100 mb-6">
            <p className="text-2xl font-black text-center text-gray-800">
            S + <span className="text-pink-600">đều không</span> + V / Adj
            </p>
            <p className="text-center text-xl text-pink-400 mt-2">※ 表示「全體否定」 (都不...)</p>
        </div>
        <div className="space-y-4">
            <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <p className="text-xl font-bold text-gray-700">Chúng tôi <span className="text-pink-500">đều không phải</span> là người Mỹ.</p>
            <p className="text-xl text-gray-400 italic">我們都不是美國人。</p>
            </div>
            <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <p className="text-xl font-bold text-gray-700">Họ <span className="text-pink-500">đều không có</span> anh trai.</p>
            <p className="text-xl text-gray-400 italic">他們都沒有哥哥。</p>
            </div>
        </div>
        </section>

        {/* 4. 疑問句 (Nghi vấn) */}
        <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-2 h-6 bg-cyan-500 rounded-full mr-3"></div>
            3. 疑問句 (Câu hỏi)
        </h2>
        <div className="bg-cyan-50/50 p-6 rounded-3xl border border-cyan-100 mb-6">
            <p className="text-2xl font-black text-center text-gray-800 italic">
            S + <span className="text-cyan-600">đều ... phải không? / không?</span>
            </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
            <div className="p-5 bg-white border-2 border-cyan-100 rounded-2xl">
            <p className="text-xl font-black text-gray-800">Các bạn <span className="text-cyan-600">đều</span> là người Mỹ <span className="text-cyan-600">à</span>?</p>
            <p className="text-xl text-gray-400 mt-1 italic">你們都是美國人嗎？</p>
            </div>
            <div className="p-5 bg-white border-2 border-cyan-100 rounded-2xl">
            <p className="text-xl font-black text-gray-800">Gia đình bạn <span className="text-cyan-600">đều</span> thích uống cà phê <span className="text-cyan-600">không</span>?</p>
            <p className="text-xl text-gray-400 mt-1 italic">你的家人都喜歡喝咖啡嗎？</p>
            </div>
        </div>
        </section>

    {/* 5. 老師的小錦囊 (Ghi chú) */}
        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
        <p className="text-[25px] text-indigo-800 font-bold mb-3">💡 學習重點 (Key Points):</p>
        <ul className="text-indigo-700 space-y-2 text-base font-medium">
            <li>• <b>位置：</b>副詞 "đều" 必須放在動詞或形容詞之<b>前</b>。</li>
            <li>• <b>全部否定：</b>想要表達「都不...」時，請使用 <b>"đều không"</b>。</li>
            <li>• <b>主語：</b>當主語是複數（如：Chúng tôi, Các bạn）時，常會搭配 "đều" 來強調共同性。</li>
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