const bookNameElement = document.getElementById("bookname");
const authorNameElement = document.getElementById("authorname");
const bookInfoElement = document.getElementById("book-info-form");
const firstButton = document.getElementById("btn1");
const willBeReadBtn = document.getElementById("btn2");
const table1 = document.getElementById("table1");
const table2 = document.getElementById("table2");
const deleteAllBtn1 = document.getElementById("dlt-btn-read");
const deleteAllBtn2 = document.getElementById("dlt-btn-wbr");
eventListeners();



function eventListeners(){// Bütün eventleri buraya yazdım 
    firstButton.addEventListener("click",getBookData);
    document.addEventListener("DOMContentLoaded",loadAllBooks);
    willBeReadBtn.addEventListener("click",getDataForWillBRead);
    document.addEventListener("DOMContentLoaded",loadWBR);
    table1.addEventListener("click",deletItemFromRead);
    table2.addEventListener("click",deleteItemFromWBR);
    deleteAllBtn1.addEventListener("click",deleteAllReadBooks);
    deleteAllBtn2.addEventListener("click",deleteAllWBRBooks);

}

function getBookData(e){//Inputlardan data aldım.
    
    const bookname = bookNameElement.value;
    const authorname = authorNameElement.value;
    if(bookname ===""&& authorname===""){
        UI.creaAlert("danger","Boş bırakılan alanlar var");
    }
    else{
            let newBook = new Book(bookname,authorname);
            UI.addBookToUI(newBook.name,newBook.author);
            bookNameElement.value = "";
            authorNameElement.value ="";
            Storage.addBookToStorage(newBook);
        }    
    e.preventDefault();
}
function getDataForWillBRead(e){
    const bookname = bookNameElement.value;
    const authorname = authorNameElement.value;
    if(bookname ===""&& authorname===""){
        UI.creaAlert("danger","Boş bırakılan alanlar var");
    }
    else{
        let newBook = new Book(bookname,authorname);
        Storage.addToWillBReadStorage(newBook); // Object olarak kaydetsin
        bookNameElement.value = "";
        authorNameElement.value = "";
    }

    e.preventDefault();//!!!!!! Formun içindeki her event için e.preventDefault() kullan 
}
function loadAllBooks(){
    UI.loadAllBooksToUI();
}
function loadWBR(){
    UI.loadWillBeReadToUI();
}
function deletItemFromRead(e){
    if(e.target.className ==="btn btn-outline-danger read"){
        UI.removeBookFromUI(e.target);
    }
}
function deleteItemFromWBR(e){
    if(e.target.className ==="btn btn-outline-danger wbr")
    {
        UI.removeWBRFromUI(e.target);
    }
}
function deleteAllReadBooks(){
    if(confirm("Okuduğun bütün kitapları sileceksin onaylıyor musun ? ")){
        UI.deleteAllReadBooksFromUI();
        Storage.deleteAllReadBooksFromStorage();
    }
    
}
function deleteAllWBRBooks(){
    if(confirm("Okuyacğın bütün kitapları sileceksin onaylıyor musun ? ")){
        UI.deleteAllWBRBooksFromUI();
        Storage.deleteAllWBRBooksFromStorage();
    }
}