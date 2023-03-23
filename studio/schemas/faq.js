export default {
	name: 'faq',
	title: 'ЧАВО',
	type: 'document',
	fields: [
		{
			name: 'question',
			title: 'Вопрос',
			type: 'string',
		},
		{
			name: 'answer',
			title: 'Ответ',
			type: 'text',
		},
		{
			name: 'order',
			title: 'Порядковый номер',
			type: 'number',
		},
	],
}
