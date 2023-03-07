export default {
	name: 'servicesBlock',
	title: 'Блоки услуг',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Название',
			type: 'string',
		},
		{
			name: 'services',
			title: 'Услуги',
			type: 'array',
			description: 'Выбирать из выпадающего списка.',
			of: [{type: 'reference', to: {type: 'service'}}],
		},
		{
			name: 'order',
			title: 'Порядковый номер',
			type: 'number',
		},
	],
}
