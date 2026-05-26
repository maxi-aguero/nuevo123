const [, , accion, resto, desc, precio, category] = process.argv;

async function listarProductos() {
 try{
    const response = await fetch(
        "https://fakestoreapi.com/products"
    );

    const data = await response.json();

    return data;
    }

catch (error) {console.log("Error al listar productos:", error.message);}


finally {console.log("Fin."); }
}


async function traerUnProducto(miid) {
 try{
    const response = await fetch(
        `https://fakestoreapi.com/products/${miid}`
    );

    const dataproducto = await response.json();

    return dataproducto;
}
catch (error) {console.log("Error al obtener el producto:", error.message);}

finally { console.log("Fin."); }
}



async function obtenerProducto(data,unproducto,identrada) {
try{
    const dataproducto = await traerUnProducto(identrada);
    console.log(dataproducto);//lo mustro con formato json

    const { title, price,category } = dataproducto; 
    //puedo mostrar los datos con mi propio formato
    console.log(`Producto: ${title}`);
    console.log(`Precio: $${price}`);
    console.log(`Categoria: ${category}`);
}
catch (error) {console.log("Error en la operacion GET para obtener productos:", error.message);}

finally { console.log("Fin."); }
}


function mostrarTodosLosProductos(data) {

    console.log(data);


    data.forEach((producto) => {

            console.log(`Producto: ${producto.title}`);
            console.log(`Precio: ${producto.price}`);
            console.log(`Categoria: ${producto.category}`);
            

        });    

}

async function eliminarProducto(unproducto,identrada) {
  try {  

        console.log('Producto a eliminar');
        console.log(identrada);

       const response = await fetch(
            `https://fakestoreapi.com/${unproducto}/${identrada}`,
            {

                method: "DELETE"

            }
        );

        const productoEliminado = await response.json();

        console.log("Producto eliminado:");
        console.log(productoEliminado);
        
        console.log(`Producto: ${productoEliminado.title}`);
        console.log(`Precio: ${productoEliminado.price}`);
        console.log(`Categoria: ${productoEliminado.category}`);
       

}

catch (error) { console.log("Error al eliminar el producto:", error.message);}

finally { console.log("Fin."); }    

    
}


async function agregarProducto(desc,precio,cat) {

    try {

        const newproduct = {
            title: desc,
            price: precio,
            category: cat

        };

        const response = await fetch(
            'https://fakestoreapi.com/products',
            {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(newproduct)

            }
        );

      

        const minuevoproducto = await response.json();

        console.log("Producto agregado:");
        console.log(minuevoproducto);

        console.log(`Producto: ${minuevoproducto.title}`);
        console.log(`Precio: ${minuevoproducto.price}`);
        console.log(`Categoria: ${minuevoproducto.category}`);

      

        
    }

    catch (error) {console.log("Error al agregar el producto:", error.message);}

    finally {
        console.log("Fin.");

    }

}


function validarId(identrada) {     

    const id = Number(identrada);
    if (isNaN(id) || identrada.trim() === "" || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id debe ser un número entero positivo.");
    }

}

function validarPost(desc, precio, category) {
       
    if (!desc || desc.trim() === "") {
        throw new Error("Falta la descripción del producto.");
    }
     if (!category || category.trim() === "") {
        throw new Error("Falta la categoria del producto.");
    }
    if (isNaN(precio) || Number(precio) <= 0) {
        throw new Error("El precio debe ser un número mayor a cero.");
    }
}

async function main() {
    try {
        const data = await listarProductos();


        const [unproducto, identrada] = resto.split("/");


        if (unproducto !== 'products') {
            throw new Error("Error. Debe ser 'products'.");
        }

        switch (accion) {
            case "GET":
                
                if (identrada === undefined) {
                    mostrarTodosLosProductos(data);
                } else
                {      
                    validarId(identrada);
                    await obtenerProducto(data, unproducto, identrada);
                }
                break;

            case "POST":
                validarPost(desc, precio, category);
                
                mostrarTodosLosProductos(data);       
                await agregarProducto(desc, precio, category);
                break;

            case "DELETE":
                validarId(identrada);                
                mostrarTodosLosProductos(data);   
                await eliminarProducto(unproducto, identrada);
                break;

            default:
                console.log("Acción inválida");
        }

    } catch (error) {console.log("Error:", error.message);} 
    
    finally {console.log("Fin.");  }
}


main();
