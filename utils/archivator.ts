//const fs = require('fs');

//const archive = JSON.parse(fs.readFileSync('../data/archive.json', 'utf-8'));

const archivator = (newRecord: any) => {
  return [newRecord];
  // [
  //   ...archive.answer, ...[
  //     ...JSON.parse(newRecord)
  //   ]
  //   .map((record) => {
  //     record.status = 'archive';
  //     return record;
  //   })
  // ]
};

export default archivator;
