import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    historyLog: [],
  }

  getMoneyDetailsObj = () => {
    const {balance, income, expenses} = this.state

    const moneyDetails = {
      balance,
      income,
      expenses,
    }
    return moneyDetails
  }

  onTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onAmountInput = event => {
    this.setState({amount: event.target.value})
  }

  onTypeChange = event => {
    this.setState({type: event.target.value})
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {title, amount, type, balance} = this.state

    // Parsing the amount to a number
    const parsedAmount = parseInt(amount)

    // If alphabets entered in the amount input
    if (!Number.isInteger(parsedAmount)) {
      this.setState({
        type: 'INCOME',
        title: '',
        amount: '',
      })
      return
    }

    // If the expense amount is higher than the current balance
    if (type === 'EXPENSES' && parsedAmount > balance) {
      this.setState({
        type: 'INCOME',
        title: '',
        amount: '',
      })
      return
    }

    // If title or amount field is empty
    if (title === '' || amount === '') {
      this.setState({
        title: '',
        amount: '',
      })
      return
    }
    // Finding activeOption to get displayText
    const activeOption = transactionTypeOptions.find(
      eachOption => eachOption.optionId === type,
    )
    const {displayText} = activeOption

    const newHistory = {
      id: v4(),
      title,
      amount: parsedAmount, // Use the parsed amount
      displayText,
      type,
    }

    this.setState(prevState => ({
      historyLog: [...prevState.historyLog, newHistory],
      balance:
        type === 'INCOME'
          ? prevState.balance + parsedAmount
          : prevState.balance - parsedAmount,
      income:
        type === 'INCOME' ? prevState.income + parsedAmount : prevState.income,
      expenses:
        type === 'EXPENSES'
          ? prevState.expenses + parsedAmount
          : prevState.expenses,
      title: '',
      amount: '',
      type: 'INCOME',
    }))
  }

  removeLog = id => {
    const {historyLog} = this.state
    const logToBeRemoved = historyLog.find(eachLog => eachLog.id === id)
    const {type, amount} = logToBeRemoved
    console.log(logToBeRemoved)

    if (type === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income - amount,
        balance: prevState.balance - amount,
      }))
    }

    if (type === 'EXPENSES') {
      this.setState(prevState => ({
        expenses: prevState.expenses - amount,
        balance: prevState.balance + amount,
      }))
    }

    this.setState(prevState => ({
      historyLog: prevState.historyLog.filter(eachLog => eachLog.id !== id),
    }))
  }

  render() {
    const {title, amount, type, historyLog} = this.state

    return (
      <div className="app-container">
        <div className="app-card">
          <div className="money-manager-card">
            <h1 className="username">Hi, Richard</h1>
            <p className="welcome-text">
              Welcome back to your{' '}
              <span className="money-manager-text">Money Manager</span>
            </p>
          </div>
          <MoneyDetails moneyDetailsObj={this.getMoneyDetailsObj()} />
          <div className="form-history-container">
            <form onSubmit={this.onFormSubmit}>
              <h1 className="transaction-heading">Add Transaction</h1>
              <label htmlFor="titleInput" className="label-text">
                TITLE
              </label>
              <input
                id="titleInput"
                placeholder="TITLE"
                className="input"
                type="text"
                onChange={this.onTitleInput}
                value={title}
              />
              <label htmlFor="amountInput" className="label-text">
                AMOUNT
              </label>
              <input
                id="amountInput"
                placeholder="AMOUNT"
                className="input"
                type="text"
                onChange={this.onAmountInput}
                value={amount}
              />
              <label htmlFor="optionId" className="label-text">
                TYPE
              </label>
              <select
                id="optionId"
                className="input"
                type="text"
                onChange={this.onTypeChange}
                value={type}
              >
                {transactionTypeOptions.map(eachTransactionType => (
                  <option
                    key={eachTransactionType.optionId}
                    value={eachTransactionType.optionId}
                  >
                    {eachTransactionType.displayText}
                  </option>
                ))}
              </select>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <ul className="history-table">
                <li className="table-header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                </li>
                {historyLog.map(eachLog => (
                  <TransactionItem
                    key={eachLog.id}
                    eachLog={eachLog}
                    removeLog={this.removeLog}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
