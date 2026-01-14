import { useState } from 'react';
import { Home, BookPlus, BookOpen, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Link, Outlet } from 'react-router';

const DashBoardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        {
            title: 'Dashboard',
            icon: <LayoutDashboard size={20} />,
            path: '/dashboard',
        },
        {
            title: 'Homepage',
            icon: <Home size={20} />,
            path: '/',
        },
        {
            title: 'Add Books',
            icon: <BookPlus size={20} />,
            path: '/dashboard/addBooks',
        },
        {
            title: 'My Books',
            icon: <BookOpen size={20} />,
            path: '/dashboard/myBooks',
        },
        {
            title: 'Orders',
            icon: <ShoppingCart size={20} />,
            path: '/dashboard/orders',
        },
        {
            title: 'My Profile',
            icon: <User size={20} />,
            path: '/dashboard/myProfile',
        },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    bg-white shadow-lg
                    transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
                    w-64
                `}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    {!isCollapsed && (
                        <h2 className="text-xl font-bold text-gray-800">Librarian Panel</h2>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#fde8e3] hover:text-[#d34e2d] transition-colors group"
                                >
                                    <span className="text-gray-600 group-hover:text-[#d34e2d]">
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && (
                                        <span className="font-medium text-gray-700 group-hover:text-[#d34e2d]">
                                            {item.title}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navbar */}
                <header className="bg-white shadow-sm sticky top-0 z-30">
                    <div className="flex items-center justify-between px-6 py-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Librarian <span className="text-[#d34e2d]">Dashboard</span>
                        </h1>
                        <div className="w-10 lg:w-0"></div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashBoardLayout;
