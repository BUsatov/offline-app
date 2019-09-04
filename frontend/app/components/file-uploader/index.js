import React from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";

function FileUploader({
  onDrop,
  accept = "image/png",
  minSize = 0,
  maxSize,
  onDropAccepted,
  onDropRejected
}) {
  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    rejectedFiles
  } = useDropzone({
    onDrop,
    accept,
    minSize,
    maxSize,
    onDropAccepted,
    onDropRejected
  });

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  return (
    <div className="file-uploader">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!isDragActive && "Click here or drop a file to upload!"}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
        {isFileTooLarge && (
          <div className="text-danger mt-2">File is too large.</div>
        )}
      </div>
    </div>
  );
}
FileUploader.propTypes = {
  onDrop: PropTypes.func,
  accept: PropTypes.arrayOf(PropTypes.string),
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func
};

export const utils = {
  readUploadedFileAsDataUrl: inputFile => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  }
};

export default FileUploader;
