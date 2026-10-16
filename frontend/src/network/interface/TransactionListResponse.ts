export interface TransactionListResponse {
  data: Transaction[];
  pagination: Pagination;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Transaction {
  refId: string;
  transferDate: string;
  recipientName: string;
  transferName: string;
  amount: number;
  note: null | string;
}
