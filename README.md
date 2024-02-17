# Meal-Master-CRM
## Good Coding Practise:

### Commit Message Guidelines

<!-- Writing Title -->

**First Line Summary**
- Provide a short, single-line summary (maximum 72 characters).
- Be concise but informative.
> Example: "feat: provider-sign-up-api"
>> Refer to the Semantic Commit message guide given below.

**Conventional/Semantic Commit Message Guide:**
- build: 
Change to the build system.

- chore:
A programming chore with little/no impact on code.
  - Example: Bumping version numbers, updating dependencies.

- ci:
Change to the continuous integration system.

- docs:
Change to user/API documentation (not comments).

- feat:
Add a new feature. Results in a new MINOR version number.
  - Example:  Going from version x.0 to x.1.

- fix:
Fixes an issue/bug. Results in a new PATCH version number.
  - Example: Going from version x.y.0 to x.y.1.

- perf:
Change related to performance.

- refactor:
Change to code structure without impacting code function.

- revert:
Undo a previous change (ensure to reference the change(s) being reverted).

- style:
Change code formatting without changing structure or function.

- test:
Changes to test cases or the test system.

<!-- Writing Descriptions -->

**Use Present Tense**
- Always write commit messages in the present tense.
- Use "Fix" instead of "Fixed" or "Fixing."
> Good: "Fix issue with login button"
> Bad: "Fixed issue with login button" or "Fixing issue with login button"

**Include Tracking Numbers in description**
- Reference issue or task tracking numbers in the message.
> Example: 
>> "This commit introduces the implementation of provider sign up API. Jira Ticket #54"


<!-- Essential GIT Commands -->
- git clone:
Clone a repository into a new directory.
`git clone <repository_url>`

- git commit:
Record changes to the repository.
`git commit -m "Descriptive message"`

- git checkout:
Switch branches or restore working tree files.
`git checkout <branch_name>`

- git push:
Upload local changes to a remote repository.
`git push <remote_name> <branch_name>`

- git merge:
Combine changes from different branches.
`git merge <branch_name>`

- git pull:
Fetch changes from a remote repository and merge them into the current branch.
`git pull <remote_name> <branch_name>`

- git rebase:
Combine a sequence of commits into a new base commit.
`git rebase <branch_name>`

- git log:
View the commit history.
`git log`

- git reset:
Reset the current branch to a specific state.
`git reset <commit_hash>`

### Linting with ESLint: Developer's  Guide
<!-- ESLint (eslint.org) -->
ESLint is a linting tool designed to analyze code and provide insights into potential errors and coding practices.
[Guide:] ("https://mediaspace.langara.ca/media/t/0_3pti0qjw")
Install ESLint Extention on VSCode

### Code Formatting: Quick Overview
Instal Prettier(Code Formatting Extention) on VSCode 

