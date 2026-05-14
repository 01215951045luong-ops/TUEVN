'use client'

import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Login = () => {
    const router = useRouter()
    const { login } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/dashboard' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        // Sửa lỗi render bằng cách thêm mảng phụ thuộc chính xác
        if (router.query?.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    }, [router.query, errors])

    const submitForm = async event => {
        event.preventDefault()
        login({ email, password, remember: shouldRemember, setErrors, setStatus })
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
                        <Input type="email" value={email} className="block w-full bg-gray-50 border-gray-200 rounded-2xl py-6 px-8 text-xl shadow-sm focus:ring-2 focus:ring-[#f59e0b]" onChange={e => setEmail(e.target.value)} required autoFocus />
                        <InputError messages={errors.email} className="mt-2 text-lg" />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-3 px-2">
                            <Label className="text-gray-700 font-bold text-xl">密碼</Label>
                        </div>
                        <Input type="password" value={password} className="block w-full bg-gray-50 border-gray-200 rounded-2xl py-6 px-8 text-xl shadow-sm focus:ring-2 focus:ring-[#f59e0b]" onChange={e => setPassword(e.target.value)} required />
                        <InputError messages={errors.password} className="mt-2 text-lg" />
                    </div>

                    <div className="pt-6 space-y-4">
                        <button className="w-full bg-black hover:bg-[#d97706] text-white font-[1000] py-6 rounded-2xl shadow-xl text-2xl transition-all">立即登入 →</button>
                        <Link href="/" className="w-full border-2 border-gray-200 text-gray-500 hover:bg-gray-50 font-black py-6 rounded-2xl flex items-center justify-center text-xl transition-all">← 返回首頁</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login