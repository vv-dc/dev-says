import React from 'react';
import moment from 'moment';

const TimeAgo = ({ date }) => (
  <time dateTime={date}>{moment(date).fromNow()}</time>
);

export default TimeAgo;
