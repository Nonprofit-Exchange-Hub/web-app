<!--
*Before merging your pull request, be sure that the follow steps have been followed:*

1. Your pull request is up-to-date with master
2. You've selected "Squash and merge" option as the merge method (default)
3. Review merge commit message and remove unnecessary lines
4. make sure you have linked the issue that this PR addresses, see right sidebar ->
-->

## Dev Summary
<!-- Link to the mocks, with node-id if possible! Note you must be signed in for Figma to update the URL with the node-id
  i.e. Messaging Inbox node: https://www.figma.com/file/fYkreARKdHsMh8iPSh7dti/GC-prototype-v1?node-id=0%3A453
  Full mocks: https://www.figma.com/file/fYkreARKdHsMh8iPSh7dti/GC-prototype-v1
-->
[Mocks](link)

<!--
  A detailed outline of what this commit includes, such as:
  benefits to user/product side
  why you architected your code this way, what other options there were and why this is best
-->


## Test Plan
<!--
A test plan that you followed to confirm this commit works as intended, and
that it does not break any existing changes.

You should include screenshots to help the reviewer understand what to look for when visual
changes are includes. GIFs help immensely when explaining interactions and animations.
-->

preReqs (to be checked by reviewer):

- [ ] following command succeeds:
`cd client && npm run checks && cd ../server && npm run checks && cd ..`
expect tests to pass
- [ ] ensure all files have been formatted:
`cd client && npm run format && cd ../server && npm run format && cd ..`
expect `git status` to show 0 files changed


repro steps:

1. localhost:3000 <!-- or the initial page your test starts on -->
2. click X button
expected: <!-- i.e. see POST request with {} body in network tab -->
<!-- screenshot -->


## Resources
<!-- 
  you will not be the last one to touch this code!
  please leave any relevant articles, youtube videos, etc. here for anyone who comes back to this PR looking for tips
-->
- [stackoverflow is cool](stackoverflow.com)
