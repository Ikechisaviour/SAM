function unlock(){
  personal.unlockAccount(eth.coinbase, "", 0)
}

unlock()

function trans() {
  a = 0.00001
  a1 = "0xb12dceaed05b4dffa5518aabf936ef461f44616e"
  // a2 = "0x0485f5b26c14119faea4724e467b3dbfa71e477c" 
  // a3 = "0x6f24ea2965832f2cabe8d72eeeeb521d54bcc72f"
  // a4 = "0x8c766eadc947909f827557c6fd1d483c04eea6e4" 
  // a5 = "0x93d852185042bdfddd7324e3733ab2ec2c774b04"

  
  
  eth.sendTransaction({from: eth.coinbase, to: a1, value: web3.toWei(a, "ether")});
  // eth.sendTransaction({from: eth.coinbase, to: a2, value: web3.toWei(a, "ether")});
  // eth.sendTransaction({from: eth.coinbase, to: a3, value: web3.toWei(a, "ether")});
  // eth.sendTransaction({from: eth.coinbase, to: a4, value: web3.toWei(a, "ether")});
  // eth.sendTransaction({from: eth.coinbase, to: a5, value: web3.toWei(a, "ether")});
      
}

function loop(b){

  var z = eth.blockNumber;
  var c = b-1
  var time1 = new Date().getTime(); //sending start time

  for (i = 0; i < b; i++){
    if ((b-i) <= c && z != eth.blockNumber){ 
      var time4 = new Date().getTime(); //mining start time
    }
    trans()
    //console.log(i, "sent");
  }
  var time8 = new Date().getTime(); //mining start time

  while(z === eth.blockNumber){
    //wait
  }
  var time7 = new Date().getTime(); //mining start time

  var time2 = new Date().getTime(); //sending end time
  var St = time8 - time1;
  console.log( b + ' transaction(s) sent')

  while(txpool.status.pending != 0){
    // Do nothing
    miner.start()
    console.log(txpool.status.pending)
  }
  var y = eth.blockNumber - z;

  var time3 = new Date().getTime(); // mining stop time
  var Tt = time3 - time1;
  var Mt1 = time3 - time4;
  var Mt2 = time3 - time7;
  var Md1 = time4 - time1;
  var Md2 = time7 - time1;
  var Dsm1 = time7 - time8;
  var Dsm2 = time4 - time8;

  console.log(St + 'ms is (St) send time')  
  console.log(Md1 + 'ms is 1st (Md) mining delay')
  console.log(Md2 + 'ms is 2nd (Md) mining delay')
  console.log(Dsm2 + 'ms is 1st (Dsm) delay time after Send but before mining')  
  console.log(Dsm1 + 'ms is 2st (Dsm) delay time after Send but before mining')  
  console.log(Mt1 + 'ms is 1st (Mt) mining time')
  console.log(Mt2 + 'ms is 2nd (Mt) mining time')
  console.log(Tt + 'ms is (Tt) total time')
  console.log(y + ' is the number of mined blocks')

  
}


function mine() {
  // var start = new Date().getTime();

//console.log(eth.getBlock("pending").transactions.length);

  //}

  status = 1;
  while(status){
   
    if (txpool.status.pending > 0 && status==1) {
      miner.start();
      status = status+1;
    } else if(txpool.status.pending == 0) {
      miner.stop();
      status=0
    mine();
  // console.log("Transaction(s) successful!!!");
  // var end = new Date().getTime();
  // var time = end - start;
  // console.log(time)
    }
  }
}

// nTime / nInter = Number of transactions - 1
// E.g 1000 / 2000 = 5 - 1 (4 transactions will be sent)


function delayTransaction(nTime) {
  var timerID = setInterval(function() {
    var result = eth.sendTransaction({from: eth.coinbase, to: "0x535d15249f33ce5c834e6c7f1f69831da4ca485d", value: web3.toWei(0, "ether")});
    console.log("Transaction with ID: " + result + " sent");
  }, 2000);

  setTimeout(function() {
    clearInterval(timerID);
    console.log("Stopped Sending Transaction");
  }, nTime * 2000);
}




// function delayedTrans(g){
//   // console.log(g * 1000);
//   // var a = setTimeout(d,1000);
//   // for (var i = 0; i < g; i++){
//   // //   setTimeout(console.log("hello"), g*1000);
//   //   // console.log(setTimeout("hello!!",g*1000));
//   //   a
//   // }
//   for(var i = 0; i < g; i++) {
//     // console.log("####################################")
//     // setTimeout(makeTrans(), 5000);
//     setTimeout(function() {
//       var result = eth.sendTransaction({from: eth.coinbase, to: "0x535d15249f33ce5c834e6c7f1f69831da4ca485d", value: web3.toWei(0, "ether")});
//       console.log("#########  " + result);
//     }, 1000);
   
//   }
  

// }


var mining_threads = 1

function sam() {

  
    if (txpool.status.pending > 0) {
        if (eth.mining) return;

        //console.log("== Pending transactions! Mining...");
        miner.start();
    } else {
        miner.stop();  // This param means nothing
        //console.log("== No transactions! Mining stopped.");

    }
}


eth.filter("latest", function(err, block) { sam(); });
eth.filter("pending", function(err, block) { sam(); });

sam();




