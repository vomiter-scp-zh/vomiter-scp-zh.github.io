function start_table(area,data,limit){
    document.querySelector(`${area} .to_write`).innerHTML=
    `<table style="width: 100%;"></table>`;
    var total=data.length;
    total_show=Math.min(total,limit);
    var in_table="";
    in_table='<tr class="TOPROW"></tr>'
    for(i=0;i<total_show;i++){
        in_table=`${in_table}<tr class='NAIVE ENTRY'></tr>`;
    }
    document.querySelector(`${area} .to_write table`).innerHTML=in_table;
}

function make_top_row(area){
    var toprow=document.querySelector(`${area} .TOPROW`);
    var tdtitles=['條目標題','評分','評論數'];
    tdtitles=tdtitles.join('</td><td>');
    tdtitles=`<td>${tdtitles}</td>`;
    toprow.innerHTML=tdtitles;

}

dot_span="<span class='dot'>...</span>";
pager_no='<span class="pager-no"></span>';
next_page=`<span class="NEXT PN_button page_button">
<a href="javascript:void(0);">
<span class="target">下一頁</span>
</a>
</span>`;
previous_page=`<span class="PREVIOUS HIDE_PN PN_button page_button">
<a href="javascript:void(0);">
<span class="target">上一頁</span>
</a>
</span>`


function pb_wrapper(str){
    return `<span class="page_button">
    <a href="javascript:void(0);">
    <span class="target">${str}</span>
    </a>
    <span class="pre-current">${str}</span>
    </span>`
}


function tr_listing(area,perpage){
    var k=document.querySelectorAll(`${area} tr.NAIVE`).length;
    var p=document.querySelectorAll(`${area} .pager`);
    var page_ind=1;
    var pager_str='';
    while(k>perpage){
        q=document.querySelectorAll(`${area} tr.NAIVE`);
        for(i=0;i<perpage;i++){
            q[i].classList.add(`page${page_ind}`);
            q[i].classList.remove(`NAIVE`);
        }
        k=document.querySelectorAll(`${area} tr.NAIVE`).length;
        page_ind+=1;
    }
    q=document.querySelectorAll(`${area} tr.NAIVE`);
    for(i=0;i<q.length;i++){
        q[i].classList.add(`page${page_ind}`);
        q[i].classList.remove(`NAIVE`);
    }

    if(page_ind<=10&&page_ind>1){
        for(i=0;i<page_ind;i++){
            pager_str=`${pager_str}${pb_wrapper(i+1)}`;
        }
    }
    else if(page_ind>10){
        for(i=0;i<3;i++){
            pager_str=`${pager_str}${pb_wrapper(i+1)}`;
        }
        pager_str=`${pager_str}${dot_span}${pb_wrapper(page_ind)}`;
        
        
    }
    pager_str=`${pager_no}${previous_page}${pager_str}${next_page}`;
    for(i=0;i<p.length;i++){
        p[i].innerHTML=pager_str;
    }

}

function td_organ(item,tr_ele){
    var a_part=`<a target="_blank"
     href='http://scp-zh-tr.wikidot.com/${item['FULLNAME']}'>
     ${item['TITLE']}
     </a>`;
    var r_part=`${item['RATING']}`;
    var c_part=`${item['COMMENTS']}`;
    tr_ele.innerHTML=`<td>${a_part}</td><td>${r_part}</td><td>${c_part}</td>`;
}

function td_listing(area,data){
    var q=document.querySelectorAll(`${area} tr.ENTRY`)
    for(i=0;i<q.length;i++){
        item=data[i];
        tr=q[i];
        td_organ(item,tr);
    }
}



