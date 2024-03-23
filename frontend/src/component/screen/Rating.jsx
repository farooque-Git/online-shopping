import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {value >= index + 1 ? (
            <StarIcon />
          ) : value >= index + 0.5 ? (
            <StarHalfIcon />
          ) : (
            <StarIcon />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
