'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; 

export default function GrammarDetail() {
  const router = useRouter();
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 設定為第 7 課，以便從資料庫獲取對應的實戰例子
  const lessonNo = 7; 

  useEffect(() => {
    async function fetchGrammarData() {
      try {
        setLoading(true);
        
        // 查詢 Supabase 獲取第 7 課的例句
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
              07
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 leading-tight">
              越語語法 <span className="text-gray-400 font-light ml-2">|</span> <span className="text-emerald-600">越南語基本語法</span>
            </h1>
          </div>

          <div className="space-y-12 text-emerald-800">
            
            {/* 1. 基本句型 */}
            <div className="bg-white/60 p-8 rounded-2xl border border-emerald-100/50 shadow-sm space-y-6">
              <p className="font-bold text-3xl text-emerald-800 mb-1 flex items-center">
                <span className="w-2 h-8 bg-emerald-500 rounded-full mr-3"></span>
                1. 基本句型 
              </p>
              <p className="text-gray-600 text-xl leading-relaxed">
                在越南語語法中，理解句子結構是不可或缺的重要一步。雖然每種語言都有其獨特之處，但越南語在句型構建上與中文有著非常高的相似性。
              </p>
              
              <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center font-black text-emerald-600 text-2xl tracking-wide">
                主語 (S) + 動詞 (V) + 受詞 (O) + 狀語 (Adv)
              </div>

              {/* 學習重點提示 */}
              <div className="bg-amber-50/60 p-6 rounded-xl border border-amber-100/70 text-lg text-amber-900 space-y-2">
                <p className="font-bold text-xl text-amber-950">💡 注意事項:</p>
                <p>• 越南語中的「狀語（時間/地點）」可以出現在句首或句尾。並非每個句子都一定需要狀語。</p>
                <p>• 「受詞（補語）」可以是一個或多個人、事物或某種現象。</p>
              </div>

              {/* 結構拆解 */}
              <p className="font-bold text-2xl text-emerald-700 pt-2">💡 實例解析：“Tôi ăn cơm.” (我吃飯)</p>
              <div className="space-y-3 text-xl bg-emerald-50/40 p-6 rounded-xl border border-emerald-100/50 font-medium leading-relaxed">
                <p>• <b>"Tôi"：</b> 這是句子中的<b>主語</b>，意思是「我」。注意：在越南語中，根據人際關係（長幼尊卑）和不同的說話語境，會有多種代表「我」的稱呼與代名詞表達方式。</p>
                <p>• <b>"Ăn"：</b> 這是表示動作的<b>動詞</b>，意思是「吃」。</p>
                <p>• <b>"Cơm"：</b> 這是動作承受的<b>受詞（賓語）</b>，意思是「飯」。</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-3xl font-black text-emerald-600">Tôi ăn cơm.</p>
                <p className="text-lg text-gray-400 font-medium italic mt-1">我吃飯。</p>
              </div>
            </div>


            {/* 2. 時態語法 */}
            <div className="bg-white/60 p-8 rounded-2xl border border-emerald-100/50 shadow-sm space-y-8">
              <p className="font-bold text-3xl text-emerald-800 flex items-center">
                <span className="w-2 h-8 bg-emerald-500 rounded-full mr-3"></span>
                2. 時態語法 
              </p>

              {/* 現在式 */}
              <div className="border-t border-emerald-100/70 pt-6">
                <p className="font-bold text-2xl text-emerald-700 mb-3">▶ 現在式:</p>
                <p className="text-gray-600 text-lg mb-4">當想要表達某個動作正在當下發生時，越南語通常會結合關鍵字 <b>"đang"</b>，或搭配時間副詞如 "bây giờ" (現在)、"hôm nay" (今天)、"nay" (如今)。</p>
                <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm font-black text-gray-800 text-2xl text-center space-y-2 mb-4 tracking-wide">
                  <p>(1) 主語 + đang + 動詞 + (受詞).</p>
                  <p>(2) 現在時間副詞 + 主語 + 動詞.</p>
                </div>
                <div className="bg-emerald-50/30 p-6 rounded-xl space-y-4 text-xl font-bold">
                  <div className="border-b border-emerald-100/40 pb-2 last:border-0 last:pb-0">
                    <p className="text-gray-900 text-2xl">Tôi đang đọc sách.</p>
                    <p className="text-gray-400 font-medium italic text-base mt-1">我正在看書。</p>
                  </div>
                  <div className="border-b border-emerald-100/40 pb-2 last:border-0 last:pb-0">
                    <p className="text-gray-900 text-2xl">Hôm nay mẹ tôi nấu canh.</p>
                    <p className="text-gray-400 font-medium italic text-base mt-1">今天我媽媽煮湯。</p>
                  </div>
                </div>
              </div>

              {/* 過去式 */}
              <div className="border-t border-emerald-100/70 pt-6">
                <p className="font-bold text-2xl text-emerald-700 mb-3">▶ 過去式:</p>
                <p className="text-gray-600 text-lg mb-4">為了表示動作已經在過去發生或完成，越南語會使用關鍵字 <b>"đã"</b>，或者搭配過去的時間狀語。</p>
                <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm text-center font-black text-gray-800 text-2xl mb-4 tracking-wide">
                  主語 + đã + 動詞 + (受詞) + (過去時間副詞).
                </div>
                <div className="bg-emerald-50/30 p-6 rounded-xl space-y-4 text-xl font-bold">
                  <div className="border-b border-emerald-100/40 pb-2 last:border-0 last:pb-0">
                    <p className="text-gray-900 text-2xl">Tôi đã xem phim đó.</p>
                    <p className="text-gray-400 font-medium italic text-base mt-1">我已經看過那部電影了。</p>
                  </div>
                  <div className="border-b border-emerald-100/40 pb-2 last:border-0 last:pb-0">
                    <p className="text-gray-900 text-2xl">Tuần trước, bố tôi mua một chiếc xe mới.</p>
                    <p className="text-gray-400 font-medium italic text-base mt-1">上週我爸爸買了一輛新車。</p>
                  </div>
                </div>
              </div>

              {/* 未來式 */}
              <div className="border-t border-emerald-100/70 pt-6">
                <p className="font-bold text-2xl text-emerald-700 mb-3">▶ 未來式:</p>
                <p className="text-gray-600 text-lg mb-4">當要表達未來將要發生的動作或事件時，越南語通常會使用關鍵字 <b>"sẽ"</b>，並可搭配未來的時間副詞。</p>
                <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm text-center font-black text-gray-800 text-2xl mb-4 tracking-wide">
                  主語 + sẽ + 動詞 + (受詞) + (未來時間副詞).
                </div>
                <div className="bg-amber-50/60 p-4 rounded-xl text-base text-amber-900 mb-4 font-medium">
                   <b>技巧小貼士：</b>未來的時間副詞可以放在句首以達到強調的效果。
                </div>
                <div className="bg-emerald-50/30 p-6 rounded-xl space-y-4 text-xl font-bold">
                  <div className="border-b border-emerald-100/40 pb-2 last:border-0 last:pb-0">
                    <p className="text-gray-900 text-2xl">Tôi sẽ du lịch Đà Nẵng vào tháng sau.</p>
                    <p className="text-gray-400 font-medium italic text-base mt-1">下個月我會去峴港旅遊。</p>
                  </div>
                  <div className="border-b border-emerald-100/40 pb-2 last:border-0 last:pb-0">
                    <p className="text-gray-900 text-2xl">Năm sau, chị tôi sẽ kết hôn.</p>
                    <p className="text-gray-400 font-medium italic text-base mt-1">明年我姐姐會結婚。</p>
                  </div>
                </div>
              </div>
            </div>


            {/* 3. 疑問句 */}
            <div className="bg-white/60 p-8 rounded-2xl border border-amber-100/50 shadow-sm space-y-6">
              <p className="font-bold text-3xl text-amber-800 flex items-center">
                <span className="w-2 h-8 bg-amber-500 rounded-full mr-3"></span>
                3. 疑問句結構 
              </p>
              <p className="text-gray-600 text-xl leading-relaxed">
                日常交流中最核心的要素之一就是提問的能力。要在越南語中有效地進行提問，你必須掌握疑問句的文法架構。疑問句主要透過使用疑問代名詞或疑問副詞來建構：
              </p>

              <div className="space-y-6 text-xl">
                <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm space-y-2">
                  <p className="font-black text-amber-800 text-2xl">🔸 疑問代名詞（置於句首/句尾）：</p>
                  <p className="text-gray-600 text-base leading-relaxed">這是用來詢問特定資訊的常見方式。包含 "ai" (誰)、"gì" (什麼)、"khi nào" (什麼時候)、"ở đâu" (在哪裡)、"sao / tại sao" (為什麼)、"bao nhiêu" (多少) 等。</p>
                  <div className="text-emerald-950 font-bold bg-emerald-50/40 p-3 rounded-lg border border-emerald-100/40 mt-2">
                    <p>範例一：<span className="font-black text-emerald-700 text-2xl">"Ai đang ở nhà?"</span> (誰在家？)</p>
                    <p className="mt-1">範例二：<span className="font-black text-emerald-700 text-2xl">"Bạn muốn ăn gì?"</span> (你想吃什麼？)</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm space-y-2">
                  <p className="font-black text-amber-800 text-2xl">🔸 疑問助詞（置於句尾）：</p>
                  <p className="text-gray-600 text-base leading-relaxed">這常用於一般是非問句、尋求確認，或表達驚訝、懷疑。常見的詞彙包括 "không" (嗎)、"sao" (怎會/這樣嗎)、"chứ" (吧)、"à / hả" (啊/哈)、"ra sao" (如何) 等。</p>
                  <div className="text-emerald-950 font-bold bg-emerald-50/40 p-3 rounded-lg border border-emerald-100/40 mt-2">
                    <p>範例一：<span className="font-black text-emerald-700 text-2xl">"Bạn đến đây không?"</span> (你來這嗎？)</p>
                    <p className="mt-1">範例二：<span className="font-black text-emerald-700 text-2xl">"Cậu thích bộ phim đó sao?"</span> (你喜歡那部電影喔？)</p>
                  </div>
                </div>

                <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-100 space-y-2">
                  <p className="font-black text-amber-950 text-2xl"> 疑問句結尾標點：</p>
                  <p className="text-gray-700 text-lg">為了明確指出該句子為疑問句，必須在句尾加上問號 <span className="font-black text-amber-600 text-2xl">"?"</span>。</p>
                  <div className="text-amber-900 text-lg font-bold mt-2 space-y-1 pl-3 border-l-4 border-amber-500">
                    <p>• "Tại sao bạn không tham gia?" <span className="text-gray-400 font-medium italic text-base">/ 為什麼你不參加？</span></p>
                    <p>• "Anh ấy đã về nhà rồi sao?" <span className="text-gray-400 font-medium italic text-base">/ 他已經回家了喔？</span></p>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-base font-medium italic pt-2"> 靈活運用這些疑問詞，你就能在越南語中組織出各式各樣豐富的提問問句。</p>
            </div>


            {/* 4. 否定句 */}
            <div className="bg-white/60 p-8 rounded-2xl border border-rose-100/50 shadow-sm space-y-6">
              <p className="font-bold text-3xl text-rose-800 flex items-center">
                <span className="w-2 h-8 bg-rose-500 rounded-full mr-3"></span>
                4. 否定句結構 (Cấu trúc câu phủ định)
              </p>
              <p className="text-gray-600 text-xl leading-relaxed">
                否定句用於表達不接受、拒絕或反駁某個事實。理解和正確使用各種否定詞，能幫助你精確地表達自己的個人觀點和立場。
              </p>

              {/* 常用否定詞說明 */}
              <div className="bg-rose-50/30 p-6 rounded-xl border border-rose-100/50 space-y-4 text-lg text-gray-700 font-medium">
                <p className="font-black text-rose-950 text-2xl mb-1">🛠️ 常用否定詞：</p>
                <p>• <span className="text-rose-600 font-bold bg-rose-50 px-1.5 rounded">Không：</span> 最普遍的否定詞，通常直接放在動詞前構成否定句。<i>(例："Tôi không biết." - 我不知道)</i></p>
                <p>• <span className="text-rose-600 font-bold bg-rose-50 px-1.5 rounded">Chưa：</span> 表示某個動作或狀態「尚未完成」或「還沒發生」。<i>(例："Tôi chưa gặp anh ấy." - 我還沒見過面)</i></p>
                <p>• <span className="text-rose-600 font-bold bg-rose-50 px-1.5 rounded">Không phải：</span> 用於全盤否定已知的某個事實或特定資訊。<i>(例："Đó không phải là quyển sách của tôi." - 那不是我的書)</i></p>
                <p>• <span className="text-rose-600 font-bold bg-rose-50 px-1.5 rounded">Đâu có / Làm gì có：</span> 用於加強語氣的駁斥或強烈否定語境。<i>(例："Đâu có ai ở đây!" - 哪裡有人在這裡！)</i></p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm text-center font-black text-rose-600 text-2xl tracking-wide leading-relaxed">
                主語 + 否定詞 (không, chưa, không phải...) + 動詞 + 受詞 (若有)
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                <p className="text-2xl font-black text-rose-600">否定句實戰範例：</p>
                <div className="space-y-3 text-xl font-bold text-gray-900 pl-2">
                  <p>1. "Chúng ta chưa từng đến nơi đó." <span className="text-gray-400 font-medium italic text-base block md:inline md:ml-2">/ 我們從未去過那個地方。</span></p>
                  <p>2. "Họ không phải là bạn của tôi." <span className="text-gray-400 font-medium italic text-base block md:inline md:ml-2">/ 他們不是我的朋友。</span></p>
                  <p>3. "Em không thích ăn kem." <span className="text-gray-400 font-medium italic text-base block md:inline md:ml-2">/ 我不喜歡吃冰淇淋。</span></p>
                </div>
              </div>
            </div>

          </div>
        </article>
      </div>
    </div>
  );
}