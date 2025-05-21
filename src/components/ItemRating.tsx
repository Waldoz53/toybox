import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import '@/styles/components/itemRating.css';

export default function ItemRating({ rating }: { rating: number }) {
  const ratingArray = [];

  for (let i = 0; i < rating; i++) {
    ratingArray.push(<FontAwesomeIcon key={i} icon={faRobot} />);
  }

  for (let i = rating; i < 10; i++) {
    ratingArray.push(<FontAwesomeIcon key={i} icon={faRobot} className="rating-hidden" />);
  }

  return (
    <div className="rating" title={`Rated ${rating} out of 10`}>
      {ratingArray}
    </div>
  );
}
