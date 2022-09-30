import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImageLibrary } from 'features/imageLibrary/api/imageLibrary';
import { Spinner } from 'components/elements/spinner';
import { CreateActionParam } from '../types/imageLibrary';

export function ImgUpload(): JSX.Element {
  const { createAction, isLoading } = useImageLibrary();
  const onDrop = useCallback((acceptedFiles: CreateActionParam) => {
    createAction(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className='w-full'
      >
        <input {...getInputProps()} />
        <div className='w-full text-center'>
          {
            isDragActive ?
              <div className='w-full bg-sky-500 ease-in duration-100 py-10'>
                <h1 className='text-5xl font-bold'>画像アップロード</h1>
                <p className='py-6'>ここに画像をドロップ</p> 
              </div>
              :
              <div className='w-full hover:bg-sky-500 ease-in duration-100 py-10'>
                {
                  isLoading ?
                    <Spinner size='xl' className='mx-auto' />
                    :
                    <>
                      <h1 className='text-5xl font-bold'>画像アップロード</h1>
                      <p className='py-6'>画像をドラック＆ドロップまたは、クリックでアップロード</p>
                    </>
                }
              </div>
          }
        </div>
      </div>
    </>
  );
}