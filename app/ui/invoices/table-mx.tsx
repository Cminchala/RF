import Image from 'next/image';
 import { UpdateInvoice, DeleteInvoice, DeleteReferralM } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

import { fetchFilteredreferralsMembers } from '@/app/lib/data-m';

export default async function ReferralsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const referrals = await fetchFilteredreferralsMembers(query, currentPage);

  console.log(referrals);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {referrals?.map((referral) => (
              <div
                key={referral.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                   
                      <p>{referral.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{referral.cardetail}</p>
                    <p className="text-sm text-gray-500">Car Vin: {referral.carvin}</p>
                    <p className="text-sm text-green-500">Amount awarded: {formatCurrency(referral.amount_paid)}</p>
                  </div>
                  <InvoiceStatus status={referral.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      Amount : {formatCurrency(referral.amount)}
                    </p>
                    { <p>{formatDateToLocal(referral.date)}</p> } 
                  </div>
                  <div className="flex justify-end gap-2">
      
                    <DeleteReferralM id={referral.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Car Detail
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Car VIN
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount Awarded
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {referrals?.map((referral) => (
                <tr
                  key={referral.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{referral.cardetail}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {referral.carvin}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {referral.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(referral.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(referral.amount_paid)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(referral.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={referral.status} />
                  </td>        
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                     
                      <DeleteReferralM id={referral.id} />
                    </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
