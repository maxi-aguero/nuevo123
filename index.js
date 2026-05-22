const [, , accion, resto, desc, precio, category] = process.argv;

async function ListarProductos() {
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


async function traerunproducto(miid) {
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
    const dataproducto = await traerunproducto(identrada);
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


function mostrartodoslosproductos(data) {

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

        const productoeliminado = await response.json();

        console.log("Producto eliminado:");
        console.log(productoeliminado);
        
        console.log(`Producto: ${productoeliminado.title}`);
        console.log(`Precio: ${productoeliminado.price}`);
        console.log(`Categoria: ${productoeliminado.category}`);
       

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


async function main() {

    try {

        const data = await ListarProductos();
        const [unproducto, identrada] = resto.split("/");

        switch (accion) {

            case "GET":

                if (identrada == undefined) {
                        mostrartodoslosproductos(data);
                }
                else
                {      await obtenerProducto(data,unproducto,identrada);

                }
                break;

            case "POST":
            
                mostrartodoslosproductos(data);       
                await agregarProducto(desc,precio,category);

                break;

            case "DELETE":

                mostrartodoslosproductos(data);   
                await eliminarProducto(unproducto,identrada);

                break;

            default:

                console.log("Caso por defecto");

        }

    }

    catch (error) {

        console.log(error);

    }

    finally {

        console.log("Fin.");

    }

}

main();
