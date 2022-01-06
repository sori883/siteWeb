import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export function PostPreview(props:{markdown: string}): JSX.Element {
  return (
    <>
      <ReactMarkdown plugins={[gfm]} unwrapDisallowed={false}>
        {props.markdown}
      </ReactMarkdown>
    </>
  );
}