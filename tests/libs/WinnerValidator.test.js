/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import _ from 'lodash';
import { expect } from 'chai';
import WinnerValidator from '../../src/libs/WinnerValidator';
import {
  player1,
  player2,
  p1VerticalWinner,
  noVerticalWinner,
  p2HorizontalWinner,
  p1RightDiagonalWinner,
  p2LeftDiagonalWinner,
  p1HorizontalRegression,
} from './fixtures/boards';

describe('WinnerValidatorTest', () => {
  describe('#vertically', () => {
    it('validates winner vertically', () => {
      const validate = new WinnerValidator(p1VerticalWinner);

      expect(validate.vertically(player1)).to.be.true;
      expect(validate.vertically(player2)).to.be.false;
    });

    it('only declares winner with 4 matches vertically', () => {
      const validate = new WinnerValidator(noVerticalWinner);

      expect(validate.vertically(player1)).to.be.false;
      expect(validate.vertically(player2)).to.be.false;
    });
  });

  describe('#horizontally', () => {
    it('validates winner horizontally', () => {
      const validate = new WinnerValidator(p2HorizontalWinner);

      expect(validate.horizontally(player1)).to.be.false;
      expect(validate.horizontally(player2)).to.be.true;
    });

    it('validates winner horizontally with 5 matches', () => {
      const validate = new WinnerValidator(p1HorizontalRegression);

      expect(validate.horizontally(player1)).to.be.true;
      expect(validate.horizontally(player2)).to.be.false;
    });
  });

  describe('#diagonally', () => {
    it('validates winner diagonally (right)', () => {
      const validate = new WinnerValidator(p1RightDiagonalWinner);

      expect(validate.diagonally(player1)).to.be.true;
      expect(validate.diagonally(player2)).to.be.false;
    });

    it('validates winner diagonally (left)', () => {
      const validate = new WinnerValidator(p2LeftDiagonalWinner);

      expect(validate.diagonally(player1)).to.be.false;
      expect(validate.diagonally(player2)).to.be.true;
    });
  });
});
