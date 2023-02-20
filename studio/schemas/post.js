export default {
	name: 'post',
	title: 'Кейсы',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Название',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Человекопонятный URL',
			type: 'slug',
			options: {
			source: 'title',
			maxLength: 96,
			},
		},
		{
			name: 'link',
			title: 'Ссылка',
			type: 'url',
		},
		{
			name: 'publishedAt',
			title: 'Дата',
			type: 'date',
			description: 'Для сортировки и отображения года',
			options: {
				dateFormat: 'DD.MM.YYYY',
			},
		},
		{
			name: 'client',
			title: 'Клиент',
			type: 'string',
		},
		{
			name: 'mainImage',
			title: 'Обложка 16:9',
			type: 'image',
			options: {
			hotspot: true,
			},
		},
		{
			name: 'mobileImage',
			title: 'Обложка 3:4',
			type: 'image',
			options: {
			hotspot: true,
			},
		},
		{
			name: 'categories',
			title: 'Категории',
			type: 'array',
			description: 'Выбирать из выпадающего списка.',
			of: [{type: 'reference', to: {type: 'category'}}],
		},
		{
			name: 'tags',
			title: 'Теги',
			type: 'array',
			description: 'Писать с заглавной буквы. Разделять теги клавишей ENTER',
			of: [{type: 'string'}],
			options: {layout: 'tags'},
		},
		{
			name: 'isMainSlider',
			title: 'Главный слайдер',
			type: 'boolean',
			description: 'Добавить в главный слайдер?',
			initialValue: false,
		},
		{
			name: 'isPortfolio',
			title: 'Все кейсы',
			type: 'boolean',
			description: 'Добавить на страницу Все кейсы?',
			initialValue: false,
		},
		{
			name: 'design',
			title: 'Дизайнер',
			type: 'reference',
			to: {type: 'author'},
		},
		{
			name: 'dev',
			title: 'Разработчик',
			type: 'reference',
			to: {type: 'author'},
		},
	],

	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'mainImage',
		},
		prepare(selection) {
			const {author} = selection
			return Object.assign({}, selection, {
			subtitle: author && `by ${author}`,
			})
		},
	},
}
