export default function DialogButton({
  name,
  type = "button",
  onClick = () => {},
  customStyle = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${customStyle} border-2 border-[#242745] hover:bg-[#242745] hover:text-white font-semibold duration-300  px-5 py-2 rounded shadow text-sm`}
    >
      {name}
    </button>
  );
}
