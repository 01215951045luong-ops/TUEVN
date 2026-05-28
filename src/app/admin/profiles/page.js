"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function ListAccountPage() {
  const [accountList, setAccountList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); 
  const itemsPerPage = 15; 

  useEffect(() => { 
    fetchAccounts(); 
    
    // ✨ Thiết lập tự động làm mới danh sách mỗi 60 giây để cập nhật trạng thái Online/Offline theo thời gian thực
    const interval = setInterval(fetchAccounts, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      // Lấy thêm cột last_seen để tính toán trạng thái hoạt động
      const { data, error } = await supabase
        .from('profiles') 
        .select('id, name, email, role, last_seen')
        .order('name', { ascending: true });

      if (error) throw error;
      setAccountList(data || []);
    } catch (err) {
      console.error("讀取帳號資料失敗:", err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const handleToggleRole = async (userId, currentRole, userName) => {
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    const confirmMsg = nextRole === 'admin' 
      ? `您確定要將「${userName || '此用戶'}」升格為 管理員嗎？` 
      : `您確定要將「${userName || '此用戶'}」降格為 一般會員嗎？`;

    if (window.confirm(confirmMsg)) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ role: nextRole })
          .eq('id', userId);

        if (error) throw error;
        
        setAccountList(prev => prev.map(item => 
          item.id === userId ? { ...item, role: nextRole } : item
        ));
      } catch (err) {
        alert("更新權限失敗，請檢查 RLS Policy 權限設定！");
        console.error("更新權限失敗:", err.message);
      }
    }
  };

  // ❌ Hàm xử lý Xóa tài khoản người dùng
  const handleDeleteAccount = async (userId, userName) => {
    const confirmMsg = ` 警告：您確定要 永久刪除「${userName || '此用戶'}」的帳號嗎？\n此操作將無法回復！`;
    
    if (window.confirm(confirmMsg)) {
      try {
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', userId);

        if (error) throw error;
        setAccountList(prev => prev.filter(item => item.id !== userId));
      } catch (err) {
        alert("刪除帳號失敗，請檢查 RLS Policy 權限設定！");
        console.error("刪除帳號失敗:", err.message);
      }
    }
  };

  // ✨ Hàm kiểm tra trạng thái Online dựa trên last_seen (Active trong vòng 5 phút)
  const checkOnlineStatus = (lastSeenString) => {
  // 1. Nếu không có dữ liệu, hoặc dữ liệu bị trống/null/undefined -> Chắc chắn Offline
  if (!lastSeenString || lastSeenString === null) return false;
  
  const lastSeenTime = new Date(lastSeenString).getTime();
  
  // 2. Kiểm tra nếu chuỗi thời gian không hợp lệ (Dẫn đến NaN) -> Trả về Offline
  if (isNaN(lastSeenTime)) return false;
  
  const now = new Date().getTime();
  
  // 3. Tính toán số phút chênh lệch thực tế
  const diffInMinutes = (now - lastSeenTime) / 1000 / 60; 
  
  // Chỉ Online khi thời gian tương tác cuối cùng cách hiện tại nhỏ hơn hoặc bằng 5 phút
  // và số phút lệch không phải là số âm bất thường (lớn hơn 0)
  return diffInMinutes >= 0 && diffInMinutes <= 5; 
};
  // Bộ lọc tìm kiếm theo cột name và email
  const filteredAccounts = accountList.filter(account => {
    const searchLower = searchTerm.toLowerCase();
    return (
      account.email?.toLowerCase().includes(searchLower) ||
      account.name?.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Phân trang dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  return (
    <div className="w-full p-4 md:p-8 bg-[#fafafa] min-h-screen font-sans text-left text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* 頁首標題區塊 */}
        <div className="mb-8 border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">
            會員權限管理
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            {searchTerm ? `關鍵字搜尋結果：共 ${filteredAccounts.length} 筆` : `目前系統內總計有 ${accountList.length} 位註冊會員`}
          </p>
        </div>

        {/* THANH TÌM KIẾM */}
        <div className="mb-6 bg-white rounded-2xl shadow-xs p-4 border border-gray-200/80">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="輸入會員姓名 或 Email 進行搜尋..."
              className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black bg-gray-50/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3.5 text-gray-400 text-sm"><i className="ri-search-line"></i></span>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 text-gray-400 hover:text-black text-xs font-bold transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 資料表格卡片 - Đã dàn ngang toàn bộ các cột thông tin */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-fixed text-left">
              <thead>
                <tr className="bg-black text-white text-[15px] font-bold uppercase tracking-widest">
                  <th className="py-4 px-6 w-[25%]">會員姓名</th>
                  <th className="py-4 px-6 w-[30%]">電子郵件 (Email)</th>
                  <th className="py-4 px-6 w-[15%] text-center">當前狀態</th>
                  <th className="py-4 px-6 w-[15%] text-center">當前權限</th>
                  <th className="py-4 px-4 text-center w-36">操作選項</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-sm font-medium text-gray-400 tracking-wide animate-pulse">
                      資料載入中...
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-sm font-medium text-gray-400">
                      {searchTerm ? "找不到符合關鍵字的會員帳號。" : "目前系統內尚無會員資料。"}
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => {
                    const isOnline = checkOnlineStatus(item.last_seen);
                    return (
                      <tr key={item.id} className="hover:bg-gray-50/80 transition-all">
                        
                        {/* 1. Cột Tên độc lập */}
                        <td className="p-5 align-middle">
                          <span className="text-black font-bold text-base tracking-wide break-words">
                            {item.name || "未設定姓名"}
                          </span>
                        </td>

                        {/* 2. Cột Email độc lập */}
                        <td className="p-5 align-middle">
                          <span className="text-gray-500 font-mono text-sm break-all">
                            {item.email || "No Email"}
                          </span>
                        </td>

                        {/* 3. ✨ CỘT TRẠNG THÁI HOẠT ĐỘNG (Online / Offline) */}
                        <td className="p-5 text-center align-middle">
                          {isOnline ? (
                            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold border border-green-100">
                              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                              Online
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-400 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-100">
                              <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                              Offline
                            </span>
                          )}
                        </td>

                        {/* 4. Cột Quyền hạn */}
                        <td className="p-5 text-center align-middle">
                          {item.role === 'admin' ? (
                            <span className="inline-block bg-black text-white px-3 py-1 rounded-md text-xs font-black tracking-wider border border-black uppercase">
                               Admin
                            </span>
                          ) : (
                            <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-bold border border-gray-200 uppercase">
                               User
                            </span>
                          )}
                        </td>

                        {/* 5. Cột Thao tác chức năng */}
                        <td className="p-4 align-middle">
                          <div className="flex flex-col gap-1.5 items-center">
                            <button 
                              onClick={() => handleToggleRole(item.id, item.role, item.name)} 
                              className={`w-28 py-1.5 border rounded-lg text-center text-xs font-bold transition-all shadow-2xs ${
                                item.role === 'admin'
                                  ? 'border-gray-200 text-gray-700 bg-white hover:bg-black hover:text-white hover:border-black'
                                  : 'border-gray-200 text-black bg-white hover:bg-black hover:text-white'
                              }`}
                            >
                              {item.role === 'admin' ? '降格為 User' : '升格為 Admin'}
                            </button>
                            
                            <button 
                              onClick={() => handleDeleteAccount(item.id, item.name)} 
                              className="w-28 py-1.5 border border-gray-200 text-red-500 bg-white hover:bg-red-50 hover:border-red-200 rounded-lg text-center text-xs font-bold transition-all shadow-2xs"
                            >
                              刪除帳號
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 底部精緻分頁區塊 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-1.5 items-center">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 border border-gray-200 rounded-xl font-bold bg-white text-xs text-gray-500 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all shadow-2xs"
            >
              上一頁
            </button>

            <div className="flex gap-1 p-1 max-w-[400px] overflow-x-auto">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold flex-shrink-0 transition-all ${
                    currentPage === i + 1 
                    ? 'bg-black text-white shadow-sm scale-105' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 border border-gray-200 rounded-xl font-bold bg-white text-xs text-gray-500 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all shadow-2xs"
            >
              下一頁
            </button>
          </div>
        )}

      </div>
    </div>
  );
}