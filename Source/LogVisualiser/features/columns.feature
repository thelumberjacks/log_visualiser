Feature: User can discover columns in log files
  As a user
  I want to discover columns in log files
  So that data in a log file can be displayed in columns

  Scenario: A log file with no recognisable columns is searched for columns
    Given I have an empty column list
    When I search a log file with no recognisable columns
    Then The column list should still be empty

  Scenario: A log file with timestamps searched for columns
    Given I have an empty column list
    When I search a log file with timestamps
    Then The column list should contain a timestamp column

  Scenario: A log file with timestamps at two positions is searched
    Given I have an empty column list
    When I search a log file with timestamps in two positions
    Then The column list should contain two different timestamp columns

  Scenario: A new column can be discovered in a second log file
    Given I have a column list with a timestamp column
    When I search a log file with an additional timestamp column
    Then The column list should contain two different timestmap columns

  Scenario: A log file with log level is searched for columns
    Given I have an empty column list
    When I search a log file with log levels
    Then The column lists should contain a log level column

  Scenario:A log file with a non pattern and patterns columns is searched for columns
    Given I have an empty column list
    When I search a log file with a pattern column between non pattern columns
    Then The column list contains a pattern column surrounded by two non pattern columns

  Scenario:A log file with a class column is searched for columns
    Given I have an empty column list
    When I search a log file with class information
    Then The column list contains a class column

  Scenario:A log file with a thread column is searched for columns
    Given I have an empty column list
    When I search a log file with thread information
    Then The column list contains a thread column

  Scenario:A log file with a all column types is searched for columns
    Given I have an empty column list
    When I search a log file with class, thread, log level and timestamps
    Then The column list contains columns for all the types