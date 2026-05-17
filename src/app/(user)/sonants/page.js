'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Đảm bảo bạn đã tạo file lib/supabase.js như hướng dẫn trước

export default function SonantPage() {
    const [sonants, setSonants] = useState([]);
   const [loading, setLoading] = useState(true);
    const audioRef = typeof window !== 'undefined' ? require('react').useRef(null) : null; // Thêm dòng này để quản lý audio hiện tại
    

    // Tên Bucket trên Supabase Storage
    const BUCKET_NAME = 'sonants_assets';

    useEffect(() => {
        const fetchSonants = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('sonants')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) throw error;
                setSonants(data || []);
            } catch (err) {
                console.error("Lỗi lấy dữ liệu:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSonants();
        return () => {
        if (audioRef && audioRef.current) {
            audioRef.current.pause();
        }
        };
    }, []);

    // Hàm lấy URL ảnh/âm thanh từ Supabase Storage
    const getMediaUrl = (fileName) => {
        if (!fileName) return '';
        if (fileName.startsWith('http')) return fileName;
        const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
        return data.publicUrl;
    };

    const playSound = (audioPath) => {
    if (!audioPath) return;

    // 1. Nếu có âm thanh đang tồn tại, dừng nó lại
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    const url = getMediaUrl(audioPath);
    const newAudio = new Audio(url);
    audioRef.current = newAudio;

    // 2. Xử lý Promise của play() để tránh lỗi AbortError của trình duyệt
    const playPromise = newAudio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Âm thanh đã bắt đầu phát thành công, không làm gì cả
            })
            .catch(error => {
                // Bắt các lỗi hủy phát nhạc ngầm khi người dùng bấm quá nhanh
                if (error.name !== 'AbortError') {
                    console.error("Lỗi phát âm thanh thật sự:", error);
                }
            });
    }
};

    // --- CHIA DỮ LIỆU THÀNH CÁC NHÓM ---
    const alphabetList = sonants.slice(0, 29); 
    const compoundList = sonants.slice(29, 39); 
    const toneList = sonants.slice(39, 45);
    const practiceList = sonants.slice(45);

    if (loading) return <div className="text-center py-20">Đang tải...</div>;

    return (
        <div className="bg-white min-h-screen py-10 font-sans">
            <div className="max-w-5xl mx-auto px-4">
                
                {/* NHÓM 1: BẢNG CHỮ CÁI */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8 relative">
                        <span className="relative z-10 bg-white px-4 text-gray-800">1. 越南語字母表 (29個字母)</span>
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-teal-500 -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2">
                        {alphabetList.map((item) => (
                            <div key={item.id} onClick={() => playSound(item.audio)} 
                                 className="cursor-pointer border-2 border-gray-300 hover:border-teal-500 bg-[#444] aspect-square flex items-center justify-center p-1 transition-all shadow-sm">
                                <img src={getMediaUrl(item.image)} alt={item.name} className="w-full h-auto object-contain" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* NHÓM 2: PHỤ ÂM GHÉP */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8 relative">
                        <span className="relative z-10 bg-white px-4 text-gray-800">2. 越南語的複合輔音</span>
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-teal-500 -z-0"></div>
                    </h2>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {compoundList.map((item) => (
                            <div key={item.id} onClick={() => playSound(item.audio)} 
                                 className="cursor-pointer border-2 border-gray-300 hover:border-teal-500 bg-[#444] aspect-square flex items-center justify-center p-1 transition-all shadow-sm">
                                <img src={getMediaUrl(item.image)} alt={item.name} className="w-full h-auto object-contain" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* KHUNG GIẢI THÍCH QUY TẮC CHÍNH TẢ */}
                  <div className="border-[2px] border-red-200 rounded-[40px] p-8 mb-16 shadow-md bg-[#fffcfc]">
                <div className="space-y-10">
                    
                    {/* --- PHẦN I: G & GH --- */}
                    <section>
                    <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-start gap-3">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-xl shrink-0 text-xl">一</span>
                        <span>G 和 Gh 的區別</span>
                    </h3>
                    
                    <p className="text-xl text-gray-700 leading-relaxed mb-6 ml-2">
                        其實不在於發音（因為兩者的讀音完全一樣），而是在於拼寫規則。這是越南語中一個固定的正字法規範，幫助我們正確書寫詞彙。
                    </p>

                    <div className="grid gap-6 ml-4">
                        {/* Quy tắc Gh */}
                        <div className="p-6 bg-white rounded-2xl border border-red-100 shadow-sm">
                        <h4 className="text-xl font-semibold text-red-800 mb-3">1. 「gh」的規則:</h4>
                        <p className="text-lg text-gray-800">
                            「gh」這個音只會和 3 個特定的母音搭配: 
                            <span className="text-red-600 font-bold text-2xl mx-2">e, ê, i</span>
                        </p>
                        
                        {/* CÔNG THỨC VỪA PHẢI */}
                        <div className="mt-4 bg-red-50 border border-red-200 py-3 px-6 rounded-xl inline-block">
                            <span className="text-red-600 font-semibold text-3xl tracking-normal">
                            公式: gh + (e, ê, i)
                            </span>
                        </div>
                        
                        <div className="mt-4 text-lg text-gray-600">
                            <span className="font-semibold text-blue-600 mr-2">例子:</span> 
                            ghi chép (記錄), ghi nhớ (記住)
                        </div>
                        </div>

                        {/* Quy tắc G */}
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">2. 「g」的規則:</h4>
                        <p className="text-lg text-gray-700">
                            「g」會和其他所有母音搭配 <span className="font-semibold text-gray-900">(a, o, ô, ơ, u, ư…)</span>。
                        </p>
                        <div className="mt-4 bg-gray-50 border border-gray-200 py-3 px-6 rounded-xl inline-block">
                            <span className="text-gray-800 font-semibold text-3xl tracking-normal">
                            公式: g + (a, o, ô, ơ, u, ư, ă, â…)
                            </span>
                        </div>
                        <div className="mt-4 text-lg text-gray-600">
                            <span className="font-semibold text-blue-600 mr-2">例子:</span> 
                            ga tàu (火車站), con gà (雞), gạo tẻ (白米), gội đầu (洗頭)
                        </div>
                        </div>
                    </div>
                    </section>

                    {/* Đường gạch ngang mảnh hơn */}
                    <div className="border-t-2 border-red-50 border-dashed mx-10"></div>

                    {/* --- PHẦN II: NG & NGH --- */}
                    <section>
                    <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-start gap-3">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-xl shrink-0 text-xl">二</span>
                        <span>Ng 和 Ngh 的區別</span>
                    </h3>
                    <p className="text-xl text-gray-700 leading-relaxed mb-6 ml-2">
                        其實不在於發音（因為兩者的讀音完全一樣），而是在於拼寫規則。這是越南語中一個固定的正字法規範，幫助我們正確書寫詞彙。
                    </p>
                    
                    <div className="grid gap-6 ml-4">
                        {/* Quy tắc Ngh */}
                        <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <h4 className="text-xl font-semibold text-blue-800 mb-3">1. 「Ngh」的規則:</h4>
                        <p className="text-lg text-gray-800">
                            「Ngh」這個音只會和 3 個特定的母音搭配: 
                            <span className="text-red-600 font-bold text-2xl mx-2">e, ê, i</span>
                        </p>
                        <div className="mt-4 bg-blue-50 border border-blue-200 py-3 px-6 rounded-xl inline-block">
                            <span className="text-blue-600 font-semibold text-3xl tracking-normal">
                            公式: Ngh + (e, ê, i)
                            </span>
                        </div>
                        <div className="mt-4 text-lg text-gray-600">
                            <span className="font-semibold text-blue-600 mr-2">例子:</span> 
                            suy nghĩ (思考), nghi ngờ (懷疑), nghề nghiệp (職業), nghe (聽)
                        </div>
                        </div>

                        {/* Quy tắc Ng */}
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">2. 「Ng」的規則:</h4>
                        <div className="mt-4 bg-gray-50 border border-gray-200 py-3 px-6 rounded-xl inline-block">
                            <span className="text-gray-900 font-semibold text-3xl tracking-normal">
                            公式: Ng + (a, o, ô, ơ, u, ư, ă, â…)
                            </span>
                        </div>
                        </div>
                    </div>
                    </section>

                    <div className="border-t-2 border-red-50 border-dashed mx-10"></div>

                    {/* --- PHẦN II: I & Y --- */}
                <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-start gap-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-xl shrink-0 text-xl">三</span>
                    <span>「i」和「y」的區別</span>
                </h3>

                <p className="text-xl text-gray-700 leading-relaxed mb-6 ml-2">
                    「i」和「y」在越南語中的發音是相同的，但使用上有不同的拼寫規則。
                    這些規則屬於正字法，幫助我們在不同情況下正確使用這兩個字母。
                </p>
                
                <div className="grid gap-6 ml-4">
                    
                    {/* Quy tắc i */}
                    <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                    <h4 className="text-xl font-semibold text-blue-800 mb-3">1. 「i」的使用規則:</h4>
                    <p className="text-lg text-gray-800">
                        「i」通常用在單字中間或結尾的位置，是最常見的寫法。
                    </p>
                    <div className="mt-4 bg-blue-50 border border-blue-200 py-3 px-6 rounded-xl inline-block">
                        <span className="text-blue-600 font-semibold text-3xl">
                        常見位置: 單字中間 / 結尾
                        </span>
                    </div>
                    <div className="mt-4 text-lg text-gray-600">
                        <span className="font-semibold text-blue-600 mr-2">例子:</span> 
                        đi (去), tim (心臟), im lặng(安靜)
                    </div>
                    </div>

                    {/* Quy tắc y */}
                    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">2. 「y」的使用規則:</h4>
                    <p className="text-lg text-gray-800">
                        「y」通常用在單字開頭，或在某些固定詞彙中使用，
                        有時也用來讓單字看起來更清楚或區分意義。
                    </p>
                    <div className="mt-4 bg-gray-50 border border-gray-200 py-3 px-6 rounded-xl inline-block">
                        <span className="text-gray-900 font-semibold text-3xl">
                        常見位置: 單字開頭 / 固定詞
                        </span>
                    </div>
                    <div className="mt-4 text-lg text-gray-600">
                        <span className="font-semibold text-gray-700 mr-2">例子:</span> 
                        yêu (愛), y tế (醫療), Mỹ (美國)
                    </div>
                    </div>

                </div>
                </section>
                
                <section>
                    <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-start gap-3">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-xl shrink-0 text-xl">四</span>
                        <span>「s / x」的區別</span>
                    </h3>

                    <p className="text-xl text-gray-700 leading-relaxed mb-6 ml-2">
                        「s」和「x」在越南語中發音不同，但在書寫上容易混淆。
                        「s」發音較強，「x」發音較輕。
                    </p>

                    <div className="grid gap-6 ml-4">

                        {/* s / x */}
                        <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <h4 className="text-xl font-semibold text-blue-800 mb-3"> 「s / x」的區別:</h4>

                        <p className="text-lg text-gray-800">
                            「s」發音較強，「x」發音較輕。
                        </p>

                        <div className="mt-4 bg-blue-50 border border-blue-200 py-3 px-6 rounded-xl inline-block">
                            <span className="text-blue-600 font-semibold text-3xl">
                            s = 強音 / x = 輕音
                            </span>
                        </div>

                        <div className="mt-4 text-lg text-gray-600">
                            <span className="font-semibold text-blue-600 mr-2">例子:</span>
                            sinh viên (大學生), sáng tạo (創造), sạch sẽ (乾淨)
                        </div>
                        </div>

                    </div>
                    </section>


                    <section>
                    <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-start gap-3">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-xl shrink-0 text-xl">五</span>
                        <span>「ch / tr」的區別</span>
                    </h3>

                    <p className="text-xl text-gray-700 leading-relaxed mb-6 ml-2">
                        「ch」和「tr」在越南語中發音相似，但實際上有不同的語音特徵。
                        「tr」通常是捲舌音，「ch」不是捲舌音。
                    </p>

                    <div className="grid gap-6 ml-4">

                        {/* ch / tr */}
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3"> 「ch / tr」的區別:</h4>

                        <p className="text-lg text-gray-800">
                            「tr」是捲舌音，「ch」不是捲舌音。
                        </p>

                        <div className="mt-4 bg-gray-50 border border-gray-200 py-3 px-6 rounded-xl inline-block">
                            <span className="text-gray-900 font-semibold text-3xl">
                            tr = 捲舌音 / ch = 非捲舌音
                            </span>
                        </div>

                        <div className="mt-4 text-lg text-gray-600">
                            <span className="font-semibold text-gray-700 mr-2">例子:</span>
                            trường học (學校), trời mưa (下雨), chơi bóng (踢球), trách nhiệm (責任)
                        </div>
                        </div>

                    </div>
                    </section>
                    
                </div>
                </div>

                {/* NHÓM 3: THANH ĐIỆU */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-8 relative">
                        <span className="relative z-10 bg-white px-4 text-gray-800">3. 越南語的六個聲調</span>
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-teal-500 -z-0"></div>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {toneList.map((item) => (
                            <div key={item.id} onClick={() => playSound(item.audio)} 
                                 className="cursor-pointer border-2 border-gray-300 hover:border-teal-500 bg-[#444] w-20 h-20 flex items-center justify-center p-1 transition-all shadow-md">
                                <img src={getMediaUrl(item.image)} alt={item.name} className="w-full h-auto" />
                            </div>
                        ))}
                    </div>

                    {/* KHUNG GIẢI THÍCH THANH ĐIỆU */}
                    <div className="border-[3px] border-red-300 rounded-[50px] p-10 max-w-2xl mx-auto bg-white shadow-lg my-10">
                        <h3 className="font-black text-4xl mb-8 text-center text-gray-800 underline decoration-teal-500 underline-offset-8">
                            越南語的六個聲調
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <ToneBox num="1" title="平聲 (不加符號)" desc="特點：語調平穩，沒有升降" color="border-gray-400 bg-gray-50 text-gray-900" />
                            <ToneBox num="2" title="升聲 (´)" desc="特點：語調上升" color="border-red-500 bg-red-50 text-red-600" />
                            <ToneBox num="3" title="降聲 (`)" desc="特點：語調下降" color="border-blue-500 bg-blue-50 text-blue-800" />
                            <ToneBox num="4" title="問聲 (?)" desc="特點：語調先降後升" color="border-green-500 bg-green-50 text-green-800" />
                            <ToneBox num="5" title="重聲 (.)" desc="特點：語調低而短促, 有力" color="border-orange-500 bg-orange-50 text-orange-900" />
                            <ToneBox num="6" title="拐聲 (~)" desc="特點：語調有波動、略帶斷裂" color="border-purple-500 bg-purple-50 text-purple-800" />
                        </div>
                    </div>
                </section>

                {/* LUYỆN TẬP THANH ĐIỆU */}
                <section className="mt-16 mb-20">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">聲調練習</h2>
                        <p className="text-xl text-gray-600">掌握越南語聲調需要練習。讓我們從「ma」的音開始吧!</p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-4xl mx-auto">
                        {practiceList.map((item) => (
                            <div key={item.id} onClick={() => playSound(item.audio)} 
                                 className="cursor-pointer border-2 border-gray-300 hover:border-teal-500 bg-[#444] aspect-square flex items-center justify-center p-2 transition-all rounded-xl shadow-md overflow-hidden hover:scale-105">
                                <img src={getMediaUrl(item.image)} alt={item.name} className="w-full h-full object-contain scale-110" />
                            </div>
                        ))}
                    </div>

                    {/* HƯỚNG DẪN CÁCH ĐỌC */}
                    <div className="max-w-4xl mx-auto mt-10 px-4">
                        <div className="border-2 border-teal-100 rounded-[35px] p-8 bg-teal-50 shadow-sm">
                            <h3 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-2">
                                <span className="text-3xl">🎵</span> 發音練習指引 
                            </h3>
                            <div className="space-y-4">
                                <Step num="1" text="第一遍：完整朗讀單字" />
                                <Step num="2" text="第二遍：詳細拆解發音" />
                                <Step num="3" text="第三遍：再次完整朗讀" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

// Các component phụ tái sử dụng
function ToneBox({ num, title, desc, color }) {
    return (
        <div className={`p-4 rounded-2xl border-l-8 ${color}`}>
            <p className="font-black text-3xl">{num}. {title}</p>
            <p className="text-xl text-gray-600 mt-2 ml-2 italic">{desc}</p>
        </div>
    );
}

function Step({ num, text }) {
    return (
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-teal-200">
            <span className="flex-shrink-0 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">{num}</span>
            <p className="text-xl text-gray-800 font-semibold">{text}</p>
        </div>
    );
}