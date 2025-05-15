import React from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">ありがとうございました！</h1>
        <p className="text-gray-600 mb-6">アンケートの回答を受け付けました。</p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          トップに戻る
        </Link>
      </div>
    </div>
  );
}
