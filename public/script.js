var cart = [];
var sum = 0;
var data;

document.getElementById("getPrice").onclick = function() {
  var search = document.getElementById("inp").value;
  data.forEach((item) => {
    if (item.name == search) {
      document.getElementById("itemPrice").innerHTML = item.price;
    }
  });
};

window.onload = async function() {
  const response = await fetch(`/getPrice/`);
  data = await response.json();
  for (var i = 0; i < data.length; i++) {
    var table = document.getElementById("myTable");
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var addBtn = document.createElement('button');
    addBtn.setAttribute('id', `addToCart ${i}`);
    addBtn.innerHTML = `+`;
    addBtn.onclick = function() {
      cart.push(data[parseInt(this.id.split(" ")[1])]);
      updateReciept(data[parseInt(this.id.split(" ")[1])]);
    }
    cell1.innerHTML = data[i].name;
    cell2.innerHTML = data[i].price;
    cell3.appendChild(addBtn);
  }
}

function updateReciept(item) {
  sum += item.price;
  var recrow = document.getElementById("receipt").insertRow(1);
  recrow.insertCell().innerHTML = item.name;
  recrow.insertCell().innerHTML = item.price;
  document.getElementById("total").innerHTML = sum.toFixed(2);
  console.log(cart);
}

document.getElementById("checkout").onclick = async function() {
  await fetch('/pay/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "payment": "VISA",
      "amount": sum.toFixed(2)
    })
  }).then(location.reload());
};

document.getElementById(`${this}.id`).attributes;