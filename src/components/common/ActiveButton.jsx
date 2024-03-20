export default function ActiveButton({
  name,
  onClick,
  isActive = false,
  customStyle = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${customStyle} border-2 border-[#242745] hover:bg-[#242745] hover:text-white font-semibold duration-300  px-12 py-2  rounded shadow ${
        isActive ? "bg-[#242745] text-white" : "text-[#242745]"
      } `}
    >
      {name}
    </button>
  );
}
