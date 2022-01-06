import { useState } from 'react';
import { ArticleNew, Markdown} from 'types/article'
import { useForm } from "react-hook-form";
import { PostPreview } from 'components/articles/PostPreview';


export function PostForm(): JSX.Element {
  const [md, setMd] = useState<Markdown>('');
  const { register, getValues, handleSubmit } = useForm<ArticleNew>();

  const setData = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    e.preventDefault();
    setMd(e.target.value);
  };

  const postHandle = (): void => {
    console.log(getValues());
  };


  return (
    <>
      <h1>new post</h1>
      <form onSubmit={handleSubmit(postHandle)}>
        <label>title</label>
        <input {...register('title')} />
        <label>entry</label>
        <textarea
          {...register('entry')}
          onChange={setData} 
        />
        <input type="submit" />
      </form>
      <PostPreview markdown={md} />
    </>
  )
}