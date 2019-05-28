// ==UserScript==
// @name         AutoMerge
// @namespace    http://akos.io
// @version      0.1
// @description  A helper script to keep trying to merge a branch on GitHub. Only works with squash + merge now.
// @author       Akos Krivachy
// @match        https://github.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js
// ==/UserScript==

// Bookmarklet: javascript:(function() {window.autoMerge();})();

(function() {
    'use strict';
    window.autoMerge = main;
})();


function main() {
    var updateButtonClicked = clickUpdateButton();
    if (updateButtonClicked) {
        log('Update button clicked');
        return loop();
    }
    if (statusChecksRunning()) {
        log('Status checks still running');
        return loop();
    }
    if (tryDeleteBranch()) {
        log('Branch deleted.');
        log('✅My job here is done. 🎉');
        return;
    }
    if (tryClickConfirmMergeButton()) {
        log('PR merge confirmed');
        return loop();
    }
    if (tryClickMergeButton()) {
        log('PR merge started');
        return loop();
    }
    log('No action to do this loop');
    return loop();
}

function loop() {
    window.setTimeout(main, 1500);
}

function clickUpdateButton() {
    var buttons = document.querySelectorAll('button');
    var updateBranchButton = _.find(buttons, btn => btn.type == 'submit' && _.trim(btn.innerText) === 'Update branch');
    if (!_.isNil(updateBranchButton)) {
        updateBranchButton.click();
        return true;
    } else {
        return false;
    }
}

function statusChecksRunning() {
    var text = "Required statuses must pass before merging";
    var textPendingElements = document.querySelectorAll('div.text-pending');
    var element = _.find(textPendingElements, e => _.trim(e.innerText) === text);
    return !_.isNil(element);
}

function tryDeleteBranch() {
    var buttons = document.querySelectorAll('button.btn');
    var deleteButton = _.find(buttons, btn => btn.type === 'submit' && _.trim(btn.innerText) === 'Delete branch');

    if (!_.isNil(deleteButton)) {
        deleteButton.click();
        return true;
    } else {
        return false;
    }
}

function tryClickConfirmMergeButton() {
    var buttons = document.querySelectorAll('button.js-merge-commit-button');
    var confirmMergeButton = _.find(buttons, btn => btn.type == 'submit' && _.trim(btn.innerText) === 'Confirm squash and merge');

    if (!_.isNil(confirmMergeButton)) {
        confirmMergeButton.click();
        return true;
    } else {
        return false;
    }
}

function tryClickMergeButton() {
    var buttons = document.querySelectorAll('button');
    var mergeButton = _.find(buttons, btn => btn.type == 'button' && btn.getAttribute('data-details-container') === '.js-merge-pr');
    if (_.isNil(mergeButton) || mergeButton.disabled || mergeButton.classList.contains('btn-danger')) {
        return false;
    } else {
        mergeButton.click();
        return true;
    }
}

function log(msg) {
    console.log('[AutoMerge] ' + msg);
}
