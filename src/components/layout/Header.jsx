import { HiOutlineMenu } from "react-icons/hi";

function Header({ setIsSidebarOpen }) {
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Welcome back</p>
          <h1 className="text-lg font-semibold">Job Search Dashboard</h1>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
          aria-label="Open sidebar menu"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}

export default Header;
