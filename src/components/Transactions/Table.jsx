import Row from './Row'
import Empty from './Empty'

export default function Table({ transactions, canEdit, onEdit, onDelete }) {
  return (
    <div className="surface" style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th className="th">Date</th>
            <th className="th">Description</th>
            <th className="th">Category</th>
            <th className="th">Type</th>
            <th className="th td-right">Amount</th>
            {canEdit && <th className="th" />}
          </tr>
        </thead>
        <tbody>
          {transactions.length
            ? transactions.map(t => (
                <Row key={t.id} txn={t} canEdit={canEdit} onEdit={onEdit} onDelete={onDelete} />
              ))
            : <Empty />}
        </tbody>
      </table>
    </div>
  )
}