import { sourceQuote } from './quotes.js'

const quotesArray = sourceQuote.split(/\r?\n/);



const quotesMaker = (sentence, author) => {
    let quote = {
        _sentence: sentence,
        _author: author,
        fav: false,
        likes: 0,
        get author(){
            return this._author;
        },
        get sentence(){
            return this._sentence;
        },
        set sentence(newSentence){
            this._sentence = newSentence;
        },
        set author(newAuthor){
            this._author = newAuthor;
        }

}
 return quote;
};

const authorMaker = (newAuthor) => {
    let author = {
        _author: newAuthor,
        _numberQuotes: 1,
        get author(){
            return this._author;
        },
        set author(newAuthor){
            this._author = newAuthor;
        },
        get numberQuotes(){
            return this._numberQuotes;
        },
        increaseQuotes(){ this._numberQuotes++},

}
 return author;
};

const quotesAsembly = (arr) => {
    let newArr = [];
    for(let i = 0; i < arr.length; i = i + 2){
        newArr.push(quotesMaker(arr[i], arr[i+1]));
    }
    return newArr;
}

let finalArray = quotesAsembly(quotesArray);

const printAuthors = arrPrint => {
    arrPrint.forEach(quote => console.log(`${quote._author} \n\n`));
} 

const getAuthors = (arr) =>{
    let authorsArray = []; //array of only name of authors
    let returnAuthorsObjects = []; //array of objects-authors with authors and number of quotes
 
    for(let i = 0; i < finalArray.length; i++){
     if(!authorsArray.some(quo => quo === arr[i]._author )){
         let newA = authorMaker(arr[i]._author);
         authorsArray.push(arr[i]._author);
         returnAuthorsObjects.push(newA);
             }else{
             let indexAu = authorsArray.indexOf(arr[i]._author);
             returnAuthorsObjects[indexAu].increaseQuotes() ;
             }
     } //end of for
 
 
 
 return returnAuthorsObjects;
 } //end getAuthors
 
 let arrayAuthors = getAuthors(finalArray);


let favsArray = [];

const addToFav = (favQuote) => {
    favsArray.push(favQuote);
}


//select button we will link
let nextButton = document.getElementById('nextb');
let favButton = document.getElementById('favb');
let printFavsButton = document.getElementById('printFavs');
let printPrevButton = document.getElementById('prev');

const compare = (arr, num) =>{
    return arr.some(numb => num === numb)
   }
   
const generateArrRandomNum = arrLength => {
    let arrRan = [];
    for(let i = 0; i < arrLength ; i++){
    let random = Math.floor(Math.random() * arrLength)
    if(compare(arrRan, random)){
        i--
    }else{
        arrRan.push(random)
    }


    }//end for
    return arrRan
}//end generateArrRandomNum
   
let arrayRandom = generateArrRandomNum(finalArray.length);



let incDecrorderDisplayed = -1; //this is the variable that is used to increase or decrease the orderDisplayed variable. Its value is in real order: 0, 1, 2...
let orderDisplayed = arrayRandom[incDecrorderDisplayed]; //this is the index that will be used to determine in which Quote the functions are in each moment. All of them call to the name "orderDisplayed"



//function to print next Quote
const printNextQuote = () => {
   incDecrorderDisplayed = incDecrorderDisplayed +1;
   if(incDecrorderDisplayed === finalArray.length){
    incDecrorderDisplayed = 0;
    document.getElementById('placeToPrint').innerHTML = `<h2 id='warning'> You saw all the quotes available! </h2>` ;
   }else{

  orderDisplayed = arrayRandom[incDecrorderDisplayed];

    //select where it will be printed
    document.getElementById('placeToPrint').innerHTML = `<h2> ${finalArray[orderDisplayed]._sentence} <br><br> <span id="authorsquotes">by ${finalArray[orderDisplayed]._author} </span></h2> ` ;
   }
};


const compareQuote = (arr, num) =>{
    return arr.some(numb => num === numb._sentence)
   }
//implement add to favs

const addQuoteToFav = () => {
    if(incDecrorderDisplayed === -1){
        document.getElementById('placeToPrint').innerHTML = `<h2 id='warning'> There is no quote to add, press Next to see the first quote. </h2>` ;
       }else if(!compareQuote(favsArray, finalArray[orderDisplayed]._sentence)){
        finalArray[orderDisplayed].fav = true;
    addToFav(finalArray[orderDisplayed])
    document.getElementById('placeToPrint').innerHTML = `<h2> ${finalArray[orderDisplayed]._sentence} <br><br> <h2 id='successfulAction'> Quote added to Favs </h2>`
    }else{
        document.getElementById('placeToPrint').innerHTML = `<h2 id='warning'> You already added that quote to favs. </h2>`
    }

};


const printAllFavs = () => {
    let allFavs = favsArray.map((a) =>{
      return `${a._sentence} <br><span id="authorsquotes"> By  ${a._author} </span><br><br>`;
       })
       if(favsArray.length === 0){
        document.getElementById('placeToPrint').innerHTML = `<h2 id='warning'> You don't have favorite quotes yet. </h2>` ;
       }else if(favsArray.length === 1){
        document.getElementById('placeToPrint').innerHTML = `<h2 id='successfulAction'> Your Fav: </h2><h2> ${allFavs.join('\n')} </h2>` ;
       }else if(favsArray.length > 1 && favsArray.length < 3){
        document.getElementById('placeToPrint').innerHTML = `<h2 id='successfulAction'> Your Favs: </h2><h2> ${allFavs.join('\n')} </h2>` ;
       }else{
        document.getElementById('placeToPrint').innerHTML = `<h2 id='successfulAction'> Your Favs: </h2><h2> ${allFavs.join('\n')}  <a href="#" class="navigationButton">Go back to the Top</a></h2>` ;
       }
       //  
   /*Pay close attention to the .join('\n'), without it, when there are more than 1 element, it will print a comma between them. */
}


const prevQuote = () => {
     if(incDecrorderDisplayed > 0){
        incDecrorderDisplayed = incDecrorderDisplayed -1 ;
        orderDisplayed = arrayRandom[incDecrorderDisplayed];
   document.getElementById('placeToPrint').innerHTML = `<h2> ${finalArray[orderDisplayed]._sentence} <br><br> <span id="authorsquotes">by ${finalArray[orderDisplayed]._author} </span></h2>` ;
    }else if(incDecrorderDisplayed === 0){
        document.getElementById('placeToPrint').innerHTML = `<h2 id='warning'>There is no previous Quote to the one you just saw. Press Next again to see a second quote.</h2>` ;
    }else if(incDecrorderDisplayed === -1){
        document.getElementById('placeToPrint').innerHTML = `<h2 id='warning'>There is no previous Quote. Press Next to see the first one.</h2>` ;
    }
};




nextButton.addEventListener('click', printNextQuote);
favButton.addEventListener('click', addQuoteToFav);
printFavsButton.addEventListener('click', printAllFavs);
printPrevButton.addEventListener('click', prevQuote);