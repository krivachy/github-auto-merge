# github-auto-merge
Script to smash the Update + Merge button until the PR is merged

## Installation instructions:

1. Grab [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo//Open)
2. Open the dashboard and go to Utilities
3. Enter the URL: `https://raw.githubusercontent.com/krivachy/github-auto-merge/master/automerge.js` and click import
4. Add the following bookmarklet to invoke the AutoMerge: `javascript:(function() {window.autoMerge();})();`


## Caveats

* Only works for "Squash + rebase" style PRs for now
