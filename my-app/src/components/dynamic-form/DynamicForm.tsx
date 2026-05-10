import { useState } from "react";
import FormField from "../form-field/FormField";

// Field configuration
const fields = [
  { name: "name", label: "Tên" },
  { name: "email", label: "Email" },
  { name: "age", label: "Tuổi" },
  { name: "score", label: "Điểm" },
  { name: "phone", label: "Số điện thoại" },
];

type FormState = { [key: string]: string };
type ErrorState = { [key: string]: string };

function validate(form: FormState): ErrorState {
  const newErrors: ErrorState = {};

  if (!form.name || form.name.trim() === "") {
    newErrors.name = "Tên không được để trống";
  }
  if (!form.email || form.email.trim() === "") {
    newErrors.email = "Email không được để trống";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "Định dạng email không hợp lệ";
  }
  if (!form.age || form.age.trim() === "") {
    newErrors.age = "Tuổi không được để trống";
  } else if (isNaN(Number(form.age)) || Number(form.age) <= 0) {
    newErrors.age = "Tuổi phải là số dương";
  }
  if (!form.score || form.score.trim() === "") {
    newErrors.score = "Điểm không được để trống";
  } else if (isNaN(Number(form.score)) || Number(form.score) < 0 || Number(form.score) > 10) {
    newErrors.score = "Điểm phải từ 0 đến 10";
  }
  if (!form.phone || form.phone.trim() === "") {
    newErrors.phone = "Số điện thoại không được để trống";
  } else if (!/^\d{9,10}$/.test(form.phone)) {
    newErrors.phone = "Số điện thoại phải có 9-10 chữ số";
  }
  return newErrors;
}

function DynamicForm() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", age: "", score: "", phone: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    alert("Gửi thành công!\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mẫu biểu động</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            label={field.label}
            value={form[field.name] || ""}
            error={errors[field.name]}
            onChange={handleChange}
          />
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors mt-6"
        >
          Gửi
        </button>
      </form>
      {submitted && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
          ✓ Biểu mẫu đã được gửi thành công
        </div>
      )}
    </div>
  );
}

export default DynamicForm;
