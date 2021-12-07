import Tag from './tag'

//@TODO должен передаваться массив

const TagList = ({tags}) => (
    <div className="tag-list">
        {
            (tags || []).map(tag => <Tag>{tag}</Tag>)
        }
    </div>
)
export default TagList;