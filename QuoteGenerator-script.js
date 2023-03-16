const quoteContainer = document.getElementById('quote-container');

const quoteText = document.getElementById('quote');

const authorText = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');

const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show New Quote (Api verison)
function newQuote() {

    //Pick a random quote from apiQuotes array from the math.random and math.floor which are javascript codes already created. It's wrapped in math.floor so that it rounds to the whole number and not a decimal. If you look at the below code it is actually an equation such as x = 5[7(10 * 6)]. But, instead the mathfloow and mathrandom make it dynamic

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace with 'Unknown'
    if (!quote.author) {
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}


//This was put in the above portion right after creating the async function for grabbing the quotes from the API 
let apiQuotes = [];


//  Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
       getQuotes();
    }
}

// On load
getQuotes();


// To Tweet a Quote just as a reminder these use back ticks which are below the escape key

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


// // Event listeners - this targets the click event so that the button works
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);







