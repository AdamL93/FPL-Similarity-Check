import GetSimilarityColour from "../components/GetSimilarityColour";

describe(GetSimilarityColour, () => {
    it('Should return red for numbers >= 60', () => {
      expect(GetSimilarityColour(60)).toBe('red');
      expect(GetSimilarityColour(75)).toBe('red');
      expect(GetSimilarityColour(100)).toBe('red');
    });
  
    it('Should return green for values < 40', () => {
      expect(GetSimilarityColour(0)).toBe('green');
      expect(GetSimilarityColour(20)).toBe('green');
      expect(GetSimilarityColour(39)).toBe('green');
    });
  
    it('Should return orange for values between 40 and 60.', () => {
      expect(GetSimilarityColour(40)).toBe('orange');
      expect(GetSimilarityColour(50)).toBe('orange');
      expect(GetSimilarityColour(59)).toBe('orange');
    });
  });