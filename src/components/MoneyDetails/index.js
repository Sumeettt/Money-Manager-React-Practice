import './index.css'

const MoneyDetails = props => {
  const {moneyDetailsObj} = props
  const {balance, income, expenses} = moneyDetailsObj

  return (
    <div className="money-details-list-card">
      <div className="balance-card sub-card">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div>
          <p className="sub-card-heading">Your Balance</p>
          <p data-testid="balanceAmount" className="sub-card-amount">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="income-card sub-card">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div>
          <p className="sub-card-heading">Your Income</p>
          <p data-testid="incomeAmount" className="sub-card-amount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="expenses-card sub-card">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div>
          <p className="sub-card-heading">Your Expenses</p>
          <p data-testid="expensesAmount" className="sub-card-amount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
