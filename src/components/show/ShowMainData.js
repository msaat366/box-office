/* eslint-disable arrow-body-style */
import React from 'react';
import IMG_PLACEHOLDER from '../../images/not-found.png';
import { Star } from '../styled';
import { HeadLine, MainDataWrapper, TagList } from './ShowMainData.styled';

const ShowMainData = ({ name, rating, summary, tags, image }) => {
  return (
    <MainDataWrapper>
      <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
      <div className="text-side">
        <HeadLine>
          <h1>{name}</h1>
          <div>
            <Star />
            <span>{rating.average || 'N/A'}</span>
          </div>
        </HeadLine>
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
        <TagList>
          Tags:{' '}
          <div>
            {tags.map((tag, i) => {
              return <span key={i}>{tag}</span>;
            })}
          </div>
        </TagList>
      </div>
    </MainDataWrapper>
  );
};

export default ShowMainData;
