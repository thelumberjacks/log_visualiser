function LogFileList() {

    this.files = [];

    this.addFiles = function(files) {
        for(var index = 0;index < files.length;index++) {
            this.files.push(files[index]);
        }

        var table = document.getElementById("logFileListTable");
        for(index = 0;index < files.length; index++) {

                var row = table.insertRow(-1);
                var cell = row.insertCell(0);
                cell.innerHTML = files[index].name;
                cell.file = files[index];
        }
    };

    this.deleteFile = function(file) {

        var oldFiles = this.files.slice(0);
        this.files = [];
        for(var index = 0;index < oldFiles.length;index++) {
            if(oldFiles[index] !== file) {
                this.files.push(oldFiles[index]);
            }
        }

        var table = document.getElementById("logFileListTable");
        for(var rowIndex = 0; rowIndex < table.rows.length ; rowIndex++) {
           var cell = table.rows[rowIndex].cells[0];
            if(cell.file === file) {
               table.deleteRow(rowIndex);
           }
        }
    }
}