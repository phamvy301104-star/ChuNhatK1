import { useState } from "react";
import CourseTableForm, { type Course } from "./CourseTableForm";

// ── Types ──
type CourseForm = {
  name: string;
  description: string;
  duration: string;
  students: string;
  phone: string;
};

type CourseErrors = Partial<Record<keyof CourseForm, string>>;

// ── Initial Data ──
const initialCourses: Course[] = [
  { id: 1, name: "React Cơ bản", description: "Khóa học React cho người mới bắt đầu", duration: "3 tháng", students: 45, phone: 123456789 },
  { id: 2, name: "JavaScript Advanced", description: "JavaScript nâng cao và ES6+", duration: "2 tháng", students: 32, phone: 987654321 },
  { id: 3, name: "HTML/CSS", description: "Nền tảng web development", duration: "2 tháng", students: 58, phone: 456789123 },
  { id: 4, name: "TypeScript", description: "TypeScript từ cơ bản đến nâng cao", duration: "2 tháng", students: 28, phone: 789123456 },
];

const emptyForm: CourseForm = { name: "", description: "", duration: "", students: "", phone: "" };

// ── Validate ──
function validate(form: CourseForm): CourseErrors {
  const newErrors: CourseErrors = {};
  if (!form.name.trim()) newErrors.name = "Tên không được để trống";
  if (!form.description.trim()) newErrors.description = "Mô tả không được để trống";
  if (!form.duration.trim()) newErrors.duration = "Thời lượng không được để trống";
  if (!form.students.trim()) {
    newErrors.students = "Số học viên không được để trống";
  } else if (isNaN(Number(form.students)) || Number(form.students) < 0) {
    newErrors.students = "Số học viên phải là số hợp lệ";
  }
  if (!form.phone.trim()) {
    newErrors.phone = "Số điện thoại không được để trống";
  } else if (!/^\d{9,10}$/.test(form.phone)) {
    newErrors.phone = "Số điện thoại không hợp lệ";
  }
  return newErrors;
}

// ── Main Component ──
export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<CourseForm>(emptyForm);
  const [errors, setErrors] = useState<CourseErrors>({});

  // ── Handlers ──
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (course: Course) => {
    setEditingId(course.id);
    setForm({
      name: course.name,
      description: course.description,
      duration: course.duration,
      students: String(course.students),
      phone: String(course.phone),
    });
    setErrors({});
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa khóa học này?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleChange = (field: keyof CourseForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (editingId !== null) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, ...form, students: Number(form.students), phone: Number(form.phone) }
            : c
        )
      );
    } else {
      setCourses((prev) => [
        ...prev,
        {
          id: Math.max(...prev.map((c) => c.id), 0) + 1,
          ...form,
          students: Number(form.students),
          phone: Number(form.phone),
        },
      ]);
    }
    setShowModal(false);
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý khóa đào tạo</h1>
        <p className="text-sm text-gray-500">Danh sách các khóa học</p>
      </div>

      {/* Add button */}
      <div className="mb-6">
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          + Thêm khóa học
        </button>
      </div>

      {/* Table */}
      <CourseTableForm
        courses={courses}
        search={search}
        onSearch={setSearch}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId !== null ? "Sửa khóa học" : "Thêm khóa học"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-4 max-h-96 overflow-y-auto">
              {([
                { field: "name" as const, label: "Tên khóa học" },
                { field: "description" as const, label: "Mô tả" },
                { field: "duration" as const, label: "Thời lượng" },
                { field: "students" as const, label: "Số học viên" },
                { field: "phone" as const, label: "Số điện thoại" },
              ] as const).map(({ field, label }) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    className={`w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors ${
                      errors[field]
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    }`}
                    value={form[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>

            <div className="flex gap-3 px-6 py-4 border-t">
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                {editingId !== null ? "Lưu" : "Thêm mới"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
