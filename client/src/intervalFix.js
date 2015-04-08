function setCorrectingInterval(func, delay) {
  if (!(this instanceof setCorrectingInterval)) {
    return new setCorrectingInterval(func, delay);
  }

  var target = (new Date().valueOf()) + delay;
  var that = this;

  function tick() {
    if (that.stopped) return;
    target += delay;
    func();

    setTimeout(tick, target - (new Date().valueOf()));
  };

  setTimeout(tick, delay);
};

function clearCorrectingInterval(interval) {
  interval.stopped = true;
}
