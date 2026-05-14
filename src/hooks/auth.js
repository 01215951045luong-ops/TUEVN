'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase' // Đảm bảo bạn đã tạo file này
import useSWR from 'swr'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    // 1. Dùng SWR để quản lý state user từ Supabase
    const { data: user, error, mutate } = useSWR('supabase-user', async () => {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        return session?.user || null
    })

    const loading = !user && !error

    // 2. Hàm Đăng ký
    const register = async ({ setErrors, ...props }) => {
        setErrors([])
        const { error } = await supabase.auth.signUp({
            email: props.email,
            password: props.password,
            options: {
                data: {
                    name: props.name, // Lưu thêm tên nếu cần
                },
            },
        })

        if (error) {
            setErrors({ email: [error.message] })
        } else {
            mutate()
        }
    }

    // 3. Hàm Đăng nhập
    const login = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)
        
        const { error } = await supabase.auth.signInWithPassword({
            email: props.email,
            password: props.password,
        })

        if (error) {
            setErrors({ email: ["Email hoặc mật khẩu không chính xác"] })
        } else {
            mutate()
        }
    }

    // 4. Hàm Quên mật khẩu
    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        setErrors([])
        setStatus(null)
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        
        if (error) {
            setErrors({ email: [error.message] })
        } else {
            setStatus("Link đặt lại mật khẩu đã được gửi tới email của bạn.")
        }
    }

    // 5. Hàm Đăng xuất
    const logout = async () => {
        await supabase.auth.signOut()
        mutate(null)
        router.push('/login')
    }

    // 6. Xử lý Middleware (Chặn truy cập)
    useEffect(() => {
        // Nếu là khách mà đã đăng nhập -> Chuyển về trang được chỉ định (vd: /dashboard)
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        // Nếu yêu cầu đăng nhập mà không có user (hoặc lỗi) -> Chuyển về /login
        if (middleware === 'auth' && error) {
            router.push('/login')
        }
        
        // Theo dõi trạng thái auth thay đổi (đăng nhập/đăng xuất ở tab khác)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                mutate(session?.user || null)
                if (event === 'SIGNED_OUT') {
                    router.push('/login')
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [user, error, middleware])

    return {
        user,
        loading,
        register,
        login,
        forgotPassword,
        logout,
    }
}