const ProfileListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 list-lg:grid-cols-5 list-md:grid-cols-4 list-sm:grid-cols-3 list-xs:grid-cols-2 gap-4 px-4 py-15">
      {Array.from({ length: 10 }).map((_, idx) => (
        <div key={idx} className="w-full h-95 rounded-[10px] bg-gray-20" />
      ))}
    </div>
  );
};

export default ProfileListSkeleton;
