import { Editor } from '@tinymce/tinymce-react';
import config from './config';
import { useEffect, useState } from 'react';
import type { Editor as EditorInstance } from 'tinymce';

const TinyMCE = (): JSX.Element => {
  const [editor, setEditor] = useState<EditorInstance>();

  const TinyApi = import.meta.env.VITE_TINYNCE;
  console.log(TinyApi);

  return (
    <div className="wordEditor">
      <Editor
        apiKey={TinyApi}
        onInit={(_event, activeEditor) => setEditor(activeEditor)}
        init={{
          ...config,
          plugins: 'lists link', // Add the plugins you need
          menubar: false, // Disable menubar for faster load
          branding: false, // Disable TinyMCE branding
          statusbar: false // Disable statusbar
        }}
      />
    </div>
  );
};

export default TinyMCE;
