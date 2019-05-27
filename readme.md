#EventEmitter

### 介绍 EventEmitter 类中的方法

1.  `$on` 注册事件
    - 参数 1： 事件名称； 参数 2. 回调函数
    - 当没有该事件名就注册一个该事件名，并将参数 2 作为该事件的回调函数
    - 但该回调函数存在则删除之前的回调函数并用参数 2 代替
    - 参数 2 若为匿名函数则不支持移除该回调
2.  `$emit` 触发函数
    - 参数 1： 事件名称； 参数 2：回调函数传入的参数
    - 调用该方法会触发该事件下的所有回调函数
3.  `$remove` 移除事件或者移除事件下的某个回调函数

    - 参数 1： 事件名称； 参数 2：事件的某个回调（可选）
    - 参数 2 存在的情况下是移除事件下的回调函数
    - 参数 2 不存在的情况下移除这个事件

4.  `$once` 注册事件并再其第一次被触发后移除这个事件

    - 参数 1： 事件名称； 参数 2： 事件的回调函数

### 使用 EventEmitter

1.  实例化 EventEmitter
    ```
    const event = new EventEmitter
    ```
2.  使用
    ```
    const logText = function (text = '日志') {
        console.log(text)
    }
    event.$on('log', logText)
    event.$emit('log') // '日志'
    event.$remove('log')
    event.$emit('log') // 该事件不存在
    event.$once('log2', logText)
    event.$emit('log2') // 日志
    event.$emit('log2') // 该事件不存在
    ```
