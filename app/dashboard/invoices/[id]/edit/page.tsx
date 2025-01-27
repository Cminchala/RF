import Form from '@/app/ui/invoices/edit-form-m';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchreferralById, fetchUsers } from '@/app/lib/data-m';
import { notFound } from 'next/navigation'

 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [invoice, users] = await Promise.all([
        fetchreferralById(id),
        fetchUsers(),
      ]);
      if (!invoice) {
        notFound();
      }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form referral={invoice} users={users} />
    </main>
  );
}