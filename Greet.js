module.exports = function (storedUser) {

  let person = '';
  let nameAndLang = '';
  let mapNames = {};

  function greetingFunction(name, language) {

    if (name != '') {
      person = name
    }
    if (person !== "") {

      if (mapNames[person] === undefined) {

        mapNames[person] = 0;
      }
    }

    if (language === 'English') {
      nameAndLang = 'Hello, ' + name;
    }
    if (language === 'Afrikaans') {
      nameAndLang = 'Goeie Dag, ' + name;
    }
    if (language === 'IsiXhosa') {
      nameAndLang = 'Molo, ' + name;
    }
    return nameAndLang;
  }

  function returnGreeting() {
    return nameAndLang
  }

  function greetCounter() {
    return Object.entries(mapNames).length;
  }

  function nameMap() {
    return mapNames
  }

  function reset() {
     person = '';
     nameAndLang = '';
     mapNames = {};
     
  }

  return {
    greetingFunction,
    returnGreeting,
    greetCounter,
    nameMap,
    reset
  }
}
