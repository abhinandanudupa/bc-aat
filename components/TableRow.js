import style from '../styles/TableRow.module.css'
import truncateEthAddress from 'truncate-eth-address'
const TableRow = ({ player }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.address}>{truncateEthAddress(player)}</div>
      <div className={style.ethAmount}>
        <span className={style.goldAccent}>+0.0001 ETH</span>
      </div>
    </div>
  )
}
export default TableRow
