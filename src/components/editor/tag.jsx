import { useDispatch } from "react-redux";
import { REMOVE_TAG } from '../../constants/actionTypes';

const Tag = ({children}) => {
    const dispatch = useDispatch();

    const removeTagHandler = tag => () => {
        dispatch({ type: REMOVE_TAG, tag })
    };
    
    return (
        <span className="tag-default tag-pill" key={children}>
            <i className="ion-close-round" onClick={removeTagHandler(children)}/>
            {children}
        </span>
    )
}

export default Tag;