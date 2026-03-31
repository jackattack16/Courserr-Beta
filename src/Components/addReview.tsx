import Icon from "./Icon";
import '../Styles/addReview.css'

function AddReview() {
  return (
    <button className="fab-add-review">
      <Icon name="add_comment" />
      <span>Add Review</span>
    </button>
  )
}

export default AddReview;