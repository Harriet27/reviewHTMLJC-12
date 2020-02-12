// Init value
var arrProduct = [
    { id: 1579581080923,category: 'Fast Food' , name: "Noodle", price: 3500, stock : 9},
    { id: 1579581081130,category: 'Electronic' , name: "Headphone", price: 430000, stock :8 },
    { id: 1579581081342,category: 'Cloth' , name: "Hoodie", price: 300000, stock :7 },
    { id: 1579581081577,category: 'Fruit' , name: "Apple", price: 10000, stock :8 }
  ];
  
// init value
var arrCategory = ["All", "Fast Food", "Electronic", "Cloth", "Fruit"];

let arrCart = []

let add = (index) => {
    
    // try to find if the product already in cart
    var foundCart = arrCart.find((val) => val.id == index)

    // the product is not in the cart
    if (!foundCart){
        // find selected product by id
        var selectedProduct = arrProduct.find((val) => val.id == index )
        // push selected product and add 'qty' property
        arrCart.push({...selectedProduct, qty:1})

    } else {
        // the product is in the cart
        // find the index
        var idx = arrCart.findIndex((val) => val.id == index)
        // update qty the product based in index
        arrCart[idx].qty ++
    }

    cartShow()
}

// show cart
var cartShow = () => {

    var listCart = arrCart.map((val) => {
        return (
            `
            <tr>
                <td>${val.id}</td>
                <td>${val.category}</td>
                <td>${val.name}</td>
                <td>${val.price}</td>
                <td>${val.qty}</td>
                <td><input type='button' value='Delete' onclick="deleteCart(${val.id})"/></td>
            </tr>
            `
        )
    })

    document.getElementById('cart').innerHTML = listCart.join('')
}

var deleteCart = (index) => {
    arrCart = arrCart.filter((val) => {
        return val.id !== index
    })

    cartShow()
    
}

// calculate all items in cart
var payment = () => {
    // mapping cart into detail
    var listPayment = arrCart.map((val) => {
        return `
            <p>${val.category} | ${val.name} | Rp ${val.price} X ${val.qty} = Rp. ${val.price * val.qty} </p>
        `
    })

    // calculate sum of all prices
    var subTotal = 0
    for (let i = 0; i < arrCart.length; i++) {
        subTotal += arrCart[i].price;
    }

    // calculate ppn and final total (grand total)
    var ppn = subTotal * 0.01
    var grandTotal = subTotal + ppn
    // create list for what to be displayed
    var transactionDetail = listPayment.join('') + `<h3>Sub Total : Rp ${subTotal}</h5> <h3>Ppn : Rp ${ppn}</h5> <h3>Total : Rp ${grandTotal}</h5>`
    // put it into html
    document.getElementById('payment').innerHTML = transactionDetail
}

// Merender list data ke tabel
var funShow = (index) => {
    // mapping array of product
    var listProduct = arrProduct.map((val, id) => {
        // if product's index (val.id) match with choosen index (index)
        if(val.id !== index) {
            return (
                `
                <tr>
                    <td>${val.id}</td>
                    <td>${val.category}</td>
                    <td>${val.name}</td>
                    <td>${val.price}</td>
                    <td>${val.stock}</td>

                    <td><input type='button' value='Add' onclick="add(${val.id})"/></td>

                    <td><input type='button' value='Delete' onclick="deleteData(${val.id})"/></td>
                    <td><input type='button' value='Edit' onclick="edit(${val.id})"/></td>
                </tr>
                `
            )
        }

        // if product's index (val.id) match with choosen index (index)
        return (
            `
            <tr>
                <td><input value='${val.id}' disabled type="text" id="categoryEdit"></td>
                <td><input value='${val.category}' disabled type="text" id="categoryEdit"></td>
                <td><input value='${val.name}' type="text" id="nameEdit"></td>
                <td><input value='${val.price}' type="text" id="priceEdit"></td>
                <td><input value='${val.stock}' type="text" id="stockEdit"></td>

                <td><input disabled type='button' value='Add' onclick="add(${val.id})"/></td>
                <td><input type='button' value='Save' onclick='save(${val.id})'/></td>
                <td><input type='button' value='Cancel' onclick='cancel(${val.id})'/></td>
            </tr>
            `
        )
    })

    // mapping array of category
    var listCategory = arrCategory.map(val => { // val = string seperti 'All', 'Dev', 'CEO'
        return `<option value='${val}'>${val}</option>`
    })

    // put list into their respective places
    document.getElementById('render').innerHTML = listProduct.join('')
    document.getElementById('categoryFilter').innerHTML = listCategory.join('')
    document.getElementById('categoryInput').innerHTML = listCategory.join('')

}

