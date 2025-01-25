

import { lusitana } from '@/app/ui/fonts';
import { getSession } from 'next-auth/react';

export default async function Page() {
  // const session = await getSession();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {/* {session ? `Welcome, ${session.user.name}` : 'Welcome'} */}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
   
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      
      </div>
    </main>
  );
}