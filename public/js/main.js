
// fetch('http://jsonplaceholder.typicode.com/posts').then((response) => {
//     return response.json()
// }).then(result => console.log(result) ).catch(err => console.log(err))
// let browserLocation = 'ongole, andhra pradesh'
// let searchLocation = `http://api.weatherstack.com/current?access_key=0e61d2b26ddd9dfa30eba0e76f3944cf&query=${encodeURIComponent(browserLocation)}`;
// fetch(searchLocation).then((res) => {
//     return res.json();
// }).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // console.log('server', search.value);
    let searchLocation = `http://api.weatherstack.com/current?access_key=0e61d2b26ddd9dfa30eba0e76f3944cf&query=${encodeURIComponent(search.value)}`;
    fetch(searchLocation).then((res) => {
        return res.json();
    }).then((data) => {
        const {name, region, lat, lon} = data.location;
        messageOne.textContent = region +','+ name
        messageTwo.textContent = lat +','+ lon

    }).catch((err) => {
        console.log(err);
    })
})