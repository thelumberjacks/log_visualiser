'use strict';

const defineSupportCode = require('cucumber').defineSupportCode;

const Columns = require(process.cwd()+'/columns');
let emptyColumnList;

defineSupportCode(function({Given, When, Then}) {

    Given(/^I have an empty column list$/, function (callback) {
        emptyColumnList = new Columns();
        callback();
    });

    When(/^I search a log file with no recognisable columns$/, function (callback) {
        emptyColumnList.discoverColumns('*** Starting game with log file that sucks');
        emptyColumnList.discoverColumns('Loading Muffin Graffic');
        emptyColumnList.discoverColumns('Crashed a bit');
        emptyColumnList.discoverColumns('Quit');
        callback();
    });

    Then(/^The column list should still be empty$/, function (callback) {
        callback(null, 'pending');
    });

    When(/^I search a log file with timestamps$/, function (callback) {
        callback(null, 'pending');
    });

    When(/^The column list should contain a timestamp column$/, function (callback) {
        callback(null, 'pending');
    });

    When(/^I search a log file with timestamps in two positions$/, function (callback) {
        callback(null, 'pending');
    });

    Then(/^The column list should contain two different timestamp columns$/, function (callback) {
        callback(null, 'pending');
    });

    Given(/^I have a column list with a timestamp column$/, function (callback) {
        callback(null, 'pending');
    });

    When(/^I search a log file with an additional timestamp column$/, function (callback) {
        callback(null, 'pending');
    });

    Then(/^The column list should contain two different timestmap columns$/, function (callback) {
        callback(null, 'pending');
    });

    When(/^I search a log file with log levels$/, function (callback) {
        callback(null, 'pending');
    });

    Then(/^The column lists should contain a log level column$/, function (callback) {
        callback(null, 'pending');
    });

    When(/^I search a log file with a pattern column between non pattern columns$/, function (callback) {
        callback(null, 'pending');
    });

    Then(/^The column list contains a pattern column surrounded by two non pattern columns$/, function (callback) {
        callback(null, 'pending');
    });

    When(/^I search a log file with class information$/, function (callback) {
        callback(null, 'pending');
    });

    Then(/^The column list contains a class column$/, function (callback) {
        callback(null, 'pending');
    });

    When(/^I search a log file with thread information$/, function (callback) {
        callback(null, 'pending');
    });

    Then(/^The column list contains a thread column$/, function (callback) {
        callback(null, 'pending');
    });

    When(/^I search a log file with class, thread, log level and timestamps$/, function (callback) {
        callback(null, 'pending');
    });

    Then(/^The column list contains columns for all the types$/, function (callback) {
        callback(null, 'pending');
    });
});
