const ProfileListSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-5 gap-4 py-15">
      {Array.from({ length: 10 }).map((_, idx) => (
        <div key={idx} className="w-full h-95 rounded-[10px] bg-gray-20" />
      ))}
    </div>
  );
};

export default ProfileListSkeleton;
