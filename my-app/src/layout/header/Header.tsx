type HeaderProps = {
  onToggleSidebar: () => void;
};

function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* Hamburger */}
      <button
        onClick={onToggleSidebar}
        className="text-2xl text-gray-600 hover:text-gray-900 transition-colors"
      >
        ☰
      </button>

      <div className="flex items-center gap-6">
        {/* Dark mode toggle */}
        <div className="w-10 h-6 bg-gray-300 rounded-full flex items-center p-1 cursor-pointer hover:bg-gray-400 transition-colors">
          <div className="w-4 h-4 bg-white rounded-full" />
        </div>

        {/* Bell */}
        <div className="relative">
          <span className="text-2xl">🔔</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            3
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Admin</div>
            <div className="text-xs text-gray-500">Quản trị viên</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
