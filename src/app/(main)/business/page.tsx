"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Business() {
  const router = useRouter();

  const handleContact = () => {
    router.push('/contact');
  };

  // 애니메이션 카운터 훅
  function useCountUp(target: number, duration = 1500) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const end = target;
      if (start === end) return;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = Math.min(frame / totalFrames, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress === 1) clearInterval(counter);
      }, frameRate);
      return () => clearInterval(counter);
    }, [target, duration]);
    return count;
  }

  // FAQ 아코디언 상태
  const [openIndex, setOpenIndex] = useState<null | number>(null);
  const faqs = [
    { q: '정기 클래스는 어떻게 진행되나요?', a: '주 1-3회 정기적으로 진행되며, 연령별/수준별로 세분화된 체계적인 수업을 제공합니다.' },
    { q: '개인 레슨도 가능한가요?', a: '1:1 개인 레슨부터 소그룹 레슨까지 맞춤형 수업이 가능합니다.' },
    { q: '회원제는 어떻게 운영되나요?', a: '월 회원제로 운영되며, 자유롭게 원하는 클래스를 선택하여 참여할 수 있습니다.' },
    { q: '초보자도 참여할 수 있나요?', a: '초급자부터 고급자까지 수준별로 클래스가 구분되어 있어 누구나 참여 가능합니다.' },
  ];

  // 클래스 활동 사진 예시
  const galleryImages = [
    '/이미지1.png',
    '/이미지2.png',
    '/주요프로그램1.jpg',
    '/주요프로그램2.jpg',
    '/포폴1.jpg',
    '/포폴2.jpg',
    '/포폴3.jpg',
    '/포폴4.jpg',
  ];

  return (
    <main className="mt-[80px]">
      {/* 히어로 섹션 */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold mb-6 border border-white/20">
            BUSINESS WITH PLAYZONE
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            취미 스포츠의
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              새로운 시작
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            축구, 농구, 테니스, 배드민턴 등 다양한 스포츠를 정기 클래스로 체계적으로 배우고 즐겨보세요!
          </p>
        </div>
      </section>

      {/* 성과 통계 섹션 */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
              OUR ACHIEVEMENTS
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              플레이존의 주요 성과
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: 25, label: '정기 운영 클래스', icon: '📚', gradient: 'from-blue-500 to-cyan-500' },
              { value: 800, label: '월 정기 회원', icon: '👥', gradient: 'from-purple-500 to-pink-500' },
              { value: 12, label: '다양한 스포츠 종목', icon: '⚽', gradient: 'from-green-500 to-emerald-500' },
              { value: 95, label: '회원 만족도', icon: '⭐', gradient: 'from-orange-500 to-red-500', suffix: '%' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* 배경 그라데이션 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {useCountUp(stat.value)}{stat.suffix || '+'}
                  </div>
                  <p className="text-gray-600 font-semibold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 클래스 활동 갤러리 섹션 (선택적) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              GALLERY
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              클래스 활동 갤러리
            </h2>
            <p className="text-lg text-gray-600">플레이존에서 진행되는 다양한 클래스 활동을 만나보세요</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <img
                  src={src}
                  alt={`클래스활동${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-white font-semibold text-sm">클래스 활동 {idx + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section className="bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
              OUR PROGRAMS
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              플레이존 프로그램
            </h2>
          </div>

          <div className="space-y-8">
            {/* 정기 스포츠 클래스 */}
            <div className="group relative bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg">
                    📅
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900">정기 스포츠 클래스</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      icon: '⚽',
                      title: '다양한 종목',
                      desc: '축구, 농구, 테니스, 배드민턴, 탁구, 요가 등 12가지 스포츠를 정기적으로 배울 수 있습니다.',
                      gradient: 'from-blue-400 to-cyan-400'
                    },
                    {
                      icon: '📊',
                      title: '연령별 수준별 분반',
                      desc: '초급, 중급, 고급으로 나누어 체계적인 커리큘럼으로 단계적 실력 향상이 가능합니다.',
                      gradient: 'from-purple-400 to-pink-400'
                    },
                    {
                      icon: '⏰',
                      title: '정기 시간표',
                      desc: '매주 고정된 시간에 진행되어 규칙적인 운동 습관을 만들 수 있습니다.',
                      gradient: 'from-green-400 to-emerald-400'
                    }
                  ].map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-indigo-200 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                        {feature.icon}
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleContact}
                    className="group relative px-8 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span className="relative z-10">정기 클래스 문의하기</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* 개인 & 소그룹 레슨 */}
            <div className="group relative bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg">
                    👤
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900">개인 & 소그룹 레슨</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      icon: '🎯',
                      title: '1:1 개인 레슨',
                      desc: '전담 코치와 함께하는 맞춤형 개인 레슨으로 빠른 실력 향상이 가능합니다.',
                      gradient: 'from-purple-400 to-pink-400'
                    },
                    {
                      icon: '👥',
                      title: '소그룹 레슨 (2-4명)',
                      desc: '친구, 가족과 함께하는 소그룹 레슨으로 더욱 재미있게 운동할 수 있습니다.',
                      gradient: 'from-blue-400 to-indigo-400'
                    },
                    {
                      icon: '🕐',
                      title: '유연한 스케줄',
                      desc: '개인 일정에 맞춰 수업 시간을 조정할 수 있어 바쁜 분들에게 최적입니다.',
                      gradient: 'from-green-400 to-emerald-400'
                    }
                  ].map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-purple-200 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                        {feature.icon}
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleContact}
                    className="group relative px-8 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span className="relative z-10">개인 레슨 문의하기</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* 특별 프로그램 & 회원 혜택 */}
            <div className="group relative bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-3xl shadow-lg">
                    ⭐
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900">특별 프로그램 & 회원 혜택</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      icon: '🌞',
                      title: '시즌별 특별 프로그램',
                      desc: '여름 수영 집중반, 겨울 실내 스포츠 등 계절별 특화 프로그램을 운영합니다.',
                      gradient: 'from-orange-400 to-red-400'
                    },
                    {
                      icon: '🎁',
                      title: '회원 전용 혜택',
                      desc: '시설 무료 이용, 용품 할인, 우선 예약 등 다양한 회원 전용 혜택을 제공합니다.',
                      gradient: 'from-yellow-400 to-orange-400'
                    },
                    {
                      icon: '🏥',
                      title: '건강 케어 서비스',
                      desc: '전문 트레이너의 체성분 분석, 운동 처방, 부상 예방 관리 서비스를 제공합니다.',
                      gradient: 'from-green-400 to-emerald-400'
                    }
                  ].map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-orange-200 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                        {feature.icon}
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleContact}
                    className="group relative px-8 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span className="relative z-10">회원가입 문의하기</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-24 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              자주 묻는 질문
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
                    isOpen ? 'border-indigo-300 shadow-xl' : 'border-gray-100'
                  }`}
                >
                  <button
                    className={`w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none transition-all duration-300 ${
                      isOpen ? 'bg-gradient-to-r from-indigo-50 to-purple-50' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-110'
                          : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        Q
                      </div>
                      <span className={`font-semibold text-lg ${
                        isOpen ? 'text-indigo-700' : 'text-gray-800'
                      }`}>
                        {item.q}
                      </span>
                    </div>
                    <div className={`ml-4 flex-shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-180 text-indigo-600' : 'text-gray-400'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 py-5 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center font-bold text-lg text-white flex-shrink-0">
                          A
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-1">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
