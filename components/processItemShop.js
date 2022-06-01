
import { Api, base_url } from '../Env'
import axios from 'axios'
//import { DrawerContentScrollView } from '@react-navigation/drawer'
import Toast from 'react-native-simple-toast';



//get sedes
async function getSedes() {
  let list
  await axios.get(base_url(Api, `venues`)).then(function (response) {
    list = response.data
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });
  return list
}


//SELECT * FROM car WHERE user_info=$user_info
async function getCar(user_info) {
  let Data
  await axios.get(base_url(Api, `get/car/${user_info}`)).then(function (response) {
    Data = response.data
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });
  return Data
}




// SELECT * FROM categories
async function getcategories() {
  let Categories = []
  await axios.get(base_url(Api, `categories`)).then(function (response) {
    Categories = response.data
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });
  return Categories
}





//SELECT * FROM productos de la tienda on-line
async function getShop(page) {
  Page = page
  let ProductList

console.log("shop")
  console.log(base_url(Api, `paginate/products?page=1`))

  await axios.get(base_url(Api, `paginate/products?page=1`)).then(function (response) {
    //await axios.get(base_url(Api,`products`)).then(function (response) {
    ProductList = response.data
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });
  return ProductList
}





// agregar y actualizar carrito de compras 
async function AddCar(car, item, user, value, id) {

  const Car = car; // estado actual de la tabla carrito filtrando por el id del usuario cliente
  const user_info = user.id; //informacion del usuario cliente(id)
  const item_info = item; // informacion del item (codigo)
  const Value = value; // valor a agregar o quitar (+1; -1)
  const idArray = id;
  let NewRegister = [] //arreglo que se enviara al servidor



  console.log("start _________________________________")
  console.log(`Car ${Car}`)
  console.log(`user_info ${user_info}`)
  console.log(`item_info ${item_info}`)
  console.log(`value ${Value}`)
  console.log("_________________________________")



  if (Car == []) {
    console.log("no hay registros, registrando nuevo...")
    NewRegister = { "id_client": user_info, "id_product": item_info, "qty": 1 }
  }
  else {
    console.log("existen registros - buscando item...")
    let Updating = Car.find(id => id.id_product == item_info)


    if (Updating == undefined) {
      console.log("undefinido (no encontardo)")
      NewRegister = { "id_client": user_info, "id_product": item_info, "qty": Value }
    }

    else {
      console.log("el array es:")
      let NewQty = Updating.qty + Value

      console.log("nueva cantidad: ")
      console.log(NewQty)

      if (NewQty == 0) {
        console.log("_______borrando porque no puede haber qty en cero 0")
        await deleteItem(idArray)
        return false
      }
      else {
        console.log("_______no es igual a cero 0")
        NewRegister = { "id_client": user_info, "id_product": item_info, "qty": NewQty }
      }
    }
  }


  console.log(NewRegister)
  await axios.post(base_url(Api, `add/car`), NewRegister).then(function (response) {
    //ProductList = response.data
    console.log("proceso realizado con éxito")
  })
    .catch(function (error) { console.log(error.response.data) })
    .then(function () { });
  console.log("_________________________________ end")

  Toast.show("Producto agregado al carrito de compras")
}//end-function agregar item al carrito de ventas











//borrar un item
async function deleteItem(id) {
  console.log("* deleting registro... " + id)
  await axios.get(base_url(Api, `delete/car/${id}`)).then(function (response) {
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });
}







//borrar todos items despues de validar la compra
async function deleteCar(id) {
  console.log("deleting registro... " + id)
  await axios.get(base_url(Api, `delete/car/all/${id}`)).then(function (response) {
    console.log("borrado")
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });
}




















async function likeMeGET(user) {
  let Data
  await axios.get(base_url(Api, `favorites/get/${user}`)).then(function (response) {
    Data = response.data
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });
  //console.log(Data)
  return Data
  //https://pdtclientsolutions.com/ventascc/api/favorites/get/${id_client}
}






async function likeMeADD(user, id, list) {
  let WishMeList = list
  let arr

  if (WishMeList == []) {
    console.log("no hay registros en wish, registrando nuevo...")
    arr = { "id_client": user, "id_product": id }
    Toast.show("Agregado a tu lista de deseos!")
  }

  else {
    console.log("existen registros en wish- buscando item...")
    let Updating = WishMeList.find(i => i.id_product == id)


console.log("updating?")
console.log(Updating)



    if (Updating == undefined) {
      console.log("undefinido (no encontardo)")
      arr = { "id_client": user, "id_product": id }
    }

    else {
      console.log("el array es:")
      Toast.show("El producto ya esta en tu lista de deseos!")

      // let NewQty = Updating.qty + Value
      //   console.log("nueva cantidad: ")
      //   console.log(NewQty)
      //   if (NewQty == 0) {
      //     console.log("_______borrando porque no puede haber qty en cero 0")
      //     await deleteItem(idArray)
      //     return false
      //   }
      //   else {
      //     console.log("_______no es igual a cero 0")
      //     NewRegister = { "id_client": user_info, "id_product": id, "qty": NewQty }
      //   }
    }
  }
  console.log(arr)
  await axios.post(base_url(Api, `favorites/add`), arr).then(function (response) { console.log("like me!") })
    .catch(function (error) { console.log(error.response.data) })
    .then(function () { });
  Toast.show("Agregado a tu lista de deseos!")
  //https://pdtclientsolutions.com/ventascc/api/favorites/add
}







async function likeMeDELETE(id) {
  console.log(`*** deleting level favorite ${id}`)
  await axios.get(base_url(Api, `favorites/delete/${id}`)).then(function (response) {
    console.log("borrado")
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });
  //https://pdtclientsolutions.com/ventascc/api/favorites/delete/${id_item}

  Toast.show("Removido de tu lista de deseos!")
}


































//calcular porcentaje de dedscuento en cupon
async function validateCupon(value) {
  //"https://pdtclientsolutions.com/ventascc/api/coupons/ABCD"
  let code = "a"
  let msj = "b"
  await axios.get(base_url(Api, `coupons/${value}`)).then(function (response) {
    code = response.data

  })
    .catch(function (error) {
      code = error.response.data

    }
    )
    .then(function () { });
  return code
}








//consultar todos los pedidos
async function getMyPurchases(user_info) {
  let Data
  await axios.get(base_url(Api, `order/${user_info}`)).then(function (response) {
    Data = response.data
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });

  return Data
}










async function AddCita(a, b, c) {

  console.log("registrando cita")
  let NewRegister = []
  NewRegister = {
    "id_client": a,
    "id_procedure": b,
    "id_commercial_premises": c
  }
  console.log(NewRegister)
  await axios.post(base_url(Api, `request/appointment`), NewRegister).then(function (response) {
    console.log("proceso exitoso")
  })
    .catch(function (error) {
      //console.log("error")
      //console.log(error.response.data)
    })
    .then(function () { });
}












async function getCitas(id) {
  let Data
  await axios.get(base_url(Api, `queries/client/${id}`)).then(function (response) {
    Data = response.data
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });

  return Data
}























async function AllProcedures() {
  //http://pdtclientsolutions.com/ventascc/api/get/procedures
  let Procedures = []






  await axios.get(base_url(Api, `get/procedures`)).then(function (response) {
    Procedures = response.data
  })
    .catch(function (error) { console.log(error) })
    .then(function () { });
  return Procedures
}





export { AllProcedures, AddCita, getCitas, getSedes, getMyPurchases, validateCupon, getCar, getShop, AddCar, deleteItem, deleteCar, likeMeADD, likeMeGET, likeMeDELETE, getcategories };



