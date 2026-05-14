import Axios from 'axios'

const axios = Axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000', 
    // Tạm thời vô hiệu hóa để tránh lỗi kết nối cổng 8000
    baseURL: '', 
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios