// TODO: move to router
import { environment } from '@config/environment';
import { useQuery } from '@tanstack/react-query';

import {
  FraudHeatmapChartInput,
  type FraudHeatmapChartInputType,
} from '@/hooks/dataFetch/charts/types/fraudHeatmapChartInput';

async function fetcher() {
  const failed = { isSuccess: false, data: null };

  const data = await fetch(`${environment.API_BASE_URL}/charts/fraud-heatmap`);
  if (!data.ok) return failed;

  const result = FraudHeatmapChartInput.safeParse(await data.json());
  if (!result.success) return failed;
  return { isSuccess: true, data: result.data };
}

export function useFetchFraudHeatmapChart():
  | null
  | [{ isSuccess: boolean; data: FraudHeatmapChartInputType | null }, Date] {
  const fetching = useQuery({
    queryKey: ['charts', 'fraud', 'heatmap'],
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
