class EventEmiter {
  constructor() {
    this.events = {};
  }
  on(eventName, eventFunc) {
    if (!eventName) return console.error("事件名不能为空");
    if (!eventFunc) return console.error("事件回调函数不能为空");
    const _event = this.events[eventName] || [];
    const eventHasThisFunc = _event.some((item, index) => {
      if (item === eventFunc) {
        _event.splice(index, 1, eventFunc);
        return true;
      }
      return false;
    });
    !eventHasThisFunc && _event.push(eventFunc);
    this.events[eventName] = _event;
  }
  emit(eventName, ...args) {
    if (!eventName) return console.error("事件名不能为空");
    const _event = this.events[eventName] || [];
    if (_event.length === 0) {
      return console.error("该事件无回调函数");
    }
    _event.forEach(item => {
      item && item(...args);
    });
  }
  remove(eventName, eventFunc) {
    if (!eventName) return console.error("事件名不能为空");
    if (!eventFunc) return console.error("事件回调函数不能为空");
    const _event = this.events[eventName] || [];
    const eventHasThisFunc = _event.some((item, index) => {
      if (item === eventFunc) {
        _event.splice(index, 1);
        console.log("移除回调函数成功");
        return true;
      }
      return false;
    });
    !eventHasThisFunc && console.error("事件中没有该回调函数");
    this.events[eventName] = _event;
  }
  delete(eventName) {
    if (!eventName) return console.error("事件名不能为空");
    (this.events[eventName] && delete this.events[eventName]) ||
      console.error("事件列表中没有此事件");
  }
  once(eventName, eventFunc) {
    if (!eventName) return console.error("事件名不能为空");
    if (!eventFunc) return console.error("事件回调函数不能为空");
    const cb = (...args) => {
      eventFunc && eventFunc(...args);
      this.delete(eventName);
    };
    this.on(eventName, cb);
  }
}
const event = new EventEmiter();
function logText(text = "我是日志") {
  console.log(text);
}
event.once("log", logText);
event.emit("log");
event.emit("log");
