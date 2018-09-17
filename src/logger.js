const GLOBAL_VERBOSITY = 2;

const LOGGERS = [console.error, console.warn, console.log];

export default class Logger {
  /**
   * @param {*} obj
   * @param {String} prefix
   */
  constructor(obj, prefix) {
    this.prefix = prefix;
    this.verbosity = GLOBAL_VERBOSITY;
    this.alreadyLogged = {};

    //completely disable logging for performance reasons
    if (GLOBAL_VERBOSITY === -1)
      this.log = () => { };
  }

  /**
   * @param {Number} verbosity
   */
  setVerbosity(verbosity) {
    this.verbosity = Math.min(verbosity, GLOBAL_VERBOSITY);
  }

  /**
   * @param {0|1|2} level
   * @param  {...any} params
   */
  log(level, ...params) {
    if (level > this.verbosity)
      return;

    let loggingFunc = LOGGERS[level] || console.log;
    loggingFunc(this.prefix, ":", ...params);
  }
}
