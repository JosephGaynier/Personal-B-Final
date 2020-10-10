import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';

var data = {
  datasets: [
    {
      data: [30, 350, 90],
      backgroundColor: [
        "#ffcd56",
        "#ff6384",
        "#36a2eb",
        "#fd6b19",
        "#32CD32",
        "#800080",
        "#8B4513",
      ],
    },
  ],
  labels: ["Eat out", "Rent", "Groceries"],
};

function createChart() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
  });
}

function getBudget() {
  axios.get("http://localhost:3001/budget").then(function (res) {
    for (var i = 0; i < res.data.MyBudget.length; i++) {
      data.datasets[0].data[i] = res.data.MyBudget[i].budget;
      data.labels[i] = res.data.MyBudget[i].title;
    }
    createChart();
  });
}
getBudget();

function HomePage() {
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
          <h1>Free</h1>
          <p><canvas id="myChart" width="400" height="400"></canvas></p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;