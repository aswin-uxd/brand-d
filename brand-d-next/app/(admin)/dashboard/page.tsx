import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Fetch real-time metrics using Prisma
  const totalLeads = await prisma.lead.count();
  const newLeads = await prisma.lead.count({ where: { status: 'NEW' } });
  
  const totalEvents = await prisma.event.count();
  const pageViews = await prisma.event.count({ where: { eventType: 'page_view' } });

  // Example recent leads
  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Growth Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Real-time overview of your conversion metrics.</p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric Cards */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Leads</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{totalLeads}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New Leads</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{newLeads}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events Tracked</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{totalEvents}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Page Views</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{pageViews}</p>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-black">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Goal</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No leads captured yet.</td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{lead.email}</td>
                    <td className="px-6 py-4 capitalize">{lead.goal?.toLowerCase() || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
