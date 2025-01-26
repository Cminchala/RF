'use server'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ReferralSchema = z.object({
  cardetail: z.string(),
  carvin: z.string(),
  // Fixed user name, e.g. "JohnDoe". Adjust as needed.
  name: z.literal('JohnDoe'),
  amount: z.coerce.number().gt(0),
  amount_paid: z.coerce.number().default(0),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

export type State = {
  errors?: {
    cardetail?: string[];
    carvin?: string[];
    name?: string[];
    amount?: string[];
    amount_paid?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createReferral(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = ReferralSchema.safeParse({
    cardetail: formData.get('cardetail'),
    carvin: formData.get('carvin'),
    name: 'JohnDoe', // Example fixed name
    amount: formData.get('amount'),
    amount_paid: formData.get('amount_paid'),
    status: formData.get('status'),
    date: new Date().toISOString(),
  });

  console.log(formData)
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create referral.',
    };
  }
console.log(validatedFields);
  const { cardetail, carvin, name, amount, amount_paid, status } = validatedFields.data;

  try {
    await sql`
      INSERT INTO referralData (carDetail, carVin, user_id ,name, Amount, Amount_paid, status , Date)
      VALUES (${cardetail}, ${carvin}, ${'410544b2-4001-4271-9855-fec4b6a6442a'}, ${name}, ${amount}, ${amount_paid}, ${status} , ${new Date().toISOString()})
    `;
  } catch (error) {
    console.error(error);
    return {
      errors: {},
      message: 'Failed to create referral.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');

  return { message: null, errors: {} };  // delete this line
}

const UpdateReferralSchema = ReferralSchema.extend({
  id: z.string(),
});

export async function updateReferral(formData: FormData) {
  const validatedFields = UpdateReferralSchema.safeParse({
    id: formData.get('id'),
    cardetail: formData.get('cardetail'),
    carvin: formData.get('carvin'),
    name: 'JohnDoe',
    amount: formData.get('amount'),
    amount_paid: formData.get('amount_paid'),
    status: formData.get('status'),
    date: new Date().toISOString(), 
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update referral.',
    };
  }

  const { id, cardetail, carvin, name, amount, amount_paid, status } = validatedFields.data;

  try {
    await sql`
      UPDATE referralData
      SET carDetail = ${cardetail},
          carVin = ${carvin},
          name = ${name},
          Amount = ${amount},
          Amount_paid = ${amount_paid},
          status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update referral.');
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteReferral(id: string) {
  try {
    await sql`
      DELETE FROM referralData
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete referral.');
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
