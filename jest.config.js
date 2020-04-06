const config = {
  bail: true,
  moduleFileExtensions: ['js', 'json', 'node', 'ts'],
  moduleDirectories: ['node_modules'],
  testRegex: '/__(tests|specs)__/.*.([\\.test\\.spec])\\.(j|t)s$',
};

module.exports = config;
