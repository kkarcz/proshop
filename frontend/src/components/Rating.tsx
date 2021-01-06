import React, {memo, useCallback} from 'react';

interface RatingProps {
    value: number;
    text: string;
    color?: string;
}

const HALF = 0.5;
const DEFAULT_STARS_COLOR = '#f8e825';
const starsValue = [1, 2, 3, 4, 5];
const FULL_STAR = 'fas fa-star';
const HALF_STAR = 'fas fa-star-half-alt';
const EMPTY_STAR = 'far fa-star';

const Rating = ({ value, text, color = DEFAULT_STARS_COLOR }: RatingProps) => {

    const prepareCorrectIcon = useCallback((number: number) => {
        return value >= number ? FULL_STAR : value >= number - HALF ? HALF_STAR : EMPTY_STAR;
    }, [value]);

    return (
        <div className='rating'>
            {
                starsValue.map((value) => (
                    <span key={value}>
                        <i className={prepareCorrectIcon(value)} style={{color}} />
                    </span>
                ))
            }
            <span>{text}</span>
        </div>
    );
};

export default memo(Rating);