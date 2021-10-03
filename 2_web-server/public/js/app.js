const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const message = document.querySelector('.message');

const renderMessage = (data) => {
    let markup;
    if (!data.error) markup = `
        <p>Location: ${data.location}</p>
        <p>Forecast: ${data.forecast}</p>
    `;
    else markup = `
        <p style="color: red">${data.error}</p>
    `;

    message.innerHTML = '';
    message.insertAdjacentHTML('afterbegin', markup);
};

const fetchAndRenderWeather = async () => {
    const searchLocation = searchInput.value;
    const response = await fetch(`http://localhost:3000/weather?address=${searchLocation}`);
    const data = await response.json();

    if (data.error) console.log(data.error);

    renderMessage(data);
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message.innerHTML = `<p>Loading...</p>`;
    fetchAndRenderWeather();
});