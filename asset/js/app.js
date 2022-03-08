const url = 'https://jsonplaceholder.typicode.com/posts'
const header = document.querySelector('.header')
console.log(header);
const content = document.querySelector('.list')
const form = document.querySelector('form')

const titleInput = document.querySelector('#titleInput')
const bodyInput = document.querySelector('#bodyInput')

function test(){console.log('est');}


    headerHtml = `
    <div class="test">
    <div class="header">
    <h1>Exos sur les API</h1>
        <h2>Ajout nouvelle API</h2>
            <div class="add">
                <form method='post 'action="">
                    <label for="titleInput">Titre</label>
                    <input name='titleInput' id="titleInput" type="text">
                    <label for="bodyInput">Corp</label>
                    <input name='bodyInput' id="bodyInput" type="text">
                    <input id='envoyer' value="envoyer" type="submit">
                </form>            
    </div>
    </div>
    </div>
    `

console.log(headerHtml)
function home()
{
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        // console.log('reponse ok');
        // console.log(myJson);
        
        console.log(headerHtml)
        let html
        for(let element of myJson){
            // console.log(element);
            html += `
            <h2> ${element.title}</h2>
            <p> ${element.body}</p>
            <button class="plus" id="${element.id}">En savoir plus !</button>
            `
        } 
        document.body.innerHTML +=  headerHtml      
        const test = document.querySelector('.test') 
        
        test.innerHTML += html

        const btn = document.querySelectorAll('.plus')
        return btn
    }).then(function(btn){
        // showDetail(btn);
    })
};
// seconde page
// on renvoit la liste de bouton, le foreach permet de detecter l'id
// l'id permet d'appeler l'api avec le bon post

function showDetail(btn)
{
    btn.forEach(element => {
        element.addEventListener('click',() => {
            console.log(element.id);
            let id = element.id;
            document.body.innerHTML = ''
            // construire le nouveau 
            let urlPost = 'https://jsonplaceholder.typicode.com/posts/'+id
            fetch(urlPost)
            .then(function(response) {
                console.log('ok');
                return response.json();
            })
            .then(function(myJsonSpe){
                console.log('ok reponse');
                console.log(myJsonSpe);
                let html = `
                <div id="${myJsonSpe.id}" class="article">
                <h2> ${myJsonSpe.title}</h2>
                <p> ${myJsonSpe.body}</p>
                <button id="return" >Return !</button>
                </div> 
                <h3> Commentaires de l'article</h3>                  
                `
                document.body.innerHTML = html
                let urlComment = 'https://jsonplaceholder.typicode.com/comments'
                fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(comments){
                    const article = document.querySelector('.article')
                    
                    
                    console.log(comments)
                    let html =''
                    comments.forEach(element => {
                        if(article.id == element.userId){
                            html += `
                            <h4>${element.title}</h4>  
                            <p>${element.body}</p>  
                            `
                        }
                    });
                    document.body.innerHTML += html
                    const btnreturn = document.querySelector('#return')
                    console.log(btnreturn);
                    btnreturn.addEventListener('click', function () { 
                        document.body.innerHTML = '';
                        console.log('test');
                        home()
                    })
                })
            })            
        })
    })       
}    

home();
// envoie data
form.addEventListener('submit', e => {
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
