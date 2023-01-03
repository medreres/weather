import { hourly } from "./../interfaces/weather";
export function drawChart24Hour(hourly: hourly, startFrom: number = 0) {
  const arrayToTable = [
    ["Year", "Temperature"],
    // here goes all the temperature in format [hour, value]
  ];
  for (let i = startFrom; i < startFrom + 24; i += 1) {
    const pair = [
      hourly.time[i].slice(hourly.time[i].length - 5),
      // hourly.time[i],
      hourly.temperature_2m[i],
    ];
    arrayToTable.push(pair);
  }

  drawChart(arrayToTable);
}

function drawChart(arrayToTable) {
  google.charts.load("current", {
    packages: ["corechart"],
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(arrayToTable);

    var options = {
      title: "Temperature Chart",
      curveType: "function",
      legend: "none",
      chartArea: {
        // width: '100%'
      },
    };

    var chart = new google.visualization.LineChart(
      document.getElementById("curve_chart")
    );

    chart.draw(data, options);
  }
}
