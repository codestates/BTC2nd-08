const fs = require('fs');
const path = require('path');
const basePath = '/Users/nahyun/Desktop/daemon/hyunsDaemon';
const solanaWeb3 = require('@solana/web3.js');

//솔라나 devnet connect
const establishConnection = async () =>{
 rpcUrl="https://api.devnet.solana.com";
 connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');   
 console.log("devnet connected..")
}

// 가장 마지막에 확인한 블록번호 조회
const checkedBlockNum = Number(
	fs.readFileSync(path.join(basePath, '/utils/blockNumber'), {
		encoding: 'utf-8',
	}),
);

const contractAddress = fs.readFileSync(
	path.join(basePath, '/utils/deployedAddress'),
	{
		encoding: 'utf-8',
	},
);


const getTx = async (tx) => await connection.getTransaction(tx+"");

const allTransactions = [];
let lastest = checkedBlockNum;

module.exports = {
    getLastestTransactions: async () => {
	stablishConnection();

	try {
		// 최신 블록번호가 마지막에 확인한 블록번호보다 크다면,
		// 그 차이만큼 블록을 조회하기 위해 범위 업데이트
        const slot = await connection.getEpochInfo();

        if(slot.absoluteSlot > lastest){
            console.log(lastest);
            lastest = slot.absoluteSlot;
        }
        console.log(lastest);

		if (checkedBlockNum === lastest) {
			return [];
		} else {
			//가장 마지막에 확인한 블록의 다음 블록부터 가장 최신 블록까지의 모든 트랜잭션 조회
			for (let i = checkedBlockNum + 1; i <= lastest; i++) {
				const block = await connection.getBlock(i);
                // signature로 모든 트랜잭션 조회
                    block.transactions.forEach((item) => {
                        allTransactions.push(getTx(item.transaction.signatures));
                      });
                                      
			}
			//모든 트랜잭션 중에서 Hyun's wallet에서 생성된 트랜잭션을 배열로 리턴
			return Promise.all(allTransactions)
				.then((data) => {
					const result = [];
					for (let tx of data) {
                        const accountlist = tx.transaction.message.accountKeys;
                        for(let i=0; i<=accountlist.length; i++){
                            if (accountlist[i] === contractAddress) {
                                result.push(tx);
                            }    
                        }
					}
					return result;
				})
				.then((data) => {
					// 가장 마지막에 확인한 블록번호 저장
					fs.writeFileSync(
						path.join(basePath, '/utils/blockNumber'),
						String(lastest),
					);
					return data;
				});
            }
			console.info('sucess');
	} catch (err) {
		console.log("err:"+err);
	}
},
};
