import MappedResults from "../components/MapResults";


describe(MappedResults, () => {
  
  it('should return an empty array if input is empty', () => {
    const input = [];
    const expectedOutput = [];
  
    expect(MappedResults(input)).toEqual(expectedOutput);
  });
  
  it('should correctly map a single input', () => {
    const input = [50];
    const expectedOutput = [{ gameweek: 1, similarity: 50 }];
  
    expect(MappedResults(input)).toEqual(expectedOutput);
  });

  it('Should map multiple results correctly', () => {
    const input = [10, 20, 30];
    const expectedOutput = [
      { gameweek: 1, similarity: 10 },
      { gameweek: 2, similarity: 20 },
      { gameweek: 3, similarity: 30 },
    ];
  
    expect(MappedResults(input)).toEqual(expectedOutput);
  });

});