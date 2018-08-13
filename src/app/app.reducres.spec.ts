import * as reducers from '@app/app.reducers';

describe('App reducers', () => {
  it('should logger', () => {
    const reducer = reducers.logger(reducers.logger);
    expect(reducer).not.toBeUndefined();
  });
});
