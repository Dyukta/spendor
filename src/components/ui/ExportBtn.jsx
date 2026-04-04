import { Download } from 'lucide-react'
import { useExport } from '../../hooks/useExport'

export default function ExportBtn() {
  const { exportCSV, exportJSON } = useExport()

  return (
    <div className="flex">
      <button className="btn" onClick={exportCSV}><Download size={13}/> CSV</button>
      <button className="btn" onClick={exportJSON}><Download size={13}/> JSON</button>
    </div>
  )
}