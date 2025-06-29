// src/components/LoginPage.tsx

export default function LoginSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">RESUMELINK</h1>
      <form className="w-full max-w-sm flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1">
            이메일
          </label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium mb-1">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-400 text-white font-semibold py-2 rounded hover:bg-yellow-500 transition-colors"
        >
          로그인
        </button>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="flex-1 border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            <span className="text-sm">Sign in with Google</span>
          </button>
          <button
            type="button"
            className="flex-1 border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <img src="/kakao-icon.png" alt="Kakao" className="w-5 h-5" />
            <span className="text-sm">Sign in with Kakao</span>
          </button>
        </div>
        <button type="button" className="mt-3 text-sm text-gray-500 hover:underline">
          회원가입
        </button>
      </form>
    </div>
  );
}
