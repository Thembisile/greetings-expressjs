module.exports = function (storedUser){

  var person = '';
  var greetingDone = 0;
  var nameAndLang = '';
  var mapNames = {};
  let error;

  function insertGreeting(){
    return greetingDone;
  }

  async function greetingFunction(name, language){

    if (name === undefined || language === undefined) {
      error = 'Please Enter Name & Choose Your Greeting Langauage';
      return error;
    }
    if(name != ''){
      person = name
    }
    if (storedUser) {
        mapNames = storedUser
    }
    if(person !== ""){

    if(mapNames[person] === undefined){

     mapNames[person] = 0;
      }
    }
  
    if (language === 'English') {
      nameAndLang = 'Hello, ' + name;
    }
    if(language === 'Afrikaans'){
      nameAndLang = 'Goeie Dag, ' + name;
    }
    if (language === 'IsiXhosa') {
      nameAndLang = 'Molo, ' + name;
    }
  }

  function returnGreeting(){
    return nameAndLang
  }

  function greetCounter(){
    return Object.keys(mapNames).length;
  }

  function nameMap(){
    return mapNames
  }

  function reset(name){
    mapNames = {};
    person = '';
    name = '';
    greetingDone = 0;
    return ;
  }

  return {
    greetingFunction,
    returnGreeting,
    greetCounter,
    nameMap,
    reset,
    insertGreeting
  }
}
