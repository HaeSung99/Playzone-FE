"use client";

import { useState } from 'react';
import { getSportsClasses } from '@/data/site';

interface SportsClass {
  id: number;
  title: string;
  sport: string;
  instructor: string;
  schedule: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  type: 'REGULAR' | 'PRIVATE' | 'GROUP';
  description: string;
  image: string | null;
  location: string;
  ageGroup: string;
  status: 'RECRUITING' | 'FULL' | 'SUSPENDED' | 'UPCOMING';
  createdAt: string;
  updatedAt: string;
}

type FilterStatus = 'ALL' | 'RECRUITING' | 'FULL' | 'UPCOMING' | 'SUSPENDED';

const ITEMS_PER_PAGE = 9;

export default function ClassPage() {
  const classList = getSportsClasses();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredList = classList.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'BEGINNER': return '초급';
      case 'INTERMEDIATE': return '중급';
      case 'ADVANCED': return '고급';
      default: return level;
    }
  };

  const getLevelGradient = (level: string) => {
    switch (level) {
      case 'BEGINNER': return 'from-green-400 to-emerald-500';
      case 'INTERMEDIATE': return 'from-blue-400 to-indigo-500';
      case 'ADVANCED': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'REGULAR': return '정기반';
      case 'PRIVATE': return '개인레슨';
      case 'GROUP': return '소그룹';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'REGULAR': return '📅';
      case 'PRIVATE': return '👤';
      case 'GROUP': return '👥';
      default: return '🏃';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'RECRUITING': return '모집중';
      case 'FULL': return '정원마감';
      case 'UPCOMING': return '개강예정';
      case 'SUSPENDED': return '모집중지';
      default: return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'RECRUITING': 
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'FULL': 
        return 'bg-gradient-to-r from-red-500 to-rose-500 text-white';
      case 'UPCOMING': 
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'SUSPENDED': 
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      default: 
        return 'bg-gray-500 text-white';
    }
  };

  const getSportIcon = (sport: string) => {
    const icons: { [key: string]: string } = {
      '축구': '⚽',
      '농구': '🏀',
      '테니스': '🎾',
      '배드민턴': '🏸',
      '야구': '⚾',
      '볼링': '🎳',
    };
    return icons[sport] || '🏃';
  };

  return (
    <main className="mt-[80px]">
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* 헤더 섹션 */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
              OUR CLASSES
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              스포츠 클래스
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              다양한 스포츠 종목을 정기적으로 배울 수 있는 전문 클래스
            </p>
          </div>

          {/* 필터 버튼 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { key: 'ALL' as FilterStatus, label: '전체', color: 'from-gray-500 to-gray-600' },
              { key: 'RECRUITING' as FilterStatus, label: '모집중', color: 'from-green-500 to-emerald-500' },
              { key: 'UPCOMING' as FilterStatus, label: '개강예정', color: 'from-blue-500 to-cyan-500' },
              { key: 'FULL' as FilterStatus, label: '정원마감', color: 'from-red-500 to-rose-500' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => {
                  setFilterStatus(filter.key);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filterStatus === filter.key
                    ? `bg-gradient-to-r ${filter.color} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* 클래스 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                {/* 이미지 영역 */}
                <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">{getSportIcon(item.sport)}</div>
                        <span className="text-gray-400 text-sm">이미지 영역</span>
                      </div>
                    </div>
                  )}
                  
                  {/* 상태 배지 */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${getStatusStyle(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>

                  {/* 그라데이션 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* 카드 콘텐츠 */}
                <div className="p-6">
                  {/* 제목과 종목 */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getSportIcon(item.sport)}</span>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {item.sport}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* 설명 */}
                  <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* 정보 그리드 */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">👨‍🏫</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 mb-0.5">강사</div>
                        <div className="text-sm font-semibold text-gray-900 truncate">{item.instructor}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">{getTypeIcon(item.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 mb-0.5">유형</div>
                        <div className="text-sm font-semibold text-gray-900">{getTypeText(item.type)}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">📅</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 mb-0.5">일정</div>
                        <div className="text-sm font-semibold text-gray-900 line-clamp-1">{item.schedule}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getLevelGradient(item.level)} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xs text-white font-bold">L</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 mb-0.5">레벨</div>
                        <div className="text-sm font-semibold text-gray-900">{getLevelText(item.level)}</div>
                      </div>
                    </div>
                  </div>

                  {/* 추가 정보 */}
                  <div className="space-y-2 mb-5 pb-5 border-b border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">기간</span>
                      <span className="font-semibold text-gray-900">{item.startDate} ~ {item.endDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">위치</span>
                      <span className="font-semibold text-gray-900">{item.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">연령대</span>
                      <span className="font-semibold text-gray-900">{item.ageGroup}</span>
                    </div>
                  </div>

                  {/* 하단 정보 */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">모집 현황</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${
                              item.status === 'RECRUITING' ? 'from-green-400 to-emerald-500' :
                              item.status === 'FULL' ? 'from-red-400 to-rose-500' :
                              'from-blue-400 to-cyan-500'
                            }`}
                            style={{ width: `${(item.currentParticipants / item.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                          {item.currentParticipants}/{item.maxParticipants}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-xs text-gray-500 mb-1">수강료</div>
                      <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {item.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 빈 상태 */}
          {filteredList.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">해당 조건의 클래스가 없습니다</p>
              <p className="text-gray-500">다른 필터를 선택해보세요</p>
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full bg-white text-gray-600 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-110'
                        : 'bg-white text-gray-600 shadow-md hover:shadow-lg hover:scale-110'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full bg-white text-gray-600 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
