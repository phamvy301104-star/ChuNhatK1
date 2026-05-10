type NavItem = { label: string; icon: string };

const navSections: { title?: string; items: NavItem[] }[] = [
  {
    items: [{ label: "Bảng điều khiển", icon: "⊞" }],
  },
  {
    title: "QUẢN LÝ",
    items: [
      { label: "Học viên", icon: "" },
      { label: "Quản lý người dùng", icon: "" },
      { label: "Khóa đào tạo", icon: "" },
      { label: "Lớp học", icon: "" },
      { label: "Lịch học", icon: "" },
      { label: "Khuyến mãi", icon: "" },
      { label: "Quản trị viên", icon: "" },
    ],
  },
  {
    title: "HỌC TẬP",
    items: [
      { label: "Thời khóa biểu", icon: "" },
      { label: "Điểm danh", icon: "" },
      { label: "Bài tập", icon: "" },
    ],
  },
  {
    title: "TÀI CHÍNH",
    items: [
      { label: "Học phí", icon: "" },
      { label: "Báo cáo", icon: "" },
    ],
  },
];

type SidebarProps = {
  activeItem: string;
  onSelect: (item: string) => void;
};

function Sidebar({ activeItem, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto h-screen flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <div className="w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center font-bold text-lg">
          Y
        </div>
        <div className="flex-1">
          <div className="font-bold text-gray-900">YOEDU</div>
          <div className="text-xs text-gray-500">Quản lý giáo dục</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navSections.map((section, si) => (
          <div key={si}>
            {section.title && (
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-2">
                {section.title}
              </div>
            )}
            {section.items.map((item) => (
              <button
                key={item.label}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                  activeItem === item.label
                    ? "bg-blue-500 text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => onSelect(item.label)}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
