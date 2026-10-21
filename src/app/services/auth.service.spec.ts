import { toDisplayName } from './auth.service';

describe('toDisplayName', () => {
  it('should convert an Empa openBIS user id into first and last name', () => {
    expect(toDisplayName('anusch.bachofner_AT_empa.ch')).toBe('Anusch Bachofner');
  });

  it('should also handle a normal e-mail address', () => {
    expect(toDisplayName('anusch.bachofner@empa.ch')).toBe('Anusch Bachofner');
  });

  it('should capitalize hyphenated names', () => {
    expect(toDisplayName('anna-lena.muster_AT_empa.ch')).toBe('Anna-Lena Muster');
  });

  it('should show user ids without a dot unchanged', () => {
    expect(toDisplayName('admin')).toBe('admin');
  });

  it('should return an empty string for an empty user id', () => {
    expect(toDisplayName('')).toBe('');
  });
});
