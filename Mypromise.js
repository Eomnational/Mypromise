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

    }

    reject=reson=>{

    }
}