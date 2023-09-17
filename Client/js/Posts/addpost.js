document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');
    const errorMessage = document.getElementById('errorMessage'); 
    let postImageurl = ''

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
    }
  
    postImage.addEventListener('change', async(e) => {
      const fileName = e.target.files
      if(fileName){
        const formData = new FormData()
        
        formData.append('file', fileName[0])
        formData.append('upload_preset', 'lfyho4ew')
        formData.append('cloud_name', 'LinkUp')

        try {
          const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dykqrsfny/image/upload', {
            method: 'POST',
            body: formData,
          });
  
          if (cloudinaryResponse.ok) {
            const cloudinaryData = await cloudinaryResponse.json();
            postImageurl = cloudinaryData.url
          } else {
            console.error('Failed to upload image to Cloudinary');
          }
        } catch (error) {
          console.error('Error uploading image to Cloudinary', error);
        }
      }
    })
  
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(); 
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User email not found. Please make sure the user is logged in.');
          return;
        }
    
      axios.post(`http://localhost:8005/users/createPost`, 
      {
        userId,
        content: postContent.value,
        postImage: postImageurl,
      }, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response)=>{
          window.location.href = '/Client/htmlFiles/home.html'; 
      }
      ) 
      .catch((e)=>{
        errorMessage.style.display = 'block';
        showError(e.response.data.error);
        console.error('Error creating post', e);
      })
    });
   
  });
  