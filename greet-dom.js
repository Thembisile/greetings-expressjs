var valueName = document.querySelector('.greetingText')
var greetButton = document.querySelector('.greetBtn')
var count = document.querySelector('.greetCount')
var displayArea = document.querySelector('.displayName')
var lang = document.querySelector('.languageSelectRadio')
var resetButton = document.querySelector('.resetBtn')
var usersRef = localStorage.getItem('users');


var storedUsers = usersRef ? JSON.parse(usersRef): {};

count.innerHTML =  Object.keys(storedUsers).length;

var greetFactory = GreetPerson(storedUsers)

function displayFunction(){
  var checkedGreetingRadio = document.querySelector("input[name='languageSelector']:checked");

  if (checkedGreetingRadio) {
    var language = checkedGreetingRadio.value
  }

  else {
    displayArea.innerHTML = "Please Select Language"
    displayArea.style.color = 'Orange'
    return;
  }

  var textValue = valueName.value.toUpperCase();

  greetFactory.greetingFunction(textValue, language)

  localStorage.setItem('users', JSON.stringify( greetFactory.nameMap()));

  displayArea.innerHTML =  greetFactory.returnGreeting()
  count.innerHTML = greetFactory.greetCounter()

  if (isNaN(textValue)) {
    displayArea.innerHTML =  greetFactory.returnGreeting()
  }
  else {
    displayArea.innerHTML = 'Enter A Name Please:'
    displayArea.style.color = 'Orange'
  }
}
greetButton.addEventListener('click', function(){
  displayFunction()
  valueName.value = '';
})
resetButton.addEventListener('click', function(){
  greetFactory.reset();
  count.innerHTML = 0;
  localStorage.clear()
  valueName.value = '';
  displayArea.innerHTML = '';
})
