import { HiOutlineXMark } from "react-icons/hi2";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-white p-6 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold">Job Dashboard</h2>
            <p className="text-sm text-gray-500">Frontend Portfolio Project</p>
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar menu"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2">
          <button className="w-full rounded-lg bg-gray-900 px-4 py-2 text-left text-sm font-medium text-white">
            Dashboard
          </button>

          <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-600 transition hover:bg-gray-100">
            Applications
          </button>

          <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-600 transition hover:bg-gray-100">
            Analytics
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
