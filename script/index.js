const selectAllCheckbox = document.querySelector('#select-all')

console.log(selectAllCheckbox)

selectAllCheckbox.addEventListener('click', e => {
	if (selectAllCheckbox.checked) {
		console.log(1)
	}

	handleCountChange(e)
})

// Handling products hide
const accordions = document.querySelectorAll('.accordion')

accordions.forEach(accordion =>
	accordion.addEventListener('click', () => {
		const products =
			accordion.parentElement.parentElement.querySelector('.content__products')

		const accordionText = accordion.parentElement.querySelector(
			'.content__select-text'
		)

		if (products.classList.contains('hidden')) {
			products.classList.remove('hidden')

			accordion.parentElement.querySelector(
				'.content__select-text'
			).textContent = 'Выбрать все'

			accordion.parentElement.querySelector('.checkbox').style['display'] =
				'flex'

			accordionText.classList.remove('content__not-available-title')

			return
		}
		products.classList.add('hidden')

		accordionText.textContent =
			PRODUCTS.length +
			' товара · ' +
			document.querySelector('#totalPrice').textContent

		accordionText.classList.add('content__not-available-title')

		accordion.parentElement.querySelector('.checkbox').style['display'] = 'none'
	})
)

const handleCountChange = e => {
	console.log(e)
}

// Handling click on plus or minus buttons
const updateCount = (count, updateType, maxCount = 999) => {
	let countNumber = +count.textContent

	if (updateType == 'increment' && countNumber !== maxCount) {
		countNumber++
	} else if (updateType == 'decrement' && countNumber !== 1) {
		countNumber--
	}

	count.textContent = countNumber

	return count
}

const updateTotal = () => {
	const total = +document
		.querySelector('#totalPrice')
		.textContent.replace(/ /g, '')
		.replace(/\D/g, '')
}

const PRODUCTS = [
	{
		name: 'Футболка UZcotton мужская',
		price: 1051,
		discount: 50.33301617507136,
		amount: 2,
	},
	{
		name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
		price: 11500.235,
		discount: 8.695474483782288,
		amount: 999,
	},
	{
		name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
		price: 475,
		discount: 48,
		amount: 2,
	},
]

const createProduct = ({ name, price }) => {
	// create paste products templates
}

const cartCounters = document.querySelectorAll('.cart .product__amount-actions') // maybe I should get products here instead to not looking for them in the loop

cartCounters.forEach(counter => {
	const productName = counter
		.closest('.content__product')
		.querySelector('.product__name')
		.textContent.replace(/^\s\s*/, '')
		.replace(/\s\s*$/, '')
		.replace(/\s+/g, ' ')

	const product = PRODUCTS.filter(product => product.name === productName)[0]

	const buttons = counter.querySelectorAll('button')

	let count = counter.querySelector('.product__amount')
	const incrementButton = buttons[1]
	const decrementButton = buttons[0]

	incrementButton.addEventListener('click', () => {
		buttonType = 'increment'
		const updatedCount = updateCount(count, buttonType, product.amount)

		decrementButton.classList.add('product__button_active')

		if (+updatedCount.textContent === product.amount) {
			incrementButton.classList.remove('product__button_active')
		} else {
			incrementButton.classList.add('product__button_active')
		}
		// Maybe I should check if count changing before for not doing extra iterations
		handleCountChange(product, buttonType)
	})

	decrementButton.addEventListener('click', () => {
		buttonType = 'decrement'
		const updatedCount = updateCount(count, buttonType, product.amount)

		incrementButton.classList.add('product__button_active')

		if (+updatedCount.textContent === 1) {
			decrementButton.classList.remove('product__button_active')
		} else {
			decrementButton.classList.add('product__button_active')
		}
		// Maybe I should check if count changing before for not doing extra iterations
		handleCountChange(product, buttonType)
	})
})

const productActionsBlock = document.querySelectorAll('.product__actions-list')

productActionsBlock.forEach(productActionsList => {
	const productActions = productActionsList.querySelectorAll(
		'.product__actions-item'
	)

	const likeButton = productActions[0]
	const deleteButton = productActions[1]

	likeButton.addEventListener('click', () => {
		if (likeButton.classList.contains('like_active')) {
			likeButton.classList.remove('like_active') // maybe I should optimize css

			return
		}

		likeButton.classList.add('like_active')
	})

	deleteButton.addEventListener('click', () => {
		// Handle changing price here
		updateTotal()
		deleteButton.closest('.content__product').remove()
	})
})