function add_page_changer(area,no){
    var page_targets=document.querySelectorAll(`${area} .page_button:not(.PN_button)`);
    var pager_next=document.querySelectorAll(`${area} .page_button.NEXT`);
    var pager_previous=document.querySelectorAll(`${area} .PREVIOUS`);
    var MaxInd=document.querySelector(`${area} .pager>.page_button:nth-last-child(2)>span`).innerHTML;


    var all_tr=document.querySelectorAll(`${area} tr.ENTRY`);
    for (i=0;i<all_tr.length;i++){
        all_tr[i].classList.remove('showing');
    }
    var to_show=document.querySelectorAll(`${area} .page${no}`);
    for(i=0;i<to_show.length;i++){
        to_show[i].classList.add('showing');
    }
    var ifdot=document.querySelector(`${area} .dot`);
    if(ifdot!==null){
        var nno=Number(no);
        if(no>3&&no<MaxInd-2){
            var new_pager=`
            ${dot_span}
            ${pb_wrapper(`${nno-1}`)}${pb_wrapper(`${nno}`)}${pb_wrapper(`${nno+1}`)}
            ${dot_span}
            `
        }
        else if(no==3){
            var new_pager=`
            ${pb_wrapper(`${nno-1}`)}${pb_wrapper(`${nno}`)}${pb_wrapper(`${nno+1}`)}
            ${dot_span}
            `
        }
        else if(no==MaxInd-2){
            var new_pager=`
            ${dot_span}
            ${pb_wrapper(`${nno-1}`)}${pb_wrapper(`${nno}`)}${pb_wrapper(`${nno+1}`)}
            `
        }
        else if(no==MaxInd||no==MaxInd-1){
            var new_pager=`
            ${dot_span}
            ${pb_wrapper(MaxInd-2)}${pb_wrapper(MaxInd-1)}`
        }
        else{
            var new_pager=`${pb_wrapper('2')}${pb_wrapper('3')}
            ${dot_span}`
        }

        new_pager=`${pager_no}${previous_page}${pb_wrapper('1')}${new_pager}${pb_wrapper(MaxInd)}${next_page}`
        var pager=document.querySelectorAll(`${area} .pager`);
        for(i=0;i<pager.length;i++){
        pager[i].innerHTML=new_pager;
        }

        page_targets=document.querySelectorAll(`${area} .page_button:not(.PN_button)`);
        pager_next=document.querySelectorAll(`${area} .page_button.NEXT`);
        pager_previous=document.querySelectorAll(`${area} .PREVIOUS`);
        
        for(i=0;i<page_targets.length;i++){
            page_targets[i].addEventListener("click",to_certain_page);
        }
        for(i=0;i<pager_next.length;i++){
            pager_next[i].addEventListener('click',to_next_page);
        }
        for(i=0;i<pager_previous.length;i++){
            pager_previous[i].addEventListener('click',to_previous_page);
        }
    }

    if (no==MaxInd){
        pager_next=document.querySelectorAll(`${area} .page_button.NEXT`);
        for(i=0;i<pager_next.length;i++){
            pager_next[i].classList.add('HIDE_PN');
        }
    }
    else{
        pager_next=document.querySelectorAll(`${area} .page_button.NEXT`);
        for(i=0;i<pager_next.length;i++){
            pager_next[i].classList.remove('HIDE_PN');
        }    
    }

    if (no=='1'){
        pager_previous=document.querySelectorAll(`${area} .page_button.PREVIOUS`);
        for(i=0;i<pager_previous.length;i++){
            pager_previous[i].classList.add('HIDE_PN');
        }
    }
    else{
        pager_previous=document.querySelectorAll(`${area} .page_button.PREVIOUS`);
        for(i=0;i<pager_previous.length;i++){
            pager_previous[i].classList.remove('HIDE_PN');
        }    

    }


    for(i=0;i<page_targets.length;i++){
        page_targets[i].classList.remove('current');
        if(page_targets[i].children[1].innerHTML==no){
            page_targets[i].classList.add('current');
        }
    
    }

    var pager_pointer=document.querySelectorAll(`${area} .pager-no`);
    for(i=0;i<pager_pointer.length;i++){
    pager_pointer[i].innerHTML=`第 ${no} 頁`;
    }

}

function to_certain_page(){
    var area=`#${this.parentNode.parentNode.id}`;
    var no=this.children[1].innerHTML;
    add_page_changer(area,no);
}

function to_next_page(){
    var area=`#${this.parentNode.parentNode.id}`;
    var no=document.querySelector(`${area} .current .pre-current`).innerHTML;
    no=`${Number(no)+1}`
    add_page_changer(area,no);
}

function to_previous_page(){
    var area=`#${this.parentNode.parentNode.id}`;
    var no=document.querySelector(`${area} .current .pre-current`).innerHTML;
    no=`${Number(no)-1}`
    add_page_changer(area,no);
}


function getready(area){

    var trs=document.querySelectorAll(`${area} tr.page1`);
    for(i=0;i<trs.length;i++){
        trs[i].classList.add('showing');
    }

    var page_targets=document.querySelectorAll(`${area} .page_button:not(.PN_button)`);
    no='1';
    for(i=0;i<page_targets.length;i++){
    page_targets[i].classList.remove('current');
    if(page_targets[i].children[1].innerHTML==no){
        page_targets[i].classList.add('current')
    }
}
    var pager_str=document.querySelectorAll(`${area} .pager-no`);
    for(i=0;i<pager_str.length;i++){
    pager_str[i].innerHTML=`第 ${no} 頁`;
    }


    page_targets=document.querySelectorAll(`${area} .page_button:not(.PN_button)`);
    for(i=0;i<page_targets.length;i++){
        page_targets[i].addEventListener("click",to_certain_page);
    }

    var pager_next=document.querySelectorAll(`${area} .page_button.NEXT`);
    for(i=0;i<pager_next;i++){
        pager_next[i].addEventListener('click',to_next_page)
    }

    var pager_next=document.querySelectorAll(`${area} .page_button.NEXT`);
    for(i=0;i<pager_next.length;i++){
        pager_next[i].addEventListener('click',to_next_page);
    }

    var pager_previous=document.querySelectorAll(`${area} .page_button.PREVIOUS`);
    for(i=0;i<pager_previous.length;i++){
        pager_previous[i].addEventListener('click',to_previous_page);
    }

    var tbp=document.querySelectorAll('.to_be_panel');
    for(i=0;i<tbp.length;i++){
        tbp[i].classList.add('content-panel');
        tbp[i].classList.add('standalone');
        tbp[i].classList.add('content-row');
        tbp[i].classList.remove('to_be_panel');
    }

}

function jointfunc(area,data,limit,perpage){
    start_table(area,data,limit);
    make_top_row(area);
tr_listing(area,perpage);
td_listing(area,data);
getready(area);
if(data.length<perpage){
    to_del=document.querySelectorAll(`${area} .pager`)
    for(i=0;i<to_del.length;i++){
        to_del[i].remove();
    }

}

}


var HEADERS=new Headers();
HEADERS.append('Pragma','No-Cache');
HEADERS.append('Cache-Control','No-Cache');
var INIT={
    method:'GET',
    headers:HEADERS
};