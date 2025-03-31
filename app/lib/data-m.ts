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

export async function fetchfiltredcustomers(query:string , currentPage:number){
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const customers = await sql<user>`
      SELECT
        user.id,
        user.name,
        user.email,
        user.auth
      FROM user
      WHERE
        user.name ILIKE ${`%${query}%`} OR
        user.email ILIKE ${`%${query}%`} OR
        user.auth ILIKE ${`%${query}%`}
      ORDER BY user.name
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return customers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
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

export async function fetchcustomersPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(DISTINCT name)
      FROM referralData      
    `;
   //  console.log('NUM of customers: ',Math.ceil(count.rows[0].count))
    return Math.ceil(count.rows[0].count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers pages.');
  }
}

export async function fetchreferralsPagesMembers(query: string) {
  const user_id = await getuserID();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM referralData
    WHERE
      (carDetail ILIKE ${`%${query}%`}
      OR carVin ILIKE ${`%${query}%`}
      OR name ILIKE ${`%${query}%`}
      OR Amount::text ILIKE ${`%${query}%`}
      OR Date::text ILIKE ${`%${query}%`}
      OR status ILIKE ${`%${query}%`})
      AND user_id = ${user_id}
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

// Updated to accept query and currentPage for filtering and pagination
export async function fetchCombinedAmountAwarded(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const combined = await sql`
      SELECT 
        name,
        SUM(amount_paid) AS amount_awarded,
        SUM(CASE WHEN date >= NOW() - INTERVAL '30 days' THEN amount_paid ELSE 0 END) AS monthbyawarded
      FROM referralData
      WHERE name ILIKE ${`%${query}%`} AND status ILIKE 'pending'
      GROUP BY name
      ORDER BY name
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return combined.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total and last 30 days awarded amount.');
  }
}


export async function monthlyEarnings(){
  try{
    const monthlyEarnings = await sql`
    SELECT 
      EXTRACT(MONTH FROM date) as month,
      ROUND(SUM(amount)::numeric / 100.0, 2) as earnings
    FROM referralData
    WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM NOW())
    GROUP BY EXTRACT(MONTH FROM date)
    ORDER BY EXTRACT(MONTH FROM date)
    `;

    return monthlyEarnings.rows;
  }
  catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to fetch monthly earnings.');
  }
}

export async function monthlyAwarded(){
  try{
    const monthlyAwarded = await sql`
    SELECT 
    EXTRACT(MONTH FROM date) as month,
    SUM(amount_paid)/100 as awarded
    FROM referralData
    WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM NOW())
    GROUP BY EXTRACT(MONTH FROM date)
    ORDER BY EXTRACT(MONTH FROM date)
    `;

    return monthlyAwarded.rows;
  }
  catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to fetch monthly awarded.');
  }
}