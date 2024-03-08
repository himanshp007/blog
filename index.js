
function handleFormSubmit(event){

  event.preventDefault();

  const blogDetails = {
    'img': event.target.img.value,
    'title': event.target.blogtitle.value,
    'discription': event.target.blogdis.value
  }
  

  axios
    .post('https://crudcrud.com/api/8dbfb90762ec4a6baa770c98a8037b1a/blog', blogDetails)
    .then((response) => displayBlog())
    .catch((err) => console.log(err));


  document.getElementById('imgurl').value = '';
  document.getElementById('blogtitle').value = '';
  document.getElementById('blogdis').value = '';

}

function displayBlog(){

  axios
    .get('https://crudcrud.com/api/8dbfb90762ec4a6baa770c98a8037b1a/blog')
    .then((response) => {

      const totalBlog = document.getElementById('blogcount');
      const allItems = document.querySelector('ul');
      totalBlog.innerHTML = `Total Blog: ${response.data.length}`

      allItems.innerHTML = '';

      const reversedData = response.data.reverse();

      reversedData.forEach((item) => {
        const blogItem = document.createElement('li');

        const editBtn = document.createElement("button");
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');

        const title = document.createElement('h1');
        title.innerHTML = `${item.title}`;

        const img = document.createElement('img');
        img.src = item.img;
        img.height = 200;
        img.width = 200;

        const dis = document.createElement('p');
        dis.innerHTML = `${item.discription}`;

        editBtn.addEventListener('click', function() {
          // Populate form fields with current data
          document.getElementById('imgurl').value = item.img;
          document.getElementById('blogtitle').value = item.title;
          document.getElementById('blogdis').value = item.discription;
        });


        deleteBtn.addEventListener('click', function(){
          axios
            .delete(`https://crudcrud.com/api/8dbfb90762ec4a6baa770c98a8037b1a/blog/${item._id}`)
            .then((res) => {
              blogItem.remove();
              totalBlog.innerHTML = `Total Blog: ${response.data.length - 1}`;
            })
            .catch((err) => console.log(err))
        })

        blogItem.appendChild(title);
        blogItem.appendChild(img);
        blogItem.appendChild(dis);
        blogItem.appendChild(editBtn);
        blogItem.appendChild(deleteBtn);
        allItems.appendChild(blogItem);
      })
    })
    .catch((err) => console.log(err));

}


displayBlog();