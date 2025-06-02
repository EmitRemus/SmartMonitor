import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { SidebarLayout } from '@/layout/sidebarLayout/SidebarLayout';

const SidesPaddingLayout = lazy(
  () => import('@/layout/sidesPaddingLayout/SidesPaddingLayout'),
);

const AllApartments = lazy(() => import('@/pages/apartment/all/AllApartments'));
const AllBuildings = lazy(() => import('@/pages/building/all/AllBuildings'));
const AllPipes = lazy(() => import('@/pages/pipe/all/AllPipes'));
const AllPumpStations = lazy(
  () => import('@/pages/pumpStation/all/AllPumpStations'),
);

const Home = lazy(() => import('@/pages/home/Home'));
const Settings = lazy(() => import('@/pages/settings/Settings'));
const TestPage = lazy(() => import('@/pages/test/TestPage'));

const ChartSelectorLayout = lazy(
  () => import('@/layout/chartSelectorLayout/ChartSelectorLayout'),
);
const NoChartSelected = lazy(
  () => import('@/pages/charts/noSelected/NoChartSelected'),
);
const FraudRiskChart = lazy(
  () => import('@/pages/charts/analytics/fraudRisk/FraudRiskChart'),
);
const WaterColdChart = lazy(
  () => import('@/pages/charts/timeSeries/waterCold/WaterColdChart'),
);
const WaterHotChart = lazy(
  () => import('@/pages/charts/timeSeries/waterHot/WaterHotChart'),
);

const GlobalGraph = lazy(() => import('@/pages/globalGraph/GlobalGraph'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'test', element: <TestPage /> },
      { path: 'settings', element: <Settings /> },
      {
        element: <SidesPaddingLayout />,
        children: [
          {
            path: 'apartment',
            children: [{ path: 'all', element: <AllApartments /> }],
          },
          {
            path: 'building',
            children: [{ path: 'all', element: <AllBuildings /> }],
          },
          {
            path: 'pump-station',
            children: [{ path: 'all', element: <AllPumpStations /> }],
          },
          {
            path: 'pipe',
            children: [{ path: 'all', element: <AllPipes /> }],
          },
        ],
      },
      {
        path: 'statistics',
        children: [
          {
            path: 'charts',
            element: <ChartSelectorLayout />,
            children: [
              {
                index: true,
                element: <NoChartSelected />,
              },
              {
                path: 'time-series',
                children: [
                  {
                    path: 'water-hot',
                    element: <WaterHotChart />,
                  },
                  {
                    path: 'water-cold',
                    element: <WaterColdChart />,
                  },
                ],
              },
              {
                path: 'analytics',
                children: [
                  {
                    path: 'fraud-risk',
                    element: <FraudRiskChart />,
                  },
                ],
              },
            ],
          },
          { path: 'global-graph', element: <GlobalGraph /> },
        ],
      },
    ],
  },
]);
