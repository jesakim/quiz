
if(localStorage.getItem(9)){
    console.log('rrrrrr');
    showresult();
}else{
    window.location.href = 'http://127.0.0.1:5500/'
    console.log('else');
}


function showresult(){

let container = document.getElementsByClassName('container')[0]
    container.innerHTML = ''
    for(let i =0;i<data.length;i++){
        container.innerHTML +=`
        <div class="dropbtn" onclick="showdropdown(this)">
        <i class="icon right fa-regular fa-check-circle"></i>
        <p class="broptxt">`+data[i].question+`</p>
        <i class="icon left fa-solid fa-chevron-down"></i>
    </div>
    <div class="dropdown">
            <div class="items yours">`+localStorage.getItem(i)+`</div>
            <div class="items correct">`+data[i].options[data[i].answers.correct-1].content+`</div>
            <div class="items exp">`+data[i].answers.comment+`</div>
    </div>
        `
    }
} 
    
function showdropdown(element){
        element.nextElementSibling.classList.toggle('showen');
        element.children[2].classList.toggle('showen');
    }