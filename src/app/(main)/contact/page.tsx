"use client";

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    type: '',
    phone: '',
    email: '',
    position: '',
    message: '',
    identity: '',
  });
  const [charCount, setCharCount] = useState(0);
  const [contactMethod, setContactMethod] = useState('email');
  const [submitMsg, setSubmitMsg] = useState('');
  const [error, setError] = useState('');

  function formatPhone(value: string) {
    const onlyNums = value.replace(/[^0-9]/g, '');
    if (onlyNums.length < 4) return onlyNums;
    if (onlyNums.length < 8) return onlyNums.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    return onlyNums.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const prev = formData.phone;
    if (raw.length < prev.length && prev[raw.length] === '-') {
      setFormData({ ...formData, phone: prev.slice(0, -1) });
      return;
    }
    setFormData({ ...formData, phone: formatPhone(raw) });
  }

  function isValidEmail(email: string) {
    return /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(formData.email)) {
      setError('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (formData.name.length > 10 || formData.company.length > 10) {
      setError('이름과 회사명은 10글자 이내로 입력해 주세요.');
      return;
    }
    setSubmitMsg('문의가 정상적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    setFormData({
      name: '',
      company: '',
      type: '',
      phone: '',
      email: '',
      position: '',
      message: '',
      identity: '',
    });
    setCharCount(0);
    console.log('문의 정보:', { ...formData, phone: formData.phone, contactMethod });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'contactMethod') {
      setContactMethod(value);
      return;
    }
    if (name === 'message') {
      if (value.length > 100) return;
      setCharCount(value.length);
    }
    if (name === 'phone') {
      handlePhoneChange(e as React.ChangeEvent<HTMLInputElement>);
      return;
    }
    if (name === 'name' || name === 'company') {
      setFormData(prev => ({
        ...prev,
        [name]: value.replace(/[^\w가-힣]/g, '').slice(0, 10)
      }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="mt-[80px] min-h-screen bg-white py-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">문의하기</h1>
          <p className="text-gray-600">궁금한 점이나 제안이 있으시면 아래 양식을 작성해 주세요.</p>
        </div>

        {/* 폼 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 구분 & 이름/회사명 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="identity" className="block text-sm font-medium text-gray-700 mb-2">구분</label>
                <select
                  id="identity"
                  name="identity"
                  value={formData.identity}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white"
                >
                  <option value="">선택하세요</option>
                  <option value="company">회사</option>
                  <option value="person">개인</option>
                </select>
              </div>
              <div>
                <label htmlFor={formData.identity === 'company' ? 'company' : 'name'} className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.identity === 'company' ? '회사명' : '이름'}
                </label>
                <input
                  type="text"
                  id={formData.identity === 'company' ? 'company' : 'name'}
                  name={formData.identity === 'company' ? 'company' : 'name'}
                  value={formData.identity === 'company' ? formData.company : formData.name}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  placeholder={formData.identity === 'company' ? '회사명을 입력하세요' : '이름을 입력하세요'}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
                <div className="text-xs text-gray-400 text-right mt-1">
                  {(formData.identity === 'company' ? formData.company.length : formData.name.length)}/10
                </div>
              </div>
            </div>

            {/* 직책 & 전화번호 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">직책</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  placeholder="직책을 입력하세요"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  inputMode="numeric"
                  pattern="[0-9-]*"
                  maxLength={13}
                />
              </div>
            </div>

            {/* 이메일 & 문의 유형 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
                {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">문의 유형</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white"
                >
                  <option value="">선택하세요</option>
                  <option value="비즈니스 제안">비즈니스 제안</option>
                  <option value="협업 제안">협업 제안</option>
                  <option value="기타 문의">기타 문의</option>
                </select>
              </div>
            </div>

            {/* 문의 내용 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                문의 내용
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                maxLength={100}
                placeholder="간단한 용건을 100자 이내로 작성해 주세요."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none"
              />
              <div className="text-right text-xs text-gray-400 mt-1">{charCount}/100자</div>
            </div>

            {/* 연락 방법 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">연락받고 싶은 방법</label>
              <div className="flex flex-wrap gap-6">
                {[
                  { value: 'email', label: '이메일' },
                  { value: 'phone', label: '전화' },
                  { value: 'sms', label: '문자' }
                ].map((method) => (
                  <label key={method.value} className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method.value}
                      checked={contactMethod === method.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                    />
                    <span className="ml-2 text-gray-700">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium mt-8"
            >
              문의하기
            </button>

            {submitMsg && (
              <div className="mt-4 text-center text-gray-700 font-medium">{submitMsg}</div>
            )}

            <div className="text-center text-gray-400 text-sm mt-4">
              작성해주신 연락처로 추후 연락드릴 예정입니다.
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
