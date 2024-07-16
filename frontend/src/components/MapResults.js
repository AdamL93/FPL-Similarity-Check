
const MappedResults = (result) => {
    return result.map((value, index) => ({ gameweek: index + 1, similarity: value }));
  };

export default MappedResults;