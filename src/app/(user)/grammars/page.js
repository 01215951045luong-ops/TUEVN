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