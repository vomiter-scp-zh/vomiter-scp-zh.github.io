
var ans_for_sq = document.querySelectorAll('.ans-item');
var sq = document.querySelectorAll('.single-question');
var a_chosen=document.querySelector('.in-question .chosen');
var in_q=a_chosen=document.querySelector('.in-question');
var ning_q;
var score=0;

//為題目上編號
for(i=0;i<sq.length;i++){
    classname="QNo"+i.toString();
    sq[i].classList.add(classname);
}

//選定所有的偽答案(第六個)
function choose_6(){
    ans_No1=document.querySelectorAll('.single-question .ans-item:nth-child(6)');
    for(i=0;i<ans_No1.length;i++){
        classname="chosen";
        ans_No1[i].classList.add(classname);
    }
}
//為答案上編號
function numing_ans(ansno){
    ansno_modified=ansno+1;
    ans_of_num=document.querySelectorAll(`.single-question .ans-item:nth-child(${ansno_modified.toString()})`);
    for(i=0;i<ans_of_num.length;i++){
        classname="AnsNo"+ansno.toString();
        ans_of_num[i].classList.add(classname);
    }
}

choose_6();
numing_ans(0);
numing_ans(1);
numing_ans(2);
numing_ans(3);
numing_ans(4);
numing_ans(5);

document.querySelector('.QNo0>.q-pr').innerHTML=Q0content;
document.querySelector('.QNo1>.q-pr').innerHTML=Q1content;


document.querySelector('.QNo0 .AnsNo0 .ans-pr').innerHTML=Q0Ans0;
document.querySelector('.QNo0 .AnsNo1 .ans-pr').innerHTML=Q0Ans1;
document.querySelector('.QNo0 .AnsNo2 .ans-pr').innerHTML=Q0Ans2;
document.querySelector('.QNo0 .AnsNo3 .ans-pr').innerHTML=Q0Ans3;
document.querySelector('.QNo0 .AnsNo4 .ans-pr').innerHTML=Q0Ans4;
document.querySelector('.QNo1 .AnsNo0 .ans-pr').innerHTML=Q1Ans0;
document.querySelector('.QNo1 .AnsNo1 .ans-pr').innerHTML=Q1Ans1;
document.querySelector('.QNo1 .AnsNo2 .ans-pr').innerHTML=Q1Ans2;
document.querySelector('.QNo1 .AnsNo3 .ans-pr').innerHTML=Q1Ans3;
document.querySelector('.QNo1 .AnsNo4 .ans-pr').innerHTML=Q1Ans4;









for (i=0;i<ans_for_sq.length;i++){
ans_for_sq[i].addEventListener("click",function(){a_chosen=document.querySelector('.in-question .chosen');a_chosen.classList.remove('chosen',"vis_chosen"); this.classList.add('chosen','vis_chosen');})
}

for (i=0;i<sq.length;i++){
    sq[i].addEventListener("click",function(){in_q=document.querySelector('.in-question');in_q.classList.remove('in-question');this.classList.add('in-question')},true);
    }

var fin_ans=[];
const right_ans=["AnsNo3","AnsNo2"]


function finish_test(){
    fin_ans=[];
    raw_fin_ans=document.querySelectorAll('.chosen');
    for(i=0;i<raw_fin_ans.length;i++){
        raw_fin_ans[i].classList.remove('vis_chosen', 'chosen', 'ans-item');
        fin_ans.push(String(raw_fin_ans[i].classList).split('AnsNo')[1]);
        raw_fin_ans[i].classList.add('ans-item');
    }
    alert(fin_ans);
    score=0;
    choose_6();

}


document.querySelector('.finish-button a').addEventListener('click', function(){finish_test()});
