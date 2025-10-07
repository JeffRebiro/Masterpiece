import React from 'react'; // React is needed for JSX
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';
import './Rating.css'; // You'll likely want a CSS file for spacing, etc.

const Rating = ({ value, text, color = '#f82525ff' }) => { // Changed default color to a common star color
    return (
        // Replaced Chakra UI's <Flex> with a standard <div>
        <div className="rating-container">
            {/* Star 1 */}
            <span style={{ color: color }}>
                {value >= 1 ? <IoStar /> : value >= 0.5 ? <IoStarHalf /> : <IoStarOutline />}
            </span>

            {/* Star 2 */}
            <span style={{ color: color }}>
                {value >= 2 ? <IoStar /> : value >= 1.5 ? <IoStarHalf /> : <IoStarOutline />}
            </span>

            {/* Star 3 */}
            <span style={{ color: color }}>
                {value >= 3 ? <IoStar /> : value >= 2.5 ? <IoStarHalf /> : <IoStarOutline />}
            </span>

            {/* Star 4 */}
            <span style={{ color: color }}>
                {value >= 4 ? <IoStar /> : value >= 3.5 ? <IoStarHalf /> : <IoStarOutline />}
            </span>

            {/* Star 5 */}
            <span style={{ color: color }}>
                {value >= 5 ? <IoStar /> : value >= 4.5 ? <IoStarHalf /> : <IoStarOutline />}
            </span>

            {/* Display text if provided */}
            <span className="rating-text">{text && text}</span>
        </div>
    );
};

export default Rating;