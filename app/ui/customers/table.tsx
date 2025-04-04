import { formatCurrency } from '@/app/lib/utils';
import { fetchCombinedAmountAwarded } from '@/app/lib/data-m';

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;

}) {
  // Pass query and currentPage to fetch filtered and paginated results
  const referrals = await fetchCombinedAmountAwarded(query, currentPage);

  console.log(referrals);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {referrals?.map((referral) => (
              <div
                key={referral.name}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{referral.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">Amount Due: {formatCurrency(Number(referral.amount_awarded))}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      Amount awarded in 30 Days: {formatCurrency(Number(referral.monthbyawarded))}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount award pending
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount Awarded in 30 Days
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {referrals?.map((referral) => (
                <tr
                  key={referral.name}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{referral.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(Number(referral.amount_awarded))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(Number(referral.amount_awarded))}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
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
