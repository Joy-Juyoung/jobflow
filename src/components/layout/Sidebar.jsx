function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-white p-6 md:block">
      <div className="mb-8">
        <h2 className="text-lg font-bold">Job Dashboard</h2>
        <p className="text-sm text-gray-500">Frontend Portfolio Project</p>
      </div>

      <nav className="space-y-2">
        <button className="w-full rounded-lg bg-gray-900 px-4 py-2 text-left text-sm font-medium text-white">
          Dashboard
        </button>

        <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100">
          Applications
        </button>

        <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100">
          Analytics
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
