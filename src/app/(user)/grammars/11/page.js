'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; 

export default function GrammarTimeLocation() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 設定為專屬課號
  const lessonNo = 11; 

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
  }, [lessonNo]);

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
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-indigo-100">
              11
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 leading-tight">
              越南語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-indigo-600">從句結構：時間詞的位置</span>
            </h1>
          </div>

          <div className="space-y-12 text-indigo-950">
            
            {/* 1. 句型結構區塊 */}
            <div className="bg-white/60 p-8 rounded-2xl border border-indigo-100/50 shadow-sm space-y-6">
              <p className="font-black text-3xl text-indigo-950 flex items-center">
                <span className="w-2 h-8 bg-indigo-500 rounded-full mr-3"></span>
                句型結構 
              </p>
              
              <div className="text-gray-700 text-xl leading-relaxed space-y-2">
                <p>• 在越南語中，<b>時間詞（大部分情況下）通常會出現在「主詞後面」</b>。</p>
                <p>• 為了強調時間或改變語氣，時間詞<b>有時也可以放在「主詞前面」</b>。</p>
              </div>

              <div className="space-y-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                <div className="bg-white p-4 rounded-xl border border-indigo-50 shadow-sm text-center font-black text-indigo-600 text-xl md:text-2xl tracking-wide">
                  公式一：主詞 (S) + 時間詞 + 動詞短語 (V)
                </div>
                <div className="bg-white p-4 rounded-xl border border-indigo-50 shadow-sm text-center font-black text-indigo-500 text-xl md:text-2xl tracking-wide">
                  公式二：時間詞 + 主詞 (S) + 動詞短語 (V)
                </div>
              </div>
            </div>

            {/* 2. 🌟 常用時間詞彙總與「口語縮寫邏輯」 (Tóm tắt từ chỉ thời gian & Cách nói tắt) */}
