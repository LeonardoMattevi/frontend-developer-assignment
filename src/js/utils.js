const loremIpsumArr = [
  'Lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit.', 'Vivamus', 'interdum', 'justo', 'ut', 'velit', 'varius', 'ultrices.', 'Praesent', 'eu',
  'ligula', 'pretium,', 'facilisis', 'massa', 'in,', 'sagittis', 'odio.', 'Nullam', 'interdum', 'vestibulum', 'vehicula.', 'Suspendisse', 'porta', 'vestibulum', 'sagittis.',
  'Vivamus', 'et', 'tortor', 'nisl.', 'In', 'placerat,', 'ex', 'a', 'sollicitudin', 'semper,', 'tortor', 'eros', 'varius', 'turpis,', 'sit', 'amet', 'rhoncus', 'magna', 'dolor',
  'ac', 'augue.', 'Aliquam', 'venenatis', 'tortor', 'neque,', 'et', 'commodo', 'erat', 'ultrices', 'vel.', 'Cras', 'consequat', 'ut', 'urna', 'quis', 'fermentum.', 'Donec', 'turpis',
  'velit,', 'laoreet', 'non', 'ex', 'vitae,', 'vehicula', 'ultrices', 'nibh.', 'Aliquam', 'ligula', 'metus,', 'tempus', 'a', 'leo', 'tincidunt,', 'sagittis', 'imperdiet', 'eros.',
  'Pellentesque', 'lobortis', 'eros', 'vel', 'consequat', 'tempor.', 'Nullam', 'blandit', 'ex', 'quam,', 'ac', 'placerat', 'nibh', 'accumsan', 'eget.'];

export default class Utils {
  static async wait(time = 500) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, time);
    });
  }
  static getRandomInt(from = 0, to = 10) {
    return parseInt(Math.random() * (to + 1) + from, 10);
  }

  static getCardTitle(wordNumber) {
    const _titleArr = [];

    for (let i = 0; i < wordNumber; i++) {
      _titleArr.push(loremIpsumArr[this.getRandomInt(0, loremIpsumArr.length)]);
    }
    return _titleArr.join(' ');
  }

  static formatSeconds(secondsNumber) {
    let returnString = '';

    if (secondsNumber >= 3600) {
      const hours = parseInt(secondsNumber / 3600, 10);
      const min = parseInt((secondsNumber / 60) % 60, 10);

      returnString = `${hours}h ${min < 10 ? '0' + min : min}m`;
    } else {
      const min = parseInt(secondsNumber / 60, 10);
      const sec = parseInt(secondsNumber % 60, 10);

      returnString = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    }
    return returnString;
  }
}
