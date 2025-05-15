import { clerkMiddleware } from '@clerk/nextjs/server';
 
export default clerkMiddleware();
 
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(jpg|jpeg|gif|png|svg|ico|css|js|woff|woff2)).*)',
    '/(api|trpc)(.*)',
  ],
};
