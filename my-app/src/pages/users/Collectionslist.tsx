export type User = {
  id: number;
  name: string;
  description: string;
  duration: string;
  students: number;
  phone: number;
};

type Props = {
  users: User[];
  search: string;
  onSearch: (value: string) => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

function CollectionsList({ users, search, onSearch, onEdit, onDelete }: Props) {
  const filtered = users.filter(
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
            placeholder="Tìm bộ sưu tập..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
        {/* Table */}   
        <div className="overflow-x-auto">
        <table className="w-full">
            <thead className="bg-gray-50 border-b">
            <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên bộ sưu tập</th> 
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mô tả</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thời lượng</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Số học viên</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
            </thead>    
            <tbody>
            {filtered.map((user, idx) => (
                <tr
                key={user.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.description}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.duration}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.students}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onEdit(user)}
                    >
                    Sửa
                    </button>
                    <button
                    className="text-red-500 hover:text-red-700 ml-2"
                    onClick={() => onDelete(user.id)}
                    >
                    Xóa
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
}

export default CollectionsList;
