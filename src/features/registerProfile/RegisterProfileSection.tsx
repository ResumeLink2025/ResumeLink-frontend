export default function RegisterProfileSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">RESUMELINK</h1>
        <h2 className="text-base font-semibold text-black mb-6">추가 정보 입력</h2>

        <form className="grid grid-cols-2 gap-4 w-full">
          {/* 프로필 사진 */}
          <div className="col-span-1 flex flex-col gap-2">
            <label className="text-sm font-medium text-black">프로필 사진</label>
            <div className="w-full aspect-square bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">사진 업로드</span>
            </div>
          </div>

          {/* 오른쪽 필드 */}
          <div className="col-span-1 flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-black">
              닉네임
            </label>
            <input
              id="name"
              placeholder="닉네임"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />

            <label htmlFor="gender" className="text-sm font-medium text-black mt-2">
              성별
            </label>
            <select
              id="gender"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="">선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>

            <label htmlFor="birth" className="text-sm font-medium text-black mt-2">
              생일
            </label>
            <input
              id="birth"
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* 희망 직무 */}
          <div className="col-span-1 flex flex-col gap-2">
            <label htmlFor="position" className="text-sm font-medium text-black">
              희망 직무
            </label>
            <input
              id="position"
              placeholder="희망 직무"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* 연락처 */}
          <div className="col-span-1 flex flex-col gap-2">
            <label htmlFor="contact" className="text-sm font-medium text-black">
              연락처
            </label>
            <input
              id="contact"
              placeholder="연락처"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* 기술 스택 */}
          <div className="col-span-2 flex flex-col gap-2">
            <label className="text-sm font-medium text-black">기술 스택</label>
            <input
              placeholder="기술 스택을 입력하세요"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {Array(10)
                .fill('javascript')
                .map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              className="w-1/3 py-2 bg-gray-200 text-black font-semibold rounded-md hover:bg-gray-300 transition"
            >
              뒤로가기
            </button>
            <button
              type="submit"
              className="w-1/3 py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500 transition"
            >
              가입 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
