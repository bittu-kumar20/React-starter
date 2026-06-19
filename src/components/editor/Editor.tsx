

import { Editor, type EditorTextChangeEvent } from "primereact/editor";
import { Controller, useFormContext } from "react-hook-form";

interface TextEditorWrapperProps {
    name: string;
    placeholder?: string;
    height?: string;
}

export default function TextEditorWrapper({
    name,
    placeholder,
    height = "276px",
}: TextEditorWrapperProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <Editor
                        value={field.value || ""}
                        onTextChange={(e: EditorTextChangeEvent) => field.onChange(e.htmlValue || "")}
                        placeholder={placeholder}
                        style={{ height }}
                        className="shadcn-editor"
                    />
                );
            }}
        />
    );
}
