const sleep = ms => new Promise(r => setTimeout(r, ms));
let shiftRes = 5;
let sortBtn;
let speed;
let size;
arr = []
let divArr=[];
let leftArr=[];
let flag=0;
var width;

function updateSpeed(){
    speed = document.getElementById("speed").value;
}

function updateColorDark(item){
    item.className = "bars selectedDark";
}

function updateDataPoints(){
    size  = document.getElementById("dataPoints").value;
    if(size > 100 || size < 10){
        document.getElementById("dataPoints").className = "invalidInput";
    }
    else{
        document.getElementById("dataPoints").className = "";
        fill();
    }
}

async function partition(low, high){
    pivot = divArr[high];
    let i = low - 1;

    for(let idx = low;idx<high;idx++){
        if(divArr[idx].className != "bars sorted") divArr[idx].className = "bars selectedDark";
    }

    if(divArr[high].className == "bars sorted") return i+1;
    count=0;
    divArr[high].className = "bars pivot"
    
    if(speed!=-1) await sleep(500*speed);
    if(flag==1) return;
    
    for(let j=low;j<high;j++){
        if(divArr[j].value <= pivot.value){
            i += 1;
            temp = divArr[i];
            divArr[i] = divArr[j];
            divArr[j] = temp;
            
            if(i==j) continue;

            temp = divArr[j].style.left.slice(0,-2)-divArr[i].style.left.slice(0,-2);
            for(k=0;k<shiftRes;k++){
                if(speed!=-1) await sleep(100*speed);
                if(flag==1) return;
                divArr[i].style.left = divArr[i].style.left.slice(0,-2) - (-1*temp/shiftRes) + "px";
                divArr[j].style.left = divArr[j].style.left.slice(0,-2) - temp/shiftRes + "px";
                if(speed!=-1) await sleep(100*speed);
                if(flag==1) return;
            }
        }
    }
    temp = divArr[i+1];
    divArr[i+1] = divArr[high];
    divArr[high] = temp;


    temp = divArr[high].style.left.slice(0,-2)-divArr[i+1].style.left.slice(0,-2);
    for(k=0;k<shiftRes;k++){
        if(speed!=-1) await sleep(100*speed);
        if(flag==1) return;
        divArr[i+1].style.left = divArr[i+1].style.left.slice(0,-2) - (-1*temp/shiftRes) + "px";
        divArr[high].style.left = divArr[high].style.left.slice(0,-2) - temp/shiftRes + "px";
        if(speed!=-1) await sleep(100*speed);
        if(flag==1) return;
    }

    for(let idx = low;idx<=high;idx++){
        if(divArr[idx].className != "bars sorted") divArr[idx].className ="bars";    
    }
    divArr[i+1].className = "bars sorted"; 
    if(speed!=-1) await sleep(500*speed);
    if(flag==1) return;

    return i+1;
}

async function qSort(low=0, high=null){
    if(high==null) high = divArr.length - 1;

    if(low < high){
        pivot_index = await partition(low, high);
        await qSort(low, pivot_index-1);
        await qSort(pivot_index+1, high);
        if(flag==1) return;
        divArr[low].className = "bars sorted";
        divArr[high].className = "bars sorted";
    }
}

async function mergeSort(start=0, end=divArr.length-1){
    if(start >= end)
        return ;
    
    for(let idx=start;idx<=end;idx++){
        divArr[idx].style.bottom = divArr[idx].style.bottom.slice(0,-2) - (-7) + "px";
        divArr[idx].style.border = "solid black 1px";
    }

    if(speed!=-1) await sleep(500*speed);
    if(flag==1) return;
   
    const mid = Math.floor((end + start)/2);
    sortedLeft = await mergeSort(start, mid);
    if(flag==1) return;
    sortedRight = await mergeSort(mid+1, end);
    if(flag==1) return;

    await merge(start, mid, end);
    if(flag==1) return;

    for(let idx=start;idx<=end;idx++){
        divArr[idx].style.bottom = divArr[idx].style.bottom.slice(0,-2) - 7 + "px";
        if(divArr[idx].style.bottom.slice(0,-2) == "0"){
            divArr[idx].style.border = "";
        }
    }

    if(speed!=-1) await sleep(500*speed);
    if(flag==1) return;
}

async function merge(start, mid, end){
    let start2 = mid+1;

    if(divArr[mid].value <= divArr[start2].value) return;

    

    while(start <= mid && start2 <= end){
        if(divArr[start].value <= divArr[start2].value) start++;

        else{
            if(speed!=-1) await sleep(300*speed);
            if(flag==1) return;

            temp = divArr[start2];
            let index = start2;
            while(index != start){
                divArr[index] = divArr[index-1];
                index-=1; 
            }
            divArr[start] = temp;

            let tempLeft =  (divArr[start2].style.left.slice(0,-2) - leftArr[start2]);
            
            divArr[start].className = "bars selected";

            for(k=0;k<shiftRes;k++){
                if(speed!=-1) await sleep(100*speed);
                if(flag==1) return;

                for(let idx=start+1; idx <= start2;idx++){
                    divArr[idx].style.left = divArr[idx].style.left.slice(0,-2) - tempLeft/shiftRes + "px";
                    divArr[start].style.left = divArr[start].style.left.slice(0,-2) -  (-1*tempLeft/shiftRes) + "px";
                }

                if(speed!=-1) await sleep(100*speed);
                if(flag==1) return;
            }
            divArr[start].className = "bars";
            start++;
            mid++;
            start2++;
            if(speed!=-1) await sleep(300*speed);
            if(flag==1) return;
        }
    }

    return;
}

