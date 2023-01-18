import { hourly } from "../../features/Weather/interface/weather";

export function convertTemperatureToTable(hourly: hourly, startFrom: number = 0) {
  const arrayToTable: [[string | number, string | number]] = [
    ["Year", "Temperature"],
    // here goes all the temperature in format [hour, value]
  ];
  for (let i = startFrom; i < startFrom + 24; i += 1) {
    const pair: [string, number] = [
      hourly.time[i].slice(hourly.time[i].length - 5),
      // hourly.time[i],
      hourly.temperature_2m[i],
    ];
    arrayToTable.push(pair);
  }

  return arrayToTable;

  // drawChart(arrayToTable);
}

export function drawChart(arrayToTable: any) {
  google.charts.load("current", {
    packages: ["corechart"],
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(arrayToTable);

    // var options: google.visualization.LineChartOptions = {
    //   title: "Temperature Chart",
    //   curveType: "function",
    //   legend: "none",
    //   backgroundColor: '#212529',
    //   chartArea: {
    //     width: '100%'
    //   },

    // };

    var options: google.visualization.LineChartOptions = {
      hAxis: {
        titleTextStyle: { color: "#607d8b" },
        gridlines: { count: 0 },
        textStyle: { color: "#b0bec5", fontName: "Roboto", fontSize: 12, bold: true },
      },
      vAxis: {
        minValue: 0,
        gridlines: { color: "#37474f", count: 4 },
        baselineColor: "transparent",
      },
      legend: {
        position: "top",
        alignment: "center",
        textStyle: { color: "#607d8b", fontName: "Roboto", fontSize: 12 },
      },
      colors: ["#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39"],
      // areaOpacity: '0.24',
      lineWidth: 1,
      backgroundColor: "transparent",
      chartArea: {
        backgroundColor: "transparent",
        width: "100%",
        height: "80%",
      },
      height: 200, // example height, to make the demo charts equal size
      width: window.innerWidth * 0.7,
      // pieSliceBorderColor: "#263238",
      // pieSliceTextStyle: { color: "#607d8b" },
      // pieHole: 0.9,
      // bar: { groupWidth: "40" },
      // colorAxis: { colors: ["#3f51b5", "#2196f3", "#03a9f4", "#00bcd4"] },
      // backgroundColor: "transparent",
      // datalessRegionColor: "#37474f",
      // displayMode: "regions",
    };

    var chart = new google.visualization.LineChart(document.getElementById("curve_chart") as Element);

    chart.draw(data, options);
  }
}
