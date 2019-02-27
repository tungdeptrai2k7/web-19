window.onload = ()=>{
    // find element
    const textArea = document.getElementById('content');

    // addEventListener()
    textArea.addEventListener('input', (event)=>{
    const contentLength= textArea.value.length;
    //find element
    const remainCharacters =document.getElementById('remain-characters');
    remainCharacters.innerText = `${200-contentLength} characters left`;    
    });
}
    