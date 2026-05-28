'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; 

export default function GrammarDetail() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 設定為對應的課堂編號
  const lessonNo = 8; 

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
          {/* 👑 標題 */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-100">
              08
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 leading-tight">
              越南語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-emerald-600">如何用「không」打招呼與提問</span>
            </h1>
          </div>

          <div className="space-y-12 text-emerald-800">
            
            {/* 導言 */}
            <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100/60 shadow-sm">
              <p className="text-gray-700 text-xl leading-relaxed font-medium">
                在越南語中，<b>「không」</b> 是一個萬能字。它既可以表示<b>「不（否定）」</b>，也可以放在句尾表示<b>「嗎（疑問）」</b>。
              </p>
            </div>

            {/* A. 基礎問句 */}
            <div className="bg-white/60 p-8 rounded-2xl border border-amber-100/60 shadow-sm space-y-6">
              <p className="font-bold text-3xl text-amber-800 flex items-center">
                <span className="w-2 h-8 bg-amber-500 rounded-full mr-3"></span>
                A. 基礎問句：動詞 / 形容詞 + không?（中文：...嗎？）
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                這是越南語中最常見、最簡單的問句結構，相當於中文的 <b>「...嗎？」</b>。
              </p>
              
              <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm text-center font-black text-gray-800 text-2xl tracking-wide">
                主語 + 動詞 / 形容詞 + không?
              </div>

              <p className="font-bold text-xl text-amber-900 mt-4 mb-2">💡 實用例句：</p>
              <div className="bg-amber-50/30 p-6 rounded-xl space-y-5 text-xl font-bold">
                <div className="border-b border-amber-100/40 pb-3 last:border-0 last:pb-0">
                  <p className="text-emerald-900 text-2xl">Anh khỏe không?</p>
                  <p className="text-gray-400 font-medium text-base mt-1">→ 你好嗎？ / 你身體好嗎？</p>
                </div>
                <div className="border-b border-amber-100/40 pb-3 last:border-0 last:pb-0">
                  <p className="text-emerald-900 text-2xl">Anh uống cà phê không?</p>
                  <p className="text-gray-400 font-medium text-base mt-1">→ 你要喝咖啡嗎？</p>
                </div>
                <div className="border-b border-amber-100/40 pb-3 last:border-0 last:pb-0">
                  <p className="text-emerald-900 text-2xl">Người Đài Loan thích uống trà không?</p>
                  <p className="text-gray-400 font-medium text-base mt-1">→ 台灣人喜歡喝茶嗎？</p>
                </div>
              </div>
            </div>

            {/* B. 進階問句 */}
            <div className="bg-white/60 p-8 rounded-2xl border border-amber-100/60 shadow-sm space-y-6">
              <p className="font-bold text-3xl text-amber-800 flex items-center">
                <span className="w-2 h-8 bg-amber-500 rounded-full mr-3"></span>
                B. 進階問句：Có ... (hay) không?（中文：有沒有...？ / 是不是...？）
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                當你想讓問句語氣聽起來更正式、或強調「到底有沒有/是不是」時，就要使用這個結構。它相當於中文的 <b>「A不A」</b>（要不要、喜不喜歡、是不是）或 <b>「有沒有...」</b>。
                <span className="block text-gray-400 text-base font-medium mt-1">（註：口語中常省略 「hay」，直接說 「có... không?」）</span>
              </p>
              
              <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm text-center font-black text-gray-800 text-2xl tracking-wide">
                主語 + có + 動詞 / 形容詞 + (hay) + không?
              </div>

              <p className="font-bold text-xl text-amber-900 mt-4 mb-2">💡 實用例句：</p>
              <div className="bg-amber-50/30 p-6 rounded-xl space-y-5 text-xl font-bold">
                <div className="border-b border-amber-100/40 pb-3 last:border-0 last:pb-0">
                  <p className="text-emerald-900 text-2xl">Ngài Vương có muốn uống cà phê hay không?</p>
                  <p className="text-gray-400 font-medium text-base mt-1">→ 王先生要不要喝咖啡？</p>
                </div>
                <div className="border-b border-amber-100/40 pb-3 last:border-0 last:pb-0">
                  <p className="text-emerald-900 text-2xl">Anh ấy có đến Đài Loan hay không?</p>
                  <p className="text-gray-400 font-medium text-base mt-1">→ 他來不來台灣？</p>
                </div>
                <div className="border-b border-amber-100/40 pb-3 last:border-0 last:pb-0">
                  <p className="text-emerald-900 text-2xl">Anh có uống cà phê không?</p>
                  <p className="text-gray-400 font-medium text-base mt-1">→ 你到底喝不喝咖啡？</p>
                </div>
              </div>
            </div>

            {/* C. 特殊問句 */}
            <div className="bg-white/60 p-8 rounded-2xl border border-amber-100/60 shadow-sm space-y-6">
              <p className="font-bold text-3xl text-amber-800 flex items-center">
                <span className="w-2 h-8 bg-amber-500 rounded-full mr-3"></span>
                C. 特殊問句：Có phải là ... không?（中文：是不是...？ / 難道是...？）
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                專門用於<b>「確認身分、職業、國籍或某個事實」</b>，相當於中文的 <b>「是不是...？」</b> 或 <b>「是不是...？（帶有猜測語氣）」</b>。
              </p>
              
              <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm text-center font-black text-gray-800 text-2xl tracking-wide">
                主語 + có phải là + 名詞 + không?
              </div>

              <p className="font-bold text-xl text-amber-900 mt-4 mb-2">💡 實用例句：</p>
              <div className="bg-amber-50/30 p-6 rounded-xl space-y-5 text-xl font-bold">
                <div className="border-b border-amber-100/40 pb-3 last:border-0 last:pb-0">
                  <p className="text-emerald-900 text-2xl">Đây có phải là trà Ô Long không?</p>
                  <p className="text-gray-400 font-medium text-base mt-1">→ 這是不是烏龍茶？</p>
                </div>
                <div className="border-b border-amber-100/40 pb-3 last:border-0 last:pb-0">
                  <p className="text-emerald-900 text-2xl">Bạn có phải là người Nhật không?</p>
                  <p className="text-gray-400 font-medium text-base mt-1">→ 你是不是日本人？</p>
                </div>
              </div>
            </div>

            {/* 避坑指南 & 回答方式 */}
            <div className="bg-amber-50/60 p-8 rounded-2xl border border-amber-200 space-y-6 text-amber-900">
              <div>
                <p className="font-black text-2xl flex items-center text-amber-950 mb-2">
                  ⚠️ 老師提醒學員的避坑指南 (Mẹo cho học viên)：
                </p>
                <div className="text-lg leading-relaxed space-y-1 pl-4 border-l-4 border-amber-500 text-gray-700 font-medium">
                  <p>• <b>不可連用：</b> 越南語和中文一樣，一種問句結構只能用一次。</p>
                  <p>• 中文不說：「是不是烏龍茶嗎？」(X)</p>
                  <p>• 越南語也絕對不可說：<span className="font-bold underline decoration-wavy decoration-rose-500">「Có phải là trà Ô Long không à?」(X)</span></p>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200/60">
                <p className="font-black text-2xl text-amber-950 mb-2">📝 回答方式：</p>
                <ul className="list-disc pl-6 text-lg text-gray-700 font-medium space-y-1">
                  <li>如果答案是肯定的（是的/要）：回答 <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 rounded">Có</span> 或 <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 rounded">Phải</span>。</li>
                  <li>如果答案空間是否定的（不是/不要）：回答 <span className="text-rose-600 font-bold bg-rose-50 px-1.5 rounded">Không</span> 或 <span className="text-rose-600 font-bold bg-rose-50 px-1.5 rounded">Không phải</span>。</li>
                </ul>
              </div>
            </div>

          </div>
        </article>
      </div>
    </div>
  );
}