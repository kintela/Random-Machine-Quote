var quotes=[
  {
    quote:'no hay mal que por bien no venga',
    author:'mi madre'
  },
  {
    quote:'Estudia que es pati...',
    author:'mi padre'
  },
]

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = '', currentAuthor = '';

$(document).ready(function(){
  getQuote();
});
function inIframe () { 
  try 
    { 
      return window.self !== window.top; 
    } 
  catch (e) {
    return true;
  }
}

function getQuote(){
  currentQuote=quotes[0].quote;
  currentAuthor=quotes[0].author;
  if(inIframe())
  {
    $('#tweet-quote').attr('href',      'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +   encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));    
  }
  
  $(".quote-text").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#text').text(currentQuote);
        });
        
    $(".quote-author").animate({
        opacity: 0
    }, 500,
    function() {
        $(this).animate({
        opacity: 1
        }, 500);
        $('#author').html(currentAuthor);
    });
    
    var color = Math.floor(Math.random() * colors.length);
      $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);
      $(".button").animate({
        backgroundColor: colors[color]
      }, 1000);
  
}