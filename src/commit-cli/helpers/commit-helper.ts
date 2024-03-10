import { exec } from 'child_process';

/**
 * Commits the changes to the Git repository with the specified commit message.
 * @param commitMessage - The commit message to use.
 */
export function commitChanges(commitMessage: string) {
  exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}, stderr: ${stderr}`);
      return;
    }
    console.log(`commit: ${stdout}`);
  });
}
