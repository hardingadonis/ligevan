module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			['add', 'update', 'fix', 'docs', 'feat', 'refactor', 'delete'],
		],
	},
};
