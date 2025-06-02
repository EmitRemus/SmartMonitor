// TODO: move to router
import { environment } from '@config/environment';
import { useQuery } from '@tanstack/react-query';

import {
  TotalWaterChartInput,
  type TotalWaterChartInputType,
} from '@/hooks/dataFetch/charts/types/totalWaterChartInput';

async function fetcher() {
  const failed = { isSuccess: false, data: null };

  const data = await fetch(
    `${environment.API_BASE_URL}/charts/cold-water/totals`,
  );
  if (!data.ok) return failed;
  const result = TotalWaterChartInput.safeParse(await data.json());
  if (!result.success) return failed;
  return { isSuccess: true, data: result.data };
}

export function useFetchChartTotalColdWater():
  | null
  | [{ isSuccess: boolean; data: TotalWaterChartInputType | null }, Date] {
  const fetching = useQuery({
    queryKey: ['charts', 'cold-water', 'total'],
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
