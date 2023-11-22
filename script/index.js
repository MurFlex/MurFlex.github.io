const selectAllCheckbox = document.querySelector('#select-all')

selectAllCheckbox.addEventListener('click', e => {
	if (selectAllCheckbox.checked) {
		console.log(1)
	}

	handleCountChange(e)
})

const updateIds = () => {
	let id = 0
	productsData.forEach(product => {
		product.id = id
		id++
	})

	console.log(productsData)
}

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

		productsCount = productsData.reduce(
			(acc, product) => acc + product.amount,
			0
		)

		accordionText.textContent =
			productsCount +
			' товара · ' +
			document.querySelector('#totalPrice').textContent

		accordionText.classList.add('content__not-available-title')

		accordion.parentElement.querySelector('.checkbox').style['display'] = 'none'
	})
)

const handleCountChange = (productId, amount) => {
	productsData[productId] = {
		...productsData[productId],
		amount,
	}

	updateTotal()
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

const updateTotalPrice = (price = 0) => {
	const formattedPrice = formatTotal(price, 2)

	document.querySelector('#totalPrice').textContent = formattedPrice
}

const updateDiscount = (amount = 0, price = 0) => {
	const discountSpans = document
		.querySelector('#discount')
		.querySelectorAll('span')

	discountSpans[0].textContent = amount + ' товара'
	discountSpans[1].textContent = formatTotal(price, 2) + ' сом'
}

const updateTotal = () => {
	if (productsData.length === 0) {
		updateTotalPrice()
		updateDiscount()
	}

	const totalAmount = productsData.reduce(
		(acc, product) => acc + product.amount,
		0
	)

	const total = productsData.reduce(
		(acc, product) =>
			acc +
			product.amount *
				(product.price - (product.price * product.discount) / 100), // amount * price - discount price
		0
	)

	const totalWithoutDiscount = productsData.reduce(
		(acc, product) => acc + product.amount * product.price,
		0
	)

	updateTotalPrice(total)
	updateDiscount(totalAmount, totalWithoutDiscount)
}
// Working weird
const formatTotal = (number, fixed = 0) => {
	if (typeof number !== 'string') number = String(number.toFixed(fixed))

	if (number.length < 7) return number

	const reversedNumber = number.split('').reverse().join('')
	const splittedNumber = reversedNumber.match(/\d{1,3}/g)

	let resultNumber = ''

	for (let i = splittedNumber.length - 1; i > 0; i--) {
		resultNumber = resultNumber + splittedNumber[i] + ' '
	}

	resultNumber = resultNumber.replace(/\s+$/, '') + '.' + splittedNumber[0]

	return resultNumber
}

const updateProductPrice = (product, productElement) => {
	const phonePrice = productElement.querySelector('.product__price-text_phone')
	const currentPrice = productElement.querySelector('.product__current-price ')
	const oldPrice = productElement.querySelector('.product__old-price')
	const phoneOldPrice = productElement.querySelector(
		'.product__price-discount_phone'
	)

	const priceWithDiscount = formatTotal(
		product.amount * (product.price - (product.price * product.discount) / 100)
	)

	const priceWithoutDiscount = formatTotal(product.price * product.amount)

	phonePrice.textContent = priceWithDiscount
	currentPrice.textContent = priceWithDiscount
	oldPrice.textContent = priceWithoutDiscount
	phoneOldPrice.textContent = priceWithoutDiscount
}

let productsData = [
	{
		id: 0,
		name: 'Футболка UZcotton мужская',
		price: 1051,
		discount: 50.33301617507136,
		amount: 1,
		maxAmount: 2,
	},
	{
		id: 1,
		name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
		price: 11500.235,
		discount: 8.695474483782288,
		amount: 200,
		maxAmount: 999,
	},
	{
		id: 2,
		name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
		price: 475,
		discount: 48,
		amount: 2,
		maxAmount: 2,
	},
]

const createProduct = ({ name, price }) => {
	// create paste products templates
}

const cartCounters = document.querySelectorAll('.cart .product__amount-actions') // maybe I should get products here instead to not looking for them in the loop

const formatProductName = productName =>
	productName
		.replace(/^\s\s*/, '')
		.replace(/\s\s*$/, '')
		.replace(/\s+/g, ' ')

cartCounters.forEach(counter => {
	const productName = formatProductName(
		counter.closest('.content__product').querySelector('.product__name')
			.textContent
	)

	const product = productsData.filter(
		product => product.name === productName
	)[0]

	const buttons = counter.querySelectorAll('button')

	let count = counter.querySelector('.product__amount')
	const incrementButton = buttons[1]
	const decrementButton = buttons[0]

	incrementButton.addEventListener('click', () => {
		const buttonType = 'increment'
		const updatedCount = updateCount(count, buttonType, product.maxAmount)

		decrementButton.classList.add('product__button_active')

		if (+updatedCount.textContent === product.maxAmount) {
			incrementButton.classList.remove('product__button_active')
		} else {
			incrementButton.classList.add('product__button_active')
		}
		// Maybe I should check if count changing before for not doing extra iterations
		handleCountChange(product.id, +updatedCount.textContent)

		updateProductPrice(
			productsData[product.id],
			incrementButton.closest('.content__product')
		)
	})

	decrementButton.addEventListener('click', () => {
		const buttonType = 'decrement'
		const updatedCount = updateCount(count, buttonType, product.amount)

		incrementButton.classList.add('product__button_active')

		if (+updatedCount.textContent === 1) {
			decrementButton.classList.remove('product__button_active')
		} else {
			decrementButton.classList.add('product__button_active')
		}
		// Maybe I should check if count changing before for not doing extra iterations
		handleCountChange(product.id, +updatedCount.textContent)

		updateProductPrice(
			productsData[product.id],
			decrementButton.closest('.content__product')
		)
	})
})

const productActionBlocks = document.querySelectorAll('.product__actions-list')

productActionBlocks.forEach(productActionsList => {
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
		const productBlock = deleteButton.closest('.content__product')

		const productName = formatProductName(
			productBlock.querySelector('.product__name').textContent
		)

		const deletingProductId = productsData.findIndex(
			product => product.name === productName
		)

		productsData.splice(deletingProductId, 1)

		updateTotal()
		updateIds()
		productBlock.remove()
	})
})
