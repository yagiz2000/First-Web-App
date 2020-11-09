const kitapeklenecekyer = document.getElementById("booksneeded");
const inputElement = document.getElementById("book-info-form");


class UI{

    static addBookToUI(bookname,author){

        const bookname2 = bookname.toLowerCase();
        let books = Storage.getArrayFromStorage("books");
        let liste = [];
        for (const book of books) { //books'u array yapıp bu işlemi forEach ile yapabilirdim. Bu sefer farklı bir yöntem denedim.
            liste.push(book.name.toLowerCase());
        }
        if(liste.includes(bookname2)){
            this.creaAlert("danger","Bu kitabı okudunuz.")
        }        
        else{
            const newTr = document.createElement("tr");
            newTr.className="read-books";
            newTr.innerHTML += `
            <td>${bookname} </td>
            <td>${author}</td><button type="button"  class="btn btn-outline-danger read" style="margin-left:20%;">Sil</button>`
            kitapeklenecekyer.appendChild(newTr);
        }

       
    }
    static loadAllBooksToUI(){
        let books = Storage.getArrayFromStorage("books");
        books.forEach(function (book){
            const newTr = document.createElement("tr");
            newTr.className = "read-books";
            newTr.innerHTML +=`
            <td>${book.name}</td>
            <td>${book.author}</td><button type="button"  class="btn btn-outline-danger read" style="margin-left:20%;">Sil</button>`;
            kitapeklenecekyer.appendChild(newTr);
        });
    }
    static creaAlert(type,msg){
        let newAlert = document.createElement("div");
        newAlert.className = `alert alert-${type}`;
        newAlert.textContent = msg;
        inputElement.appendChild(newAlert);
        setTimeout(function(){
            newAlert.remove();
        },2000)

    }
    static addToWillBeRead(bookname,author){//Bu metodu Stroage classında kullandım.
       
        let wbReadTable = document.getElementById("willread");
        let newElement = document.createElement("tr");
        newElement.className="willbe-read-books";
        newElement.innerHTML +=`
        <td>${bookname}</td>
        <td>${author}</td><button type="button"  class="btn btn-outline-danger wbr" style="margin-left:20%;">Sil</button>`;
        wbReadTable.appendChild(newElement);
        window.location.reload(); // getArrayFromStorage metodu düzgün çalışsın diye sayfayı yeniledim.
        
    }
    static loadWillBeReadToUI(){

        let wbReadTable = document.getElementById("willread");
        let booksWBR = Storage.getArrayFromStorage("willBeRead");
        booksWBR.forEach(function(book){
            let newTag = document.createElement("tr");
            newTag.className ="willbe-read-books";
            newTag.innerHTML +=`
            <td>${book.name}</td>
            <td>${book.author}</td><button type="button" class="btn btn-outline-danger wbr" style="margin-left:20%;">Sil</button>`;
            wbReadTable.appendChild(newTag);
        });

    }
    static removeBookFromUI(target){
        let parentTag = target.parentElement;
        parentTag.remove(); // Removing from ui
        Storage.removeReadBookWithDeleteButton(parentTag.firstElementChild.textContent);
        this.creaAlert("success","Silme işlemi başarıyla tamamlandı.");


    }
    static removeWBRFromUI(target){
        let parentTag = target.parentElement;
        parentTag.remove();
        Storage.removeWBRWithDeletButton(parentTag.firstElementChild.textContent);
        this.creaAlert("success","Silme işlemi başarıyla tamamlandı.");
    }
    static deleteAllReadBooksFromUI(){
        const table = document.getElementById("booksneeded");
        table.innerHTML = "";
    }
    static deleteAllWBRBooksFromUI(){
        const table = document.getElementById("willread");
        table.innerHTML ="";
    }
}
