import { get, post } from './fetch-methods'

export interface RegisterUserInput {
  username: string,
  email: string,
  password: string,
}
export interface LoginInput {
  email: string,
  password: string,
}
interface LoginResult {
  id_token: string,
}
export interface UserInfo {
  id: number,
  name: string,
  email: string,
  balance: number,
};
interface UserInfoResult {
  user_info_token: UserInfo
};

export interface Transaction {
  id: number,
  date: string,
  username: string,
  amount: number,
  balance: number,
};
interface TransactionsResult {
  trans_token: Transaction[]
};
interface CreateTransactionInput {
  name: string,
  amount: number,
}
interface CreateTransactionResult {
  trans_token: Transaction
}
interface Recipient {
  id: number,
  name: string
}
interface ClientInteface {
  register: (input: RegisterUserInput) => Promise<void>,
  login: (input: LoginInput) => Promise<void>,
  logout: () => Promise<void>,

  getLoggedUserInfo: () => Promise<UserInfo>,
  getLoggedUserTransactions: () => Promise<Transaction[]>,
  getRecipients: (filter: string) => Promise<Recipient[]>,

  createTransaction: (input: CreateTransactionInput) => Promise<void>,
}

function makeClient() {
  let token: string | undefined = undefined;

  return {
    register: function(input: RegisterUserInput) {
      // console.log('client/ register');
      // console.log(input);
      return post('/users', undefined, input)
        .then((result: LoginResult) => {
          token = result.id_token
        }); 
    },
    login: function(input: LoginInput) {
      return post('/sessions/create', undefined, input)
        .then((result: LoginResult) => {
          token = result.id_token
        }); 
    },
    logout: function() {
      token = undefined;
      return Promise.resolve();
    },

    getLoggedUserInfo: function() {
      return get('/api/protected/user-info', token ).then((result: UserInfoResult) => result.user_info_token)
    },
    getLoggedUserTransactions: function() {
      return get('/api/protected/transactions', token ).then((result: TransactionsResult) => result.trans_token)
    },
    getRecipients: function(filter: string) {
      return post('/api/protected/users/list', token, {filter} )
    },

    createTransaction: function(input: CreateTransactionInput) {
      return post('/api/protected/transactions', token, input )
    },
  }
}

const client: ClientInteface = makeClient()

export default client
