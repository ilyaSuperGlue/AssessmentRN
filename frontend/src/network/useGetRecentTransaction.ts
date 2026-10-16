import { useCallback, useEffect, useState } from 'react';
import { host_url, transaction_service } from '../constant/network';
import { TransactionListResponse } from './interface/TransactionListResponse';

const useGetRecentTransaction = () => {
  const [data, setData] = useState<TransactionListResponse>();
  const [loading, setLoading] = useState(false);

  const fetchApi = useCallback(async () => {
    const url = host_url + transaction_service;
    try {
      setLoading(true);
      const res = await fetch(`${url}?page=1&perPage=6`);
      const apiData = await res.json();
      setData(apiData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return {
    fetchApi,
    data,
    loading,
  };
};

export default useGetRecentTransaction;
