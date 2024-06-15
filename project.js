//To get the deposit amount
//To get the number of lines to be beted
//Collect a bet amount
//To spin the symbols
//To declare the wining amt
//To ask wether wanted to play again or not
//hello




//To get user input from the json package
const symbol={
    A:2,
    B:3,
    C:2,
    D:9,
};
const sym_val={
    A:2,
    B:3,
    C:4,
    D:5,
};
const row=3;
const cols=3;
const prompt= require("prompt-sync")();

const deposit= ()=>{
    while(true){
    const damt = prompt("enter the amount");
    //To convert string to floating point value
    // '17.2'---> 17.2
    // 'hello'---> NaN
    const amt= parseFloat(damt);
    if(isNaN(amt) || amt<0){
        console.log("Invalid Number!! Please try again");
    }
    else{
        return amt;
    }
}}

const li= ()=>{
    while(true){
    const nolines = prompt("enter the no lines btw 1-3");
    const l= parseFloat(nolines);
    if(isNaN(l) || l<=0 || l>3){
        console.log("Invalid Number!! Please try again");
    }
    else{
        return l;
    }
}}
const bet= (amount,lines)=>{
    while(true){
    const be = prompt("enter the bet amount per line");
    const b= parseFloat(be);
    if(isNaN(b) || b<=0 || b>amount / lines){
        console.log("Invalid Number!! Please try again");
    }
    else{
        return b;
    }
}}

const spin=()=>{
    //To push the symbols inside the array
    const s=[]
    for(const[sym,count] of Object.entries(symbol)){
    for(let i =0;i<count;i++){
        s.push(sym);
    }};
    
    
    const reels=[[],[],[]];
    for(let i=0;i<cols;i++){
    //To take a copy of s(spread operator)
    const r=[...s]
    for(let j=0;j<row;j++){
        const randomindex=Math.floor(Math.random()*r.length)
        const selectedindex=r[randomindex];
        reels[i].push(selectedindex);
        r.splice(randomindex,1); }}
    return reels
}
const transpose=(reels)=>{
    const rr=[]
    for(let i=0;i<row;i++){
        rr.push([])
        for(let j=0;j<cols;j++){
            rr[i].push(reels[j][i]);
        }
    }
    return rr
}

const printrows=(rr)=>{
        for(let row of rr){
            st=''
            for(const[i,sym] of row.entries()){
                st+=sym
                if(i!=row.lenth-1){
                    st+=' | '
                }
            }
            console.log(st);
        }
}

const win=(betamt,lines,trans)=>{
    let win = 0;

    for(let row=0;row<lines;row++){
        let symbols=trans[row];
        let allsame=true;
        for(let symbol of symbols){
            if(symbol!=symbols[0]){
                allsame=false;
                break;
            }
        }
        if(allsame){
            win+=betamt*sym_val[symbols[0]];
        }
    }
    return win;
}

const game=()=>{
    //To change the amount according to the wining we have declared with let
    let amount = deposit();
    while(true){
    console.log("You have balance of : ",amount)
    const lines= li();
    const betamt=bet(amount,lines);
    amount-=betamt*lines;
    const sp=spin();
    const trans=transpose(sp);
    printrows(trans);
    const wins=win(betamt,lines,trans);
    amount+=wins;
    console.log("You won the amt of :",wins)
    if(amount<=0){
        console.log("you ran out of money");
        break
    }
    const playagain=prompt("do u wanna play again?(y/n): ");
    if(playagain!='y') break;

}
}
game();



// console.log(`The amount is ${amount}`);
// console.log(`The no of lines is ${lines}`);
// console.log(`The no of lines is ${betamt}`);
// console.log(sp);
// console.log(trans);