let funShowFilter = (list) => {
    list = list.map((val) => {
        return (
            `
            <tr>
              <td>${val.id}</td>
              <td>${val.category}</td>
              <td>${val.name}</td>
              <td>${val.price}</td>
              <td>${val.stock}</td>
              <td><input type='button' value='Delete' onclick="deleteData(${val.id})"/></td>
              <td><input type='button' value='Edit' onclick="edit(${val.id})"/></td>
            </tr>
            `
        )
    });
    
    document.getElementById("render").innerHTML = list.join("");
}

// input data
var funInputData = () => {
    // Get data from html
    var _category = document.getElementById('categoryInput').value
    var _name = document.getElementById('nameInput').value
    var _price = document.getElementById('priceInput').value
    var _stock = document.getElementById('stockInput').value
    // create date instance
    var time = new Date()

    // Push new object data
    arrProduct.push({
        id: time.getTime(),
        category : _category,
        name : _name,
        price : _price,
        stock : _stock
    })

    // Clean all text box
    document.getElementById("nameInput").value = '';
    document.getElementById("priceInput").value = '';
    document.getElementById("categoryInput").value = '';
    document.getElementById("stockInput").value = '';

    // show the list
    funShow()

}

// filter name
var funFilterName = () => {
    // Get data from user
    var keyword = document.getElementById("keyword").value;
  
    // Filtering
    var filterResult = arrProduct.filter(val => {
      // val = {category, name, price, stock}
      // make all characters of product's name to lowercase
      var nameLow = val.name.toLowerCase();
      // make all characters of filter's keyword to lowercase
      var filterLow = keyword.toLowerCase();
  
      return nameLow.includes(filterLow);
    });
  
    funShowFilter(filterResult)
  
  };

// filter price
var funFilterPrice = () => {
    // get min value
    var min = document.getElementById("min").value;
    // get max value
    var max = document.getElementById("max").value;
  
    var filterResult;
  
    // all text boxes don't empty
    if (!(min == "" || max == "")) {
      // filtering based on min and max values
      filterResult = arrProduct.filter(val => {
        return val.price >= min && val.price <= max;
      });
  
    } else {
        // copy all products
      filterResult = arrProduct
    }
  
    funShowFilter(filterResult)
  
  };


// filter category
var funFilterCategory = () => {
    // get value from category list
    var selectedCategory = document.getElementById("categoryFilter").value;
    // create variable for save the result of filter
    var filterResult;
  
    // if we choose 'all' menu on category list
    if (selectedCategory == "All") {
      // copy all products
      filterResult = arrProduct;
    } else {
      // filtering based on choosen category
      filterResult = arrProduct.filter(val => {
        return val.category == selectedCategory;
      });
    }
  
    funShowFilter(filterResult)
};

// delete
var deleteData = (index) => {
    // filtering product and remove selected product
    arrProduct = arrProduct.filter((val) => {
        return val.id !== index
    })

    funShow()
    
}

// enabled edit mode
var edit = (index) => {
    // run show function with selected index
    funShow(index)
}

// cancel edit mode
var cancel = () => {
    // run show function without selected index
    funShow()
}


// save data
var save = (index) => {
    // get all new data from text boxt
    var _name = document.getElementById('nameEdit').value
    var _price = parseInt(document.getElementById('priceEdit').value)
    var _stock = parseInt(document.getElementById('stockEdit').value)

    var found = arrProduct.findIndex((val) => val.id == index)

    // replace name, price, and stock property with new values
    // it calls destructuring object
    // https://dev.to/quantumsheep/all-you-need-to-know-about-destructuring-in-javascript-1hla

    arrProduct[found] = {
        ...arrProduct[found],
        name : _name,
        price : _price,
        stock : _stock
    }

    funShow()
}


funShow()

