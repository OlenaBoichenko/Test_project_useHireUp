'use client';

import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data: updates, error } = useSWR('/api/updates', fetcher);

  if (error)
    return <div className="p-8 text-center text-red-500">Error loading updates</div>;
  if (!updates)
    return <div className="p-8 text-center text-gray-500">Loading…</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Your Updates</h1>
        <Link href="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Back to Home
          </button>
        </Link>
      </div>
      <p className="mb-4 text-gray-700">Total submitted: {updates.length}</p>
      <ul className="space-y-4">
        {updates.map((u: any) => (
          <li
            key={u.id}
            className="bg-white p-4 rounded shadow hover:shadow-md transition"
          >
            <div className="text-sm text-gray-500 mb-1">
              {new Date(u.createdAt).toLocaleString()}
            </div>
            <div className="text-gray-800">{u.content}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}