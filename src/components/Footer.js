import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-[150px] pt-[60px] pb-[60px] px-[20px] bg-[#f8f9fa] border-t border-[#eeeeee]">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Cột 1 */}
        <div className="footer-item">
          <p className="font-bold text-[18px] mb-[20px] text-gray-800">越南語基礎學習網站</p>
          <a href="/sonants" className="block text-[15px] font-light leading-[35px] text-gray-600 hover:text-teal-600 transition-colors" style={{ textDecoration: 'none' }}>
            發音字母
          </a>
           <a href="/vocabularies" className="block text-[15px] font-light leading-[35px] text-gray-600 hover:text-teal-600 transition-colors" style={{ textDecoration: 'none' }}>
           詞彙</a>
           <a href="/grammars" className="block text-[15px] font-light leading-[35px] text-gray-600 hover:text-teal-600 transition-colors" style={{ textDecoration: 'none' }}>
           語法</a>
        </div>

        {/* Cột 2 */}
        <div className="footer-item">
          <p className="font-bold text-[18px] mb-[20px] text-gray-800">聯絡我們</p>
          <p className="text-[15px] font-light leading-[35px] text-gray-600">Facebook</p>
          <p className="text-[15px] font-light leading-[35px] text-gray-600">Instagram</p>
          <p className="text-[15px] font-light leading-[35px] text-gray-600">Gmail</p>
        </div>

        {/* Cột 3 */}
        <div className="footer-item">
          <p className="font-bold text-[18px] mb-[20px] text-gray-800">聯絡我們</p>
          <p className="text-[15px] font-light leading-[35px] text-gray-600">Facebook</p>
          <p className="text-[15px] font-light leading-[35px] text-gray-600">電話: 0970709886</p>
          <p className="text-[15px] font-light leading-[35px] text-gray-600" style={{ wordBreak: 'break-all' }}>
            Email: 01215951045luong@gmail.com
          </p>
        </div>

        {/* Cột 4 */}
        <div className="footer-item">
          <p className="font-bold text-[18px] mb-[20px] text-gray-800">聯絡地址</p>
          <p className="text-[15px] font-light leading-[35px] text-gray-600">台中市南屯區嶺東路一號</p>
          <p className="text-[15px] font-light leading-[35px] text-gray-600">嶺東科技大學</p>
        </div>

      </div>
      
      {/* Bản quyền phía dưới cùng (Tùy chọn) */}
      <div className="max-w-[1240px] mx-auto mt-[40px] pt-[20px] border-t border-gray-200 text-center">
        <p className="text-sm text-gray-400">© 2026 TUEVN Project. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;