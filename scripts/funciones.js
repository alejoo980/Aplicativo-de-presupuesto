// Se declaran constantes
const item_categoria_gasto = 'categoria_gasto';

// Se declara una variable tipo categoría de gasto
var objCatGasto = new Object();
objCatGasto.codigo = '';
objCatGasto.nombre = '';
objCatGasto.limite = 0;

var vArrCatsGasto = null;

// Contiene todas las categorías de gasto como cadena de texto
var cadCatsGasto;

function cat_gasto_guardar(pCatGasto) {
  // Contiene todas las categorias de gasto como objeto
  var objCatsGasto;

  // Contiene un arreglo con todos los tipos de gasto
  var arrCatsGasto;

  var posicion;

  // Se traen las categorías de gasto almacenadas dentro del Local Storage
  cadCatsGasto = localStorage.getItem(item_categoria_gasto);

  if (cadCatsGasto == null) {
    // No se ha almacenado ningún dato aún

    // Se inicializa el arreglo vacío
    arrCatsGasto = new Array();
  }
  else {
    // Se convierte el JSON en un arreglo que contiene todas las categorías de gasto
    arrCatsGasto = JSON.parse(cadCatsGasto);
  }

  // Se llena el objeto con los datos llegados como parámetro
  objCatGasto.codigo = pCatGasto.codigo;
  objCatGasto.nombre = pCatGasto.nombre;
  objCatGasto.limite = pCatGasto.limite;

  // Se busca si el registro a guardar ya existe dentro del arreglo
  posicion = arrCatsGasto.findIndex(registro => registro.codigo == objCatGasto.codigo);

  if (posicion == -1) {
    // Se trata de un registro nuevo

    // Se agrega el objeto actual dentro del arreglo
    arrCatsGasto.push(objCatGasto);
  }
  else {
    // Se trata de un registro que ya existe dentro del arreglo

    // Se actualiza el valor del registro dentro del arreglo
    arrCatsGasto[posicion] = objCatGasto;
  }

  // Se convierte el arreglo en una cadena de texto JSON
  cadCatsGasto = JSON.stringify(arrCatsGasto);

  // Se almacena el arreglo dentro del computador
  localStorage.setItem('categoria_gasto', cadCatsGasto);
}

function cat_gasto_consultar() {
  // Se traen las categorías de gasto almacenadas dentro del Local Storage
  cadCatsGasto = localStorage.getItem(item_categoria_gasto);

  if (cadCatsGasto == null) {
    // No se ha almacenado ningún dato aún

    // Se inicializa el arreglo vacío
    arrCatsGasto = null;
  }
  else {
    // Se convierte el JSON en un arreglo que contiene todas las categorías de gasto
    arrCatsGasto = JSON.parse(cadCatsGasto);
  }

  // Se retorna el resultado de la consulta
  return arrCatsGasto;
}

function cat_gasto_eliminar(pRegistroAEliminar) {
  // Se consultan todos los registros del local storage
  vArrCatsGasto = cat_gasto_consultar();

  // Se busca si realmente ese registro existe dentro del arreglo
  posicion = vArrCatsGasto.findIndex(registro => registro.codigo == pRegistroAEliminar.codigo);

  if (posicion == -1) {
    // El registro no existe, por lo tanto no se puede borrar
    return -1;
  }
  else {
    // Se elimina el elemento dentro del arreglo
    vArrCatsGasto.splice(posicion, 1);
  }

  // Se convierte el arreglo en una cadena de texto JSON
  cadCatsGasto = JSON.stringify(arrCatsGasto);

  // Se almacena el arreglo dentro del computador en el local storage
  localStorage.setItem('categoria_gasto', cadCatsGasto);

  // Se hace el retorno exitoso
  return 0;
}