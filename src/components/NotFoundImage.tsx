interface NotFoundImageProps {
  text?: string; // El texto es opcional
}

export const NotFoundImage = ({
  text = "No photo uploaded yet",
}: NotFoundImageProps) => {
  return (
    <div className="mx-4 flex flex-col items-center justify-center h-full">
      <img
        className="w-56"
        src="src/assets/no-photo-uploaded.png"
        alt={text} // Usar el texto dinámicamente
      />
      <span className="text-[22px] py-5">{text}</span>
    </div>
  );
};
