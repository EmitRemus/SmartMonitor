import {
  type DefaultError,
  type InfiniteData,
  type QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { useRef, useState } from 'react';

import {
  TabledInputSchema,
  type TabledInputType,
} from '@/hooks/dataFetch/tables/types/tabledInput';

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

  // used to go over cache
  const [_boolFlipper, setBoolFlipper] = useState<boolean>(false);
  const lastPageIndex = useRef<number>(0);

  // ---

  const pages = data?.pages ?? null;
  let lastPage: TabledInputType | null = null;

  if (pages !== null && pages.length > lastPageIndex.current) {
    lastPage = pages[lastPageIndex.current];
    lastPageIndex.current += 1;
  }

  const lastPagesIndex = pages == null ? -1 : pages.length - 1;

  const onEndReached = () => {
    if (isFetchingNextPage || !hasNextPage) return;
    if (lastPageIndex.current + 1 > lastPagesIndex) {
      fetchNextPage(); // fire and forget
    } else {
      setBoolFlipper((value) => !value);
    }
  };

  return {
    data: lastPage,
    isDataFinished: !hasNextPage,
    onEndReached,
  };
}
