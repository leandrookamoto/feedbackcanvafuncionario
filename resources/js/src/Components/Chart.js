import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function Chart({ data }) {
  return (
    <section style={{ height: '500px', width: '100%' }}>
      <Line data={data} />
    </section>
  );
}
