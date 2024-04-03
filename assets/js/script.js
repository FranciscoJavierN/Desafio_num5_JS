const tareasArray = [
    {
        id: 1,
        descripcion: "regar el invernadero",
        estado: false,
    },
    {
        id: 2,
        descripcion: "limpiar la casa",
        estado: false,
    },
    {
        id: 3,
        descripcion: "ir al supermercado",
        estado: false,
    }
] 
const tareaInput = document.getElementById("nuevaTarea")
const btnAgregar = document.getElementById("agregarTarea")
const nuevaLista = document.getElementById("tareas")
const total = document.getElementById("total")
const realizadas = document.getElementById("realizadas")
console.log("orden",tareasArray);
const tareasArrayOrdenada = tareasArray.sort((x,y) => y.id - x.id)
const mostrarLista = () => {

    let html = `<div class="headList"><strong>ID</strong><strong>Tareas</strong></div>`
    tareasArrayOrdenada.forEach((item) => {
    html += `
        <div class="listBody">
            <div class="listData">
                <div>${item.id}</div> <div>${item.descripcion}</div>
            </div>
            <div class="listData">
                <input onchange="checkInput(${item.id})" 
                ${item.estado ? "checked" : ""} type="checkbox"/>
                <button class="delete" onclick="borrar(${item.id})">Eliminar</button>
            </div>
        </div><hr>`;
        nuevaLista.innerHTML = html;
    });
};
mostrarLista();
btnAgregar.addEventListener("click", () => {

    const nombreTarea = tareaInput.value
    const id = tareasArray.length + 1
    tareasArray.unshift({
        id,
        descripcion: nombreTarea,
        estado: false
    })
    tareaInput.value = ""
    mostrarLista()
    contadores();
});
function borrar(id) {
    const index = tareasArray.findIndex((item) => item.id == id)
    tareasArray.splice(index, 1)
    mostrarLista()
    contadores();   
}
const checkInput = (id) => {
    const tarea = tareasArray.find((tarea) => tarea.id === id);
    const { estado } = tarea;
    tarea.estado = !estado;
    contadores();
};
const contadores = () => {
    const contadorRealizada = tareasArray.filter(({ estado }) => estado);
    realizadas.innerHTML = `<div><strong>Realizadas:</strong> ${contadorRealizada.length}</div>`; 
    total.innerHTML = `<div><strong>Total:</strong> ${tareasArray.length}</div>`;
}