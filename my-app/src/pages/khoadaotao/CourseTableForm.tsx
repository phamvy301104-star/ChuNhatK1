export type Course = {
  id: number;
  name: string;
  description: string;
  duration: string;
  students: number;
  phone: number;
};

type Props = {
  courses: Course[];
  search: string;
  onSearch: (value: string) => void;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
};

function CourseTableForm({ courses, search, onSearch, onEdit, onDelete }: Props) {
  const filtered = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toString().includes(search)
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Search */}
      <div className="flex items-center gap-2 p-4 border-b">
        <span className="text-lg">🔍</span>
        <input
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
          placeholder="Tìm kiếm khóa học..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên khóa đào tạo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mô tả</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thời lượng</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Số học viên</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((course, idx) => (
              <tr
                key={course.id}
                className={`border-b transition-colors hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{course.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{course.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{course.duration}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{course.students}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onEdit(course)}
                      className="text-blue-500 hover:text-blue-700 text-lg transition-colors"
                      title="Sửa"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(course.id)}
                      className="text-red-500 hover:text-red-700 text-lg transition-colors"
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseTableForm;
