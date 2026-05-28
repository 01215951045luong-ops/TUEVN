'use client';
import Link from 'next/link';

export default function GrammarList() {
  const lessons = [
    { 
        id: 1, 
        title: '“是” 字句 (Cấu trúc "Là")', 
        desc: '用於定義或介紹事物', 
        color: 'bg-blue-500' 
        },
    { 
      id: 2, 
      title: '所有格結構 "Của"', 
      desc: '學習如何表達「我的」、「你的」，以及省略 "của" 的用法。', 
      color: 'bg-blue-500' 
    },
    { 
      id: 3, 
      title: '人稱代詞與家族稱呼', 
      desc: '學習如何根據年齡與性別正確使用 Anh, Chị, Em 以及家族稱謂。', 
      color: 'bg-teal-500' 
    },
    { 
      id: 4, 
      title: '動詞 "Có" (有)', 
      desc: '學習如何使用動詞 "Có" 表達擁有，掌握肯定、否定與疑問句型。', 
      color: 'bg-purple-500' 
    },
    { 
      id: 5, 
      title: '副詞 "Đều" (都)', 
      desc: '學習如何使用 "Đều" 描述複數主語的共同行為，包含肯定、否定與疑問。', 
      color: 'bg-indigo-500' 
    },
    { 
      id: 6, 
      title: '動詞 "Đi" (去) + VP', 
      desc: '學習如何使用 "Đi" 表達「去做某事」，掌握去運動、吃飯等日常行為句型。', 
      color: 'bg-emerald-500' 
    },
    { 
      id: 7, 
      title: '越南語基本語法結構', 
      desc: '學習越南語基本句型，包含肯定句、否定句、疑問句，以及現在式、過去式與未來式的基本用法。',
      color: 'bg-indigo-500' 
    },
    { 
      id: 8, 
      title: '萬能字「Không」的完整用法', 
      desc: '一次搞懂越南語核心字「Không」！深入解析它在動詞前當作「否定（不）」以及放在句尾當作「疑問（嗎）」的關鍵語法與正反問句結構。',
      color: 'bg-emerald-500' 
    },
    { 
      id: 9, 
      title: '越南語「肯定與否定回答」完整用法', 
      desc: '一次搞懂如何正確回答越南語問句！深入解析如何透過重複動詞做肯定簡答，以及使用「Không/Không phải」進行否定回應，並掌握姓名與姓氏的特殊例外用法。',
      color: 'bg-indigo-500'
    },
    { 
      id: 10, 
      title: '越南語程度副詞「Rất」的完整用法', 
      desc: '一次搞懂如何用越南語表達「很」！深入解析程度副詞「Rất」的句型結構、語法位置，以及在口語陳述句中的修飾與習慣用法。',
      color: 'bg-emerald-500'
    },
    { 
      id: 11, 
      title: '越南語「時間詞的位置」完整用法', 
      desc: '一次搞懂時間副詞在越南語句子中的擺放規則！深入解析時間詞放在主詞前、後的語氣差異，以及如何正確由大到小排列時間單位。',
      color: 'bg-indigo-500' 
    }
    // Thêm các bài khác ở đây...
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-black text-center mb-12 text-gray-800">越語語法</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {lessons.map((lesson) => (
          <Link href={`/grammars/${lesson.id}`} key={lesson.id}>
            <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all overflow-hidden cursor-pointer border border-gray-100">
              <div className={`${lesson.color} h-32 flex items-center justify-center p-6 text-white`}>
                <span className="text-5xl font-black opacity-30">0{lesson.id}</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </h2>
                <p className="mt-2 text-gray-500 leading-relaxed">
                  {lesson.desc}
                </p>
                <div className="mt-6 flex items-center text-sm font-black text-gray-400 group-hover:text-blue-500">
                  了解更多 <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}