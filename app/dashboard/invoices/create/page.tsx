import Form from '@/app/ui/invoices/create-form-m';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchUsers } from '@/app/lib/data-m';
 
export default async function Page() {
  // const customers = await fetchCustomers();
 const users = await fetchUsers();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form usersf={users} />
    </main>
  );
}