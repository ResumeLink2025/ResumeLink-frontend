export default function AdditionalInfoSection() {
  return (
    <>
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
          연차
        </label>
        <input
          id="contact"
          placeholder="연차"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </div>
    </>
  );
}
