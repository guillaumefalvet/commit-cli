import { exec } from 'child_process';
export function formatFiles() {
  exec('npx prettier --write .', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`prettier: ${stdout}`);
  });
}
