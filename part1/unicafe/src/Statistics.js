import {
  calculatePercentage,
  calculateAverage,
  getTotal,
  roundToOneDecimal,
} from "./utils";

const definePoints = (points) => (values) => {
  let scoreSum = 0;
  for (const key in values) {
    scoreSum += values[key] * points[key];
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

  const getScore = definePoints({
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
            value={roundToOneDecimal(
              calculateAverage(getScore({ good, neutral, bad }), total)
            )}
          />
          <StatisticLine
            text="positive"
            value={`${roundToOneDecimal(calculatePercentage(good, total))} %`}
          />
        </tbody>
      </table>
    </section>
  );
};
