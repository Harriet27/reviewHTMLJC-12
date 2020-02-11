var arrProduct = [
  { id: 1579581080923,category: 'Fast Food' , name: "Noodle", price: 3500, stock : 9},
  { id: 1579581081130,category: 'Electronic' , name: "Headphone", price: 4300000, stock :8 },
  { id: 1579581081342,category: 'Cloth' , name: "Hoodie", price: 300000, stock :7 },
  { id: 1579581081577,category: 'Fruit' , name: "Apple", price: 10000, stock :8 }
];

var arrCategory = ["All", "Fast Food", "Electronic", "Cloth", "Fruit"];

var cart = []

var showMenu = (idProduct) => {
  // idProduct = 3
  var listMenu = arrProduct.map((elem, index ) => {
    // 1 === 3
    // 2 === 3
    // 3 === 3
    if(elem.id === idProduct){
    return(
      `
      <tr>
        <td>${elem.id}</td>
        <td><input type="text" value="${elem.name}" id="editNama"></td>
        <td>${elem.category}</td>
        <td><input type="number" value="${elem.price}" id="editPrice"></td>
        <td><input type="number" value="${elem.stock}" id="editStock"></td>
        <td><input type="button" value="Cancel" onclick="cancelEdit()"></td>
        <td><input type="button" value="Save" onclick="saveData(${index})"></td>
      </tr>
    `
    )}
    // addToCart(0)
    return(
      `
        <tr>
          <td>${elem.id}</td>
          <td>${elem.name}</td>
          <td>${elem.category}</td>
          <td>${elem.price.toLocaleString()}</td>
          <td>${elem.stock}</td>
          <td><input type="button" value="Add" onclick="addToCart(${index})"></td>
          <td><input type="button" value="Delete" onclick="deleteData(${elem.id})"></td>
          <td><input type="button" value="Edit" onclick="editData(${elem.id})"></td>
        </tr>
      `
    )
  })

  

  // console.log(listMenu)
  document.getElementById("categoryInput").innerHTML = listCategory.join('')
  document.getElementById("categoryFilter").innerHTML = listCategory.join('')
  document.getElementById("output").innerHTML = listMenu.join('')
}

var showCartMap = () => {
  var cartShow = cart.map((val) => {
    return(
      `
      <tr>
        <td>${val.id}</td>
        <td>${val.category}</td>
        <td>${val.name}</td>
        <td>${val.price.toLocaleString()}</td>
        <td><input type="button" value="Delete" onclick="deleteData(${val.id})"></td>
      </tr>
      `
    )
  }) 
  return document.getElementById("showCart").innerHTML = cartShow.join('')
}

var addToCart = (index) => {
  cart.push(arrProduct[index])
  console.log(cart)
  showCartMap()
}

var listCategory = arrCategory.map((elem) => {
  return(
    `
      <option value='${elem}'>${elem}</option>
    `
  )
})

var addData = () => {
  var nama = document.getElementById("nama").value;
  var harga = document.getElementById('harga').value;
  var stock = document.getElementById('stock').value;
  var category = document.getElementById('categoryInput').value;
  var time = new Date()

  var newProduct = {
    id: time.getTime(),
    name: nama,
    price: harga,
    stock,
    category
  }

  arrProduct.push(newProduct)
  showMenu()
}

var filterNama = () => {
  var nama = document.getElementById('namaFilter').value

  var namaLower = nama.toLowerCase()
  var output = arrProduct.filter((val,) => {
    var namaProdLower = val.name.toLowerCase()
    return namaProdLower.includes(namaLower)
  })
  showFilterResult(output)
}

var showFilterResult = (hasilFilter) => {
  var results = hasilFilter.map((val) => {
    return(
      `
        <tr>
          <td>${val.id}</td>
          <td>${val.name}</td>
          <td>${val.category}</td>
          <td>${val.price.toLocaleString()}</td>
          <td>${val.stock}</td>
          <td><input type='button' value='Add'></td>
          <td><input type='button' value='Delete'></td>
          <td><input type='button' value='Edit'></td>
        </tr>
      `
    )
  })
  return document.getElementById('output').innerHTML = results.join('')
}

var filterCategory = () => {
  var category = document.getElementById('categoryFilter').value;
  if(category === 'All'){
    return showFilterResult(arrProduct)
  }
  let showCategoryFilter = arrProduct.filter((val) => {
    return val.category === category
  })
  showFilterResult(showCategoryFilter)
}

var filterHarga = () => {
  var hargaMin = document.getElementById('hargaMin').value;
  var hargaMax = document.getElementById('hargaMax').value;
  // hargaMin !== '' && hargaMax !== ''
  if(!(hargaMin === '' || hargaMax === '')){
    var filterHarga = arrProduct.filter((val) => {
      return val.price >= hargaMin && val.price <= hargaMax
    })
  }else{
    filterHarga = arrProduct
  }
  return showFilterResult(filterHarga)
}

var deleteData = (idProduct) => {
  console.log(idProduct)
  arrProduct = arrProduct.filter((val) => {
    return val.id !== idProduct
  })
  showMenu()
}

var editData = (id) => {
  showMenu(id)
}

var saveData = (index) => {
  // index = 0
  console.log(index)
  var nama = document.getElementById('editNama').value;
  var price = document.getElementById('editPrice').value;
  var stock = document.getElementById('editStock').value
  // arrProduct[index].name = nama
  // arrProduct[index].price = price
  // arrProduct[index].stock = stock
  arrProduct[index] = {
    ...arrProduct[index],
    name : nama,
    price,
    stock
  }
  showMenu()
}

var cancelEdit = () => {
  showMenu()
}




showMenu()
showCartMap()