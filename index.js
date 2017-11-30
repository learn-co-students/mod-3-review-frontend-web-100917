document.addEventListener("DOMContentLoaded", function(){

	function getBooks(){
		fetch('http://localhost:3000/books')
		.then(res => res.json())
		.then(books => displayBooks(books))
	}

	function displayBooks(books){
		let listUl = document.getElementById("list")
		let detailsContainer = document.getElementById("details")

		listUl.innerHTML = ""
		detailsContainer.innerHTML = ""


		books.forEach(book => {
			let newLi = document.createElement('li')

			newLi.id = "book-" + book.id
			newLi.innerText = book.title

			newLi.addEventListener("click", (event) => {

				detailsContainer.innerHTML = `
					<h3>${book.title}</h3>
					<h5>By: ${book.author}</h5>
					<textarea id="book-review-input-${book.id}"  placeholder="Write a review..."></textarea>
					<br>
					<button id="review-submit-button-${book.id}">Submit Review</button>
					<ul id="book-reviews-${book.id}"></ul>
				`

				let reviewSubmit = document.getElementById(`review-submit-button-${book.id}`)

				reviewSubmit.addEventListener("click", (event)=>{
					let textInput = document.getElementById(`book-review-input-${book.id}`)

					let input = textInput.value


					let object = {
						method: "POST",
						headers: {
							'Content-Type': "application/json",
							'Accept': "application/json"
						},
						body: JSON.stringify({content: input, beef: book.id})
					}


					fetch("http://localhost:3000/reviews", object)
					.then(res => res.json())
					.then(console.log)

				})


				let reviewsUl = document.getElementById(`book-reviews-${book.id}`)

				book.reviews.forEach(review => {
					let newReviewLi = document.createElement('li')

					newReviewLi.id = "review-" + review.id
					newReviewLi.innerText = review.content

					reviewsUl.appendChild(newReviewLi)
				})


			})

			listUl.appendChild(newLi)
		})
	}



	function getUsers(){
		fetch('http://localhost:3000/users')
		.then(res => res.json())
		.then(users => displayUsers(users))
	}

	function displayUsers(users){
		let listUl = document.getElementById("list")
		let detailsContainer = document.getElementById("details")

		listUl.innerHTML = ""
		detailsContainer.innerHTML = ""

		users.forEach(user => {
			let newLi = document.createElement('li')

			newLi.id = "user-" + user.id
			newLi.innerText = user.name

			newLi.addEventListener("mouseover", (event) => {
				detailsContainer.innerHTML = `
					<h3>${user.name}</h3>
					<p>${user.bio}</p>
				`
			})

			listUl.appendChild(newLi)
		})
	}

	let seeBooksButton = document.getElementById('see-books')
	seeBooksButton.addEventListener("click", getBooks)

	let seeUsersButton = document.getElementById('see-users')
	seeUsersButton.addEventListener("click", getUsers)

})