import { Download } from 'lucide-react'
import { useExport } from '../../hooks/useExport'

export default function ExportBtn() {
  const { exportCSV, exportJSON } = useExport()
  return (
    <>
      <button className="btn-ghost" onClick={exportCSV}><Download size={13} />CSV</button>
      <button className="btn-ghost" onClick={exportJSON}><Download size={13} />JSON</button>
    </>
  )
}