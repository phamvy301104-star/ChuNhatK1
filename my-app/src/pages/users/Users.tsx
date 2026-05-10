import { useState, useMemo } from "react";
  // ── Types ──
type Conllectionlist = {
  id: number;
  name: string;
  description: string;
  avatar: string;
  tags: string[];
  reputation?: number;
  isNew?: boolean;
};

type UserForm = {
  name: string;
  description: string;
  avatar: string;
  tags: string;
};

type UserErrors = Partial<Record<keyof UserForm, string>>;

const initialUsers: Conllectionlist[] = [
  { id: 1, name: "Leiah Nichols", description: "Troy, MI", avatar: "https://i.pravatar.cc/180?img=1", tags: ["Frontend", "React"], reputation: 1250 },
  { id: 2, name: "Jesus Weiss", description: "Fort Worth, TX", avatar: "https://i.pravatar.cc/180?img=2", tags: ["Backend", "Node.js", "Database", "API"], reputation: 2840, isNew: true },
  { id: 3, name: "Annie Rice", description: "Austin, TX", avatar: "https://i.pravatar.cc/180?img=3", tags: ["DevOps", "Cloud", "Docker", "AWS"], reputation: 1890 },
  { id: 4, name: "Robert Brower", description: "Cincinnati, OH", avatar: "https://i.pravatar.cc/180?img=4", tags: ["Full Stack", "JavaScript", "TypeScript"], reputation: 3120 },
  { id: 5, name: "Amy Campbell", description: "Warrior, AL", avatar: "https://i.pravatar.cc/180?img=5", tags: ["UI/UX", "Design"], reputation: 945 },
  { id: 6, name: "Anthony S. Morin", description: "Lyndhurst, NJ", avatar: "https://i.pravatar.cc/180?img=6", tags: ["Mobile", "Flutter"], reputation: 2150 },
];

const emptyForm: UserForm = { name: "", description: "", avatar: "", tags: "" };

// ── Validate ──
function validate(form: UserForm): UserErrors {
  const newErrors: UserErrors = {};
  if (!form.name.trim()) newErrors.name = "Tên không được để trống";
  if (!form.description.trim()) newErrors.description = "Mô tả không được để trống";
  if (!form.avatar.trim()) {
    newErrors.avatar = "URL ảnh đại diện không được để trống";
  } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/.test(form.avatar)) {
    newErrors.avatar = "URL ảnh đại diện không hợp lệ";
  }
  if (!form.tags.trim()) newErrors.tags = "Tags không được để trống";
  return newErrors;
}

// ── User Card Component ──
function UserCard({ user, onEdit, onDelete }: { user: Conllectionlist; onEdit: (user: Conllectionlist) => void; onDelete: (id: number) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm">{user.name}</h3>
          <p className="text-xs text-gray-500">{user.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {user.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100 cursor-pointer transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(user)}
          className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded hover:bg-blue-100 transition-colors font-medium"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded hover:bg-red-100 transition-colors font-medium"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

// ── Main Component ──
export default function Users() {
  const [users, setUsers] = useState<Conllectionlist[]>(initialUsers);
  const [userSearch, setUserSearch] = useState("");
  const [userTab, setUserTab] = useState<"reputation" | "new">("reputation");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [errors, setErrors] = useState<UserErrors>({});

  // ── Handlers ──
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (user: Conllectionlist) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      description: user.description,
      avatar: user.avatar,
      tags: user.tags.join(", "),
    });
    setErrors({});
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleChange = (field: keyof UserForm, value: string) => {
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
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingId
            ? { ...u, name: form.name, description: form.description, avatar: form.avatar, tags: form.tags.split(",").map(t => t.trim()) }
            : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Math.max(...prev.map((u) => u.id), 0) + 1,
          name: form.name,
          description: form.description,
          avatar: form.avatar,
          tags: form.tags.split(",").map(t => t.trim()),
        },
      ]);
    }
    setShowModal(false);
    setForm(emptyForm);
    setErrors({});
  };

  // ── Users filter ──
  const filteredUsers = useMemo(() => {
    let result = users;

    if (userSearch.trim()) {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
          u.description.toLowerCase().includes(userSearch.toLowerCase()) ||
          u.tags.some((t) => t.toLowerCase().includes(userSearch.toLowerCase()))
      );
    }

    if (userTab === "new") {
      result = result.filter((u) => u.isNew);
    } else {
      result = [...result].sort((a, b) => (b.reputation || 0) - (a.reputation || 0));
    }

    return result;
  }, [users, userSearch, userTab]);

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
        <p className="text-sm text-gray-500">Quản lý tất cả người dùng trong hệ thống</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <span className="text-lg"></span>
          <input
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            placeholder="Tìm kiếm người dùng..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          + Thêm người dùng
        </button>

        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              userTab === "reputation"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setUserTab("reputation")}
          >
            Theo xếp hạng
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              userTab === "new"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setUserTab("new")}
          >
            Người dùng mới
          </button>
  
          <button
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              userTab === "reputation"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setUserTab("reputation")}
          >
            ViewControls
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} onEdit={openEdit} onDelete={handleDelete} />)
        ) : (
          <div className="col-span-full py-16 text-center text-gray-500">Không tìm thấy người dùng</div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId !== null ? "Sửa người dùng" : "Thêm người dùng"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                    errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                  placeholder="Nhập tên"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                    errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                  placeholder="Nhập mô tả"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL ảnh đại diện</label>
                <input
                  type="text"
                  value={form.avatar}
                  onChange={(e) => handleChange("avatar", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                    errors.avatar ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                  placeholder="https://..."
                />
                {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (cách nhau bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                    errors.tags ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                  placeholder="Frontend, React, ..."
                />
                {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {editingId !== null ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
