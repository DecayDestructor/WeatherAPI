const submit = document.querySelector('button')
const input = document.querySelector('input')
const container = document.querySelector('.container')
let loc = container.querySelector('h2')
let temperature = container.querySelectorAll('.temperature')
let lastUpdated = container.querySelector('.lastUpdated')
const wind = container.querySelector('.wind')
const img = container.querySelector('img')
const stat = container.querySelector('.status')
console.log(wind)
const fetchData = async (value) => {
  if (value.trim() == '') {
    input.value = 'Mumbai'
  }
  const response = await fetch(
    'http://api.weatherapi.com/v1/current.json?key=3b53d3d6f8fa460591985707242601&q=' +
      value +
      '&aqi=no'
  )
  const data = await response.json()

  console.log(data)
  loc.textContent = data.location.name + ', ' + data.location.region
  temperature[0].textContent = data.current.temp_c + '° C'
  temperature[1].textContent = data.current.temp_f + '° F'
  if (data.current.temp_c <= 20) {
    console.log('inside below 20 degree')
    container.classList.remove('_20_35degree')
    container.classList.add('_below_20degree')
    container.classList.remove('_35_45degree')
    container.classList.remove('_above_45degree')
  } else if (data.current.temp_c > 20 && data.current.temp_c < 36) {
    console.log('inside 20 and 35 degree')
    container.classList.add('_20_35degree')
    container.classList.remove('_below_20degree')
    container.classList.remove('_35_45degree')
    container.classList.remove('_above_45degree')
  } else if (data.current.temp_c > 35 && data.current.temp_c < 46) {
    console.log('inside 35 and 46 degree')
    container.classList.remove('_20_35degree')
    container.classList.remove('_below_20degree')
    container.classList.add('_35_45degree')
    container.classList.remove('_above_45degree')
  } else {
    console.log('inside  above 45 degree')
    container.classList.remove('_20_35degree')
    container.classList.remove('_below_20degree')
    container.classList.remove('_35_45degree')
    container.classList.add('_above_45degree')
  }
  wind.textContent = 'Wind: ' + data.current.wind_kph + ' kph'
  lastUpdated.textContent = 'Last Updated: ' + data.current.last_updated
  img.src = data.current.condition.icon
  stat.textContent = data.current.condition.text
}
fetchData('Mumbai')
submit.addEventListener('click', async () => {
  try {
    fetchData(input.value)
  } catch (err) {
    alert('Please enter a valid location')
  }
})
