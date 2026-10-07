import React, { useState } from 'react';
import { X, Lock, Mail, User, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { signInWithEmail, signUpWithEmail, AppUser } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AppUser) => void;
  initialMode?: 'login' | 'signup';
  isLargeFont: boolean;
  message?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login',
  isLargeFont,
  message,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('올바른 이메일 주소를 입력해 주세요. (예: stephen@gmail.com)');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('비밀번호를 입력해 주세요.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('비밀번호는 최소 6자 이상이어야 합니다. 6자 이상으로 안전하게 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    try {
      if (mode === 'signup') {
        const user = await signUpWithEmail(
          email,
          password,
          displayName.trim() || '스테판'
        );
        onSuccess(user);
        onClose();
      } else {
        const user = await signInWithEmail(email, password);
        onSuccess(user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || '인증 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoUser = (name: string = '스테판') => {
    setEmail('stephen@onharu.com');
    setPassword('stephen123');
    setDisplayName(name);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#D5CBB3] overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7F2] border-b border-[#E6DEC9]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E3F20]" />
            <h3 className="font-extrabold text-[#19351A] text-lg sm:text-xl">
              {mode === 'login' ? '로그인' : '간편 회원가입'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="p-1.5 text-[#677765] hover:text-[#19351A] hover:bg-[#EFE8D9] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {message && (
            <div className="p-3.5 rounded-2xl bg-[#EEF5EC] border border-[#CDE1CA] flex items-start gap-2.5 text-xs sm:text-sm text-[#245229]">
              <Sparkles className="w-4 h-4 text-[#2C6233] shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-[#F4EFE6] rounded-2xl border border-[#DFD6C2]">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#1E3F20] shadow-sm'
                  : 'text-[#566555] hover:text-[#1E3F20]'
              }`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
                if (!displayName) setDisplayName('스테판');
              }}
              className={`py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-[#1E3F20] shadow-sm'
                  : 'text-[#566555] hover:text-[#1E3F20]'
              }`}
            >
              회원가입
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#273825] mb-1.5">
                  회원 성함 (이름) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7A8A79] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="예: 스테판"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5CAB1] focus:outline-none focus:ring-2 focus:ring-[#2C6233] text-sm text-[#19351A]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#273825] mb-1.5">
                이메일 주소 *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7A8A79] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="예: stephen@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5CAB1] focus:outline-none focus:ring-2 focus:ring-[#2C6233] text-sm text-[#19351A]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs sm:text-sm font-bold text-[#273825]">
                  비밀번호 *
                </label>
                <span className="text-[11px] text-[#697968] font-medium">
                  6자 이상 필수
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7A8A79] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="6자 이상의 비밀번호"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 text-sm text-[#19351A] ${
                    password && password.length < 6
                      ? 'border-amber-400 focus:ring-amber-500'
                      : 'border-[#D5CAB1] focus:ring-[#2C6233]'
                  }`}
                />
              </div>
              {password && password.length < 6 && (
                <p className="text-[11px] text-amber-700 mt-1 flex items-center gap-1 font-medium">
                  <span>⚠️ 비밀번호는 6자 이상이어야 합니다 (현재 {password.length}자)</span>
                </p>
              )}
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs sm:text-sm text-red-800">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 text-base font-black text-white bg-[#1E3F20] hover:bg-[#152E17] active:scale-[0.99] rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLoading ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              <span>{isLoading ? '처리 중...' : mode === 'login' ? '로그인하고 계속하기' : '회원가입 완료하기'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-[#EFE7D8]">
            <button
              type="button"
              onClick={() => handleFillDemoUser('스테판')}
              className="w-full py-2.5 px-3 bg-[#FAF7F2] hover:bg-[#F2ECE0] border border-[#DFD6C2] rounded-xl text-xs font-bold text-[#2A4328] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#346E3A]" />
              <span>간편 테스트: '스테판' 님 계정 자동 입력</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
