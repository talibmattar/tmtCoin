const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index,timestamp, data, previousHash ='') {
        //index - where it sits on the chain
        //timestamp - when it gets created
        //data - information relating to the blcok
        //previousHash - string in the previous block

        this. index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calcHash();
    }

    calcHash () {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0,"01/01/2021", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calcHash();
        this.chain.push(newBlock);
    }

    iscChainValid () {
        for (let i=1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if (currBlock.hash != currBlock.calcHash()) {
                return false;
            }

            if (currBlock.previousHash != prevBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let tmtCoin = new Blockchain ();
tmtCoin.addBlock(new Block(1,"10/02/2021", {amount:4}));
tmtCoin.addBlock(new Block (2,"2/03/2021", {amount:10}));

console.log(JSON.stringify(tmtCoin,null, 4));
console.log('Is blockchain valid? ' + tmtCoin.iscChainValid())

tmtCoin.chain[1].data = {amount:1000};
tmtCoin.chain[1].hash = tmtCoin.chain[1].calcHash();
console.log(JSON.stringify(tmtCoin,null,4));
console.log('Is blockchain valid? ' + tmtCoin.iscChainValid())