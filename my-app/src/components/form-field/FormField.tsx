type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
};

function FormField({ label, name, value, error, onChange }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-1 text-gray-700">{label}</label>
      <input
        name={name}
        value={value}
        className={`w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
        }`}
        onChange={(e) => onChange(name, e.target.value)}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default FormField;
