---
path: "/git-cheat-sheet"
date: "2019-12-09"
title: "Git cheat sheet"
spoiler: Git me out of this!
---

[Git](https://git-scm.com/) is a tool used for versioning your code and work in isolated branches.  
It is especially useful when collaborating within the same codebase.  
Git is powerful and flexible, if you know what you're doing.  
But if you're new to it, it can be very confusing. 🤯💻

> When you're getting started, the threat of losing all your changes after running a command copy-pasted from Stackoverflow is always looming over you.

This cheat sheet is for you who often say: "How am I going to get out if this?!"
It contains ready-to-use git workflows for all common cases that you are likely to run into. 😇💻

---

## How does git work?

// TODO. Explain changes, staged changes, commits, branches, remote repository, git history.

## Useful Git workflows

### Get the latest updates

This is a useful command to run every morning, when you start a new branch or when you want to test a branch locally on your computer. The command pulls the latest version of all branches from a remote repository:

```bash
git pull
```

### Display the latest commits

```bash
git log
```

### See the current git status

This command is useful to see which files have been added / deleted / changed and what has been staged for the next commit.

_<span style="color: #EE5648">Unstaged changes</span>_ appear in red.

_<span style="color: #33D989">Staged changes</span>_ appear in green.

```bash
git status
```

### Create and move to a new branch

```bash
git checkout -b <name-of-new-branch>
```

### Move into an existing branch

```bash
git checkout <name-of-another-branch>
```

This can specifically be helpful when you want to test locally a branch created by someone else:

```bash
git pull
git checkout <other-persons-branch>
```

### Push my changes to a remote repository

```bash
git add -A
git commit -m "Your commit message"
git push origin HEAD
```

### Get the latest changes from development into my branch

This can be useful when changes have been made to development and you want your branch to be synced with the latest changes.

```bash
git checkout development
git pull
git checkout <name-of-my-branch>
git rebase development
```

If there is a conflict, you'll need to fix the conflicts in the files that are conerned, save those files, stage the files and run `git rebase --continue`

### Add changes into the latest commit

Let's say your forgot do add something in the latest commit.  
You can make the changes, save the files and run:

```bash
git add -A
git commit --amend --no-edit
```

Or if you want to edit the commit message:

```bash
git commit --amend
```

### Add changes into a recent commit

Let's say your forgot do add something in an recent (but not latest) commit.
You can add the changes to a new temporary commit and merge this commit into your target commit:

```bash
git add -A
git commit -m "Whatever"
git log # Find the position of the target commit.
git rebase HEAD~5 -i # Here the target commit is within the last five commits.
# VIM opens. Type "i" to go into insert mode.
# Place the temporary commit below the target commit (copy paste and erase).
# and replace "edit" by "fixup".
# Save and quit VIM: Press ESC, type ":wq" and press ENTER.
```

You can now verify with `git log` that your temporary commit is gone.

### Rename several commits

Let's say you want to rename messages within the last five commits.

```bash
git rebase HEAD~5 -i
# VIM opens. Type "i" to go into insert mode.
# Replace "pick" with "e" for the commits you want to edit.
# Save and quit VIM: Press ESC, type ":wq" and press ENTER.
```

### Reorder commits

Let's say you want to reorder commits within the last five commits.

```bash
git rebase HEAD~5 -i
# VIM opens. Type "i" to go into insert mode.
# Reorder the lines in the order you want (copy paste and erase).
# Save and quit VIM: Press ESC, type ":wq" and press ENTER.
```

### Rename a file in the git history

Sometimes renaming a file from your IDE will not register the change in the git history. This happened to me a few times when the changes are only related to case sensitivity.

Here is how to rename a file and save this into the git history:

```bash
git mv <oldFileName> <newFileName>
```

### Create a branch from a specific commit

```bash
git log
# Find the commit you want and copy its SHA.
git checkout <SHA>
git checkout -b <my-branch>
```

### Get rid of some commits but keep the changes

For example, if you want to get rid of three commits:

```bash
git reset HEAD~3
```

### Move to another branch but keep my unfinished work

[`stash`](https://git-scm.com/docs/git-stash) is the correct way to do it but I find the following more convenient:

```bash
git add -A
git commit -m "WIP"
git push origin HEAD
```

_At this point, if you really want to make sure you don't lose your work, you can push to the remote repository. Since you don't want to have an uncompleted commit in your branch, you will have to "force push" later._

And when you come back to the branch later:

```bash
git reset HEAD~
```

### Push to a remote repository with changes in the git history

This is also called "force push". It's a bit scary because it changes the history on the remote repository and can lead to losing changes if used in an inappropriate way. So make sure you understand what you're doing when using `push -f`.

```bash
git push origin HEAD -f
```

### Drop all current changes (to move in another branch)

```bash
git checkout -- .
```

### Add several people as co-authors of a commit

If you want to give credits to all people involved in creating a commit, you can do the following:

```bash
# TODO
```

If you're using Github, you will see both profile pictures displayed in the Git history:

// TODO: Add screenshot
