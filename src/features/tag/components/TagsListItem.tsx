import { useState } from 'react';
import {
  Tag,
  TagActionParam
} from 'features/tag/types/tag';
import { Button } from 'components/elements/button';
import { Card } from 'components/elements/card';
import { Form, InputField } from 'components/form';
import * as z from 'zod';

const schema = z.object({
  text: z.string().min(1, '必ず入力してください').max(20, { message: '20文字以内で入力してください' }),
});

export function TagsListItem(props: {
  tag: Tag,
  updateAction: (tag: Tag) => Promise<void>,
  deleteAction: (tag: Tag) => Promise<void>
}): JSX.Element {
  // 編集フォーム切り替え用ステート
  const [toggle, setToggle] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTagDelete = async ():Promise<void> => {
    setIsLoading(true);
    await props.deleteAction(props.tag).finally(() => {
      setIsLoading(false);
    });
  };

  const handleToggleElement = ():void => {
    setToggle(!toggle);
  };

  const submit = (data: TagActionParam): Promise<void> => {
    const updateData = {
      ...props.tag,
      ...data
    };
    
    setToggle(!toggle);
    return props.updateAction(updateData);
  };


  return (
    <>
      <Card>
        {toggle ? 
          <h2 className='card-title'>{props.tag.text}</h2>
          :
          <Form<TagActionParam, typeof schema>
            onSubmit={(data):void => {
              submit(data);
            }}
            schema={schema}
          >
            {({ register, formState }): JSX.Element => (
              <>
                <InputField
                  type='text'
                  label='タグ名'
                  defaultValue={props.tag.text}
                  error={formState.errors['text']}
                  registration={register('text')}
                />
                <Button
                  type='submit'
                  className='mt-2'
                  variant='primary'
                  isLoading={isLoading}
                  size='sm'
                >
                  登録
                </Button>
              </>
            )}
          </Form>
        }
        <div className='card-actions justify-end'>
          <Button
            variant='primary'
            size='sm'
            onClick={handleToggleElement}>
            { toggle ? '編集' : '中止' }
          </Button>
          <Button
            variant='danger'
            size='sm'
            isLoading={isLoading}
            onClick={handleTagDelete}>
              削除
          </Button>
        </div>
      </Card>
    </>
  );
}