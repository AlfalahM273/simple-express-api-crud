const fs = require('fs');

const PERSON_SEQ_PATH = "./src/db/person_seq.json";

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
        var data = fs.readFileSync(PERSON_SEQ_PATH);
        var dataJson = JSON.parse( data );
        this.id = dataJson.next_id;
        dataJson.current_id = dataJson.next_id;
        dataJson.next_id +=1;
        fs.writeFileSync(PERSON_SEQ_PATH,  JSON.stringify( dataJson ) );
    }

    toJson(  ) {
        return {
            id : this.id,
            name : this.name,
            age : this.age,
            address : this.address,
        }
    }
  
}
