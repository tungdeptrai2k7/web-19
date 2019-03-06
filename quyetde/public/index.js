$(document).ready(() => {
    $.ajax({
        url:'./random-question',
        type:'GET',
        success:(data) =>{
            if (data.id != null) {
                document.getElementById('question-content').innerText= data.content;
                // listen click
                document.getElementById('vote-yes').addEventListener('click',()=>{
                    $.ajax({
                        url:`/vote/${data.id}/yes`,
                        type:'GET',
                        success:(_result) => {
                            window.location.href=`/result/${data.id}`;
                        },
                        error: (err) =>{
                            console.log(err);
                        },
                    });
                });
                document.getElementById('vote-no').addEventListener('click',()=>{
                    $.ajax({
                        url:`/vote/${data.id}/no`,
                        type:'GET',
                        success:(_result) => {
                            window.location.href=`/result/${data.id}`;
                        },
                        error: (err) =>{
                            console.log(err);
                        },
                    });     
                });

                document.getElementById('question-result').addEventListener('click',()=>{
                    window.location.href=`/result/${data.id}`;
                });
                document.getElementById('other-question').addEventListener('click',()=>{
                    window.location.reload();
                });
            } else {
                document.getElementById('question-content').innerText = 'Question not found';
            }
        },
        error: (error)=> {
            console.log(error);
        },
    });
});