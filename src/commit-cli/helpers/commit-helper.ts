import { exec } from 'child_process';

export function commitChanges(commitMessage: string) {
  exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`commit: ${stdout}`);
  });
}
