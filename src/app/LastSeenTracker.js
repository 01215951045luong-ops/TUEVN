"use client"
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function LastSeenTracker() {
        useEffect(() => {
            const updateLastSeen = async () => {
            // 1. Kiểm tra session đăng nhập hiện tại của người dùng
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session?.user) {
                // 2. Nếu tồn tại user, cập nhật thời gian ISO hiện tại lên bảng profiles
                await supabase
                .from('profiles')
                .update({ last_seen: new Date().toISOString() })
                .eq('id', session.user.id);
            }
            };

            // Chạy kích hoạt ngay khi người dùng vừa load trang
            updateLastSeen();

            // Thiết lập vòng lặp cứ mỗi 3 phút (180000ms) gửi tín hiệu một lần để duy trì Online
            const interval = setInterval(updateLastSeen, 180000);
            
            return () => clearInterval(interval);
        }, []);

        // Component này chỉ chạy ngầm xử lý logic nên không cần hiển thị gì ra giao diện
        return null;
        }
    