// eslint-disable-next-line require-jsdoc
export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('There is no $root')
    }
    this.$root = $root;
  }
}
