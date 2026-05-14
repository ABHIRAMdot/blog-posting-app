import "./ui.css";

export const Textarea = ({
    placeholder,
    value,
    onChange,
}) => {

    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="ui-textarea"
        />
    );
};