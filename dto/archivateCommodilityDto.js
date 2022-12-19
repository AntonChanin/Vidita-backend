const archivateCommodilityDto = (body) => (
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
);

export default archivateCommodilityDto;
