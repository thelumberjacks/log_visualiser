'use strict';
const assert = require('assert');

var {Given, When, Then} = require('cucumber');

const Columns = require(process.cwd()+'/columns');
let columns;

Given(/^I have an empty column list$/, function (callback) {
    columns = new Columns();
    callback();
});

When(/^I search a log file with no recognisable columns$/, function (callback) {
    columns.discoverColumns('*** Starting game with log file that sucks');
    columns.discoverColumns('Loading Muffin Graffic');
    columns.discoverColumns('Crashed a bit');
    columns.discoverColumns('Quit');
    callback();
});

Then(/^The column list length should be (\d+)$/, function (expectedLength) {
    assert.strictEqual(columns.columns.length, expectedLength);
});

When(/^I search a log file with timestamps$/, function (callback) {
    columns.discoverColumns('2019/3/5 10:48:00, System 1.1 starting');
    columns.discoverColumns('2019/3/5 10:48:06, Connected to 8888');
    columns.discoverColumns('2019/3/5 10:51:12, Closing down');
    callback();
});

When(/^The column list should contain a timestamp column$/, function (callback) {
    assert.strictEqual(columns.columns.length, 2);
    assert.strictEqual(columns.columns[0].columnTypeKey, "Time Stamp");
    assert.strictEqual(columns.columns[1].columnTypeKey, "");
    callback();
});

When(/^I search a log file with timestamps in two positions$/, function (callback) {
    columns.discoverColumns('2019/3/5 10:48:00, System 1.1 starting');
    columns.discoverColumns('2019/3/5 10:48:06, Connected to 8888');
    columns.discoverColumns('Closing down ,2019/3/5 10:51:12');
    callback();
});

Then(/^The column list should contain two different timestamp columns$/, function (callback) {
    // We should have  0 (ts/np) 1 (ts/np) order not important
    assert.strictEqual(columns.columns.length, 4);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "" && c.ordinal === 0).length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "" && c.ordinal === 1).length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Time Stamp" && c.ordinal === 0).length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Time Stamp" && c.ordinal === 1).length, 1);
    callback();
});

Given(/^I have a column list with a timestamp column$/, function (callback) {
    columns.discoverColumns('2019/3/5 10:48:00, System 1.1 starting');
    callback();
});

When(/^I search a log file with an additional timestamp column$/, function (callback) {
    columns.discoverColumns('This log file has some stuff at the start 2019/3/5 10:48:00, which will confused things');
    callback();
});

Then(/^The column list should contain (\d+) different timestamp columns$/, function (timeStampColumnCount) {
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Time Stamp").length, timeStampColumnCount);
});

When(/^I search a log file with log levels$/, function (callback) {
    columns.discoverColumns("2019/3/5 10:48:06, Debug, Entered the main service loop");
    columns.discoverColumns("2019/3/5 10:48:07, Info, Checking message buffer");
    callback();
});

Then(/^The column lists should contain (\d+) log level columns$/, function (levelColumnCount) {
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Level").length, levelColumnCount);
});

When(/^I search a log file with a pattern column between non pattern columns$/, function (callback) {
    columns.discoverColumns("*** No RTC *** Warn **** 0x0000001C");
    columns.discoverColumns("*** Cannot read RTC *** Error **** Address = 0x10987");
    columns.discoverColumns("*** Opening Connection *** Debug **** Port 8888");
    columns.discoverColumns("*** No handles *** Fatal **** Exit");
    callback();
});

Then(/^The column list contains a pattern column surrounded by two non pattern columns$/, function (callback) {
    assert.strictEqual(columns.columns.length, 3);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "" && c.ordinal === 0).length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Level" && c.ordinal === 1).length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "" && c.ordinal === 2).length, 1);
    callback();
});

When(/^I search a log file with class information$/, function (callback) {
    columns.discoverColumns("2019/3/5 10:48:06, Debug, Entered the main service loop at com.hciware.sausageapp.ui.sauage:18");
    columns.discoverColumns("2019/3/5 10:48:07, Info, Checking message buffer at com.hciware.batslib.message:66");
    callback();
});

Then(/^The column list contains a class column$/, function (callback) {
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Class").length, 1);
    callback();
});

When(/^I search a log file with thread information$/, function (callback) {
    columns.discoverColumns("2019/3/5 10:48:06, Thread=10, Debug, Entered the main service loop at com.hciware.sausageapp.ui.sauage:18");
    columns.discoverColumns("2019/3/5 10:48:06, Thread=12, Debug, Entered the main service loop at com.hciware.sausageapp.ui.sauage:18");
    callback();
});

Then(/^The column list contains a thread column$/, function (callback) {
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Thread").length, 1);
    callback();
});

When(/^I search a log file with class, thread, log level and timestamps$/, function (callback) {
    columns.discoverColumns("2019/3/5 10:48:06, Thread=12, Debug, Entered the main service loop at com.hciware.sausageapp.ui.sauage:18");
    callback();
});

Then(/^The column list contains columns for all the types$/, function (callback) {
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Thread").length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Level").length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Class").length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Time Stamp").length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "").length, 2);
    callback();
});

When (/^I search a log file with 2 columns transposed on different lines$/, function(callback) {
    columns.discoverColumns("2019/3/5 10:48:06, Debug, Entered the main service loop");
    columns.discoverColumns("2019/3/5 10:48:07, Info, Checking message buffer");
    columns.discoverColumns("Error, 2019/3/5 10:48:07, CPU confused");
    callback();
});

Then (/^The column list contains both columns in both positions$/, function(callback){
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Level" && c.ordinal === 0).length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Level" && c.ordinal === 1).length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Time Stamp" && c.ordinal === 0).length, 1);
    assert.strictEqual(columns.columns.filter(c => c.columnTypeKey === "Time Stamp" && c.ordinal === 1).length, 1);
    callback();
});

