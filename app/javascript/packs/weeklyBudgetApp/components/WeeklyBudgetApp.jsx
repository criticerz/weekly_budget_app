import React from 'react';

class WeeklyBudgetApp extends React.Component {

  state = {
    accounts: {},
    transactions: [],
  }

  componentWillMount() {

    $.get('/transactions', (data) => {
      if (data.error != null) {
        console.log("ERROR", data.error);
      } else {

        var { accounts, transactions } = data

        accounts = accounts.reduce((map, obj) => {
          map[obj.account_id] = obj;
          return map
        }, {})

        this.setState({
          accounts: accounts,
          transactions: transactions,
        })

        console.log("SUCCESS", data)
      }
    });

  }

  getTotalSpent() {

    let { transactions } = this.state
    var sum = 0

    transactions.forEach((transaction) => {
      if( transaction.amount > 0 )
        sum += transaction.amount
    })
    
    return sum.toFixed(2)
  }

  render() {
    return(
      <div className="container">

        <div className="row">
          <div className="col-xs-12" style={{ margin: '20px 0' }}>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">${this.getTotalSpent()}</h5>
                <p className="card-text">Total spent</p>
              </div>
            </div>

          </div>

          <div className="col-xs-12">

            <table className="table table-bordered table-striped table-sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Account</th>
                  <th>Transaction</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {this.state.transactions.map((transaction) => {
                  return (
                    <tr key={transaction.transaction_id}>
                      <td>{transaction.date}</td>
                      <td>{this.state.accounts[transaction.account_id].name}</td>
                      <td>{transaction.name}</td>
                      <td>${transaction.amount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

          </div>

        </div>
  
      </div>
    )
  }
}
export default WeeklyBudgetApp