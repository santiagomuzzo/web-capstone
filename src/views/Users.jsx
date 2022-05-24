import React from "react";
import { useEffect } from 'react';

function Users () {
  const [person, setPerson] = React.useState([]);

  useEffect(() => {
    getPerson();
  }, []);

  async function getPerson() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(JSON.parse(this.responseText));
        setPerson(JSON.parse(this.responseText));
      }
    };
    xhr.open("GET", "https://test-mankuk-api.azurewebsites.net/person", true);
    xhr.send();
  }


  const listPerson = person.map((oneperson) => 
    <li>{oneperson.nombre} {oneperson.apellido} id: {oneperson._id}</li>
  );

  return (
    <div class = "users">
      <ul>{listPerson}</ul>
    </div>
  );
}

export default Users;