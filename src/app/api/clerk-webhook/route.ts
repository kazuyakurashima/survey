export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
  }
  
  await req.json(); // 受信したペイロードを処理
  
  
  return new Response('Webhook received', { status: 200 });
}
