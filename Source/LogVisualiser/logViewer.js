function LogViewer() {

    this.logFileList = new LogFileList();
    this.logFileView = new LogFileView();

    this.dropIntoLogViewer = function(event) {
        event.preventDefault();
        this.logFileList.addFiles(event.dataTransfer.files);
        this.logFileView.setFilesToView(this.logFileList.files);
    };

    this.allowDropIntoLogViewer = function(event) {
        event.preventDefault();
    };

    this.uploadFiles = function () {
        this.logFileList.addFiles(document.getElementById("uploadFileInput").files);
        document.getElementById("uploadFileInput").value = null;
        this.logFileView.setFilesToView(this.logFileList.files);
    };

    this.deleteFile = function (file) {
        this.logFileList.deleteFile(file);
        this.logFileView.setFilesToView(this.logFileList.files);
    };
}

var theLogViewer = new LogViewer();

// Bind events to methods - TODO  be nice to do this in the 'class' - the constructor?
function onLoad() {
    document.getElementById("logViewer").ondrop = function (e) {theLogViewer.dropIntoLogViewer(e)};
    document.getElementById("uploadFiles").onclick = function () { theLogViewer.uploadFiles() };
    document.getElementById("logFileListTable").onclick = function (e) { theLogViewer.deleteFile(e.target.file)};
    // TODO:Just setting the handle like the following does not include the object,, the this is missing..think I need a prototype to avoid the function () { thing?
    // Read up on the prototype thing again.. that seems important
    document.getElementById("logViewer").ondragover = theLogViewer.allowDropIntoLogViewer;
}
