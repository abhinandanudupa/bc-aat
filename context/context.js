import { createContext, useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import createLotteryContract from '../utils/lotteryContract'


export const appContext = createContext()

export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [web3, setWeb3] = useState();
  const [lotteryContract, setLotteryContract] = useState();
  const [lotteryPot, setLotteryPot] = useState('0 ETH');
  const [lotteryPlayers, setLotteryPlayers] = useState([]);
  const [lastWinner, setLastWinner] = useState([]);
  const [lotteryId, setLotteryId] = useState();
  const owner = '0xFb8A628c94fA45A1354A2abD1049d2843Ea28CbC';

  useEffect(() => {
    updateLottery()
    connectWallet()
  }, [lotteryContract])

  //Update the lottery Card
  const updateLottery = async () => {
    if (lotteryContract) {
      const pot = await lotteryContract.methods.getBalance().call()
      setLotteryPot(web3.utils.fromWei(pot, 'ether') + ' ETH')

      setLotteryId(await lotteryContract.methods.lotteryId().call())

      setLotteryPlayers(await lotteryContract.methods.getPlayers().call())

      console.log(lotteryPlayers)
      setLastWinner(await lotteryContract.methods.getWinners().call())
      console.log([...lastWinner], 'Last Winners')
    }
  }

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0])
        setLotteryContract(createLotteryContract(web3))
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts()
          setAddress(accounts[0])
        })
      } catch (error) {
        console.log(error, 'connect wallet');
      }
    } else {
      console.log('Please install Metamask')
    }
  }

  const enterLottery = async () => {
    try {
      await lotteryContract.methods.enter().send({
        from: address,
        value: web3.utils.toWei('0.0001', 'ether'),
        gas: 3000000,
        gasPrice: null,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const pickWinner = async () => {
    try {
      let tx = await lotteryContract.methods.pickWinner().send({
        from: address,
        gas: 3000000,
        gasPrice: null,
      })

      console.log(tx)
      updateLottery()
    } catch (err) {
      console.log(err, 'pick Winner')
    }
  }

  const payWinner =  async () => {
    try {
      let tx = await lotteryContract.methods.payWinner().send({
        from: address,
        gas: 3000000,
        gasPrice: null,
      })

      console.log(tx)
      updateLottery()
    } catch (err) {
      console.log(err, 'pay Winner')
    }
  }

  return <appContext.Provider value={{
    connectWallet,
    address,
    enterLottery,
    lotteryPot,
    lotteryId,
    lotteryPlayers,
    pickWinner,
    lastWinner,
    payWinner,
    owner
  }}>{children}</appContext.Provider>
}

export const useAppContext = () => {
  return useContext(appContext)
}
