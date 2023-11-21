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

	const amount = PRODUCTS.filter(product => product.name === productName)[0]
		.amount

	const buttons = counter.querySelectorAll('button')

	let count = counter.querySelector('.product__amount')
	const incrementButton = buttons[1]
	const decrementButton = buttons[0]

	incrementButton.addEventListener('click', () => {
		const updatedCount = updateCount(count, 'increment', amount)

		decrementButton.classList.add('product__button_active')

		if (+updatedCount.textContent === amount) {
			incrementButton.classList.remove('product__button_active')
		} else {
			incrementButton.classList.add('product__button_active')
		}
	})

	decrementButton.addEventListener('click', () => {
		const updatedCount = updateCount(count, 'decrement', amount)

		incrementButton.classList.add('product__button_active')

		if (+updatedCount.textContent === 1) {
			decrementButton.classList.remove('product__button_active')
		} else {
			decrementButton.classList.add('product__button_active')
		}
	})
})
