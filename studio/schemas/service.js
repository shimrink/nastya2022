export default {
	name: 'service',
	title: 'Услуги',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Название',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Описание',
			type: 'text',
		},
		{
			name: 'time',
			title: 'Время выполнения',
			type: 'string',
		},
		{
			name: 'price',
			title: 'Стоимость',
			type: 'string',
		},
	],
}
