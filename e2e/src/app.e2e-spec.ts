import { AppPage } from './app.po';

describe('Weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should load data and render cards', () => {
    const cards = page.getCards();
    expect(cards).toBeTruthy();
  });
});
