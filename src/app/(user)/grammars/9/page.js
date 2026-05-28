'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; 

export default function GrammarDetail() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 設定為第 1 課：問句與回答的對應
  const lessonNo = 1; 

  useEffect(() => {
    async function fetchGrammarData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('grammars')
          .select('*')
          .eq('lesson_no', lessonNo)
          .order('id', { ascending: true });

        if (error) throw error;
        setExamples(data || []);
      } catch (err) {
        console.error("Supabase 錯誤:", err.message);
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
          className="flex items-center text-gray-500 font-bold hover:text-black mb-8 text-lg"
        >
          ← 返回
        </button>

        {/* --- 核心文法內容 --- */}
        <article className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 mb-10">
          
          {/* 👑 主標題 */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-rose-100">
              09
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 leading-tight">
              越南語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-rose-600">如何回答越南語的問句</span>
            </h1>
          </div>

          <div className="space-y-12 text-rose-900">
            
            {/* A. 肯定回答 (Câu trả lời khẳng định) */}
            <div className="bg-white/60 p-8 rounded-2xl border border-rose-100/50 shadow-sm space-y-6">
              <p className="font-black text-3xl text-rose-950 flex items-center">
                <span className="w-2 h-8 bg-rose-500 rounded-full mr-3"></span>
                A. 肯定回答 (Câu trả lời khẳng định)
              </p>
              
              <div className="text-gray-700 text-xl leading-relaxed space-y-2">
                <p>• 越南語的肯定回答，通常可以透過<b>重複問句中的「主要動詞」或「形容詞」</b>來構成。</p>
                <p>• 在進行<b>簡答</b>時，往往只需要單獨重複該動詞或形容詞即可，不需要把整個句子重新講一遍。</p>
              </div>

              {/* 肯定回答實戰範例 */}
              <div className="bg-rose-50/40 p-6 rounded-xl space-y-6 text-xl font-bold border border-rose-100">
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <p className="text-gray-500 text-base">範例 1 (完整回答)：</p>
                  <p className="text-amber-700 text-lg">A: Anh ấy có phải là người Đài Loan không? (他是不是台灣人？)</p>
                  <p className="text-gray-900 text-xl mt-1">B: <span className="text-emerald-600">Phải</span>, anh ấy là người Đài Loan. (是的，他是台灣人。)</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <p className="text-gray-500 text-base">範例 2 (重複動詞簡答)：</p>
                  <p className="text-amber-700 text-lg">A: Anh ấy có đến Đài Loan không? (他來不來台灣？)</p>
                  <p className="text-rose-600 text-xl mt-1">B: <span className="underline">Đến</span>. (來。)</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <p className="text-gray-500 text-base">範例 3 (心理動詞/形容詞簡答)：</p>
                  <p className="text-amber-700 text-lg">A: Anh ấy có thích uống trà không? (他喜不喜歡喝茶？)</p>
                  <p className="text-rose-600 text-xl mt-1">B: <span className="underline">Thích</span>. (喜歡。)</p>
                </div>
              </div>
            </div>


            {/* B. 否定回答 (Trả lời phủ định) */}
            <div className="bg-white/60 p-8 rounded-2xl border border-rose-100/50 shadow-sm space-y-6">
              <p className="font-black text-3xl text-rose-950 flex items-center">
                <span className="w-2 h-8 bg-rose-400 rounded-full mr-3"></span>
                B. 否定回答 (Trả lời phủ định với Không / Chưa)
              </p>

              <div className="text-gray-700 text-xl leading-relaxed space-y-2">
                <p>• 否定回答的構造方式，是在主要動詞的前面加上否定副詞，最常用的是 <span className="font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Không (不/沒)</span> 或 <span className="font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Chưa (還沒)</span>。</p>
                <p>• 在簡答時，可以直接用 <b>"Không"</b> 作為開頭，或者單獨使用 <b>"Không + 動詞"</b> 來拒絕或反駁。</p>
              </div>

              {/* 否定回答實戰範例 */}
              <div className="bg-rose-50/40 p-6 rounded-xl space-y-6 text-xl font-bold border border-rose-100">
                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <p className="text-gray-500 text-base">範例 1 (完整否定)：</p>
                  <p className="text-amber-700 text-lg">A: Ông ấy có phải là ông Lý không? (他是李先生嗎？)</p>
                  <p className="text-gray-900 text-xl mt-1">B: <span className="text-rose-600">Không phải</span>, ông ấy không phải là ông Lý. (不是，他不是李先生。)</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                  <p className="text-gray-500 text-base">範例 2 (簡短否定)：</p>
                  <p className="text-amber-700 text-lg">A: Anh muốn uống cà phê không? (你想喝咖啡嗎？)</p>
                  <p className="text-rose-600 text-xl mt-1">B: <span className="underline">Không muốn</span>. / <span className="underline">Không</span>. (不要。/ 不。)</p>
                </div>
              </div>

              {/* ⚠️ 針對教材最底部「姓」與「叫」的特殊例外說明 */}
              <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 text-amber-950 space-y-4">
                <p className="font-black text-2xl flex items-center text-amber-900">
                  ⚠️ 重要注意事項（關於 "姓" 與 "叫" 的初學例外）：
                </p>
                
                <div className="text-lg font-medium space-y-3 text-gray-800 leading-relaxed">
                  <p>
                    在越南語與華語對譯中，有一些動詞用法需要特別注意。例如當主要動詞是 
                    <span className="font-bold text-rose-600 mx-1">Họ (姓)</span> 或 
                    <span className="font-bold text-rose-600 mx-1">Tên là (叫/名字是)</span> 的時候：
                  </p>
                  
                  <div className="bg-white p-4 rounded-xl border border-amber-100 space-y-2 font-semibold">
                    <p className="text-rose-700">👉 正確的否定回應邏輯：</p>
                    <p>• 當問句是：<span className="text-gray-500">Anh ấy họ Lý phải không? (他姓李嗎？)</span> ➔ 否定回答必須完整說出 <span className="text-emerald-600 font-bold">Không phải họ Lý</span> (不是姓李)，不能只單獨回一個字。</p>
                    <p>• 當問句是：<span className="text-gray-500">Ông Lý tên là Khai Văn phải không? (李先生叫開文嗎？)</span> ➔ 否定回答應為 <span className="text-emerald-600 font-bold">Không phải tên là Khai Văn</span> (名字不是叫開文)。</p>
                  </div>

                  <p className="text-rose-600 font-bold bg-rose-50 p-3 rounded-lg border border-rose-100 text-base">
                    ❌ 常犯錯誤提醒：請注意否定詞（如 Không）在表達特定身分、姓名、姓氏時，通常要搭配「phải」變成 <span className="underline font-black">Không phải + [姓名/身分]</span> 來回答，絕對不能單獨用錯結構或省略後方核心語意喔！
                  </p>
                </div>
              </div>

            </div>

          </div>
        </article>
      </div>
    </div>
  );
}