<div className="bg-white/60 p-8 rounded-2xl border border-indigo-100/50 shadow-sm space-y-6">
  <p className="font-black text-3xl text-indigo-950 flex items-center">
    <span className="w-2 h-8 bg-indigo-500 rounded-full mr-3"></span>
    常用時間詞與口語縮寫 
  </p>
  
  {/* 💡 核心邏輯解釋（給台灣學生看） */}
  <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 text-lg font-medium text-amber-950 space-y-3 leading-relaxed">
    <p className="font-black text-2xl text-amber-900">💡 必學！越南語的「時間縮寫邏輯」：</p>
    <p>1. <b>標準說法（由大到小）：</b> 越南語跟華語一樣，正常會先講大範圍（天），再講小範圍（時段）。例如：「明天晚上」＝ <span className="font-bold text-indigo-600">Ngày mai</span> + <span className="font-bold text-emerald-600">buổi tối</span>。</p>
    <p>2. <b>口語高階縮寫（小前大後）：</b> 為了講話更快，越南人超級流行把<b>「時段（小）」提到前面</b>，然後直接配上<b>「哪一天（大）」</b>，把中間不必要的字省略！例如：<span className="font-bold text-emerald-600">Tối</span> + <span className="font-bold text-indigo-600">mai</span> = <span className="text-rose-600 font-black underline">Tối mai</span>。</p>
    <p className="text-gray-600 italic">※ 對抗記憶小撇步：縮寫時的單字順序，剛好會跟我們中文的「動詞/名詞順序」或習慣相反，直接背單音節最道地！</p>
  </div>

    {/* 完美設計的響應式大字體表格 */}
   <div className="bg-white/60 p-8 rounded-2xl border border-indigo-100/50 shadow-sm space-y-6">
  <p className="text-gray-700 text-xl leading-relaxed">
    為了讓學生看得更清楚，我們將口語縮寫依據<b>「今天 (Hôm nay)」、「明天 (Ngày mai)」、「昨天 (Hôm qua)」</b>等實際情境進行分類對照：
  </p>

  {/* 完美設計的響應式大字體表格 */}
  <div className="overflow-hidden border-2 border-indigo-100 rounded-2xl shadow-sm bg-white mt-6">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-indigo-600 text-white font-black text-xl">
          <th className="p-4 md:p-5 w-1/4">時間情境 </th>
          <th className="p-4 md:p-5 w-1/4">中文意思</th>
          <th className="p-4 md:p-5 w-1/4">完整說法 (大到小)</th>
          <th className="p-4 md:p-5 w-1/4 text-rose-300"> 口語精簡縮寫</th>
        </tr>
      </thead>
      <tbody className="text-xl font-bold text-gray-700 divide-y divide-indigo-50">
        
        {/* 情境一：今天 Hôm nay */}
        <tr className="bg-indigo-50/20">
          <td className="p-4 md:p-5 text-indigo-900 font-black" rowSpan="4">【今天】<br/><span className="text-sm font-normal text-gray-400">Hôm nay</span></td>
          <td className="p-4 md:p-5 text-gray-500 font-medium">今天早上</td>
          <td className="p-4 md:p-5 text-gray-800">Hôm nay buổi sáng</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Sáng nay</td>
        </tr>
        <tr className="bg-indigo-50/20">
          <td className="p-4 md:p-5 text-gray-500 font-medium">今天中午</td>
          <td className="p-4 md:p-5 text-gray-800">Hôm nay buổi trưa</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Trưa nay</td>
        </tr>
        <tr className="bg-indigo-50/20">
          <td className="p-4 md:p-5 text-gray-500 font-medium">今天下午</td>
          <td className="p-4 md:p-5 text-gray-800">Hôm nay buổi chiều</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Chiều nay</td>
        </tr>
        <tr className="bg-indigo-50/20">
          <td className="p-4 md:p-5 text-gray-500 font-medium">今天晚上</td>
          <td className="p-4 md:p-5 text-gray-800">Hôm nay buổi tối</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Tối nay</td>
        </tr>

        {/* 情境二：明天 Ngày mai */}
        <tr>
          <td className="p-4 md:p-5 text-emerald-900 font-black" rowSpan="4">【明天】<br/><span className="text-sm font-normal text-gray-400">Ngày mai</span></td>
          <td className="p-4 md:p-5 text-gray-500 font-medium">明天早上</td>
          <td className="p-4 md:p-5 text-gray-800">Ngày mai buổi sáng</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Sáng mai</td>
        </tr>
        <tr>
          <td className="p-4 md:p-5 text-gray-500 font-medium">明天中午</td>
          <td className="p-4 md:p-5 text-gray-800">Ngày mai buổi trưa</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Trưa mai</td>
        </tr>
        <tr className="bg-amber-50/10">
          <td className="p-4 md:p-5 text-gray-500 font-medium">明天下午</td>
          <td className="p-4 md:p-5 text-gray-800">Ngày mai buổi chiều</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Chiều mai</td>
        </tr>
        <tr>
          <td className="p-4 md:p-5 text-gray-500 font-medium">明天晚上</td>
          <td className="p-4 md:p-5 text-gray-800">Ngày mai buổi tối</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Tối mai</td>
        </tr>

        {/* 情境三：昨天 Hôm qua */}
        <tr className="bg-amber-50/10">
          <td className="p-4 md:p-5 text-amber-900 font-black" rowSpan="4">【昨天】<br/><span className="text-sm font-normal text-gray-400">Hôm qua</span></td>
          <td className="p-4 md:p-5 text-gray-500 font-medium">昨天早上</td>
          <td className="p-4 md:p-5 text-gray-800">Hôm qua buổi sáng</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Sáng qua</td>
        </tr>
         <tr className="bg-emerald-50/10">
          <td className="p-4 md:p-5 text-gray-500 font-medium">昨天中午</td>
          <td className="p-4 md:p-5 text-gray-800">Hôm qua buổi trưa</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Trưa qua</td>
        </tr>
        <tr className="bg-amber-50/10">
          <td className="p-4 md:p-5 text-gray-500 font-medium">昨天下午</td>
          <td className="p-4 md:p-5 text-gray-800">Hôm qua buổi chiều</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Chiều qua</td>
        </tr>
        <tr className="bg-amber-50/10">
          <td className="p-4 md:p-5 text-gray-500 font-medium">昨天晚上</td>
          <td className="p-4 md:p-5 text-gray-800">Hôm qua buổi tối</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Tối qua</td>
        </tr>

        {/* 情境四：其他 Cuối tuần */}
        <tr className="bg-emerald-50/10">
          <td className="p-4 md:p-5 text-emerald-950 font-black" rowSpan="4">【週末】<br/><span className="text-sm font-normal text-gray-400">Cuối tuần</span></td>
          <td className="p-4 md:p-5 text-gray-500 font-medium">週末早上</td>
          <td className="p-4 md:p-5 text-gray-800">Cuối tuần buổi sáng</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Sáng cuối tuần</td>
        </tr>
        <tr className="bg-emerald-50/10">
          <td className="p-4 md:p-5 text-gray-500 font-medium">週末中午</td>
          <td className="p-4 md:p-5 text-gray-800">Cuối tuần buổi trưa</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Trưa cuối tuần</td>
        </tr>
         <tr className="bg-emerald-50/10">
          <td className="p-4 md:p-5 text-gray-500 font-medium">週末下午</td>
          <td className="p-4 md:p-5 text-gray-800">Cuối tuần buổi chiều</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Chiều cuối tuần</td>
        </tr>
        <tr className="bg-emerald-50/10">
          <td className="p-4 md:p-5 text-gray-500 font-medium">週末晚上</td>
          <td className="p-4 md:p-5 text-gray-800">Cuối tuần buổi tối</td>
          <td className="p-4 md:p-5 text-rose-600 font-black text-2xl bg-rose-50/30">Tối cuối tuần</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  <div className="bg-amber-50/70 p-5 rounded-xl border border-amber-200 mt-4">
    <p className="text-amber-800 text-lg font-bold">
       語法記憶小撇步 :
    </p>
    <p className="text-gray-700 text-base mt-1">
      當你想要用簡短說法時，公式就是：<b>「精準時段（Sáng/Trưa/Chiều/Tối）＋ 哪一天（nay/mai/qua）」</b>。這樣一來，原本四個音節的單字就能瞬間縮短成兩個音節，講話就會跟越南在地人一樣自然！
    </p>
  </div>
