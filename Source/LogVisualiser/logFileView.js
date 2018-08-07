function LogFileView() {

    this.filesToLoad = [];

    this.setFilesToView = function(files) {

        this.filesToLoad = files.slice(0);
        document.getElementById("logFileRecordsScrollArea").innerHTML = "";

        if(this.filesToLoad.length > 0) {
            this.addHtmlForNextFile();
        }
    };

    this.addHtmlForNextFile = function () {
        var progress = document.getElementById("logFileRecordsStatus");
        var fileReader = new FileReader();
        var me = this;

        fileReader.onprogress = function (event) {
            //document.getElementById("logFileRecordsStatus").textContent= "State : " + 100 * (event.loaded / event.total);
            if (event.lengthComputable) {
                progress.max = event.total;
                progress.value = event.loaded;
            }
        };

        fileReader.onload= function() {
            if(fileReader.readyState === 2) {
                var newFileHtml = [document.getElementById("logFileRecordsScrollArea").innerHTML];
                var lines = fileReader.result.split("\n");
                for (var line in lines) {
                    newFileHtml.push("[" + fileName + "] ");
                    newFileHtml.push(lines[line]);
                    newFileHtml.push("</br>");
                }

                // ODD - if we dont add the html - and escp if we dont register onload - the progress is smooth,, but if we do we get one update after a long pause... why?

                document.getElementById("logFileRecordsScrollArea").innerHTML = newFileHtml.join("");
                if (me.filesToLoad.length > 0) {
                    me.addHtmlForNextFile();
                }
            }

        };

        var file = this.filesToLoad.pop();
        var fileName = file.name;
        fileReader.readAsText(file);
    }

}