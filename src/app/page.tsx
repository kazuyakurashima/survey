import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">中学生自己分析アンケート</h1>
      
      <SignedIn>
        <Link 
          href="/questionnaire" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          アンケートに進む
        </Link>
      </SignedIn>
      
      <SignedOut>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-lg mb-4 text-center text-gray-600">アンケートに回答するにはログインしてください</p>
          <div className="flex gap-4">
            <SignInButton mode="modal" />
            <SignUpButton mode="modal" />
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
