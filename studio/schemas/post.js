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
			name: 'year',
			title: 'Год',
			type: 'number',
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
			title: 'Табы',
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
			name: 'order',
			title: 'Порядковый номер',
			type: 'number',
		},
		{
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: {type: 'author'},
		},
		{
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
		},
		{
			name: 'body',
			title: 'Body',
			type: 'blockContent',
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
