import Icon from "./Icon";
import '../Styles/addReview.css'

function AddReview() {
  return (
    <button className="fab-add-review">
      <Icon name="add_comment" />
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSdzS9RgGFL1E0A3C-tiwaXu3Zx13y2GUMDnRKxamePGoYw8-w/viewform?usp=header" target="_blank" rel="noopener noreferrer">Add Review</a>
    </button>
  )
}

export default AddReview;