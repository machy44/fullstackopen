import { calculatePercentage, calculateAverage, getTotal } from "./utils";

const defineScore = (score) => (values) => {
  let scoreSum = 0;
  for (const key in values) {
    scoreSum += values[key] * score[key];
  }
  return scoreSum;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export const Statistics = ({ good, neutral, bad }) => {
  const total = getTotal(good, neutral, bad);

  const getScoreSum = defineScore({
    good: 1,
    neutral: 0,
    bad: -1,
  });

  return (
    <section>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine
            text="average"
            value={calculateAverage(
              getScoreSum({ good, neutral, bad }),
              total
            ).toFixed(1)}
          />
          <StatisticLine
            text="positive"
            value={`${calculatePercentage(good, total).toFixed(1)} %`}
          />
        </tbody>
      </table>
    </section>
  );
};
