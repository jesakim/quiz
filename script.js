var index = 0
var randlist = randList(data.length)
console.log( randlist);
var ans = 'No Response Selected';
var timerindex = 30;
var probar ;
var nextbtn ;
var container = document.getElementsByClassName('container')[0]
var result = Array()
var stepper = document.getElementsByClassName('stepper')
landing()

// showresult()


async function anim(){
    container.innerHTML = ``
    var num = document.getElementsByClassName('num');
    var timer = document.getElementsByClassName('timer')[0];
    timer.classList.remove('none')
    console.log(stepper);
    stepper[0].classList.add('none')
    stepper[1].classList.remove('none')
for (let i=num.length-1;i>=0;i--){
    num[i].classList.remove('none');
    num[i].classList.add('anim');
    await sleep(1000);
    num[i].classList.add('none');
}
timer.classList.add('none')
stepper[1].classList.add('none')
}

// anim();


function landing(){
    container.innerHTML = `
    <h1 class="text">Welcome to AWS Cloud Practitioner<br> Knowledge Test</h1>
    <ul class="info_list">
        <li class="item"><h3 class="">You only have 30 sec to answer a question</h3></li>
        <li class="item"><h3 class="">Each question have only one correct answer</h3></li>
        <li class="item"><h3 class="">Pass the quiz and see how many questions you can answer correctly out of 10 !</h3></li>
    </ul>
        <div class="error" >Username should contain only letters and whitespaces ( 3 characters min )</div>
    <div class="form-outline">
        <input type="text" id="loginName" class="" placeholder=" "/>
        <label class="form-label" for="loginName" id="NameLabel">Your Name</label>
    </div>

    <button onmouseenter="hover1(this.firstElementChild)" onmouseleave="nothover1(this.firstElementChild)" onclick="checkname()" class="btn">
        <div id="" class="hover1"></div>
        <span id="btntext">Start Now</span>
    </button>
    `
}


function hover1(str){
            str.classList.add('hov')
            str.classList.remove('nothov')
        }
function nothover1(str){
            str.classList.add('nothov')
            str.classList.remove('hov')
        }


function checkname(){
    var input = document.getElementById('loginName');
    if(/^([a-zA-Z0-9\s]{3,})$/.test(input.value)){
        anim().then(()=>{
        document.cookie ="username=" + input.value + ";path=/";
        container.innerHTML = `
        <div class="progress">
        <div class="progress-bar" style="width:100% ">
        </div>
      </div>
      <div class="form-check">
      </div>
      <div class="twobtn">
        <button class="nextbtn nohover">
            1/10
        </button>
        <button class="nextbtn" onclick="next()">
            Submit
            <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
        `

        probar = document.getElementsByClassName('progress-bar')[0];
        nextbtn = document.getElementsByClassName('nextbtn')[1];
        
        rep()
        document.getElementsByClassName('stepper')[0].classList.add('none')
    })
    }else{
        error();
    }
    }

function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

async function error(){
        let error = document.getElementsByClassName('error')[0];
        error.style.display = 'block';
        error.style.opacity = 1
        await sleep(3000)
        for(let i = 0;i<=1;i=i+0.1){
                error.style.opacity = 1-i
                // console.log(i)
                await sleep(50);
            }
        error.style.display = 'none'
    }


// rep()

function display(id){
    // let fe = await fetch('data.json')
    // let data = await fe.json()
    
    probar.classList.add('active');
    probar.classList.remove('speed');
    console.log(probar);
    let output = document.getElementsByClassName('form-check')[0]
    if(id>=data.length){id = 0}
    output.innerHTML = `
    <h1 class="qst" correct="`+data[id].answers.correct+`">`+data[id].question+`</h1>`
    for(let i = 0;i<data[id].options.length;i++){
            output.innerHTML += `<button class="answers" onmouseenter="hover1(this.firstElementChild)" onmouseleave="nothover1(this.firstElementChild)" onclick="select(this,'`+data[id].options[i].content+`')" iscorrect="`+iscorrect(data[id].answers.correct,data[id].options[i].id)+`" selected='false'>
                <div id="" class="hover1" ></div>
                <i class="icon fa-regular fa-circle"></i>
                <span id="btntext">`+data[id].options[i].content+`</span>
            </button>
    `}
console.log(id);
}



// 30 sec timer function 

function timer(){
    if(timerindex == 0){
        timerindex = 30;
        next(); 
    }else{
        timerindex--;
        
    }
    console.log(timerindex);
}



// 30 sec timer function

function select(str,answer){
    let icons = document.getElementsByClassName('icon')
    for(let i = 0;i<icons.length;i++){
        icons[i].classList.remove('fa-solid')
        icons[i].classList.add('fa-regular')
        icons[i].parentElement.classList.remove('selected')
        icons[i].parentElement.setAttribute('selected','false')

    }
    nextbtn.style.visibility = "visible";
    str.children[1].classList.add('fa-solid');
    str.children[1].classList.remove('fa-regular');
    str.classList.add('selected')
    str.setAttribute('selected','true')
    ans = answer;
   
}


