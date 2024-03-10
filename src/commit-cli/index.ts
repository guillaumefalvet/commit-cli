#!/usr/bin/env npx tsx

/**
 * This script is a CLI tool for creating commit messages in a standard format.
 * It takes command line options for specifying the type, message, scope, and other details of the commit.
 * The commit process is handled by the `main` function, which constructs the commit message and performs the commit.
 * If the commit is not allowed on the current branch, an error message is displayed and the program exits.
 * If the type or message options are missing, an error message is displayed along with the program's help.
 */
import { Command, Option } from 'commander';
import chalk from 'chalk';
import simpleGit from 'simple-git';
import { commitChanges } from './helpers/commit-helper';
import figlet from 'figlet';
import { commitTypes } from './commitTypes';

const program = new Command();

program
  .version('1.0.0', '-v, --version', 'Output the current version')
  .description('A CLI to help commit messages in a standard format.')
  .addOption(new Option('-t, --type <type>', 'The type of the commit.').choices(commitTypes))
  .option('-m, --message <message> ', 'The commit message. Eg: Add new feature')
  .option('-s, --scope [scope]', 'The scope of the commit. Eg: core, header, footer')
  .option('-d, --dryRun', 'Run in dry run mode')
  .option('-p, --prettier', 'Run prettier before commit')
  .option('-f, --force', 'Force commit')
  .parse(process.argv);

const options = program.opts();
const cwd = process.cwd();

/**
 * The main function that handles the commit process.
 * @returns {Promise<void>} A promise that resolves when the commit process is complete.
 */
async function main() {
  const git = simpleGit(cwd);
  const branch = await git.branch();
  if (options.force) {
    console.log(chalk.bgRed('Forcing commit to ', branch.current));
  } else if (
    (!options.force && branch.current === 'develop') ||
    branch.current === 'master' ||
    branch.current === 'main'
  ) {
    console.error(chalk.red(`the CLI will not commit to ${branch.current} branch.`));
    process.exit(1);
  }
  let commitMessage = '';
  const ticketNumber = branch.current.split('/')[1];
  if (ticketNumber) {
    commitMessage += `${ticketNumber} `;
  }
  // Construct the commit message
  if (options.scope) {
    commitMessage += `${options.type} (${options.scope}):`;
  } else {
    commitMessage += `${options.type}:`;
  }
  commitMessage += ` ${options.message}`;
  console.log(chalk.bgGreen('Commit message:'), commitMessage);
  if (!options.dryRun) {
    // if i use the git.commit(commitMessage), it will now show me the file change, so i will use the commitChanges function
    // but i will keep the git.commit as a comment
    // await git.commit(commitMessage);
    if (options.prettier) formatFiles();
    commitChanges(commitMessage);
  } else {
    console.log(chalk.bgYellow('Dry run mode, no commit was made.'));
  }
}

if (!options.type || !options.message) {
  /**
   * Display help and exit if type or message are missing.
   * @remarks This will print an error message, the program's help, and exit with code 1.
   */
  console.log(chalk.green(figlet.textSync('Git Commit CLI')));
  console.error(chalk.red('Type and message are required.'));
  program.outputHelp();
  process.exit(1);
} else {
  main();
}

if (!process.argv.slice(2).length) {
  console.log(chalk.green(figlet.textSync('Git Commit CLI')));
  program.outputHelp();
  process.exit(1);
}
