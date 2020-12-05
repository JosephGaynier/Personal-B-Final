import React from 'react';
import axios from 'axios';
import { getBudget, getActualExpenses, getBudgetsWithoutActualExpenses } from '../Visuals/Visuals';
import history from '../history';


export default class EditBudgetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBudgetItems: [],
      completeBudgetItems: [],
      incompleteBudgetItems: [],
    };
  }
  
  async componentDidMount() {
    this.authorize();
    getBudget(false).then(var1 => {
      getActualExpenses().then(var2 => {
        getBudgetsWithoutActualExpenses().then(var3 => {
          this.setState({
            allBudgetItems: var1,
            completeBudgetItems: var2,
            incompleteBudgetItems: var3,
          });
        })
      })
    });
  }

  addToBudget(category, budget) {
    const userId = localStorage.getItem('userId');
    const colorCode = this.generateRandomColor();
    const data = {
      category,
      budget,
      colorCode,
      userId
    };
    const token = localStorage.getItem('jwt');
    axios.post('https://personal-b-final-jazug.ondigitalocean.app/budget/add', data, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      if (res && res.data.success) {
        getBudget(false).then(var1 => {
          getActualExpenses().then(var2 => {
            getBudgetsWithoutActualExpenses().then(var3 => {
              this.setState({
                allBudgetItems: var1,
                completeBudgetItems: var2,
                incompleteBudgetItems: var3,
              });
              
            })
          })
        });
      }
    });
    document.getElementById('category').value = '';
    document.getElementById('budget').value = '';
  }

  addActualExpense(personalBudgetId, actualExpense) {
    const colorCode = this.generateRandomColor();
    const userId = parseInt(localStorage.getItem('userId'));
    const data = {
      actualExpense,
      personalBudgetId,
      colorCode,
      userId
    };
    const token = localStorage.getItem('jwt');
    axios.post('https://personal-b-final-jazug.ondigitalocean.app/actual/add', data, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      if (res && res.data.success) {
        document.getElementById(personalBudgetId).value = '';
        getBudget(false).then(var1 => {
          getActualExpenses().then(var2 => {
            getBudgetsWithoutActualExpenses().then(var3 => {
              this.setState({
                allBudgetItems: var1,
                completeBudgetItems: var2,
                incompleteBudgetItems: var3,
              });
            })
          })
        });
      }
    });
  }

  generateRandomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
  }

  authorize() {
    const token = localStorage.getItem('jwt');
    axios.get('https://personal-b-final-jazug.ondigitalocean.app/authorize', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).catch(err => {
      if (err)
        history.push('/login');
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div>
            <h1>Add Budget Category</h1>

            <div>
              <label for="category">Enter Category</label>
              <input type="text" name="category" id="category"></input>
            </div>

            <div>
              <label for="budget">Enter Projected Expense</label>
              <input type="text" name="budget" id="budget"></input>
            </div>

            <button onClick={() => this.addToBudget(document.getElementById('category').value, document.getElementById('budget').value)}>Add To Budget</button>
          </div>

          <div>
            <h1>Actual Expenses</h1>

            {this.state.incompleteBudgetItems ? this.state.incompleteBudgetItems.map((item) => (
              <div>
                <div>
                  <label for={item.id}>Enter Actual Expense for {item.label}</label>
                  <input type="text" name={item.id} id={item.id}></input>
                </div>
                <button onClick={() => this.addActualExpense(parseInt(item.id), parseInt(document.getElementById(item.id).value))}>Add To Budget</button>
              </div>
            )) : <div></div>}
          </div>
        </div>
      </React.Fragment>
    );
  }
}