import { createBrowserClient } from '@supabase/ssr'

// Khởi tạo client bằng createBrowserClient để tự động cấu hình 
// cookie trùng khớp 100% với định dạng mà Middleware đang chờ đọc
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)