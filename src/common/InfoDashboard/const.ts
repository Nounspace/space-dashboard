import { type ChartConfig } from '@/types'

export const CHART_CONFIG: Readonly<ChartConfig> = Object.freeze({
  type: 'line',
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        border: {
          dash: [2],
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#4f4f4f',
          autoSkip: true,
          maxRotation: 0,
          callback: function (value: unknown, idx: number, values: any[]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const label = (this as any).getLabelForValue(value)
            return label
          },
        },
      },
      y: {
        border: {
          dash: [2],
        },
        grid: {
          color: '#4f4f4f',
        },
        ticks: {
          color: '#4f4f4f',
          stepSize: 50,
        },
      },
    },
  },
  data: {
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: '#00ff00',
        pointBackgroundColor: '#00ff00',
        pointRadius: 3,
        data: [],
      },
    ],
  },
})
