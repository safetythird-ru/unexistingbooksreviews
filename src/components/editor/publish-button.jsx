import ButtonBase from "../button-base/button-base";

const PublishButton = ({inProgress}) => {
    return (
        <ButtonBase disabled={inProgress} type="submit">Publish Article</ButtonBase>
    );
}

export default PublishButton;
