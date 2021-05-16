// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  let counter = 1;
  let home = document.querySelector('h1');
  let settings = document.querySelector('img')
  let main = document.querySelector('main');
  let body = document.querySelector('body');

  home.addEventListener('click', function () {
    setState("home", home);
  });

  settings.addEventListener('click', function () {
    setState("settings", settings);
  });

  history.pushState("home", "", "");

  window.onpopstate = function (event) {

    // on back button press remove entry page from the DOM and insert blank page
    let entryPage = document.querySelector('entry-page');
    entryPage.remove();
    main.insertAdjacentHTML('afterend', '<entry-page><entry-page>');
    let newEntryPage = document.querySelector('entry-page');


    if (event.state == "home") {

      body.removeAttribute('class');
      home.innerHTML = 'Journal Entries';

    } else if (event.state == "settings") {

      body.className = "settings";
      home.innerHTML = 'Settings';

    } else {

      // get journal entry id from state
      let id = event.state;
      let journalEntryElement = document.getElementById(id);
      body.className = "single-entry";
      home.innerHTML = `Entry ${id}`;
      newEntryPage.entry = journalEntryElement.entry;
    }

  };

  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {

        let newPost = document.createElement('journal-entry');
        newPost.id = counter;
        counter = counter + 1;

        newPost.addEventListener('click', function () {
          setState(newPost.id, newPost);
        });

        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

      });
    });
});
