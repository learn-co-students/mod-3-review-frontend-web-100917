document.addEventListener("DOMContentLoaded", function(){

	function getBooks(){
		fetch('http://localhost:3000/books')
		.then(res => res.json())
		.then(books => displayBooks(books))
	}	

	function getUsers(){
		fetch('http://localhost:3000/users')
		.then(res => res.json())
		.then(users => displayUsers(users))
	}	

	function displayBooks(books){
		let listUl = document.getElementById("list")
		let detailDiv = document.getElementById("details")

		listUl.innerHTML = ""
		detailDiv.innerHTML = ""

		books.forEach((book)=>{
			// listUl.innerHTML += `<li>${book.title}</li>`
			let newLi = document.createElement("li")
			newLi.id = "book-" + book.id
			newLi.innerText = book.title

			newLi.addEventListener("click", (event)=>{
				detailDiv.innerHTML = `
					<h3>${book.title}</h3>
					<h5>By: ${book.author}</h5>
				`

			})

			listUl.appendChild(newLi)
		})
	}
	function displayUsers(users){
		let listUl = document.getElementById("list")
		let detailDiv = document.getElementById("details")

		listUl.innerHTML = ""
		detailDiv.innerHTML = ""

		users.forEach((user)=>{
			// listUl.innerHTML += `<li>${book.title}</li>`
			let newLi = document.createElement("li")
			newLi.id = "user-" + user.id
			newLi.innerText = user.name

			newLi.addEventListener("click", (event)=>{
				detailDiv.innerHTML = `
					<h3>${user.name}</h3>
					<p>By: ${user.bio}</p>
				`

			})

			listUl.appendChild(newLi)
		})
	}




	let seeUsersButton = document.getElementById('see-users')
	seeUsersButton.addEventListener("click", getUsers)

	let seeBooksButton = document.getElementById('see-books')
	seeBooksButton.addEventListener("click", getBooks)




	

})