async function sort(){
    flag=0;
    sortBtn.disabled = true;
    speed = document.getElementById("speed").value;
    const sortAlgo = document.querySelector('input[name="sort"]:checked').value;
    for(let i=0;i<divArr.length;i++){
        divArr[i].className = "bars";
    }
    if(sortAlgo == "bubbleSort"){
        for(i=0;i<divArr.length-1;i++){
            for(j=1;j<divArr.length-i;j++){
                divArr[j-1].className += " selected";
                divArr[j].className += " selected";
                if(speed!=-1) await sleep(500*speed);
                if(flag==1) return;
                if(divArr[j-1].value-divArr[j].value > 0){
                    temp = divArr[j-1];
                    divArr[j-1] = divArr[j];
                    divArr[j]= temp;
                    temp = divArr[j].style.left.slice(0,-2)-divArr[j-1].style.left.slice(0,-2);
                    for(k=0;k<shiftRes;k++){
                        if(speed!=-1) await sleep(50*speed);
                        if(flag==1) return;
                        divArr[j-1].style.left =divArr[j-1].style.left.slice(0,-2) - (-1*temp/shiftRes) + "px";
                        divArr[j].style.left = divArr[j].style.left.slice(0,-2) - temp/shiftRes + "px";
                        if(speed!=-1) await sleep(50*speed);
                        if(flag==1) return;
                    }
                }
                divArr[j-1].className = "bars";
                divArr[j].className = "bars";
                if(speed!=-1) await sleep(500*speed);
                if(flag==1) return;
            }
            divArr[j-1].className += " sorted";
        }
        divArr[0].className += " sorted";
    }
    else if(sortAlgo == "selectionSort"){
        
        for(i=0;i<divArr.length;i++){
            min = i;
            divArr[min].className+=" min";
            if(speed!=-1) await sleep(500*speed);
            if(flag == 1) return;
            var j;
            for(j=i+1;j<divArr.length;j++){
                divArr[j].className += " selected";
                if(speed!=-1) await sleep(500*speed);
                if(flag == 1) return;

                if(divArr[min].value > divArr[j].value){
                    divArr[min].className = "bars";
                    min = j;
                    divArr[min].className = "bars min";
                    if(speed!=-1) await sleep(500*speed);
                    if(flag == 1) return;
                }
                else{
                    if(speed!=-1) await sleep(500*speed);
                    if(flag == 1) return;
                    divArr[j].className = "bars";
                }
            }
            if(i!=min){

                temp = divArr[i];
                divArr[i] = divArr[min];
                divArr[min] = temp; 
                
                temp = divArr[min].style.left.slice(0,-2)-divArr[i].style.left.slice(0,-2);
                divArr[min].className = "bars selected";
                for(k=0;k<shiftRes;k++){
                    if(speed!=-1) await sleep(500*speed);
                    if(flag==1) return;
                    divArr[i].style.left = divArr[i].style.left.slice(0,-2) - (-1*temp/shiftRes) + "px";
                    divArr[min].style.left = divArr[min].style.left.slice(0,-2) - temp/shiftRes + "px";
                    if(speed!=-1) await sleep(500*speed);
                    if(flag==1) return;
                }
                divArr[min].className = "bars";
            }
            divArr[i].className = "bars sorted";
            if(speed!=-1) await sleep(500*speed);
            if(flag == 1) return;
        } 
    }
    else if(sortAlgo == "quickSort"){
        await qSort(0, divArr.length - 1);
    }
    else if(sortAlgo == "mergeSort"){
        await mergeSort(0, divArr.length-1);
        if(flag==1) return;
        for(let idx = 0;idx<divArr.length;idx++){
            divArr[idx].className = "bars sorted";
        }
    }
    sortBtn.disabled = false;
    
}

async function fill(type="fill"){
    sortBtn = document.getElementById("sort");
    
    var nums = document.getElementById("numContainer");
    while(nums.firstChild){
        nums.removeChild(nums.lastChild);
    }
    
    if(type=="fill"){
        flag=1;
        sortBtn.disabled = false;
        arr=[];
        divArr=[];
        for(i=0;i<size;i++){
            arr.push((Math.random()*100)+20);
        }
    }

    width = (2*nums.clientWidth)/(3*size+1);
    for(i=0;i<size; i++){
        const div = document.createElement("div");
        div.className = "bars";
        div.style.width= width.toString()+"px";
        div.style.marginLeft = (width/2).toString()+"px";
        div.style.left = (i*(width)*1.5).toString()+"px";
        leftArr[i] = (i*(width)*1.5).toString();
        div.style.height = arr[i].toString() + "px";
        div.value = arr[i];
        divArr.push(div);
        nums.appendChild(div);
        
    }
}