// next()
var myinter;
function rep(){
    myinter = setInterval(timer,1000)
    nextbtn.setAttribute('onclick','next()')
    nextbtn.innerHTML =`submit <i class="fa-solid fa-chevron-right"></i>`
    nextbtn.style.visibility = "hidden";
    var probar = document.getElementsByClassName('progress-bar')[0];
    document.getElementsByClassName('nextbtn')[0].innerText= index+1 +' / 10';
    setTimeout(function(){probar.classList.add('active');
    },10)
    probar.classList.remove('active')
    
    if(index == data.length){
        clearInterval(myinter)
        showresult();
    }
    ans = 'No Response Selected';
    display(randlist[index])
    index++
    timerindex = 30;
    
}

function showresult(){
        container.innerHTML = '';
        let correctcount = 0;
        container.innerHTML = `
        <div class="donut" style="--percent:50">
        <p class="donuttxt">5/10</p> 
        </div>`;
        container.innerHTML += '<h1 class="goodjob" ></h1>';
        
        for(let i =0;i<data.length;i++){
            let iscorrect;
            let icon;
            if(data[i].options[data[i].answers.correct-1].content == result[i]){
                iscorrect = 'correct';
                icon = 'check'
                correctcount++;
            }else{
                iscorrect = 'false';
                icon = 'xmark'
            }
            container.innerHTML +=`
            <div class="dropbtn `+iscorrect+`" onclick="showdropdown(this)">
            <i class="icon right fa-regular fa-circle-`+icon+`"></i>
            <p class="broptxt">`+data[i].question+`</p>
            <i class="icon left fa-solid fa-chevron-down"></i>
        </div>
        <div class="dropdown">
                <span class="itemstxt" >Your answer</span>
                <div class="items yours">`+result[i]+`</div>
                <span class="itemstxt" >Correct answer</span>
                <div class="items correct">`+data[i].options[data[i].answers.correct-1].content+`</div>
                <span class="itemstxt" >Explanation</span>
                <div class="items exp">`+data[i].answers.comment+`</div>
        </div>
            `
        }
        document.getElementsByClassName('stepper')[2].classList.remove('none')
        document.getElementsByClassName('stepper')[0].classList.add('none')
        document.getElementsByClassName('block__footer__figure')[0].classList.add('none')
        document.getElementsByClassName('donut')[0].style.setProperty('--percent',correctcount*10)
        document.getElementsByClassName('donut')[0].children[0].innerText = correctcount+'/10';
        var h1str
        if(correctcount == 0){
            h1str = 'Good Luck Next Time '+checkCookie('username') 
        }else if(correctcount > 0 && correctcount <5){
            h1str = 'Nice Try '+checkCookie('username')
        }else if(correctcount >=5 && correctcount < 10){
            h1str = 'Good joob '+checkCookie('username')
        }else{
            h1str = 'perfect joob '+checkCookie('username')
        }
        document.getElementsByClassName('goodjob')[0].innerText = h1str;
    } 
        
function showdropdown(element){
            element.nextElementSibling.classList.toggle('showen');
            element.children[2].classList.toggle('showen');
    }
    var mytimout
function next(){
    clearInterval(myinter)
    nextbtn.removeAttribute('onclick')
    nextbtn.setAttribute('onclick','forceNext()')
    nextbtn.innerHTML =`Next <i class="fa-solid fa-chevron-right"></i>`
    answersColoring();
    mytimout = setTimeout(rep, 5000);
    
}

function forceNext(){
        clearTimeout(mytimout);
        rep();
}






function answersColoring(){
    probar.classList.remove('active');
    probar.classList.add('speed');
    let answers = document.getElementsByClassName('answers');
    // console.log(answers.length);
    for(let i =0;i<answers.length;i++){
        if((answers[i].getAttribute('selected')=='true')&& (answers[i].getAttribute('iscorrect')=='false')){
            answers[i].classList.add('false')
            answers[i].children[1].classList = "icon fa-regular fa-circle-xmark";
        }
        if(answers[i].getAttribute('iscorrect')=='true'){
            answers[i].classList.add('correct')
            answers[i].children[1].classList = "icon fa-regular fa-circle-check"; 
        }
        
    };
    timerindex = 6;
    result[randlist[index-1]] = ans;
    ans = 'No Response Selected';
    console.log(result);
    console.log(result.length);

}

function checkCookie(name) 
    {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) {
        return match[2];
      }else{
        return 0;
      }
   }



function randList(len){
    let arr = [];
    do{
        x = Math.floor(Math.random() * len);
        if(!arr.includes(x)){
        arr.push(x);}
        
    }while(arr.length < len)
    return arr
}



function iscorrect(correct,answer){
    if(correct == answer){
        return true
    }else{
        return false
    }
}