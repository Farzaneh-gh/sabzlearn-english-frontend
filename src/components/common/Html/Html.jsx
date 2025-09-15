import React from "react";
import DOMPurify from "dompurify";

export default function Html({testHtmlTemplate}) {
 

  return (
    <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testHtmlTemplate) }}
      className="mt-5"
    ></div>
  );
}
