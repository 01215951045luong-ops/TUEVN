'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Menu Mobile
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Dropdown Desktop
  const { user, logout } = useAuth();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header style={{
      height: '100px',
      backgroundColor: 'white',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '2px solid #eeeeee',
      position: 'relative',
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" className="max-w-[180px] md:max-w-[220px] w-full" style={{ height: 'auto', display: 'block' }} />
          </Link>
        </div>

        {/* --- MENU DESKTOP --- */}
        <div className="hidden md:flex items-center gap-10">
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '30px', margin: 0 }}>
              <li><Link href="/" className="text-lg font-bold text-gray-700 hover:text-orange-500 transition-colors">首頁</Link></li>
              <li><Link href="/sonants" className="text-lg font-bold text-gray-700 hover:text-orange-500 transition-colors">發音字母</Link></li>
              <li><Link href="/vocabularies" className="text-lg font-bold text-gray-700 hover:text-orange-500 transition-colors">詞彙</Link></li>
              <li><Link href="/grammars" className="text-lg font-bold text-gray-700 hover:text-orange-500 transition-colors">語法</Link></li>
              <li><Link href="#" className="text-lg font-bold text-gray-700 hover:text-orange-500 transition-colors">聯絡我們</Link></li>
            </ul>
          </nav>

          <div className="flex items-center gap-4 border-l pl-8 border-gray-200">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-lg font-bold text-gray-700 hover:text-orange-500 transition-all focus:outline-none"
                >
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm shadow-md font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span>你好, {user.name}</span>
                  <i className={`ri-arrow-down-s-line transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                      <p className="font-black text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        <i className="ri-dashboard-line"></i> 帳戶總覽 (Dashboard)
                      </Link>
                      
                      {/* --- THÊM MỤC NÀY --- */}
                      <Link href="/my-vocab" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                        <i className="ri-book-mark-line"></i> 我的詞彙 (My Vocab)
                      </Link>
                    </div>
                    <div className="border-t border-gray-50 py-2">
                      <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors font-bold text-left">
                        <i className="ri-logout-box-r-line"></i> 登出 
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/register" className="text-lg font-black text-gray-500 hover:text-gray-800 transition-colors">註冊</Link>
                <Link href="/login"className="px-6 py-2.5 bg-black text-white rounded-2xl font-black text-lg shadow-lg hover:bg-gray-800 transition-all">登入</Link>
              </div>
            )}
          </div>
        </div>

        {/* ICON MENU MOBILE */}
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <i className={isOpen ? "ri-close-line" : "ri-menu-line"} style={{ fontSize: '35px', color: '#333', cursor: 'pointer' }}></i>
        </div>
      </div>

      {/* --- MENU MOBILE --- */}
      {isOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-white border-b shadow-lg md:hidden z-[1001] animate-fadeIn">
          <ul className="flex flex-col p-6 space-y-6">
            <li><Link href="/" onClick={() => setIsOpen(false)} className="block text-2xl font-black text-gray-800">首頁</Link></li>
            <li><Link href="/sonants" onClick={() => setIsOpen(false)} className="block text-2xl font-black text-gray-800">發音字母</Link></li>
            <li><Link href="/vocabularies" onClick={() => setIsOpen(false)} className="block text-2xl font-black text-gray-800">詞彙</Link></li>
            <li><Link href="/grammars" onClick={() => setIsOpen(false)} className="block text-2xl font-black text-gray-800">語法</Link></li>
            
            <hr className="border-gray-100" />
            
            <div className="flex flex-col gap-4">
              {user ? (
                <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-gray-800">Chào, {user.name}!</p>
                        <p className="text-sm text-gray-500 truncate w-48">{user.email}</p>
                      </div>
                   </div>
                   
                   {/* Thêm link vào Mobile */}
                   <Link href="/my-vocab" onClick={() => setIsOpen(false)} className="w-full py-4 text-center text-xl font-black text-teal-600 bg-teal-50 rounded-2xl">
                      我的詞彙 (My Vocab)
                   </Link>

                   <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full py-4 text-center text-xl font-black text-gray-700 bg-gray-100 rounded-2xl">
                      進入控制台 (Dashboard)
                   </Link>
                   <button onClick={logout} className="w-full py-4 text-center text-xl font-black text-white bg-red-500 rounded-2xl">
                      登出 
                   </button>
                </div>
              ) : (
                <>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="w-full py-4 text-center text-2xl font-black text-gray-600 bg-gray-50 rounded-2xl">註冊</Link>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="w-full py-4 text-center text-2xl font-black text-white bg-orange-500 rounded-2xl shadow-lg">登入</Link>
                </>
              )}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;