import style from '../styles/PotCard.module.css'
import truncateEthAddress from 'truncate-eth-address'
import { useAppContext } from '../context/context'

const LotteryCard = () => {
  const { enterLottery, lotteryPot, lotteryId, pickWinner, lastWinner, address, payWinner, owner } = useAppContext()
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Lottery <span className={style.textAccent}>#{lotteryId ? parseInt(lotteryId) + 1: '1'}</span>
      </div>
      <div className={style.pot}>
        Pot 🍯 : <span className={style.goldAccent}>{lotteryPot}</span>
      </div>

      <div className={style.recentWinnerTitle}>🏆 Last Winner 🏆</div>
      <div className={style.winner}>
        {!lastWinner.length ? (
          <div className={style.winner}>No winner yet</div>
        ) : (
          lastWinner.length > 0 && (
            <div className={style.winner}>
              {truncateEthAddress(lastWinner[lastWinner.length - 1])}
            </div>
          )
        )}
      </div>
      {address !== owner ? (
        <div className={style.btn} onClick={enterLottery}>Enter </div>) : (<div></div>)}

      {address == owner ? (
        <div className={style.btn} onClick={pickWinner}>Pick Winner</div>) : (<div></div>)}
      
      {address == owner ? (
        <div className={style.btn} onClick={payWinner}>Pay Winner</div>) : (<div></div>)}

    </div>
  )
}
export default LotteryCard
