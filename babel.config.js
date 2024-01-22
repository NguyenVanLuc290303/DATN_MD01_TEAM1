module.exports = {

  presets: ['module:@react-native/babel-preset'],
  plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.js', '.json'],
				alias: {
					'@': './src',
				},
			},
		],
		'inline-dotenv',
		'macros',
		'react-native-reanimated/plugin',

	],
};
