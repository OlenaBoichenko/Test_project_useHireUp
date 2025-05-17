'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    setLoading(false);
    setContent('');
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6">
      <div>
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Submit Your Daily Update</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="What's your update today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={!content || loading}
            className="w-full py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </main>
  )
}