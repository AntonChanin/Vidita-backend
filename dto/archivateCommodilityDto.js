function archivateCommodilityDto(body) {
  return (
    body.answer.map(
      ({
      id,     
      sum,
      qty,
      volume,
      name,
      delivery_date,
      currency,
      }) => ({
      id,
      status: 'archive',
      sum,
      qty,
      volume,
      name,
      delivery_date,
      currency,
      })
    )
  )
};

module.exports = archivateCommodilityDto;
