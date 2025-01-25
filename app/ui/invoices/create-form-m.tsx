"use client"
import Link from 'next/link';
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createReferral, State } from '@/app/lib/actions-m';
import { useActionState } from 'react';
import { user } from '@/app/lib/definitions-t';


export default function Form({ usersf }: { usersf: user[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReferral, initialState);

  return (
    <form action={formAction}> {/* <-- Add method="post" */}
      {/* Car Detail */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="carDetail" className="mb-2 block text-sm font-medium">
            Car Detail
          </label>
          <input
            id="carDetail"
            name="cardetail" // Changed to lowercase
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="carDetail-error"
          />
          {state.errors?.cardetail?.map((error) => (
            <p key={error} id="carDetail-error" className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>

        {/* Car VIN */}
        <div className="mb-4">
          <label htmlFor="carVin" className="mb-2 block text-sm font-medium">
            Car VIN
          </label>
          <input
            id="carVin"
            name="carvin" // Changed to lowercase
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="carVin-error"
          />
          {state.errors?.carvin?.map((error) => (
            <p key={error} id="carVin-error" className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="Amount" className="mb-2 block text-sm font-medium">
            Amount
          </label>
          <input
            id="Amount"
            name="amount" // Changed to lowercase
            type="number"
            step="0.01"
            defaultValue="0"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="amount-error"
          />
          {state.errors?.amount?.map((error) => (
            <p key={error} id="amount-error" className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>

        {/* Amount Paid */}
        <div className="mb-4">
          <label htmlFor="Amount_paid" className="mb-2 block text-sm font-medium">
            Amount Paid
          </label>
          <input
            id="Amount_paid"
            name="amount_paid" // Changed to lowercase
            type="number"
            step="0.01"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="amount-paid-error"
          />
          {state.errors?.amount_paid?.map((error) => (
            <p key={error} id="amount-paid-error" className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Referral Status</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer border-gray-300"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {state.errors?.status?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ))}
        </fieldset>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600"
        >
          Cancel
        </Link>
        <Button type="submit">Create Referral</Button>
      </div>
    </form>
  );
}
