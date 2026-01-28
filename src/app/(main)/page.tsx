"use client"

import React, { useRef, useEffect, useState, RefObject } from "react";
import Link from 'next/link';
import { getSportsClasses } from '@/data/site';

// 스크롤 애니메이션 커스텀 훅
function useScrollReveal(direction = "up", threshold = 0.3): [RefObject<HTMLDivElement>, string] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  let base = "opacity-0 ";
  let animate = "opacity-100 ";
  if (direction === "up") {
    base += "translate-y-12 ";
    animate += "translate-y-0 ";
  } else if (direction === "left") {
    base += "-translate-x-12 ";
    animate += "translate-x-0 ";
  } else if (direction === "right") {
    base += "translate-x-12 ";
    animate += "translate-x-0 ";
  }
  const className = `${base}transition-all duration-700 ease-out ${visible ? animate : ""}`;
  return [ref as RefObject<HTMLDivElement>, className];
}

export default function Home() {
  const sportsClasses = getSportsClasses();
  const eventList = sportsClasses.slice(0, 4).map(cls => cls.title);
  
  const [aboutRef, aboutClass] = useScrollReveal("up");
  const [serviceRef, serviceClass] = useScrollReveal("up");
  const [contactRef, contactClass] = useScrollReveal("up");

  return (
    <>
      {/* Hero Section - 모던한 그라데이션 배경 */}
      <section className="relative w-full min-h-screen h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        {/* 애니메이션 배경 패턴 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        </div>
        
        {/* 비디오 배경 (선택적) */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover opacity-40"
            src="/introvideo.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* 콘텐츠 */}
        <div className="relative z-10 text-center flex flex-col items-center px-4">
          <div className="mb-6 animate-fadein">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium border border-white/20">
              정기 스포츠 클래스 전문
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl tracking-tight animate-fadein2 leading-tight">
            플레이존과 함께
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              스포츠를 즐겨보세요
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl animate-fadein3 leading-relaxed">
            정기 스포츠 클래스, 연령별 맞춤 프로그램, 전문 케어까지 한 번에!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fadein3">
            <Link href="/class">
              <button className="px-8 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-2xl hover:shadow-lg hover:scale-105">
                클래스 신청하기
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-2xl font-bold text-lg text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                문의하기
              </button>
            </Link>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 정기 클래스 섹션 - 모던한 카드 디자인 */}
      <section className="w-full flex justify-center py-24 px-4 bg-white">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold mb-4">
              OUR CLASSES
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              정기 클래스
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              다양한 스포츠 종목을 정기적으로 배울 수 있는 전문 클래스
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {eventList.slice(0, 4).map((classItem, i) => (
              <div
                key={classItem}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                {/* 이미지 영역 */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  <span className="text-gray-400 text-sm z-10">이미지 영역</span>
                </div>
                
                {/* 콘텐츠 */}
                <div className="p-6 relative z-10">
                  <div className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {classItem}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                    정기 수업
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/class">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:gap-4">
                더보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - 모던한 레이아웃 */}
      <section ref={aboutRef} className={`w-full flex justify-center py-24 px-4 bg-gray-50 ${aboutClass}`}>
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 이미지 영역 */}
            <div className="relative">
              <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-2xl overflow-hidden group">
                <span className="text-gray-400 text-lg z-10">이미지 영역</span>
              </div>
            </div>

            {/* 텍스트 */}
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold mb-6">
                ABOUT US
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                정기 스포츠 클래스의
                <br />
                <span className="text-gray-800">
                  선두주자
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                플레이존은 축구, 농구, 테니스, 배드민턴 등 다양한 스포츠를 정기적으로 배울 수 있는 전문 클래스를 운영합니다. 연령별, 수준별 맞춤 수업과 최고의 시설, 전문 물리치료까지 제공합니다.
              </p>
              
              {/* 특징 아이콘 */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: "⚽", title: "다양한 종목", color: "from-gray-400 to-gray-600" },
                  { icon: "👨‍👩‍👧‍👦", title: "연령별 맞춤", color: "from-gray-500 to-gray-700" },
                  { icon: "💪", title: "전문 케어", color: "from-gray-600 to-gray-800" }
                ].map((item, idx) => (
                  <div key={idx} className="text-center group">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section - 그리드 레이아웃 */}
      <section ref={serviceRef} className={`w-full flex justify-center py-24 px-4 bg-white ${serviceClass}`}>
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              OUR PROGRAMS
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              주요 프로그램
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              체계적인 커리큘럼과 전문 강사진이 제공하는 최고의 프로그램
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "종목별 정기 클래스",
                desc: "축구, 농구, 테니스, 배드민턴 등 매주 정기적인 수업",
                gradient: "from-blue-500 to-cyan-500",
                icon: "🏃"
              },
              {
                title: "연령별 맞춤 클래스",
                desc: "유소년부터 성인까지, 수준별 세분화된 정기 수업",
                gradient: "from-purple-500 to-pink-500",
                icon: "🎯"
              },
              {
                title: "전문 케어 서비스",
                desc: "부상 예방부터 물리치료까지, 안전한 스포츠 환경 제공",
                gradient: "from-orange-500 to-red-500",
                icon: "🏥"
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* 배경 그라데이션 */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                {/* 아이콘 */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                {/* 콘텐츠 */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 비즈니스 Section - 모던한 카드 */}
      <section className="w-full flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>

        <div className="max-w-7xl w-full relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold mb-4 border border-white/20">
              BUSINESS PARTNERSHIP
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              비즈니스 파트너십
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              플레이존과 함께 성장하는 비즈니스 기회
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "스포츠 용품 협찬",
                desc: "다양한 스포츠 브랜드와의 협찬 파트너십 제공",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "기업 단체 클래스",
                desc: "기업 맞춤형 정기 스포츠 클래스 제공",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "플레이존 비즈니스",
                desc: "정기 스포츠 클래스 운영 노하우 제공",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((business, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
              >
                {/* 이미지 영역 */}
                <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">이미지 영역</span>
                </div>
                
                {/* 콘텐츠 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                    {business.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {business.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - 모던한 디자인 */}
      <section className="w-full flex justify-center py-24 px-4 bg-gray-50">
        <div ref={contactRef} className={`${contactClass} max-w-2xl w-full mx-auto`}>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold mb-4">
              CONTACT US
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              문의하기
            </h2>
            <p className="text-lg text-gray-600">
              정기 클래스 참가, 개인 레슨, 시설 이용 등 궁금한 점이 있으신가요?
              <br />
              아래 정보를 남겨주시면 빠르게 연락드리겠습니다.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-500 mb-6">문의 폼이 곧 추가될 예정입니다</p>
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  문의 페이지로 이동
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 애니메이션 스타일 */}
      <style jsx global>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadein { animation: fadein 1s cubic-bezier(.4,0,.2,1) 0.1s both; }
        .animate-fadein2 { animation: fadein 1s cubic-bezier(.4,0,.2,1) 0.3s both; }
        .animate-fadein3 { animation: fadein 1s cubic-bezier(.4,0,.2,1) 0.5s both; }
      `}</style>
    </>
  );
}
