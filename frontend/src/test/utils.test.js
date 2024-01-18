import { calculateAverageRates, calculateDailyAverage, calculateTodayAverages } from '../utils';

test('calculateAverageRates calculates averages correctly', () => {
  const data = {
    report: [
      {
        adslots: [
          { average_view_rate: 1, average_custom_view_rate: 2 },
          { average_view_rate: 3, average_custom_view_rate: 4 },
        ],
      },
      {
        adslots: [
          { average_view_rate: 5, average_custom_view_rate: 6 },
          { average_view_rate: 7, average_custom_view_rate: 8 },
        ],
      },
    ],
  };

  const result = calculateAverageRates(data);

  expect(result).toEqual({
    averageViewRate: 4,
    averageCustomViewRate: 5,
  });
});

// New test for calculateDailyAverage
test('calculateDailyAverage calculates the correct averages', () => {
    const adslots = [
      { average_view_rate: 10, average_custom_view_rate: 20 },
      { average_view_rate: 20, average_custom_view_rate: 40 },
      { average_view_rate: 30, average_custom_view_rate: 60 },
    ];
  
    const result = calculateDailyAverage(adslots);
  
    expect(result).toEqual({
      averageViewRate: 20, // (10 + 20 + 30) / 3
      averageCustomViewRate: 40, // (20 + 40 + 60) / 3
    });
  });

// New test for calculateTodayAverages
test('calculateTodayAverages calculates the correct averages for the most recent day', () => {
  const data = {
    report: [
      { adslots: [{ average_view_rate: 10, average_custom_view_rate: 20 }] },
      { adslots: [{ average_view_rate: 20, average_custom_view_rate: 40 }] },
      { adslots: [{ average_view_rate: 30, average_custom_view_rate: 60 }] },
    ],
  };

  const result = calculateTodayAverages(data);

  expect(result).toEqual({
    todayAverageViewRate: 30, // The average view rate of the most recent day
    todayAverageCustomViewRate: 60, // The average custom view rate of the most recent day
  });
});

test('calculateTodayAverages returns null averages if no data is available', () => {
  const data = {
    report: [],
  };

  const result = calculateTodayAverages(data);

  expect(result).toEqual({
    todayAverageViewRate: null,
    todayAverageCustomViewRate: null,
  });
});