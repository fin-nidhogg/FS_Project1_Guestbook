const entryform = document.getElementById("entryform");
const tabledata = document.getElementById("tabledata");


window.onload = event => {
    console.log("document loaded");
    getMessages();

    // Lisätään kuuntelija formille
    entryform.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const country = document.getElementById('country').value;
        const message = document.getElementById('message').value;

        // Tarkistetaan että kentät eivät ole tyhjiä ennen datan lähettämistä
        if (username === '' || country === '' || message === '') {
            alert('Please fill in all fields');
            return;
        }
        else {
            sendData(username, country, message);
            getMessages();
            entryform.reset();
        }
    });
}


// Funktio tietojen hakemiseksi palvelimelta
async function getMessages() {
    const response = await fetch("/entries");
    const messages = await response.json();

    // Tyhjennetään taulukko ennen uuden datan lisäämistä
    tabledata.innerHTML = '';
    messages.forEach(message => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${message.id}</td>
        <td>${message.username}</td>
        <td>${message.country}</td>
        <td>${message.date}</td>
        <td>${message.message}</td>
        `;
        tabledata.appendChild(tr);
    });
}


// Funktion ajaxpyynnön lähettämiseksi palvelimelle käyttäen fetch-metodia
const sendData = async (username, country, message) => {
    try {
        const response = await fetch('/newajaxmessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, country, message })
        });

        if (response.ok) {
            console.log('Data sent successfully');
            console.log(response);
        } else {
            console.log('Failed to send data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// TODO ilmeisesti CORS ongelma localhostin kanssa?