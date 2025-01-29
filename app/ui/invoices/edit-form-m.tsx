'use client';

import { user, referralDataForm } from '@/app/lib/definitions-t';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateReferral } from '@/app/lib/actions-m';
import { formatCurrency } from '@/app/lib/utils';

export default function EditReferralForm({
  referral,
  users,
}: {
  referral: referralDataForm;
  users: user[];
}) {
   const updateReferralWithId = updateReferral.bind(null, referral.id);
  return <form action={updateReferralWithId}>{/* ... */}
      {/* Hidden ID Field */}
      <input type="hidden" name="id" value={referral.id} />

      {/* Car Detail */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="carDetail" className="mb-2 block text-sm font-medium">
            Car Detail
          </label>
          <input
            id="carDetail"
            name="cardetail"
            type="text"
            defaultValue={referral.cardetail}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="carDetail-error"
            required
          />
       
        </div>

        {/* Car VIN */}
        <div className="mb-4">
          <label htmlFor="carVin" className="mb-2 block text-sm font-medium">
            Car VIN
          </label>
          <input
            id="carVin"
            name="carvin"
            type="text"
            defaultValue={referral.carvin}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="carVin-error"
            required
          />
          {/* Error Handling */}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            defaultValue={referral.amount / 100}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="amount-error"
            required
          />
          {/* Error Handling */}
        </div>

        {/* Amount Paid */}
        <div className="mb-4">
          <label htmlFor="amount_paid" className="mb-2 block text-sm font-medium">
            Amount Paid
          </label>
          <input
            id="amount_paid"
            name="amount_paid"
            type="number"
            step="0.01"
            defaultValue={referral.amount_paid / 100}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="amount-paid-error"
            required
          />
          {/* Error Handling */}
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
                  defaultChecked={referral.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300"
                  required
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
                  defaultChecked={referral.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-gray-300"
                  required
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
          {/* Error Handling */}
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
        <Button type="submit">Edit Referral</Button>
      </div>
    </form>
  
}