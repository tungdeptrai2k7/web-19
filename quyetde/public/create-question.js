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
    document.getElementById('create-form').addEventListener('submit',(e)=>{
        e.preventDefault();
        //depend on type of element
        //get question-content
        const form= document.getElementById('create-form');
        const questionContent = form.content.value;
        if (!questionContent) {
            document.getElementById('error-message').innerText = 'Please input question';
        } else {
            $.ajax({
                url:`/create-question`,
                type:'POST',
                data:{ 
                    content: questionContent,
                },
                success: (data) =>{
                    if (data.id!=null){
                        window.location.href = `/result/${data.id}`
                    }else{
                        window.alert('Failed to create question');
                    }
                },
                error: (data) =>{
                    console.log(error);
                },
            });
        }
    });
};
    