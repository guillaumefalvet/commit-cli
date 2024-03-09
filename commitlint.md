## Usage

After installation, you can start using commitlint to validate commit messages:

1. Write your commit message following the conventional commit format:

```md
<ticket> <type>(optional scope): <description>

[optional body]

[optional footer(s)]
```

- `<ticket>`: Specifies the ticket or issue number related to the commit (e.g., JIRA-123).
- `<type>`: Indicates the type of change (e.g., feat, fix, docs, style).
- `(optional scope)`: Specifies the scope of the change (e.g., component name). This part is optional.
- `<description>`: Provides a concise description of the change.
- `[optional body]`: Contains additional details or context for the change.
- `[optional footer(s)]`: Includes any related issue references, breaking changes, etc.

2. Run commitlint to validate your commit message before committing:

   ```bash
   echo "<commit message here>" | npx commitlint
   ```

   This command will open an editor for you to write your commit message. Commitlint will validate it according to the configured rules. If the message doesn't meet the criteria, it will display an error message.

3. Once the commit message is validated, you can commit your changes as usual.

## Example

Here's an example of a valid commit message:

```md
JIRA-123 feat(components): add new button component

Adds a new button component with custom styles.

Closes #123
```
