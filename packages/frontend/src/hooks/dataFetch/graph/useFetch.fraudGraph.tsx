// TODO: move to router
import { environment } from '@config/environment';
import { useQuery } from '@tanstack/react-query';

import {
  FraudGraphInput,
  type FraudGraphInputType,
} from '@/hooks/dataFetch/graph/types/fraudGraphInput';

async function fetcher() {
  const failed = { isSuccess: false, data: null };

  const data = await fetch(`${environment.API_BASE_URL}/graph/fraud`);
  if (!data.ok) return failed;

  const result = FraudGraphInput.safeParse(await data.json());
  if (!result.success) return failed;
  return { isSuccess: true, data: result.data };
}

export function useFetchFraudGraph():
  | null
  | [{ isSuccess: boolean; data: FraudGraphInputType | null }, Date] {
  const fetching = useQuery({
    queryKey: ['graph', 'fraud'],
    queryFn: fetcher,
  });

  if (!fetching.isFetched) {
    return null;
  }
  if (!fetching.isSuccess) {
    return [{ isSuccess: false, data: null }, new Date()];
  }

  return [fetching.data, new Date()];
}
