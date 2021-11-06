import React, { useState, useCallback } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {useDropzone} from 'react-dropzone';
import { useStyles } from "./styles.js";
import {create} from 'ipfs-http-client';



let buffer;

const DropZone = ({ onFileUploaded })  => {
  const classes = useStyles();
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  
  async function gen(){
      let result = await ipfs.add(buffer);              
      alert(result.path);
      localStorage.setItem("sefile",result.path);
}



  const onDrop = useCallback (acceptedFiles =>  {
    
    const file = acceptedFiles[0];
    
    var reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e){
      const img = new Image()
      img.src = reader.result;
      buffer = reader.result;
      gen();
     }
  
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop, 
    accept: 'image/*'
  });

  return (
    <div className={classes.dropzone} {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      { selectedFileUrl 
        ? <img src={selectedFileUrl} alt="Point thumbnail"/>
        : (
          <p>
            <CloudUploadIcon />
            NFT image
          </p>
        )
      }
    </div>
  );
}

export default DropZone;