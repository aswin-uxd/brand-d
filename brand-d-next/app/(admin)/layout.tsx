import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Activity, Settings, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    // Redirect to default NextAuth login page if not authenticated
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Admin Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
        <div className="flex h-16 items-center px-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-black dark:text-white">
            <span className="opacity-80">Brand-</span>D
          </Link>
        </div>
        <nav className="mt-6 flex flex-col space-y-1 px-4">
          <Link href="/dashboard" className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-black dark:bg-gray-900 dark:text-white">
            <LayoutDashboard className="mr-3 h-5 w-5 opacity-70" /> Dashboard
          </Link>
          <Link href="/leads" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/50">
            <Users className="mr-3 h-5 w-5 opacity-70" /> Leads
          </Link>
          <Link href="/analytics" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/50">
            <Activity className="mr-3 h-5 w-5 opacity-70" /> Analytics
          </Link>
          <Link href="/settings" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/50">
            <Settings className="mr-3 h-5 w-5 opacity-70" /> Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-gray-200 p-4 dark:border-gray-800">
          <a href="/api/auth/signout" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/30">
            <LogOut className="mr-3 h-5 w-5 opacity-70" /> Sign out
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
