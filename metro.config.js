const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = 
  {
    transformer: {
            babelTransformerPath: require.resolve('./transformer.config.js'),
            getTransformOptions: async () => ({
              transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
              },
            }),
          },
    resolver: {
        assetExts: [...defaultConfig.resolver.assetExts,"sass" ,"scss" ,"lottie"],
      },
    };

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

