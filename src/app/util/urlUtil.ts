export class UrlUtil {
  public static urlContainsForm(url: string): boolean {
    const length = url.length;

    return url.indexOf('/form/') > -1 ||
      url.substring(length - 5, length) === 'form/';
  }

  public static getAtForm(url: string): string {
    const length = url.lastIndexOf('/');
    return url.substring(1, length);
  }
}
