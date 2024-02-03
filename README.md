# Meal-Master-CRM
## Good Coding Practise:

### Version Control with Git: Developer's Guide

<!-- Key Terminologies: -->

- Repository (Repo):
A storage location for your project's files and revision history.

- Branches:
Independent lines of development that allow you to work on features or fixes without affecting the main codebase.

- Commands:
Instructions you give to Git to perform specific actions.


<!-- Essential Commands -->

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


- Pull Request (PR):
A Pull Request (PR) is a concise process for proposing, reviewing, and merging code changes in a collaborative development environment.


<!-- Conventional/Semantic Commit Message Guide: -->

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


<!-- Commit Message Best Practices -->

**Overview**
Good commit messages play a crucial role in understanding and managing changes in a codebase. They should convey the impact of the commit and be clear, descriptive, and brief. Follow these practices for effective commit messages:

**Guidelines**

1. Clear and Descriptive:
Clearly state what the commit does and its impact.

2. First Line Summary:
- Provide a short, single-line summary (maximum 72 characters).
- Be concise but informative.
> Good: "Fixes #27 Users cannot edit other's accounts"
> Bad: "Fixed issue with user account editing"

3. Present Tense:
- Write commit messages in the present tense.
- Use "Fix" instead of "Fixed" or "Fixing."
> Good: "Fix issue with login button"
> Bad: "Fixed issue with login button" or "Fixing issue with login button"

4. Include Tracking Numbers:
- Reference issue or task tracking numbers in the message.
- Enhances traceability and links to project management tools.
> Good: "feat: #32 Add forgot password logics"

  - Examples
  > Fixing a Bug: "fix: #27 Users cannot edit other's accounts"
  > Adding a Feature: "feat: #32 Add forgot password logics"


<!-- GitHub Workflow: Using Github Issues for dev tasks -->

1. Creating New Issues
- Start with an Issue:
  - Create a new GitHub Issue when initiating a task.
  - Provide a clear title and detailed description.

2. Commit and PR Messages
- Always Reference the Issue:
  - Include the associated issue number in every commit and pull request (PR) message.
  > Example: feat: add state handling for user name #12

3. GitHub Project Boards
- Utilize GitHub Projects:
  - Use GitHub Projects for development-specific task management.
  - Organize tasks into boards (To-Do, In Progress, Done) for visibility.


### Linting with ESLint: Developer's  Guide

**Overview**
This documentation introduces ESLint, a robust code analysis tool that helps identify errors, enforce coding style, and maintain clean and consistent code.

<!-- ESLint (eslint.org) -->
- Purpose:
ESLint is a linting tool designed to analyze code and provide insights into potential errors and coding practices.

- Consistency and Clean Code:
Enhances code consistency and cleanliness by identifying and correcting bad coding practices.

[Guide:] ("https://mediaspace.langara.ca/media/t/0_3pti0qjw")

<!-- Style Guide -->
- Guide for Consistent Code:
ESLint is often used in conjunction with a style guide to ensure a consistent coding style across a project.

<!-- Installing ESLint on VSCode -->
1. Open VS Code.
2. Go to Extensions.
3. Search for "ESLint"
4. Click "Install."
ESLint is now ready to analyze your code for errors and maintain coding practices.


### Code Formatting: Quick Overview

- Readability:
Proper formatting enhances code readability, making it easier for collaboration.

- Communication:
Well-formatted code serves as clear communication among developers.


<!-- Installing Prettier(Code Formatting Tool) on VSCode -->
1. Open VS Code.
2. Go to Extensions.
3. Search "Prettier."
4. Click "Install."
5. Reload VS Code.
Now, Prettier is ready to format your code effortlessly.
