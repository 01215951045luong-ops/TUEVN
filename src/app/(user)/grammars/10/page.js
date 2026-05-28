'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; 

export default function GrammarDetail() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 設定為專屬課號（例如第 2 或第 3 課，依你的 Supabase 資料為主）
  const lessonNo = 10; 

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
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-100">
              10
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 leading-tight">
              越南語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-emerald-600">程度副詞：Rất (很)</span>
            </h1>
          </div>

          <div className="space-y-12 text-emerald-950">
            
           
            <div className="bg-white/60 p-8 rounded-2xl border border-emerald-100/50 shadow-sm space-y-8">
              <p className="font-black text-3xl text-emerald-900 flex items-center">
                <span className="w-2 h-8 bg-emerald-500 rounded-full mr-3"></span>
                功能介紹 (Chức năng)
              </p>
              
              <div className="text-gray-700 text-xl leading-relaxed space-y-4">
                <p>• <b>rất</b> 在越南語中是<b>程度副詞</b>，相當於華語的<b>「很」</b>。</p>
                <p>• 它的主要功能是用來<b>增加狀態動詞（心理動詞）或形容詞的程度</b>。</p>
              </div>

              {/* 核心結構公式 */}
              <div className="space-y-4">
                <p className="font-bold text-2xl text-emerald-800"> 句型結構 </p>
                <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center font-black text-emerald-600 text-2xl tracking-wide">
                    主詞 + rất +  形容詞/狀態動詞
                </div>
                <p className="text-gray-500 text-lg italic text-center">※ 注意：rất 必須固定置於被修飾的形容詞或動詞前方。</p>
              </div>

              {/* 實戰範例 */}
              <div className="space-y-4">
                <p className="font-bold text-2xl text-emerald-800"> 實戰範例 </p>
                <div className="bg-emerald-50/40 p-6 rounded-xl space-y-4 text-xl font-bold border border-emerald-100">
                  
                  <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                    <p className="text-gray-400 text-base">【範例 1】形容身體與問候狀態</p>
                    <p className="text-gray-900 text-2xl">Tôi <span className="text-emerald-600 font-black">rất</span> khỏe. (我很好 / 我很健康。)</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                    <p className="text-gray-400 text-base">【範例 2】修飾心理狀態動詞</p>
                    <p className="text-gray-900 text-2xl">Anh ấy <span className="text-emerald-600 font-black">rất</span> thích Đài Loan. (他很喜歡台灣。)</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                    <p className="text-gray-400 text-base">【範例 3】形容食物/物品特徵</p>
                    <p className="text-gray-900 text-2xl">Trà Ô Long <span className="text-emerald-600 font-black">rất</span> ngon. (烏龍茶很好喝。)</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                    <p className="text-gray-400 text-base">【範例 4】形容團隊或多數人狀態</p>
                    <p className="text-gray-900 text-2xl">Chúng tớ <span className="text-emerald-600 font-black">rất</span> khỏe. (我們都很好。)</p>
                  </div>

                </div>
              </div>

              {/* 💡 習慣用法小叮嚀 */}
              <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 text-lg text-amber-900 space-y-3 font-medium">
                <p className="font-black text-xl text-amber-950">💡 越南語口語習慣：</p>
                <p className="text-gray-800 leading-relaxed">
                  在華語中，我們常說「很好」、「很熱」、「很好吃」。在越南語的口語陳述句中，當單純要形容一個形容詞狀態時，<b>即使語氣上沒有強烈的「非常」含意，也習慣加上 rất</b>。
                </p>
                <p className="text-gray-800 leading-relaxed">
                  例如單純陳述「烏龍茶好喝」，直接講 "Trà Ô Long ngon" 聽起來句子會有點不完整，口語上加上副詞說 <b>"Trà Ô Long rất ngon"</b> 會更加自然、語氣也更平穩喔！
                </p>
              </div>
            </div>

          </div>
        </article>
       <section className="mt-16">
        
        <h3 className="text-3xl font-black text-gray-800 mb-8 flex items-center">
            <span className="text-emerald-600 mr-3">|</span> 實戰例子 (Ví dụ thực tế)
        </h3>

        {loading ? (
            /* 🔄 載入中狀態的骨架屏 */
            <div className="animate-pulse flex space-y-6 flex-col">
            <div className="h-32 bg-gray-200 rounded-[2.5rem]"></div>
            <div className="h-32 bg-gray-200 rounded-[2.5rem]"></div>
            </div>
        ) : (
            <div className="space-y-6">
          
            {examples.map((item, index) => (
                <div 
                key={item.id} 
                className="bg-white p-8 md:p-10 rounded-[3rem] border-2 border-gray-50 shadow-sm hover:border-emerald-100 hover:shadow-md transition-all group"
                >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                    {/* 序號圖示 */}
                    <span className="bg-emerald-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
                    {index + 1}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full items-center">
                    {/* 越南語部分：強調 "rất" 的應用 */}
                    <div className="flex flex-col">
                        <span className="text-[18px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-3">越南語 </span>
                        <p className="text-2xl font-black text-gray-800 leading-snug">
                        {/* 如果資料庫中有包含 rất，會顯得格外清楚 */}
                        {item.sentence_vn}
                        </p>
                    </div>

                    {/* 中文對照部分 */}
                    <div className="flex flex-col border-l-0 md:border-l-4 border-gray-100 md:pl-12">
                        <span className="text-[18px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">中文對照 </span>
                        <p className="text-2xl font-bold text-gray-600 leading-snug">
                        {item.sentence_cn}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            ))}

            {/* 📭 空狀態顯示 */}
            {examples.length === 0 && (
                <div className="text-center py-24 bg-gray-50 rounded-[3.5rem] border-2 border-dashed border-gray-200">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <i className="fa-solid fa-folder-open text-gray-300 text-3xl"></i>
                </div>
                <p className="text-2xl text-gray-400 font-bold">目前沒有相關例句。</p>
                <p className="text-gray-300 mt-2">我們將儘快更新資料庫內容。</p>
                </div>
            )}
            </div>
        )}
        </section>
      </div>
    </div>
  );
}