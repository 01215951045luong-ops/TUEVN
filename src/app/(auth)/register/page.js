'use client'

import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
// 1. Import Supabase client
import { supabase } from '@/lib/supabase' 
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const submitForm = async event => {
        event.preventDefault()
        setLoading(true)
        setErrors({})

        // Kiểm tra mật khẩu xác nhận thủ công ở phía Client
        if (password !== passwordConfirmation) {
            setErrors({ password: ['Mật khẩu xác nhận không khớp!'] })
            setLoading(false)
            return
        }

        // 2. Gọi API đăng ký của Supabase
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                // Gửi tên vào metadata để Trigger bên SQL nhận diện và lưu vào bảng profiles
                data: {
                    full_name: name, 
                },
            },
        })

        if (error) {
            setErrors({ email: [error.message] })
            setLoading(false)
            return
        }

        // 3. Đăng ký thành công
        if (data.user) {
            alert('註冊成功！請登入。')
            router.push('/login')
        }
    }

    return (
        <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-start bg-[#f8fafc] py-12 px-6 z-20">
            <div className="w-full max-w-[600px] bg-white rounded-[3rem] shadow-[0_25px_70px_rgba(0,0,0,0.07)] p-10 md:p-16 border border-gray-100 mt-6">
                
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-[1000] text-gray-800 tracking-tighter">
                        註冊帳號
                    </h2>
                    <p className="text-gray-400 mt-4 text-xl font-medium">
                        開啟您的越南語學習之旅
                    </p>
                </div>

                <form onSubmit={submitForm} className="space-y-8">
                    
                    {/* Tên */}
                    <div className="flex flex-col">
                        <Label htmlFor="name" className="text-gray-700 font-bold mb-3 ml-2 text-xl">姓名</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block w-full bg-gray-50 border-gray-200 rounded-2xl py-6 px-8 focus:ring-2 focus:ring-[#f59e0b] focus:bg-white transition-all text-xl shadow-sm"
                            onChange={event => setName(event.target.value)}
                            required
                        />
                        <InputError messages={errors.name} className="mt-2 text-lg" />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <Label htmlFor="email" className="text-gray-700 font-bold mb-3 ml-2 text-xl">電子郵件</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block w-full bg-gray-50 border-gray-200 rounded-2xl py-6 px-8 focus:ring-2 focus:ring-[#f59e0b] focus:bg-white transition-all text-xl shadow-sm"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                        <InputError messages={errors.email} className="mt-2 text-lg" />
                    </div>

                    {/* Mật khẩu */}
                    <div className="flex flex-col">
                        <Label htmlFor="password" className="text-gray-700 font-bold mb-3 ml-2 text-xl">密碼</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block w-full bg-gray-50 border-gray-200 rounded-2xl py-6 px-8 focus:ring-2 focus:ring-[#f59e0b] focus:bg-white transition-all text-xl shadow-sm"
                            onChange={event => setPassword(event.target.value)}
                            required
                        />
                        <InputError messages={errors.password} className="mt-2 text-lg" />
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className="flex flex-col">
                        <Label htmlFor="passwordConfirmation" className="text-gray-700 font-bold mb-3 ml-2 text-xl">確認密碼</Label>
                        <Input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="block w-full bg-gray-50 border-gray-200 rounded-2xl py-6 px-8 focus:ring-2 focus:ring-[#f59e0b] focus:bg-white transition-all text-xl shadow-sm"
                            onChange={event => setPasswordConfirmation(event.target.value)}
                            required
                        />
                    </div>

                    {/* Nút đăng ký */}
                    <div className="pt-8">
                        <button 
                            disabled={loading}
                            className={`w-full bg-black hover:bg-[#d97706] text-white font-[1000] py-6 rounded-2xl shadow-2xl shadow-orange-200 transition-all flex items-center justify-center gap-4 group text-2xl ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? '處理中...' : '立即註冊'} <span className="group-hover:translate-x-3 transition-transform text-3xl">→</span>
                        </button>
                    </div>

                    {/* Nút quay lại */}
                    <div className="pt-2">
                        <Link 
                            href="/" 
                            className="w-full border-2 border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-400 font-black py-6 rounded-2xl transition-all flex items-center justify-center gap-3 text-xl"
                        >
                            ← 返回首頁
                        </Link>
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-gray-400 font-bold text-xl">
                            已經有帳號了？{' '}
                            <Link href="/login" className="text-[#f59e0b] hover:underline underline-offset-8">
                                點此登入
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page