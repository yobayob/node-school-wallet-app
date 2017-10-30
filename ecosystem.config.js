module.exports = {
	apps: [
		{
			name: 'wallet-app',
			script: 'dist/backend.js',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
				NODE_ENV: 'production',
				PORT: 3000
			}
		},
	]
};
