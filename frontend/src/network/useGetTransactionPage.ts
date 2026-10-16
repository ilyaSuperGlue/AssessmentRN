import { useCallback, useEffect, useState } from 'react';
import { local_url, transaction_service } from '../constant/network';
import { TransactionListResponse } from './interface/TransactionListResponse';
import { useTransactionStore } from '../store/useTransactionStore';

const useGetTransactionPage = ({
  currentPage,
  perPage,
  search,
}: {
  currentPage: number;
  perPage: number;
  search: string;
}) => {
  const [data, setData] = useState<TransactionListResponse>();
  const [loading, setLoading] = useState(false);
  const { setMaxPage, setPageData } = useTransactionStore();

  const fetchApi = useCallback(async () => {
    const url = local_url + transaction_service;
    try {
      setLoading(true);
      const res = await fetch(
        `${url}?page=${currentPage ?? 1}&perPage=${
          perPage ?? 10
        }&search=${search}`,
      );
      const apiData = (await res.json()) as unknown as TransactionListResponse;
      setData(apiData);
      setMaxPage(apiData.pagination.totalPages);
      setPageData(apiData.pagination.page, apiData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage, search, setMaxPage, setPageData]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return {
    fetchApi,
    data,
    loading,
  };
};

export default useGetTransactionPage;
