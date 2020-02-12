var arr = [1,2,3]
var newArr = [...arr,4,5,6] //spread operator

var obj = {
    nama: 'lian',
    nama: 'andi'
}

var newObj = {
    ...obj,
    pekerjaan : 'coder',
    nama : 'susilo'
}

// console.log(newObj)

var obj = {
    nama: 'lian'
}
// console.log(obj)

obj.nama = 'andi'
// console.log(obj)


var arr = [
    {namaDepan: 'susil', usia : [2,3]},
    {namaDepan: 'jokoo', usia : [2,3,5]},
    {namaDepan: 'lian', usia : [2,3,5,6]},
]
var contoh = arr.findIndex((val) => {
    return val.usia.length === 2
})



var obj = {
    nama: 'lian',
    usia : 23
}

var newObj = {
    ...obj,
    count : 1
}

var arr = [1,2,3]
var newArr = [...arr,4,5,6]
console.log(newObj)