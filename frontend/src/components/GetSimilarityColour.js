
const GetSimilarityColour = (number) => {

    if (number >= 60) {
      return 'red'; 
    } else if (number < 40) {
      return 'green'; 
    } else {
      return 'orange';
    }
  };

  export default GetSimilarityColour;