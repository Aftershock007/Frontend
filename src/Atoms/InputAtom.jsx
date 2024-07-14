import PropTypes from "prop-types"

export default function InputAtom({
  label,
  type,
  name,
  value,
  onChange,
  placeholder
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={type === "email" ? value.toLowerCase() : value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
      />
    </div>
  )
}

InputAtom.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}
