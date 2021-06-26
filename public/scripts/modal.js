export default function Modal() {
    const modalwrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector('.button.cancel')
    cancelButton.addEventListener("click", close)
    function close() {
        // Funcionalidade de remover a classe active da modal
        modalwrapper.classList.remove("active")}

    function open() {
        // Funcionalidade de atribuir a classe active para a modal
        modalwrapper.classList.add("active")}
    return{open} //retornar a funcao open para o arquivo main para la verificar quando clicar no botao abrir a modal
}