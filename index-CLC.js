function log(msg){
    console.log(msg);
}

var num = new Array();
num = [36.46,20.06,25.45,30.46,14.54,21.09,20.56,19.29,18.18,21.84];

var i = num.map((n)=>{
        return n;
    }).reduce((a,n)=>{
        return n +a;
});

function s(n){
    t=0
    for(var i=0;i<num.length;i++){
        t+=1;
    }
    return t;
}
log(i/s(i));


