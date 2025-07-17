type ActionButtonSectionProps = {
  className?: string;
};

export default function ActionButtonSection({ className = '' }: ActionButtonSectionProps) {
  return (
    <button
      type="submit"
      className={`w-full py-2 bg-primary text-white font-semibold rounded-md hover:bg-primaryHover transition cursor-pointer ${className}`}
    >
      추가정보 입력 완료
    </button>
  );
}
