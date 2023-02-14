# Contributing

## 0. How we work

This is most people's side gig/passion project/etc. so we need to be good asynchronous workers. Early, often, and public are the keys to communication here. This means please post any questions you have in our #engineering slack channel, I guarantee you someone else has the same question as your or will in the future!! If you are absolutely sure you don't want to post it publicly, do not hesitate to ping your tech lead, it is there responsibility to help you out and they want to! They will answer asynchronously though (whenever they can get to it), or set up a call if a more in depth convo is needed. 

# Please make sure to read this doc thoroughly. Steps 2 and 3.5 are important pieces of this workflow as well

## 1. Find an Issue

[Issues](https://github.com/Nonprofit-Exchange-Hub/web-app/issues)

### Provide Feedback

We'd love your comments on issues too! Some aren't ready for development and may need more detail. Please feel free to add comments with what you think the acceptance criteria should be.

Take it even futher! If you can think of any body of work that needs to be done for this organization, please open a new issue. Then post in the slack channel and let's, as a group, define the scope of the work, subtasks, follow up tickets, etc.

## 2. Schedule a touchstone 

There are multiple ways to do this, but basically the end goal is to have a brainstorming session with at least one other person. Once you have settled on an issue, post in the #engineering slack channel and discuss, at a high level, what work you were thinking this ticket will entail. 

## 3. Work on an Issue

Once you have have found an issue you feel comfortable working on, assign yourself to that issue. This let's others know that you are actively working on it and that they should not work on this ticket.

***Important: every time you create a new feature branch, start from the latest main branch***
- Creating a new branch from the main branch:
  - `git checkout main`
  - `git pull origin main`
  - `git checkout -b my-feature-branch main`

If this is your first time contributing to a code or you need a refresher, see this [great guide](https://blog.sashido.io/the-github-flow-tips-and-tricks) that goes through the steps of contributing following the [github flow](https://docs.github.com/en/get-started/quickstart/github-flow).

During your work, others might merge their PRs into `main`. It's best practice to keep your feature branch up to date with `main`. To do this follow the workflow from [this SO answer](https://stackoverflow.com/a/3877000) (preferably option 1). Sometimes you may encounter conflicts after the merge, in this case follow [these github instructions](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line).

## 3.1 Keep track of resources

As you work, if you find any helpful docs, videos, articles, etc. please keep the links in a safe space until you can add them to your PR. You will likely not be the last one to work in this space of our codebase. Others may return to your PR to try to understand what's going on. Help 'em out a bit!

## 3.2 Start a draft PR

See step 4 but right before hitting the 'create pull request' button, click the arrow next to the button and select 'create draft PR'
Then post it in our #engineering slack channel with a quick ask for anyone to have an early look and provide guidance if needed

## 4. Create a Pull Request (PR)

Once you believe your feature is ready for production, create a PR and reference what issue this addresses in the PR's
description.

- [Here's a good guide for creating a PR](https://github.com/firstcontributions/first-contributions#push-changes-to-github)
- we also have a PR template, so when you fill out the PR description, please fill out and replace all the sections with the appropriate info

If there any updates requested by our code owners, please make those updates on your local branch and re-push that branch with your changes.

Once it's approved, squash and merge! After being merged, your changes will run through our pipeline and become live after it completes building.

## Not a Developer?

We need plenty of other types of talent! Please visit the [democracy lab page](https://www.democracylab.org/projects/486) to learn how to get involved.