</div>

            {/* 3. 教材基礎範例 */}
            <div className="bg-white/60 p-8 rounded-2xl border border-indigo-100/50 shadow-sm space-y-4">
              <p className="font-bold text-2xl text-indigo-800"> 課本基礎範例 </p>
              <div className="bg-indigo-50/30 p-6 rounded-xl space-y-4 text-xl font-bold border border-indigo-100">
                <div className="bg-white p-4 rounded-xl border border-indigo-50 shadow-sm">
                  <p className="text-gray-400 text-base">【範例 1】</p>
                  <p className="text-gray-900 text-2xl font-black">Chúng tôi <span className="text-indigo-600">hôm nay</span> đi xem phim. <span className="text-gray-400 font-normal text-lg">(我們今天去看電影。)</span></p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-indigo-50 shadow-sm">
                  <p className="text-gray-400 text-base">【範例 2】</p>
                  <p className="text-gray-900 text-2xl font-black">Ngày mai cậu có muốn đi bơi không? <span className="text-gray-400 font-normal text-lg">(明天你想去游泳嗎？)</span></p>
                </div>
              </div>
            </div>

          </div>
        </article>

        {/* --- 實戰例子區塊 (Ví dụ thực tế - Load từ Supabase) --- */}
        <section className="mt-16">
          <h3 className="text-3xl font-black text-gray-800 mb-8 flex items-center">
            <span className="text-indigo-600 mr-3">|</span> 實戰例子 
          </h3>

          {loading ? (
            <div className="animate-pulse flex space-y-6 flex-col">
              <div className="h-32 bg-gray-200 rounded-[2.5rem]"></div>
              <div className="h-32 bg-gray-200 rounded-[2.5rem]"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {examples.map((item, index) => (
                <div key={item.id} className="bg-white p-8 md:p-10 rounded-[3rem] border-2 border-gray-50 shadow-sm hover:border-indigo-100 transition-all group">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                    <span className="bg-indigo-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-lg shadow-indigo-100">
                      {index + 1}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full items-center">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-3">越南語</span>
                        <p className="text-2xl font-black text-gray-800 leading-snug">
                          {item.sentence_vn}
                        </p>
                      </div>

                      <div className="flex flex-col border-l-0 md:border-l-4 border-gray-100 md:pl-12">
                        <span className="text-[14px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">中文對照 </span>
                        <p className="text-2xl font-bold text-gray-600 leading-snug">
                          {item.sentence_cn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {examples.length === 0 && (
                <div className="text-center py-24 bg-gray-50 rounded-[3.5rem] border-2 border-dashed border-gray-200">
                  <p className="text-2xl text-gray-400 font-bold">目前沒有相關例句。</p>
                </div>
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}