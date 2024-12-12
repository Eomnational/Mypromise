# Mypromise
从0到1自己手写一个promise和其方法

## 流程
 - 1.创建Mypromise类
 - 2.通过构造函数constructor，在执行这个类的时候需要传递一个执行器进去并立即调用
 - 3.定义resolve和reject（定义为箭头函数：避免直接调用时this指向全局window问题）
 - 4.定义状态常量（成功fulfilled 失败rejected 等待pending），初始化为pending。
 - 5.完成resolve和reject函数的状态改变（注意：需判断当前状态是否可以改变）
 - 6.Mypromise类中定义value和reason，用来储存执行器执行成功和失败的返回值
 - 7.Mypromise类中添加then方法，成功回调有一个参数 表示成功之后的值；失败回调有一个参数 表示失败后的原因
 - 8.处理异步逻辑（pending状态下在then中将回调存起来）
 - 9.实现then方法多次调用添加多个处理函数
 - 10.实现then方法链式调用（写一个函数方法专门判断回调的结果是普通值还是promise，then方法返回的仍然是一个promise）
 - 11.处理promise返回值各种类型情况（普通值，promise）
 - 12.then方法链式调用识别Promise对象自返回
 - 13.Promise实现捕获错误及then链式调用其他状态代码补充
 - 14.将then方法的参数变为可选参数
 - 15.Promise.all
 - 16.Promise.resolve 返回一个promise
 - 17.finally方法 不管成功失败都会执行一次
 - 18.catch方法的实现