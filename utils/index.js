const getSortQuery = (sortString) => {
  switch (sortString) {
    case 'newest':
      return 'ORDER BY date DESC';
    case 'relevant':
      return 'ORDER BY rating DESC';
    case 'helpful':
      return 'ORDER BY helpfulness DESC';
  }
};

const conformReview = (review, photos) => {
  return {
    review_id: review.id,
    rating: review.rating,
    summary: review.summary,
    recommend: review.recommend,
    response: review.response,
    body: review.body,
    date: new Date(Number(review.date)).toISOString(),
    reviewer_name: review.reviewer_name,
    helpfulness: review.helpfulness,
    photos: photos
  };
};

module.exports = { getSortQuery, conformReview };