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
});
