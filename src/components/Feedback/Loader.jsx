export default function Loader({ size = 24 }) {
  return (
    <div className="flex" style={{ justifyContent:'center', padding:40 }}>
      <span className="spinner" style={{ width:size, height:size }} />
    </div>
  )
}