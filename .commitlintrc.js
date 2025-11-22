module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only changes
        'style', // Changes that don't affect code meaning
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf', // Performance improvements
        'test', // Adding missing tests
        'chore', // Changes to build process or tools
        'revert', // Revert a previous commit
        'ci', // CI configuration changes
      ],
    ],
    'subject-case': [0], // Allow any case for subject
  },
};
