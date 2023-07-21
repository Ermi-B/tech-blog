

document.addEventListener('DOMContentLoaded',()=>{
    
    document.addEventListener('click', async function (event) {
        // Check if the clicked element has the 'edit-blog' class
        if (event.target.classList.contains('edit-blog')) {
          const blogId = event.target.getAttribute('data-id');
          
         
          // Add your edit logic here
        }
      
        // Check if the clicked element has the 'delete-blog' class
        if (event.target.classList.contains('delete-blog')) {
          const blogId = event.target.getAttribute('data-id');
        
          // Add your delete logic here
        try{
            const blog = await fetch(`/api/blog/${blogId}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                },
              })              
              window.location.replace('/dashboard')

        }catch(error){
            console.error('Error deleting blog:', error.message);
        }


        }
      });
      
      

})