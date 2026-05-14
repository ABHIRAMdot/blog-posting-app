import "./ui.css";

export const Loader = ({
    text = "Loading..."
}) => {

    return (
        <div className="ui-loader">
            {text}
        </div>
    );
};