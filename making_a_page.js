var perpage=20;
var limit=200;

function start_table(area,data){
    document.querySelector(`${area} .to_write`).innerHTML=`<table style="width: 100%;"></table>`;
    var total=data.length;
    total_show=Math.min(total,limit);
    var in_table="";
    for(i=0;i<total_show;i++){
        in_table=`${in_table}<tr class='NAIVE'></tr>`;
    }
    document.querySelector(`${area} .to_write table`).innerHTML=in_table;
}

function tr_listing(area){
    k=document.querySelectorAll(`${area} tr.NAIVE`).length;
    p=document.querySelectorAll(`${area} .pager`);
    page_ind=1;
    pager_str='';
    while(k>perpage){
        q=document.querySelectorAll(`${area} tr.NAIVE`);
        for(i=0;i<perpage;i++){
            q[i].classList.add(`page${page_ind}`);
            q[i].classList.remove(`NAIVE`);
        }
        k=document.querySelectorAll(`${area} tr.NAIVE`).length;
        if (page_ind==1){
            pager_str='<span class="pager-no"></span>';
        }
        pager_str=`${pager_str}<span class="page_button"><a href="javascript:void(0);"><span class="target">${page_ind}</span></a><span class="pre-current">${page_ind}</span></span>`;
        page_ind+=1;
    }
    q=document.querySelectorAll(`${area} tr.NAIVE`);
    for(i=0;i<q.length;i++){
        q[i].classList.add(`page${page_ind}`);
        q[i].classList.remove(`NAIVE`);
    }
    if (page_ind==1){
        pager_str='<span class="pager-no"></span>';
    }
    pager_str=`${pager_str}<span class="page_button"><a href="javascript:void(0);"><span class="target">${page_ind}</span></a><span class="pre-current">${page_ind}</span></span>`;
    page_ind+=1;
    for(i=0;i<p.length;i++){
        p[i].innerHTML=pager_str;
    }

}

function td_organ(item,tr_ele){
    a_part=`<a target="_blank" href='http://scp-zh-tr.wikidot.com/${item['FULLNAME']}'>${item['TITLE']}</a>`;
    r_part=`${item['RATING']}`;
    c_part=`dummy`;
    tr_ele.innerHTML=`<td>${a_part}</td><td>${r_part}</td><td>${c_part}</td>`;
}

function td_listing(area,data){
    q=document.querySelectorAll(`${area} tr`)
    for(i=0;i<q.length;i++){
        item=data[i];
        tr=q[i];
        td_organ(item,tr);
    }
}

function add_page_changer(){
    area=this.parentNode.parentNode.id
    page_targets=document.querySelectorAll(`#${area} .page_button`);
    no=this.children[1].innerHTML;
    for(i=0;i<page_targets.length;i++){
    page_targets[i].classList.remove('current');
    if(page_targets[i].children[1].innerHTML==no){
        page_targets[i].classList.add('current')
    }

}
    this.classList.add('current');
    all_tr=document.querySelectorAll(`#${area} tr`);
    for (i=0;i<all_tr.length;i++){
        all_tr[i].classList.remove('showing');
    }
    to_show=document.querySelectorAll(`#${area} .page${no}`);
    for(i=0;i<to_show.length;i++){
        to_show[i].classList.add('showing');
    }
}


function getready(area){
    trs=document.querySelectorAll(`${area} tr.page1`);
    for(i=0;i<trs.length;i++){
        trs[i].classList.add('showing');
    }
    p1b=document.querySelector(`${area} .page_button`);
    if(p1b){
        p1b.classList.add('current');
    }
    page_targets=document.querySelectorAll(`${area} .page_button`);
    for(i=0;i<page_targets.length;i++){
        page_targets[i].addEventListener("click",add_page_changer);
    }
}

start_table('#original_area',Myjson);
tr_listing('#original_area');
td_listing('#original_area',Myjson);
getready('#original_area');