export const NotFoundImage = () => {
  return (
    <div className="mx-4 flex flex-col items-center justify-center h-full">
      <img
        className="w-56"
        src="src/assets/no-photo-uploaded.png"
        alt="No photo uploaded yet"
      />
      <span className="text-[22px] py-5">No photo uploaded yet</span>
    </div>
  );
};
