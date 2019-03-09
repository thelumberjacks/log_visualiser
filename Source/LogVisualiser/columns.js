
const ColumnTypes = {
    Timestamp : "Time Stamp",
    LogLevel : "Level",
    Thread : "Thread",
    Class : "Class",
    NonPattern : ""
};

const columnTypeRegex = [];

columnTypeRegex[ColumnTypes.Timestamp] = [/\d{4}?\D\d{1,2}?\D\d{1,2} \d{1,2}?:\d{1,2}?:\d{1,2}(\D\d*)?/g];
columnTypeRegex[ColumnTypes.LogLevel] = [/(^| |\W)(trace|debug|info|warn|error|fatal)( |\W)/ig];
columnTypeRegex[ColumnTypes.Class] = [/([a-zA-Z_$][a-zA-Z\d_$]*\.)+([a-zA-Z_$][a-zA-Z\d_$]*)/g];
columnTypeRegex[ColumnTypes.Thread] = [/(Thread)\W\d+/g];

function Column(type, ordinal) {
    this.columnTypeKey = type;
        this.ordinal = ordinal;
}

// This is used internally to help sort the columns and a specific to the line
function ColumnPosition(type, startIndex, endIndex){
    this.columnTypeKey = type;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
}

module.exports = function Columns() {
    this.columns = [];

    this.addColumn = function(typeKey, ordinal) {
        // Only add the column if it doesnt already exist at the same index
        if(!this.columns.find(column => column.columnTypeKey === typeKey && column.ordinal === ordinal)) {
            this.columns.push(new Column(typeKey, ordinal));
        }
    };

    this.discoverColumns = function(line) {
        let columnPositions = discoverColumnPositions(line);

        // Now we have all the columns and positions - sort into start index order
        let sortedColumnPositions = columnPositions.sort((a,b) => a.startIndex - b.startIndex);

        // Add each to the list of columns in order
        let columnIndex = 0;
        let nextLineIndexPos = 0;
        for(let index = 0;index < sortedColumnPositions.length; index++) {
            if(sortedColumnPositions[index].startIndex > nextLineIndexPos) {
                this.addColumn(ColumnTypes.NonPattern, columnIndex++);
            }
            this.addColumn(sortedColumnPositions[index].columnTypeKey, columnIndex++);
            nextLineIndexPos = sortedColumnPositions[index].endIndex + 1;
        }

        if(nextLineIndexPos < line.length) {
            this.addColumn(ColumnTypes.NonPattern, columnIndex);
        }
    };

    function discoverColumnPositions(line) {
        let columnPositions = [];
        let result;
        for (let typeKey in columnTypeRegex) {
            const patterns = columnTypeRegex[typeKey];
            for (let index = 0; index < patterns.length; index++) {
                const pattern = patterns[index];

                // Find all the matches in the line for this pattern
                let keepLooking = true;
                while(keepLooking) {
                    result = pattern.exec(line);
                    if (result != null && result.index >= 0) {
                        columnPositions.push(new ColumnPosition(typeKey, result.index, pattern.lastIndex));
                    } else {
                        keepLooking = false;
                    }
                }
            }
        }

        return columnPositions;
    }
};
