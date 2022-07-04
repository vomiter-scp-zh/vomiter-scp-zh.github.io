const right_ans=[4,3];
var r_a=[];
var score=0;

for(i=0;i<right_ans.length;i++){
    r_a.push((right_ans[i]-1).toString());
}

function reading_a(){
    for(i=0;i<r_a.length;i++){
        if(r_a[i]==fin_ans[i]){score+=1}
    }
    alert('填答：'+fin_ans);
    alert('正解：'+r_a);
    if (score==r_a.length){
        alert('答對了，密碼是「關關雎鳩」')
    }
    else{
        alert('答錯了')
    }
    score=0;
    


}