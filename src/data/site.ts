// 사이트 데이터 관리 파일
// 이 파일을 수정하여 사이트의 모든 데이터를 관리할 수 있습니다.

export const siteData = {
  // 사이트 기본 정보
  siteInfo: {
    name: "플레이존",
    description: "정기 스포츠 클래스, 연령별 맞춤 프로그램, 전문 케어까지 한 번에!",
    logo: "/로고.png",
    contact: {
      phone: "010-1234-5678",
      email: "contact@playzone.com",
      address: "서울시 강남구 테헤란로 123"
    }
  },

  // 스포츠 클래스 목록
  sportsClasses: [
    {
      id: 1,
      title: "축구 정기반 (매주 화/목 7시)",
      sport: "축구",
      instructor: "김강사",
      schedule: "매주 화요일, 목요일 19:00-21:00",
      startDate: "2026-02-01",
      endDate: "2026-04-30",
      maxParticipants: 20,
      currentParticipants: 15,
      price: 150000,
      level: "BEGINNER",
      type: "REGULAR",
      description: "초보자부터 경험자까지 모두 참여 가능한 축구 정기 클래스입니다. 기본기부터 실전 기술까지 체계적으로 배울 수 있습니다.",
      image: null, // 이미지 영역
      location: "플레이존 축구장",
      ageGroup: "초등학생 이상",
      status: "RECRUITING",
      createdAt: "2026-01-15T10:00:00",
      updatedAt: "2026-01-15T10:00:00"
    },
    {
      id: 2,
      title: "농구 중급반 (매주 수/금 8시)",
      sport: "농구",
      instructor: "이강사",
      schedule: "매주 수요일, 금요일 20:00-22:00",
      startDate: "2026-02-05",
      endDate: "2026-05-05",
      maxParticipants: 15,
      currentParticipants: 15,
      price: 180000,
      level: "INTERMEDIATE",
      type: "REGULAR",
      description: "중급자를 위한 농구 클래스입니다. 개인 기술 향상과 팀 플레이를 함께 배울 수 있습니다.",
      image: null, // 이미지 영역
      location: "플레이존 농구장",
      ageGroup: "중학생 이상",
      status: "FULL",
      createdAt: "2026-01-10T10:00:00",
      updatedAt: "2026-01-25T10:00:00"
    },
    {
      id: 3,
      title: "테니스 주말반 (토/일 오전)",
      sport: "테니스",
      instructor: "박강사",
      schedule: "매주 토요일, 일요일 09:00-11:00",
      startDate: "2026-02-10",
      endDate: "2026-05-10",
      maxParticipants: 12,
      currentParticipants: 8,
      price: 200000,
      level: "BEGINNER",
      type: "REGULAR",
      description: "주말에 즐기는 테니스 클래스입니다. 라켓 잡는 법부터 서브, 포핸드, 백핸드까지 기초부터 차근차근 배웁니다.",
      image: null, // 이미지 영역
      location: "플레이존 테니스장",
      ageGroup: "성인",
      status: "RECRUITING",
      createdAt: "2026-01-20T10:00:00",
      updatedAt: "2026-01-20T10:00:00"
    },
    {
      id: 4,
      title: "배드민턴 저녁반 (월/수/금 7시)",
      sport: "배드민턴",
      instructor: "최강사",
      schedule: "매주 월요일, 수요일, 금요일 19:00-21:00",
      startDate: "2026-03-01",
      endDate: "2026-05-31",
      maxParticipants: 16,
      currentParticipants: 0,
      price: 160000,
      level: "BEGINNER",
      type: "REGULAR",
      description: "저녁 시간대에 진행되는 배드민턴 클래스입니다. 직장인도 부담 없이 참여할 수 있습니다.",
      image: null, // 이미지 영역
      location: "플레이존 배드민턴장",
      ageGroup: "성인",
      status: "UPCOMING",
      createdAt: "2026-01-25T10:00:00",
      updatedAt: "2026-01-25T10:00:00"
    },
    {
      id: 5,
      title: "축구 개인레슨",
      sport: "축구",
      instructor: "김강사",
      schedule: "개인 일정에 맞춰 조율",
      startDate: "2026-02-01",
      endDate: "2026-12-31",
      maxParticipants: 1,
      currentParticipants: 0,
      price: 100000,
      level: "ADVANCED",
      type: "PRIVATE",
      description: "1:1 맞춤형 축구 개인레슨입니다. 개인의 수준에 맞춰 집중적으로 지도받을 수 있습니다.",
      image: null, // 이미지 영역
      location: "플레이존 축구장",
      ageGroup: "전 연령",
      status: "RECRUITING",
      createdAt: "2026-01-15T10:00:00",
      updatedAt: "2026-01-15T10:00:00"
    },
    {
      id: 6,
      title: "농구 소그룹 클래스",
      sport: "농구",
      instructor: "이강사",
      schedule: "매주 화요일 19:00-21:00",
      startDate: "2026-02-04",
      endDate: "2026-04-29",
      maxParticipants: 8,
      currentParticipants: 5,
      price: 140000,
      level: "INTERMEDIATE",
      type: "GROUP",
      description: "소규모 그룹으로 진행되는 농구 클래스입니다. 더 집중적인 지도를 받을 수 있습니다.",
      image: null, // 이미지 영역
      location: "플레이존 농구장",
      ageGroup: "중학생 이상",
      status: "RECRUITING",
      createdAt: "2026-01-18T10:00:00",
      updatedAt: "2026-01-18T10:00:00"
    }
  ],

  // 공지사항 목록
  notices: [
    {
      id: 1,
      title: "2026년 2월 신규 클래스 오픈 안내",
      content: "안녕하세요, 플레이존입니다.\n\n2026년 2월부터 새로운 클래스가 오픈됩니다.\n\n- 축구 정기반 (매주 화/목 7시)\n- 농구 중급반 (매주 수/금 8시)\n- 테니스 주말반 (토/일 오전)\n\n많은 관심과 참여 부탁드립니다.",
      createdAt: "2026-01-15T10:00:00",
      updatedAt: "2026-01-15T10:00:00"
    },
    {
      id: 2,
      title: "설날 연휴 휴관 안내",
      content: "안녕하세요, 플레이존입니다.\n\n설날 연휴 기간 동안 휴관합니다.\n\n휴관일: 2026년 1월 28일 ~ 1월 30일\n\n연휴 기간 중 문의사항은 이메일로 남겨주시면 연휴 후 빠르게 답변드리겠습니다.\n\n감사합니다.",
      createdAt: "2026-01-20T10:00:00",
      updatedAt: "2026-01-20T10:00:00"
    },
    {
      id: 3,
      title: "신규 강사진 소개",
      content: "안녕하세요, 플레이존입니다.\n\n새로운 강사진을 소개합니다.\n\n- 테니스: 박강사 (전 프로선수)\n- 배드민턴: 최강사 (국가대표 출신)\n\n전문적인 지도로 더욱 향상된 수업을 제공하겠습니다.",
      createdAt: "2026-01-10T10:00:00",
      updatedAt: "2026-01-10T10:00:00"
    },
    {
      id: 4,
      title: "시설 개선 공사 완료 안내",
      content: "안녕하세요, 플레이존입니다.\n\n시설 개선 공사가 완료되었습니다.\n\n- 축구장 잔디 교체 완료\n- 농구장 바닥 리뉴얼 완료\n- 샤워실 및 탈의실 개선 완료\n\n더욱 쾌적한 환경에서 운동하실 수 있습니다.",
      createdAt: "2026-01-05T10:00:00",
      updatedAt: "2026-01-05T10:00:00"
    }
  ],

  // 팀원 목록
  teamMembers: [
    {
      id: 1,
      name: "김강사",
      role: "축구 전문 강사",
      description: "전 프로축구 선수 출신으로 10년 이상의 지도 경력을 보유하고 있습니다. 초보자부터 고급자까지 체계적인 지도를 제공합니다.",
      image: null // 이미지 영역
    },
    {
      id: 2,
      name: "이강사",
      role: "농구 전문 강사",
      description: "대학 농구부 코치 출신으로 개인 기술 향상과 팀 플레이에 특화된 지도를 제공합니다.",
      image: null // 이미지 영역
    },
    {
      id: 3,
      name: "박강사",
      role: "테니스 전문 강사",
      description: "전 프로테니스 선수로 ITF 라이센스를 보유하고 있습니다. 기초부터 고급 기술까지 단계별 지도를 제공합니다.",
      image: null // 이미지 영역
    },
    {
      id: 4,
      name: "최강사",
      role: "배드민턴 전문 강사",
      description: "국가대표 출신으로 15년 이상의 지도 경력을 보유하고 있습니다. 정확한 기술과 전략을 전수합니다.",
      image: null // 이미지 영역
    }
  ]
};

// 데이터 조회 함수들
export const getSportsClasses = () => siteData.sportsClasses;
export const getSportsClassById = (id: number) => siteData.sportsClasses.find(cls => cls.id === id);
export const getNotices = () => siteData.notices;
export const getNoticeById = (id: number) => siteData.notices.find(notice => notice.id === id);
export const getTeamMembers = () => siteData.teamMembers;
export const getSiteInfo = () => siteData.siteInfo;
