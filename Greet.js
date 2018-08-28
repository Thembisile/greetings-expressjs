module.exports = function (storedUser) {

  let person = '';
  let nameAndLang = '';
  let mapNames = {};

  async function greetingFunction(name, language) {

    if (name != '') {
      person = name
    }
    if (storedUser) {
      mapNames = storedUser
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
  }

  function returnGreeting() {
    return nameAndLang
  }

  function greetCounter() {
    return Object.keys(mapNames).length;
  }

  function nameMap() {
    return mapNames
  }

  function reset(name) {
    mapNames = {};
    return;
  }

  return {
    greetingFunction,
    returnGreeting,
    greetCounter,
    nameMap,
    reset
  }
}
