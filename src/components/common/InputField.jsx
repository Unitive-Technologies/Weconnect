import React from "react";

function InputField({
  type,
  name,
  placeholder,
  value,
  onChangeValue,
  minLength,
  maxLength,
  customStyle = "",
}) {
  return (
    <input
      className={` ${customStyle} py-1.5 px-3 rounded border border-[#a7a7a7] text-stone-700 placeholder-[#7e7e7e] focus:outline-none focus:border-stone-500`}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChangeValue}
      {...(minLength && { minLength: minLength })}
      {...(maxLength && { maxLength: maxLength })}
      required
    />
  );
}

export default InputField;
