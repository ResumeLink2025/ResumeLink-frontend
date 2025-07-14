export default function ActionButtonSection() {
  return (
    <div className="flex items-center justify-center col-span-2">
      <button
        type="submit"
        className="w-full py-2 bg-primary text-white font-semibold rounded-md hover:bg-primaryHover transition cursor-pointer"
      >
        가입 완료
      </button>
    </div>
  );
}
