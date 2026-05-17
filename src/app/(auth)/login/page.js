'use client'

import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { supabase } from '@/lib/supabase' 
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    const submitForm = async event => {
        event.preventDefault()
        setLoading(true)
        setErrors({})

        try {
            // 1. Đăng nhập bằng Supabase Browser Client (Tự động lưu cookie chuẩn SSR)
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (authError) {
                setErrors({ email: [authError.message] })
                setLoading(false)
                return
            }

            // 2. Lấy thông tin Role từ bảng profiles
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', authData.user.id)
                .maybeSingle()

            if (profileError) {
                console.error('Lỗi truy vấn profile:', profileError.message)
                router.push('/dashboard')
                return
            }

            // 3. Điều hướng mượt mà bằng router.push vì Cookie đã đồng bộ hoàn hảo
            if (!profile) {
                router.push('/dashboard')
            } else if (profile.role === 'admin') {
                router.push('/admin')
            } else {
                router.push('/dashboard')
            }

        } catch (err) {
            console.error('Lỗi hệ thống:', err)
            setErrors({ email: ['Đã có lỗi xảy ra, vui lòng thử lại sau.'] })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc] py-12 px-6">
            <div className="w-full max-w-[600px] bg-white rounded-[3rem] shadow-[0_25px_70px_rgba(0,0,0,0.07)] p-10 md:p-16 border border-gray-100">
                <div className="mb-12 text-center">
                    <h2 className="text-5xl font-[1000] text-gray-800 tracking-tighter">登入帳號</h2>
                    <p className="text-gray-400 mt-4 text-xl font-medium">歡迎回來！繼續您的學習之旅</p>
                </div>

                <AuthSessionStatus className="mb-6" status={status} />

                <form onSubmit={submitForm} className="space-y-8">
                    <div className="flex flex-col">
                        <Label className="text-gray-700 font-bold mb-3 ml-2 text-xl">電子郵件</Label>
                        <Input 
                            type="email" 
                            value={email} 
                            className="block w-full bg-gray-50 border-gray-200 rounded-2xl py-6 px-8 text-xl shadow-sm focus:ring-2 focus:ring-[#f59e0b]" 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            autoFocus 
                        />
                        <InputError messages={errors.email} className="mt-2 text-lg" />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-3 px-2">
                            <Label className="text-gray-700 font-bold text-xl">密碼</Label>
                        </div>
                        <Input 
                            type="password" 
                            value={password} 
                            className="block w-full bg-gray-50 border-gray-200 rounded-2xl py-6 px-8 text-xl shadow-sm focus:ring-2 focus:ring-[#f59e0b]" 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                        <InputError messages={errors.password} className="mt-2 text-lg" />
                    </div>

                    <div className="pt-6 space-y-4">
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-black hover:bg-[#d97706] text-white font-[1000] py-6 rounded-2xl shadow-xl text-2xl transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? '處理中...' : '立即登入 →'}
                        </button>
                        <Link href="/" className="w-full border-2 border-gray-200 text-gray-500 hover:bg-gray-50 font-black py-6 rounded-2xl flex items-center justify-center text-xl transition-all">← 返回首頁</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login