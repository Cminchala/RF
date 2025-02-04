import {sql} from '@vercel/postgres';
import{user, referralData} from './definitions-t';
import { formatCurrency } from './utils';
import { currentUser } from '@clerk/nextjs/server';

export async function fetchUsers( ) {
  try {
    const users = await sql<user>`SELECT * FROM user`;

    return users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}


async function getuserID(){
  const user = await currentUser();
  if (user) {
    return String(user.id);
  }
  return null;
}

async function getFullName() {
  const user = await currentUser();
  if (user) {
    return String(user.fullName);
  }
  return null;
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredreferrals(
  query: string,
  currentPage: number,
) {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const referrals = await sql<referralData>`
      SELECT
        referralData.id,
        referralData.carDetail,
        referralData.carVin,
        referralData.name,
        referralData.user_id,
        referralData.Amount,
        referralData.Amount_paid,
        referralData.Date,
        referralData.status
      FROM referralData
      WHERE
        referralData.carDetail ILIKE ${`%${query}%`} OR
        referralData.carVin ILIKE ${`%${query}%`} OR
        referralData.name ILIKE ${`%${query}%`} OR
        referralData.Amount::text ILIKE ${`%${query}%`} OR
        referralData.Date::text ILIKE ${`%${query}%`} OR
        referralData.status ILIKE ${`%${query}%`}
      ORDER BY referralData.Date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return referrals.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch referrals.');
  }
}

// filter by userID from clerk 
export async function fetchFilteredreferralsMembers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const user_id = await getuserID();

  try {
    const referrals = await sql<referralData>`
      SELECT
        referralData.id,
        referralData.carDetail,
        referralData.carVin,
        referralData.name,
        referralData.user_id,
        referralData.Amount,
        referralData.Amount_paid,
        referralData.Date,
        referralData.status
      FROM referralData
      WHERE (
        referralData.carDetail ILIKE ${`%${query}%`}
        OR referralData.carVin ILIKE ${`%${query}%`}
        OR referralData.name ILIKE ${`%${query}%`}
        OR referralData.Amount::text ILIKE ${`%${query}%`}
        OR referralData.Date::text ILIKE ${`%${query}%`}
        OR referralData.status ILIKE ${`%${query}%`}
      )
      AND referralData.user_id = ${user_id}
      ORDER BY referralData.Date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return referrals.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch referrals.');
  }
}


export async function fetchreferralsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM referralData
    WHERE
      carDetail ILIKE ${`%${query}%`} OR
      carVin ILIKE ${`%${query}%`} OR
      name ILIKE ${`%${query}%`} OR
      Amount::text ILIKE ${`%${query}%`} OR
      Date::text ILIKE ${`%${query}%`} OR
      status ILIKE ${`%${query}%`}
  `;

    return Math.ceil(count.rows[0].count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch referrals pages.');
  }
}

export async function fetchreferralById(id: string) {
  try {
    const referral = await sql<referralData>`
      SELECT
        referralData.id,
        referralData.carDetail,
        referralData.carVin,
        referralData.name,
        referralData.user_id,
        referralData.Amount,
        referralData.Amount_paid,
        referralData.Date,
        referralData.status
      FROM referralData
      WHERE referralData.id = ${id}
    `;

    return referral.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch referral by id.');
  }
}

export async function fetchUserById(id: string) {
  try {
    const user = await sql<user>`
      SELECT
        user.id,
        user.name,
        user.email,
        user.password,
        user.auth
      FROM user
      WHERE user.id = ${id}
    `;

    return user.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user by id.');
  }
}

export async function fetchUserByEmailAndPassword(email: string, password: string) {
  try {
    const user = await sql<user>`
      SELECT name, email, password, auth
      FROM user
      WHERE email = ${email} AND password = ${password}
    `;

    if (user.rows.length === 0) {
      throw new Error('Invalid email or password.');
    }

    return user.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user by email and password.');
  }
}

// amount_paid group by user_id 

export async function fetchUserAmountPaid() {
  try {
    const userAmountPaid = await sql`SELECT user_id, SUM(Amount_paid) as Amount_paid FROM referralData GROUP BY user_id`;

    return userAmountPaid.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user amount paid.');
  }
}

// Fetch total amount awarded grouped by name
export async function fetchTotalAmountAwarded() {
  try {
    const totalAmountAwarded = await sql`
      SELECT name, SUM(amount_paid) as amount_awarded
      FROM referralData
      GROUP BY name
    `;

    return totalAmountAwarded.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total amount awarded.');
  }
}

// Fetch total amount awarded in the last 30 days grouped by name
export async function fetchAmountAwardedLast30Days() {
  try {
    const amountAwardedLast30Days = await sql`
      SELECT name, SUM(amount_paid) AS amount_awarded
      FROM referralData
      WHERE date >= NOW() - INTERVAL '30 days'
      GROUP BY name
    `;

    return amountAwardedLast30Days.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch amount awarded in the last 30 days.');
  }
}