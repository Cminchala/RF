import { db } from "@vercel/postgres";



// async function listInvoices() {
// 	const data = await client.sql`
//     SELECT invoices.amount, customers.name
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE invoices.amount = 666;
//   `;

// 	return data.rows;
// }

// export async function GET() {
//   // return Response.json({
//   //   message:
//   //     'U34ncomment this file and remove this line. You can delete this file when you are finished.',
//   // });
//   try {
//   	return Response.json(await listInvoices());
//   } catch (error) {
//   	return Response.json({ error }, { status: 500 });
//   }
// }
