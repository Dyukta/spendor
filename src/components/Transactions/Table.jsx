import Row from './Row'
import Empty from './Empty'

export default function Table({ transactions, canEdit, onEdit, onDelete }) {
  return (
    <div className="surface">
      <table className="table">
        <thead>
          <tr>
            <th className="th">Date</th>
            <th className="th">Desc</th>
            <th className="th">Category</th>
            <th className="th">Type</th>
            <th className="th td-right">Amount</th>
            {canEdit && <th />}
          </tr>
        </thead>

        <tbody>
          {transactions.length
            ? transactions.map(t => (
                <Row key={t.id} txn={t} {...{ canEdit, onEdit, onDelete }} />
              ))
            : <Empty />}
        </tbody>
      </table>
    </div>
  )
}