function log(msg){
    console.log(msg);
}
var number = new Array();
number = [135,141,134,137,139,142,129,131];

function suma(s){
    m=0;
    for(var j=0 ; j<number.length;j++){
        m+=number[j];
    }
    return m;
}

function s(n){
    count=0;
    for(var i=0;i<number.length;i++){
        count+=1;
    }
    return count;
}
log(suma(number)/s(number));