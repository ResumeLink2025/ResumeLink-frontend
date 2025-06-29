export default function RegisterSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center w-full max-w-xs">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">RESUMELINK</h1>
        <h2 className="text-sm font-semibold text-black mb-6">회원 가입</h2>

        <form className="w-full flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-black">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-black">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500 transition"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
