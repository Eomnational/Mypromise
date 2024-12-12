//4.定义状态常量（成功fulfilled 失败rejected 等待pending,初始化为pending）
const PENDING=pending;
const FULFILLED=fulfilled;
const REJECTED=rejected;


//1.创建promise类
class Mypromise{
    //2.通过构造函数constructor,在执行这个类的时候需要传递一个执行器去立即调用
    constructor(executor){

    }
    //3.定义resolve和reject,用箭头函数，避免直接调用时this指向全局变量
    resolve=value=>{
        //5.完成resolve函数的状态改变（需要判断当前状态是否改变）
        //判断当前状态是否可以改变
        if(this.status!==PENDING) return
        //改变当前状态
        this.status=FULFILLED;
        //保存返回值
        this.value=value;
        //执行成功回调
        while(this.successCallback.length){
            this.successCallback.shift()(this.value)
        }
    }
    status=PENDING;
    //6.Mypromise类中定义value和reason,用来存储执行器成功和失败的返回值
    value=null;
    reason=null;

    reject=reason=>{
        //5.完成reject函数的状态改变（需要判断当前状态是否改变）
        //判断当前状态是否可以改变
        if(this.status!==PENDING) return
        //改变当前状态
        this.status = REJECTED;
        //保存返回值
        this.reason = reason;
        //执行失败回调
        while(this.failCallback.length){
            this.failCallback.shift()(this.reason)
        }


    }

    //7.Mypromise类添加then方法，成功回调有一个参数表示成功之后的值；失败回调有一个参数表示失败之后的原因
    then(successCallback,failCallback){
        

    }
}