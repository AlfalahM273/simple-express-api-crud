
const fs = require('fs');

module.exports.Person = class Person {
    id;
    name;
    age;
    address;
  
    fromJSON( jsonData ) {
        this.name = jsonData.name;
        this.age = jsonData.age;
        this.address = jsonData.address;
    }

    prepareData(  ) {
        var data = fs.readFileSync('./db/person_seq.json');
        var dataJson = JSON.parse( data );
        this.id = dataJson.next_id;
        dataJson.current_id = dataJson.next_id;
        dataJson.next_id +=1;
        fs.writeFileSync("./db/person_seq.json",  JSON.stringify( dataJson ) );
    }

    toJson(  ) {
        return {
            "id" : this.id,
            "name" : this.name,
            "age" : this.age,
            "address" : this.address,
        }
    }
  
}
