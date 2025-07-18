type ActionButtonSectionProps = {
  onCancel?: () => void;
  submitText?: string;
};

export default function ActionButtonSection({
  onCancel,
  submitText = '추가 정보 입력완료',
}: ActionButtonSectionProps) {
  return (
    <div className="flex gap-4 col-span-2">
      <button
        type="submit"
        className="flex-1 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primaryHover transition cursor-pointer"
      >
        {submitText}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition cursor-pointer"
        >
          취소
        </button>
      )}
    </div>
  );
}
