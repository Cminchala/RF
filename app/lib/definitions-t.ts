export type user ={
    id: string;
    name: string;
    email: string;
    password: string;
    auth: string;
}

export type referralData ={
    id : string;
    cardetail : string;
    carvin : string;
    name : string;
    user_id : string;
    amount : number;
    amount_paid : number;
    date : string;
    status : string;
}

export type referralDataRaw = Omit<referralData, 'amount'> & {
  amount: number;
};

export type referralDataForm = {
  id: string;
  cardetail: string;
  carvin: string;
  name: string;
  user_id: string;
  amount: number;
  amount_paid: number;
  date: string;
  status: string;
};