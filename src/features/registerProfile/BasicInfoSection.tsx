export default function BasicInfoSection() {
  return (
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
  );
}
