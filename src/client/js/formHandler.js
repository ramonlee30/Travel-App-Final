import { start, stopTimer } from "./countdown"
import { checkForLocation } from "./locationChecker"

  // function on submit
function handleSubmit(event) {
    event.preventDefault()
    const locationInput = document.getElementById('name').value;
    const date = document.getElementById('date').value
    const date2 = document.getElementById('date2').value
    var time = Math.abs(new Date(date2).getTime() - new Date(date).getTime());;
    var diffDays = Math.ceil(time / (1000 * 3600 * 24));
    checkForLocation();
    stopTimer();
    start();
    updateUI();
    document.getElementById('location').innerHTML = 'My trip to ' + locationInput.charAt(0).toUpperCase() + locationInput.slice(1);;
    document.getElementById('dateres').innerHTML = 'Departing on ' + date.split('-').reverse().join('/');
    document.getElementById('name').value = "";
    document.getElementById('datesubs').innerHTML = "Length of " + diffDays + " days";
}

const getData = async () => {
    const locationInput = document.getElementById('name')
    try {
        const response = await fetch('/trip/'+locationInput.value);
        if(response.ok) {
            console.log("heel")
          return await response.json().then(e => e);
        }
      } catch(error) {
        console.log('error', error);
      }
};


const updateUI = async () => {
    const data = await getData();
    console.log(data)
    document.getElementById('results').innerHTML = 'The weather is '+ data.temperature + "&deg"
    document.getElementById('photo').src = data.photo;

}

export { handleSubmit }

