import React from 'react';

export default function Page() {
  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: 'white' }}>
      {/* SLIDER */}
      <section style={{ width: '100%', overflow: 'hidden' }}>
        <img 
          src="/images/slider2.png" 
          alt="Slider" 
          style={{ width: '100%', display: 'block', objectFit: 'cover' }} 
        />
      </section>
      {/* MAIN PRODUCTS */}
      <section className="py-[80px] px-5 text-center bg-gray-50">
  <div className="mb-[60px]">
    <h2 className="text-[36px] border-b-[4px] border-[#2a9d8f] inline-block pb-[10px] font-extrabold text-gray-800">
      從這裡開始學越南語
    </h2>
  </div>

  <div className="flex flex-wrap justify-center gap-[40px] mt-[20px]">
    {/* Card 1 - Đã làm lớn hơn */}
    <a href="/sonants" className="bg-white w-[350px] p-[40px] rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-left transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
      <div className="w-[60px] h-[60px] bg-[#8e7dbe] rounded-[12px] flex items-center justify-center text-white text-[28px]">
        <i className="ri-book-line"></i>
      </div>
      <h3 className="my-[20px] text-2xl font-bold text-gray-800">發音字母</h3>
      <p className="text-[16px] text-[#555] leading-[1.8]">
        學習越南語最基礎的發音與字母，讓我們一步步掌握正確的越南語口音。
      </p>
    </a>

    {/* Card 2 - Đã làm lớn hơn */}
    <a href="/vocabularies" className="bg-white w-[350px] p-[40px] rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-left transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
      <div className="w-[60px] h-[60px] bg-[#2a9d8f] rounded-[12px] flex items-center justify-center text-white text-[28px]">
        <i className="ri-pencil-fill"></i>
      </div>
      <h3 className="my-[20px] text-2xl font-bold text-gray-800">詞彙</h3>
      <p className="text-[16px] text-[#555] leading-[1.8]">
        掌握日常生活最常用的必備單字，從基礎到進階，豐富你的越南語詞庫。
      </p>
    </a>

    {/* Card 3 - Đã làm lớn hơn */}
    <a href="/grammars" className="bg-white w-[350px] p-[40px] rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-left transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
      <div className="w-[60px] h-[60px] bg-[#457b9d] rounded-[12px] flex items-center justify-center text-white text-[28px]">
        <i className="ri-git-repository-line"></i>
      </div>
      <h3 className="my-[20px] text-2xl font-bold text-gray-800">文法</h3>
      <p className="text-[16px] text-[#555] leading-[1.8]">
        輕鬆簡單地學習越南語語法結構，讓你能夠自信地組成完整且正確的句子。
      </p>
    </a>
  </div>
</section>
    </div>
  );
}