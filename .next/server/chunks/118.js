"use strict";
exports.id = 118;
exports.ids = [118];
exports.modules = {

/***/ 105:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "wI": () => (/* binding */ AppProvider),
  "bp": () => (/* binding */ useAppContext)
});

// UNUSED EXPORTS: appContext

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "web3"
var external_web3_ = __webpack_require__(519);
;// CONCATENATED MODULE: ./utils/Lottery.json
const Lottery_namespaceObject = JSON.parse('{"Mt":[{"inputs":[{"internalType":"uint64","name":"subscriptionId","type":"uint64"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"have","type":"address"},{"internalType":"address","name":"want","type":"address"}],"name":"OnlyCoordinatorCanFulfill","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"requestId","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"randomWords","type":"uint256[]"}],"name":"RequestFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"requestId","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"numWords","type":"uint32"}],"name":"RequestSent","type":"event"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRequestId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomResult","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"uint256[]","name":"randomWords","type":"uint256[]"}],"name":"rawFulfillRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"requestIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"s_requests","outputs":[{"internalType":"bool","name":"fulfilled","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"}],"name":"getRequestStatus","outputs":[{"internalType":"bool","name":"fulfilled","type":"bool"},{"internalType":"uint256[]","name":"randomWords","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enter","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getPlayers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLotteryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pickWinner","outputs":[{"internalType":"uint256","name":"requestId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getWinners","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"}]}');
;// CONCATENATED MODULE: ./utils/constants.js
// For Development
// import abi from '../backend/build/Lottery.json'

// export const contractAddress = '0x4C94De44E875DD83EA5e54112478372127eabb35'
const constants_contractAddress = "0x07A7deD72bf7dd2ad1fB7Ec771A138103e8dCab2";
// 0x4C94De44E875DD83EA5e54112478372127eabb35
const constants_contractABI = Lottery_namespaceObject.Mt;

;// CONCATENATED MODULE: ./utils/lotteryContract.js

const createLotteryContract = (web3)=>{
    return new web3.eth.Contract(contractABI, contractAddress);
};
/* harmony default export */ const lotteryContract = ((/* unused pure expression or super */ null && (createLotteryContract)));

;// CONCATENATED MODULE: ./context/context.js




const appContext = /*#__PURE__*/ (0,external_react_.createContext)();
const AppProvider = ({ children  })=>{
    const { 0: address , 1: setAddress  } = (0,external_react_.useState)("");
    const { 0: web3 , 1: setWeb3  } = (0,external_react_.useState)();
    const { 0: lotteryContract , 1: setLotteryContract  } = (0,external_react_.useState)();
    const { 0: lotteryPot , 1: setLotteryPot  } = (0,external_react_.useState)("0 ETH");
    const { 0: lotteryPlayers , 1: setLotteryPlayers  } = (0,external_react_.useState)([]);
    const { 0: lastWinner , 1: setLastWinner  } = (0,external_react_.useState)([]);
    const { 0: lotteryId , 1: setLotteryId  } = (0,external_react_.useState)();
    const owner = "0xFb8A628c94fA45A1354A2abD1049d2843Ea28CbC";
    (0,external_react_.useEffect)(()=>{
        updateLottery();
        connectWallet();
    }, [
        lotteryContract
    ]);
    //Update the lottery Card
    const updateLottery = async ()=>{
        if (lotteryContract) {
            const pot = await lotteryContract.methods.getBalance().call();
            setLotteryPot(web3.utils.fromWei(pot, "ether") + " ETH");
            setLotteryId(await lotteryContract.methods.lotteryId().call());
            setLotteryPlayers(await lotteryContract.methods.getPlayers().call());
            console.log(lotteryPlayers);
            setLastWinner(await lotteryContract.methods.getWinners().call());
            console.log([
                ...lastWinner
            ], "Last Winners");
        }
    };
    const connectWallet = async ()=>{
        if (false) {} else {
            console.log("Please install Metamask");
        }
    };
    const enterLottery = async ()=>{
        try {
            await lotteryContract.methods.enter().send({
                from: address,
                value: web3.utils.toWei("0.0001", "ether"),
                gas: 3000000,
                gasPrice: null
            });
        } catch (error) {
            console.log(error);
        }
    };
    const pickWinner = async ()=>{
        try {
            let tx = await lotteryContract.methods.pickWinner().send({
                from: address,
                gas: 3000000,
                gasPrice: null
            });
            console.log(tx);
            updateLottery();
        } catch (err) {
            console.log(err, "pick Winner");
        }
    };
    const payWinner = async ()=>{
        try {
            let tx = await lotteryContract.methods.payWinner().send({
                from: address,
                gas: 3000000,
                gasPrice: null
            });
            console.log(tx);
            updateLottery();
        } catch (err) {
            console.log(err, "pay Winner");
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(appContext.Provider, {
        value: {
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
        },
        children: children
    });
};
const useAppContext = ()=>{
    return (0,external_react_.useContext)(appContext);
};


/***/ })

};
;