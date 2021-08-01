import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: (tooltipItem, data) => {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: (value, index, values) => {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

const LineGraph = ({ casesType = "cases" }) => {
  const [data, setData] = useState({});
  const [lineColor, setLineColor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
      );
      response = await response.json();
      let chartData = buildChartData(response, casesType);

      setData(chartData);
    };

    fetchData();

    switch (casesType) {
      case "recovered":
        setLineColor(["#9de74f", "#7dd71d"]);
        break;
      case "deaths":
        setLineColor(["#b6b6b6", "#9e9e9e"]);
        break;
      default:
        setLineColor(["#ef3558", "#cc1034"]);
    }
  }, [casesType]);

  return (
    <div className="line-graph">
      {data?.length && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: lineColor[0],
                borderColor: lineColor[1],
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;
