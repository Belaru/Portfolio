

/*FETCH SELECT INPUTS OPTIONS*/

let baseCurSel=document.getElementById("base_currency_select"), 
toCurSel=document.getElementById("to_currency_select");

let soniCurrencyJSON="https://sonic.dawsoncollege.qc.ca/~F212135698/Assignment2/js/currency.json";
let currencies=[];

fetchCurrency();

/**
 * this function fetches all the objects of currency.json file into an array
 * then calls initialize_Select_Options_data(select) 
 */

function fetchCurrency(){
    fetch(soniCurrencyJSON)
    .then((resp)=>{
        return resp.json();
    })
    .catch((err)=>{
        console.log("fetch error: ", err);
    })
    .then((object)=>{
        currencies=Object.entries(object).map(entry => entry[1]);
        initialize_Select_Options_data(baseCurSel);
        initialize_Select_Options_data(toCurSel);
    })
}

/**
 * this function dinamically sets two select HTML elements (base Currency and To Currency) 
 * once the currencies are fetched
 * @param select 
 */

function initialize_Select_Options_data(select){
    for(let cur of currencies){
        let currencyOption=document.createElement("option");
        currencyOption.value=cur.code;
        currencyOption.innerText=cur.name;
        select.append(currencyOption);
    }
}


/*PROGRAM*/

let fromVal,toVal,amount;

let urlObject={
    mainURL : `https://api.exchangerate.host/convert?`,
    fromQry : "",
    toQry: "",
    amountQry : "",
    absoluteURL: ""
}

/**
 * this function creates an absolute url to fetch for a new row
 * using urlObject and the form inputs 
 * @returns absolute url 
 */

function getAbsoluteRequestURL(){
    fromVal=document.getElementById("base_currency_select").value;
    toVal=document.getElementById("to_currency_select").value;
    amount=document.getElementById("amount").value;

    urlObject.fromQry=`from=${fromVal}`;
    urlObject.toQry= `&to=${toVal}`;
    urlObject.amountQry = `&amount=${amount}`;
    urlObject.absoluteURL=urlObject.mainURL+urlObject.fromQry+urlObject.toQry+urlObject.amountQry;

    //eg:https://api.exchangerate.host/convert?from=USD&to=CAD&amount=100

    return urlObject.absoluteURL;
}

/**
 * Fetches result of the conversion when the form is submitted
 * from a new absolute url
 * calls displayResults(rate,payment,date) to automatically generate a new row
 * @param url 
 */

function getData(url){
    fetch(url)
    .then(resp => {return resp.json()}).catch((err)=>console.log(err.message))
    .then((obj)=>{test=obj;displayResults(obj.info["rate"],obj.result,obj.date)}).catch((err)=>console.log(err.message))
}

/**
 * this function generates a new row in table
 * calls appenChild(elem,parent,content)
 * @param rate 
 * @param payment 
 * @param date 
 */


function displayResults(rate,payment,date){ 

    const now=new Date();
    let seen = `${date}  - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    let newRow=document.createElement('tr');
    let table=document.querySelector("table");
    let fields=[fromVal,toVal,rate,amount,payment,seen];

    for(let field of fields){
        let newCell=document.createElement('td');
        appenChild(newCell,newRow,field);
    }
    appenChild(newRow,table,undefined);
}

/**
 * this function appends an element ( with inner content if defined)
 * to another element
 * @param elem 
 * @param parent 
 * @param content 
 */

function appenChild(elem,parent,content){
    if(content!==undefined){
        elem.innerText=content;
    }
    parent.appendChild(elem);
}

/*UNABLE/DISABLE BUTTON*/

let formBtn=document.getElementById("get_data_btn");
let inputs=document.querySelectorAll('.conversion-inputs');

/**
 * this function enables the convert button if all inputs are valid
 * disables the convert button when a field is invalid
 */

function validInputs(){
    let count=0;
    for(let e of inputs){
        if(e.value!=="none"){
            if(e.tagName=="INPUT"){
                if(Number(e.value)>0){
                    count+=1;
                }
            }else{
                count+=1;
            }
        }
    }
    if(count==3){
        formBtn.disabled=false;
    }else{formBtn.disabled=true;}
}
