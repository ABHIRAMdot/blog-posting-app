import "./ui.css";

export const Button = ({
    children,
    type = "button",
    disabled = false,
    onClick,
}) => {

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className="ui-button"
        >
            {children}
        </button>
    );
};