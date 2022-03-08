const url = 'https://jsonplaceholder.typicode.com/posts'
// balise de toute l'app 
let app = document.querySelector('#app')
// console.log(app);
const header = document.querySelector('.header')

const form = document.querySelector('form')

const titleInput = document.querySelector('#titleInput')
const bodyInput = document.querySelector('#bodyInput')
const headerHtml = `
    <div class="header">
        <h1>Exos sur les API</h1>
            <h2>Ajout nouvelle API</h2>
                <div class="add">
                    <form method='post 'action="">
                        <label for="titleInput">Titre* :</label>
                        <input name='titleInput' id="titleInput" type="text" placeholder='rentrez titre ici'>
                        <label for="bodyInput">Corp* :</label>
                        <input name='bodyInput' id="bodyInput" type="text" placeholder='message...'>
                        <div class="btnInput"></input><input id='envoyer' value="envoyer" type="submit">
                    </form>            
                </div>
    </div>
`

// console.log(headerHtml)
function home()
{
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        let html ='';
        for(let element of myJson){
            html += `
            <div class="content">
                <h2> ${element.title}</h2>
                <p> ${element.body}</p>
                <button class="plus" id="${element.id}">En savoir plus !</button>
            </div>
            `
        } 
        // ajout du header dans l'app (balise html)
        app.innerHTML +=  headerHtml
        // ajout du retour de l'api        
        app.innerHTML += html
        // sendDateOld()
        const btn = document.querySelectorAll('.plus')
        return btn
    }).then(function(btn){
        showDetail(btn);
    })
};
// seconde page
// on renvoit la liste de bouton, le foreach permet de detecter l'id
// l'id permet d'appeler l'api avec le bon post
function showDetail(btn)
{
    btn.forEach(element => {
        element.addEventListener('click',() => {
            // console.log(element.id);
            let id = element.id;
            app.innerHTML = '<div id="app"></div>'
            // construire le nouveau 
            let urlPost = 'https://jsonplaceholder.typicode.com/posts/'+id
            fetch(urlPost)
            .then(function(response) {
                // console.log('ok');
                return response.json();
            })
            .then(function(myJsonSpe){
                // console.log('ok reponse');
                // console.log(myJsonSpe);
                let html = `
                <div id="${myJsonSpe.id}" class="article">
                <h2> ${myJsonSpe.title}</h2>
                <p> ${myJsonSpe.body}</p>
                <button id="return" >Return !</button>
                </div> 
                <h3> Commentaires de l'article</h3>                  
                `
                app.innerHTML += html
                let urlComment = 'https://jsonplaceholder.typicode.com/comments'
                fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(comments){
                    const article = document.querySelector('.article')                  
                    
                    // console.log(comments)
                    let html =''
                    comments.forEach(element => {
                        if(article.id == element.userId){
                            html += `
                            <h4>${element.title}</h4>  
                            <p>${element.body}</p>  
                            `
                        }
                    });
                    app.innerHTML += html
                    const btnreturn = document.querySelector('#return')
                    // console.log(btnreturn);
                    btnreturn.addEventListener('click', function () { 
                        console.log(app);
                        app = document.querySelector('#app')
                        app.innerHTML = `
                        <div id="app">
                            <div class="content">
                                <h2>Liste de tout les posts</h2>
                                    <!-- ajout en js -->
                            </div>
                        </div>
                        `
                        // 
                        console.log(app);
                        console.log('appel de la fonction home');
                        home()
                    })
                })
            })            
        })
    })       
}    


// envoie data
function sendDateOld() {form.addEventListener('submit', e => {
    e.preventDefault()

    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: titleInput.value,
    body: bodyInput.value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

});
}



home();