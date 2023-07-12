import './index.css'

const TransactionItem = props => {
  const {eachLog, removeLog} = props
  const {id, title, amount, displayText} = eachLog

  const onRemovingLog = () => {
    removeLog(id)
  }

  return (
    <li className="table-raw">
      <p className="table-column-cell">{title}</p>
      <p className="table-column-cell">Rs {amount}</p>
      <p className="table-column-cell">{displayText}</p>
      <button
        className="delete-button"
        type="button"
        onClick={onRemovingLog}
        data-testid="delete"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
