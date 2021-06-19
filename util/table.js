function getDetails() {
    const response = await fetch('http://localhost:5000/api/m1m2join');
    const jsonData = await response.json();
    populateTable(jsonData)
}


function populateTable(jsonData) {
    var tableBody = document.getElementsById("tableBody");

    for(var i=0; i<jsonData.length; i++){
        tableBody.innerHTML += `<tr>
        <th scope="row">${i}</th>
        <td>${jsonData[i].full_name}</td>
        <td>${jsonData[i].email}</td>
        <td>${jsonData[i].number}</td>
      </tr>` 

    }


}
