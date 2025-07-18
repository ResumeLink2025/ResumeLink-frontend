module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'chore', 'fix', 'refactor', 'design', 'test', 'build', 'ci']],
  },
};
