//4.定义状态常量（成功fulfilled 失败rejected 等待pending,初始化为pending）
const PENDING=pending;
const FULFILLED=fulfilled;
const REJECTED=rejected;


//1.创建promise类
class Mypromise{
    //2.通过构造函数constructor,在执行这个类的时候需要传递一个执行器去立即调用
    constructor(executor){
        //13.Promise实现捕获错误
        try{
            executor(this.resolve,this.reject);
        }catch(e){
            this.reject(e);

        }
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
    //9.实现then方法多次调用添加多个处理函数 初始化回调为数组依次执行
    successCallback=[];
    failCallback=[];

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
        //10.实现then方法链式调用（写一个函数方法专门判断回调的结果是普通值还是promise,then方法返回的依旧是一个promise）
        let promise2=new Mypromise((resolve,reject)=>{
            //判断当前状态 执行对应回调 异步状态下存储当前回调等待执行
            if(this.status===FULFILLED){
                //异步
                setTimeout(()=>{
                    //13.then方法捕获错误
                    try{
                        let x=successCallback(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                })
            }else if(this.status===REJECTED){
                //异步
                setTimeout(()=>{
                    //13.then方法捕获错误
                    try{
                        let x=failCallback(this.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                })
   
            }else{
                     //8.处理异步逻辑（pending状态下在then中将回调存起来）
                    this.successCallback.push(()=>{
                        try{
                            let x=successCallback(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }

                    })

                    this.failCallback.push(()=>{
                        try{
                            let x=failCallback(this.reason);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    })
                
                }
        })
    }
  
}

//11.处理promise返回值各种类型情况（普通值，promise）
function resolvePromise(promise2,x,resolve,reject) {
   if(promise2===x){
    return reject(new TypeError('Chaining cycle detected for promiese #<promise>'));
   }     
   if(x instanceof Mypromise){
    x.then(resolve,reject);
   }else{
    resolve(x);
   }
}