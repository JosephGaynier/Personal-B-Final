import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';

var barChartData = {
  datasets: [
    {
      label: "Projected",
      data: [],
      backgroundColor: "#0000FF"
    },
    {
      label: "Actual",
      data: [],
      backgroundColor: "#008000"
    }
  ],
  labels: [],
};

export function calculateTotals(responseData) {
  var totalBudget = 0;
  var totalExpense = 0;
  responseData.forEach(data => {
    totalBudget += data.budget;
    totalExpense += data.actualExpense;
  });
  var results = document.getElementById("results");
  results.innerHTML = `Projected Budget: ${totalBudget}. Total Expenses: ${totalExpense}`;
}
  
export function createDoughnutChart(responseData, isForActual) {
  var circleChartData = {
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  };
  for (var i = 0; i < responseData.length; i++) {
    circleChartData.datasets[0].data[i] = responseData[i].budget ?? 0;
    circleChartData.datasets[0].backgroundColor[i] = responseData[i].backgroundColor;
    circleChartData.labels[i] = responseData[i].label;
  }
  var chartId = isForActual ? "doughnutChartActual" : "doughnutChartProjected";
  
  var ctx = document.getElementById(chartId).getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: circleChartData,
  });
}
  
export function createPieChart(responseData, isForActual) {
  var circleChartData = {
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  };
  for (var i = 0; i < responseData.length; i++) {
    circleChartData.datasets[0].data[i] = responseData[i].budget ?? 0;
    circleChartData.datasets[0].backgroundColor[i] = responseData[i].backgroundColor;
    circleChartData.labels[i] = responseData[i].label;
  }
  var chartId = isForActual === true ? "pieChartActual" : "pieChartProjected";
  var ctx = document.getElementById(chartId).getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: circleChartData,
  });
}
  
export function createBarChart(responseData) {
  for (var i = 0; i < responseData.length; i++) {
    barChartData.datasets[0].data[i] = responseData[i].budget;
    barChartData.datasets[1].data[i] = responseData[i].actualExpense;
    barChartData.labels[i] = responseData[i].label;
  }
  var options = {
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true   // minimum value will be 0.
            }
        }]
    }
  };  
  var ctx = document.getElementById("barChart").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options
  });
}

export async function getBudget() {
  const userId = parseInt(localStorage.getItem('userId'));
  const localData = { userId };
  const token = localStorage.getItem('jwt');
  var results;
  await axios.post("http://localhost:3000/budget/get", localData, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then(res => {
    results = res.data.results;
  });
  return results;
}

export async function getActualExpenses() {
  const userId = parseInt(localStorage.getItem('userId'));
  const data = { userId };
  const token = localStorage.getItem('jwt');
  var results;
  await axios.post('http://personal-budget-final-ednzw.ondigitalocean.app/personal-b-final-server:8080/actual/get', data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    results = res.data.results;
  });
  return results;
}

export async function getBudgetsWithoutActualExpenses() {
  const userId = parseInt(localStorage.getItem('userId'));
  const data = { userId };
  const token = localStorage.getItem('jwt');
  var results;
  await axios.post('http://personal-budget-final-ednzw.ondigitalocean.app/personal-b-final-server:8080/actual/get/unused', data, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    results = res.data.results;
  });
  return results;
}
  
export default function GetBudgetAndCharts() {
  getBudget().then(res => {
    createPieChart(res, false);
    createDoughnutChart(res, false);
    createBarChart(res);
    calculateTotals(res);
  });
  getActualExpenses().then(res => {
    createPieChart(res, true);
    createDoughnutChart(res, true);
  });
  return (
    <React.Fragment>
      <div className="text-box">
        <h1>Budget Stats</h1>
        <p id="results"></p>
      </div>

      <div className="text-box">
          <h1>Projected Budget</h1>
          <p><canvas id="pieChartProjected" width="400" height="400"></canvas></p>
      </div>

      <div className="text-box">
          <h1>Actual Budget</h1>
          <p><canvas id="pieChartActual" width="400" height="400"></canvas></p>
      </div>

      <div className="text-box">
          <p><canvas id="doughnutChartProjected" width="400" height="400"></canvas></p>
      </div>

      <div className="text-box">
          <p><canvas id="doughnutChartActual" width="400" height="400"></canvas></p>
      </div>
      
      <div className="text-box">
          <h1>Bar Chart</h1>
          <p><canvas id="barChart" width="400" height="400"></canvas></p>
      </div>
    </React.Fragment>
  );
}