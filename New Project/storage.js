class Storage{
    static getArrayFromStorage(type){
        let list;
        if(localStorage.getItem(type)===null){
            list=[];

        }
        else{
            list = JSON.parse(localStorage.getItem(type));
        }
        return list;
    }

    static addBookToStorage(newBook){
        
        let books = this.getArrayFromStorage("books");
        let books1 = Array.from(books);// Kitap isimlerini almak için array yarattım.
        let liste = [];
        books1.forEach(function(book){
            let name = book.name.toLowerCase();
            liste.push(name);
        })
        console.log(liste);
        console.log(newBook.name);
        if(liste.includes(newBook.name.toLowerCase())){//Daha önceden böyle bir kitap kayıtlı mı diye baktık. 
            
        }
        else{
            books.push(newBook);
            localStorage.setItem("books",JSON.stringify(books));
            window.location.reload();//Burda removeReadBookWithDeleteButton() metodunun çalışması için güncel local storage a ulaşmam lazımdı o yüzden

        }
    }
    static addToWillBReadStorage(newBook){

        let books = this.getArrayFromStorage("willBeRead");
        let books1= Array.from(books);
        let liste = [];
        books1.forEach(function(book){
            let bookText = book.name.toLowerCase();
            liste.push(bookText);
        });
        if(liste.includes(newBook.name.toLowerCase())){

            UI.creaAlert("danger","Okuyacaklarımın içerisinde böyle bir kitap var.");
        }
        else{
            UI.addToWillBeRead(newBook.name,newBook.author); // Modülerlik bozulmuş olabilir ama kod fazlalığından bir nebze kurtuldum.
            books.push(newBook);
            localStorage.setItem("willBeRead",JSON.stringify(books));

        }
    }
    static removeReadBookWithDeleteButton(comingName){
        let books = this.getArrayFromStorage("books");
        for (const book of books) {
            if(book.name === comingName){
                let number = books.indexOf(book);//Index e göre sileceğimiz için index lazım.
                books.splice(number,1);
                localStorage.setItem("books",JSON.stringify(books));
            }
        }
    }
    static removeWBRWithDeletButton(comingWBR){
        let wbrbooks = this.getArrayFromStorage("willBeRead");
        for (const book of wbrbooks) {
            if(book.name === comingWBR){
                let number = wbrbooks.indexOf(book);
                wbrbooks.splice(number,1);
                localStorage.setItem("willBeRead",JSON.stringify(wbrbooks));
            }
        }
    }
    static deleteAllReadBooksFromStorage(){
        localStorage.removeItem("books");// books keyi localdaStr'den silindi
        
    }
    static deleteAllWBRBooksFromStorage(){
        localStorage.removeItem("willBeRead");// willBeRead keyi localdaStr'den silindi
        
    }
    

}