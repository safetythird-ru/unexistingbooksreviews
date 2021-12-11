import { useSelector } from 'react-redux';
import Tag from './tag'

const TagList = () => {
    const { tags } = useSelector(store => store.editor);

    return (
        <div className="tag-list">
            { tags.map(tag => <Tag>{tag}</Tag>) }
        </div>
    )
}

export default TagList;