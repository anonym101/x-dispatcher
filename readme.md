### About
**Lightweight Event Dispatcher** _(umd support)_, allowing you dispatch anywhere in the code, very handy in callback hell situations, deep promises, or any other complicated computations. Integrated with callback memory - so you dont have to subscribe first to get your data.



### Install:
```shell
/$ npm i x-dispatcher
```


### Why use it ?
- Avoid ugly callback > callback > callback hell!
- Avoid messy Promises
- Prefer clean, readable code hierarchy
- Easy to implement
- No dependencies
- UMD/esm support so you can use same declaration in most environments: *(AMD, Node, or browser)*


### Example
```js

    // import { xdispatcher } from 'x-dispatcher/esm' when using esm or ts
    const { xdispatcher } = require('x-dispatcher') // /node or /umd can also be used 
    const uid = `dispatch_job_1`
    const DEBUG = true
  
    const ds = xdispatcher(uid, DEBUG)

    // thanks to callback memory `next` can be called before subscribe!
    ds.next({ type: 'profile', data: { address: 'xox', email: 'johndoe@email.xo', name: 'John Doe', company: 'Anonymous' } })

    .subscribe(function(data, uid, index){
        console.log('on subscribe', data, this.uid, index)
        // this.unsubscribe() 
    })

    setTimeout(() => {
        ds.next({ data: { company: "Secret delayed" } })
          .next({ data: { company: "another Secret delayed" } }) // and so on
          .unsubscribe()
          .next({ data: { company: "never received" } }) // never called
    }, 2000)

    console.log(ds.isActive()) //:false

```



### More Examples
- available in `./examples.js`



### Methods

|METHODS                |RETURN                          |DESCRIPTION                         |
|----------------|-------------------------------|-----------------------------|
|**subscribe((data,uid,index)=>)** | `self` |start listening for events, before or after `next()` |
|**next(data)/emit(data)** | `self` |send data to `subscribe` callback. Can be declared before `subscribe` was initialized, there are no timers, so do not worry about memory leaks!  |
|**del()/delete()/unsubscribe()** | `self` |remove dispatcher from stack |
|**isActive()** | `boolean` |tells you if dispatcher is still active |




### Stack
-  es5/es6, Javascript, lint, callback, chaining support, umd, commonjs, node.js




### Version support
- es5/es6 support for universal module, can use for: `AMD, Node, or browser`

```js

const { xdispatcher } = require('x-dispatcher') // defaults to node
const { xdispatcher } = require('x-dispatcher/umd') 
const { xdispatcher } = require('x-dispatcher/node') // umd/es6 
import { xdispatcher } from 'x-dispatcher/esm' 

<script src="..path/x-dispatcher/umd">
   const xd = window.xdispatcher() 
</script>

```



### Contact
* Have questions, or would like to submit feedback, `contact on: https://eaglex.net/app/contact?product=x-dispatcher`


