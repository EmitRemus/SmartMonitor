import {
  type DefaultError,
  type InfiniteData,
  type QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { useCallback, useRef } from 'react';

import {
  TabledInputSchema,
  type TabledInputType,
} from '@/hooks/dataFetch/types/tabledInput.js';

async function fetcher(
  pageParam: string | null,
  endpoint: string | URL,
  pageSize: number,
) {
  const url = new URL(endpoint, window.location.origin);
  url.searchParams.set('limit', pageSize.toString());
  if (pageParam !== null) {
    url.searchParams.set('id', String(pageParam));
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch from ${endpoint}`);

  const data = TabledInputSchema.safeParse(await res.json());
  return data.success ? data.data : null;
}

export function usePaginatedTableQuery(
  endpoint: string,
  queryKey: string[],
  pageSize = 20,
): {
  data: TabledInputType | null;
  onEndReached: () => void;
  isDataFinished: boolean;
} {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      TabledInputType | null,
      DefaultError,
      InfiniteData<TabledInputType | null>,
      QueryKey,
      string | null
    >({
      queryKey: [...queryKey],
      queryFn: async (context) =>
        await fetcher(context.pageParam, endpoint, pageSize),
      getNextPageParam: (lastPage: TabledInputType | null) =>
        (lastPage?.isFinished ?? true) ? null : lastPage!.lastId,
      initialPageParam: null,
    });

  // somewhy there is duplication of batches (no new data fetched yet hook is fired)
  // so to prevent this check number of batches
  const amountOfBatches = useRef<number>(0);

  const pages = data?.pages ?? null;

  let lastPage = null;
  if (pages !== null && pages.length > amountOfBatches.current) {
    amountOfBatches.current = pages.length;
    lastPage = pages[pages.length - 1];
  }

  const onEndReached = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage(); // fire and forget
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return {
    data: lastPage,
    isDataFinished: !hasNextPage,
    onEndReached,
  };
}
