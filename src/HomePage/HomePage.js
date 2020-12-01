import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';

var data = {
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
  labels: [],
};

function createDoughnutChart() {
  var ctx = document.getElementById("doughnutChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: data,
  });
}

function createPieChart() {
  var ctx = document.getElementById("pieChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: data,
  });
}

function createBarChart() {
  new Chart(document.getElementById("barChart").getContext("2d"), {
    type: 'bar',
    data: data,
  });
}

function getBudget() {
  const userId = parseInt(localStorage.getItem('userId'));
  const localData = { userId };
  axios.post("http://localhost:3000/budget", localData).then(function (res) {
    for (var i = 0; i < res.data.length; i++) {
      data.datasets[0].data[i] = res.data[i].budget;
      data.datasets[0].backgroundColor[i] = res.data[i].backgroundColor;
      data.labels[i] = res.data[i].label;
    }
    if (res.data.length > 0) {
      createDoughnutChart();
      createPieChart();
      createBarChart();
    }
  });
}


function HomePage() {
  getBudget();
  return (
    <div id="main" className="container center">
      <div className="page-area">
        <div className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </div>

        <div className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </div>

        <div className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </div>

        <div className="text-box">
          <h1>Free</h1>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </div>

        <div className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </div>

        <div className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </div>

        <div className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </div>

        <div className="text-box">
          <h1>Pie Chart</h1>
          <p><canvas id="pieChart" width="400" height="400"></canvas></p>
        </div>

        <div className="text-box">
          <h1>Doughnut Chart</h1>
          <p><canvas id="doughnutChart" width="400" height="400"></canvas></p>
        </div>

        <div className="text-box">
          <h1>Bar Chart</h1>
          <p><canvas id="barChart" width="400" height="400"></canvas></p>
        </div>

      </div>
    </div>
  );
}

export default HomePage;