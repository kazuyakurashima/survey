'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { supabase } from '../../utils/supabase';

export default function QuestionnairePage() {
  const router = useRouter();
  const { userId } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    grade: '',
    name: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      alert('ログインしてください');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('user_answers').insert({
        user_id: userId,
        ...formData
      });
      
      if (error) throw error;
      
      router.push('/thank-you');
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">自己分析アンケート</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <label className="block mb-2 font-medium">
            学年
            <select 
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              <option value="中1">中1</option>
              <option value="中2">中2</option>
              <option value="中3">中3</option>
            </select>
          </label>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <label className="block mb-2 font-medium">
            名前
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <label className="block mb-2 font-medium">
            志望校はどこですか？
            <div className="text-sm text-gray-500 mb-2">
              📌できるだけ具体的に書いてください（例：○○高校 普通科）<br />
              ➕理由も、よかったら教えてください！
            </div>
            <textarea 
              name="q1"
              value={formData.q1}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
            />
          </label>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <label className="block mb-2 font-medium">
            もし、どんな高校にも入れるとしたら、どこに入りたいですか？
            <div className="text-sm text-gray-500 mb-2">
              📌自由に答えてOKです。今は無理かも…なんて気にしないで！<br />
              ➕なぜそこに行きたい？の理由もぜひ！
            </div>
            <textarea 
              name="q2"
              value={formData.q2}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
            />
          </label>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <label className="block mb-2 font-medium">
            将来なりたい職業や、やってみたいことはありますか？
            <div className="text-sm text-gray-500 mb-2">
              📌まだ決まってない人は、気になってること・憧れてることを書いてみてください。
            </div>
            <textarea 
              name="q3"
              value={formData.q3}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
            />
          </label>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <label className="block mb-2 font-medium">
            苦手な教科はありますか？
            <div className="text-sm text-gray-500 mb-2">
              📌どんなところが「むずかしい」と感じる？<br />
              ➕「これならちょっとできるかも…」という部分があればそれも教えてね！
            </div>
            <textarea 
              name="q4"
              value={formData.q4}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
            />
          </label>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <label className="block mb-2 font-medium">
            今年1年で「自分がこうなれたらいいな」と思うことは？
            <div className="text-sm text-gray-500 mb-2">
              📌勉強・部活・生活・性格など、なんでもOK！<br />
              ➕そのために、どんなことを頑張ってみたい？も書けると最高です！
            </div>
            <textarea 
              name="q5"
              value={formData.q5}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
            />
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </button>
      </form>
    </div>
  );
}
