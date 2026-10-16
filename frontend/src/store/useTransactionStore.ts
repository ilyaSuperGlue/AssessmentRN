import { create } from 'zustand';
import { TransactionListResponse } from '../network/interface/TransactionListResponse';

interface TransactionStore {
  pageData: Record<string, TransactionListResponse>;
  setPageData: (pageNumber: number, data: TransactionListResponse) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  maxPage?: number;
  setMaxPage: (p: number) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const useTransactionStore = create<TransactionStore>(set => ({
  pageData: {},
  setPageData: (page, data) => {
    set(({ pageData }) => ({
      pageData: { ...pageData, [page]: data },
    }));
  },
  currentPage: 1,
  setCurrentPage: currentPage => set({ currentPage }),
  setMaxPage: maxPage => set({ maxPage }),
  search: '',
  setSearch: search => set({ search }),
}));
