// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
// window.addEventListener('load', setState);
// Make sure you register your service worker here too


document.addEventListener('DOMContentLoaded', () => {
  let counter = 0;
  let home = document.querySelector('h1');
  let settings = document.querySelector('img')
  let main = document.querySelector('main');
  let body = document.querySelector('body');

  home.addEventListener('click', function() {
    setState("home", home);
  });

  settings.addEventListener('click', function() {
    setState("settings", settings);
  });

  history.pushState("home", "title", "index.html");

  window.onpopstate = function(event) {
    let entryPage = document.querySelector('entry-page');
    entryPage.remove();
   
    if(event.state == 'home') {
      main.insertAdjacentHTML('afterend', '<entry-page><entry-page>')
      body.classList.remove("single-entry");
      body.classList.add("home");
    }
  };

  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.id = counter;
        counter = counter + 1;
        newPost.addEventListener('click', function() {
          setState("/#entry" + newPost.id, newPost);
        });
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});
