export default function ActionButtonSection() {
  return (
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
  );
}
