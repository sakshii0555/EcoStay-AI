/**
 * Input Component
 * Props:
 * - placeholder: input placeholder
 * - type: input type
 */

function Input({ placeholder, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 p-2 rounded-lg w-full"
    />
  );
}

export default Input;