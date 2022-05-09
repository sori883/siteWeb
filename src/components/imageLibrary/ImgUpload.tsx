import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImageLibrary } from 'hooks/imageLibrary';

const style = {
  width: 200,
  height: 150,
  border: "1px dotted #888"
};

export function ImgUpload(): JSX.Element {
  const { createAction } = useImageLibrary();
  const onDrop = useCallback((acceptedFiles) => {
    createAction(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} style={style}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>ここに画像をドロップ</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    </>
  );
}