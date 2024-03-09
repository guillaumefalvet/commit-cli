import { commitTypes } from './src/commit-cli/commitTypes';
interface IParsed {
  jiraId?: string;
  type: string;
  scope?: string;
  subject: string;
}
module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern:
        // Regular Expression for parsing commit messages:
        // Group 1: Jira ID (optional)
        // Group 2: Type of commit
        // Group 3: Scope of the commit (optional)
        // Group 4: Subject of the commit
        // /^(?<jiraId>[a-zA-Z]+-\d+)\s*(?<type>\w+)(?:\((?<scope>.*)\))?\s*:\s*(?<subject>.+)$/, original one, i skipped the JiraId underneath
        /^(?<jiraId>[a-zA-Z]+-\d+)?\s*(?<type>\w+)\s*(?:\((?<scope>.*)\))?\s*:\s*(?<subject>.+)$/,
      headerCorrespondence: ['jiraId', 'type', 'scope', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'header-match-team-pattern': (parsed: IParsed) => {
          const { jiraId, type, subject } = parsed;
          if (!type || !subject) {
            return [
              false,
              `\x1b[31mERROR\x1b[0m: Please follow the format 'ticketName-123 type (optionalScope): subject' \n \x1b[32mDocumentation here: \x1b[0m \x1b]8;;file:///${__dirname}/commitlint.md\x1b\\commitlint.md\x1b]8;;\x1b\\\n`,
            ];
          }
          return [true, ''];
        },
      },
    },
  ],
  rules: {
    'header-match-team-pattern': [2, 'always'],
    'type-enum': [2, 'always', commitTypes],
    'subject-empty': [0, 'never'],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'footer-empty': [2, 'always'],
  },
};
