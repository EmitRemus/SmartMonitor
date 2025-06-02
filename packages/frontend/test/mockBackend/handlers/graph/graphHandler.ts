import { HttpResponse, http } from 'msw';

export const fraudGraphHandler = http.get(/.*\/api\/graph\/fraud$/, () =>
  HttpResponse.json(_mockedGraph),
);

// --------------------------------------

const _mockedGraph = {
  name: 'Water Source',
  attributes: {
    name: 'Water Source',
    type: 'waterSource',
  },
  children: [
    {
      name: 'Main City Pump',
      attributes: {
        name: 'Main City Pump',
        type: 'pumpStation',
        id: 'PS-001',
        totalHotWater: 470.0,
        totalColdWater: 900.0,
      },
      children: [
        {
          name: 'Emerald Towers',
          attributes: {
            name: 'Emerald Towers',
            type: 'building',
            id: 'BLD-A',
            totalHotWater: 290.0,
            totalColdWater: 560.0,
            fraudFactor: 42,
          },
          children: [
            {
              name: 'Apartment 101',
              attributes: {
                name: 'Apartment 101',
                type: 'apartment',
                id: 'APT-A-101',
                totalHotWater: 170.0,
                totalColdWater: 320.0,
                fraudFactor: 15,
              },
              children: [
                {
                  name: 'Meter Hot',
                  attributes: {
                    name: 'Meter Hot',
                    consumption: 170.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-A-101-H',
                    totalHotWater: 170.0,
                    totalColdWater: 0.0,
                    fraudFactor: 7,
                  },
                },
                {
                  name: 'Meter Cold',
                  attributes: {
                    name: 'Meter Cold',
                    consumption: 320.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-A-101-C',
                    totalHotWater: 0.0,
                    totalColdWater: 320.0,
                    fraudFactor: 10,
                  },
                },
              ],
            },
            {
              name: 'Apartment 102',
              attributes: {
                name: 'Apartment 102',
                residents: '2',
                type: 'apartment',
                id: 'APT-A-102',
                totalHotWater: 120.0,
                totalColdWater: 240.0,
                fraudFactor: 28,
              },
              children: [
                {
                  name: 'Meter Hot',
                  attributes: {
                    name: 'Meter Hot',
                    consumption: 120.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-A-102-H',
                    totalHotWater: 120.0,
                    totalColdWater: 0.0,
                    fraudFactor: 12,
                  },
                },
                {
                  name: 'Meter Cold',
                  attributes: {
                    name: 'Meter Cold',
                    consumption: 240.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-A-102-C',
                    totalHotWater: 0.0,
                    totalColdWater: 240.0,
                    fraudFactor: 9,
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'Ruby Residences',
          attributes: {
            name: 'Ruby Residences',
            type: 'building',
            id: 'BLD-B',
            totalHotWater: 180.0,
            totalColdWater: 340.0,
            fraudFactor: 55,
          },
          children: [
            {
              name: 'Apartment 201',
              attributes: {
                name: 'Apartment 201',
                type: 'apartment',
                id: 'APT-B-201',
                totalHotWater: 180.0,
                totalColdWater: 340.0,
                fraudFactor: 30,
              },
              children: [
                {
                  name: 'Meter Hot',
                  attributes: {
                    name: 'Meter Hot',
                    consumption: 180.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-B-201-H',
                    totalHotWater: 180.0,
                    totalColdWater: 0.0,
                    fraudFactor: 18,
                  },
                },
                {
                  name: 'Meter Cold',
                  attributes: {
                    name: 'Meter Cold',
                    consumption: 340.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-B-201-C',
                    totalHotWater: 0.0,
                    totalColdWater: 340.0,
                    fraudFactor: 22,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Central City Pump',
      attributes: {
        name: 'Central City Pump',
        type: 'pumpStation',
        id: 'PS-002',
        totalHotWater: 600.0,
        totalColdWater: 1100.0,
      },
      children: [
        {
          name: 'Diamond Residences',
          attributes: {
            name: 'Diamond Residences',
            type: 'building',
            id: 'BLD-C',
            totalHotWater: 320.0,
            totalColdWater: 600.0,
            fraudFactor: 38,
          },
          children: [
            {
              name: 'Apartment 301',
              attributes: {
                name: 'Apartment 301',
                type: 'apartment',
                id: 'APT-C-301',
                totalHotWater: 150.0,
                totalColdWater: 280.0,
                fraudFactor: 10,
              },
              children: [
                {
                  name: 'Meter Hot',
                  attributes: {
                    name: 'Meter Hot',
                    consumption: 150.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-C-301-H',
                    totalHotWater: 150.0,
                    totalColdWater: 0.0,
                    fraudFactor: 5,
                  },
                },
                {
                  name: 'Meter Cold',
                  attributes: {
                    name: 'Meter Cold',
                    consumption: 280.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-C-301-C',
                    totalHotWater: 0.0,
                    totalColdWater: 280.0,
                    fraudFactor: 8,
                  },
                },
              ],
            },
            {
              name: 'Apartment 302',
              attributes: {
                name: 'Apartment 302',
                residents: '3',
                type: 'apartment',
                id: 'APT-C-302',
                totalHotWater: 170.0,
                totalColdWater: 320.0,
                fraudFactor: 25,
              },
              children: [
                {
                  name: 'Meter Hot',
                  attributes: {
                    name: 'Meter Hot',
                    consumption: 170.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-C-302-H',
                    totalHotWater: 170.0,
                    totalColdWater: 0.0,
                    fraudFactor: 11,
                  },
                },
                {
                  name: 'Meter Cold',
                  attributes: {
                    name: 'Meter Cold',
                    consumption: 320.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-C-302-C',
                    totalHotWater: 0.0,
                    totalColdWater: 320.0,
                    fraudFactor: 14,
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'Sapphire Apartments',
          attributes: {
            name: 'Sapphire Apartments',
            type: 'building',
            id: 'BLD-D',
            totalHotWater: 280.0,
            totalColdWater: 500.0,
            fraudFactor: 60,
          },
          children: [
            {
              name: 'Apartment 401',
              attributes: {
                name: 'Apartment 401',
                type: 'apartment',
                id: 'APT-D-401',
                totalHotWater: 130.0,
                totalColdWater: 230.0,
                fraudFactor: 20,
              },
              children: [
                {
                  name: 'Meter Hot',
                  attributes: {
                    name: 'Meter Hot',
                    consumption: 130.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-D-401-H',
                    totalHotWater: 130.0,
                    totalColdWater: 0.0,
                    fraudFactor: 9,
                  },
                },
                {
                  name: 'Meter Cold',
                  attributes: {
                    name: 'Meter Cold',
                    consumption: 230.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-D-401-C',
                    totalHotWater: 0.0,
                    totalColdWater: 230.0,
                    fraudFactor: 11,
                  },
                },
              ],
            },
            {
              name: 'Apartment 402',
              attributes: {
                name: 'Apartment 402',
                type: 'apartment',
                id: 'APT-D-402',
                totalHotWater: 150.0,
                totalColdWater: 270.0,
                fraudFactor: 40,
              },
              children: [
                {
                  name: 'Meter Hot',
                  attributes: {
                    name: 'Meter Hot',
                    consumption: 150.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-D-402-H',
                    totalHotWater: 150.0,
                    totalColdWater: 0.0,
                    fraudFactor: 15,
                  },
                },
                {
                  name: 'Meter Cold',
                  attributes: {
                    name: 'Meter Cold',
                    consumption: 270.0,
                    lastReading: '2025-06-02T03:47:41.000Z',
                    type: 'meter',
                    id: 'M-D-402-C',
                    totalHotWater: 0.0,
                    totalColdWater: 270.0,
                    fraudFactor: 25,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
