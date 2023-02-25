function log(msg){
    console.log(msg);
}

var number = new Array();
number = [36.46,20.06,25.45,30.46,14.54,21.09,20.56,19.29,18.18,21.84];

var number2 = number.map((n)=>{
        return n;
    }).reduce((a,n)=>{
        return n +a;
});

function s(n){
    t=0
    for(var i=0;i<number.length;i++){
        t+=1;
    }
    return t;
}
log(number2/s(number));

