class EventEmiter {
  constructor() {
    this.events = {};
  }
  $on(eventName, eventFunc) {
    if (!eventName) return console.error("事件名不能为空");
    if (!eventFunc) return console.error("事件回调函数不能为空");
    const _event = this.events[eventName] || [];
    if (_event.length === 0) {
      return (this.events[eventName] = [eventFunc]);
    }

    (_event.includes(eventFunc) &&
      _event.splice(_event.indexOf(eventFunc), 1, eventFunc)) ||
      _event.push(eventFunc);
    this.events[eventName] = _event;
  }
  $emit(eventName, ...args) {
    if (!eventName) return console.error("事件名不能为空");
    if (!this.events[eventName]) return console.error("该事件不存在");
    const _event = this.events[eventName] || [];
    if (_event.length === 0) {
      return console.error("该事件无回调函数");
    }
    _event.forEach(item => {
      item && item(...args);
    });
  }
  $remove(eventName, eventFunc) {
    if (!eventName) return console.error("事件名不能为空");
    if (!eventFunc) {
      return (
        (this.events[eventName] && delete this.events[eventName]) ||
        console.error("事件列表中没有此事件")
      );
    }
    const _event = this.events[eventName] || [];
    (_event.includes(eventFunc) &&
      _event.splice(_event.indexOf(eventFunc), 1)) ||
      console.error("事件中没有该回调函数");
    this.events[eventName] = _event;
  }
  $once(eventName, eventFunc) {
    if (!eventName) return console.error("事件名不能为空");
    if (!eventFunc) return console.error("事件回调函数不能为空");
    const cb = (...args) => {
      eventFunc && eventFunc(...args);
      this.$remove(eventName);
    };
    this.$on(eventName, cb);
  }
}
const event = new EventEmiter();
const logText = function(text = "日志") {
  console.log(text);
};
event.$on("log", logText);
console.log(event);
event.$emit("log"); // '日志'
event.$remove("log");
event.$emit("log"); // 事件列表中没有此事件
event.$once("log2", logText);
event.$emit("log2");
event.$emit("log2"); // 事件列表中没有此事件
