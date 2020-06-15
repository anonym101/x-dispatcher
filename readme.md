### x-dispatcher
####  [ Developed by Eaglex ](http://eaglex.net)

##### LICENSE

* LICENCE: CC BY-SA
* SOURCE: https://creativecommons.org/licenses/by-sa/4.0/

##### About
- Lightweight Event Dispatcher, allow you to dispatch data from callback hell, or any other complicated computations, integrated callback memory support - when not subscribed. Code validated with lint, Chaining support
- Available on `Node.js` and `Browser`


#### Installation:
- If you want to use `npm run lint` then you have to run:`npm i`, otherwise there are no other dependencies to worry about!

#### Examples:
- examples are available in `./examples.js`

### Methods:
- `subscribe(data,uid,index)`: start listening for events, before or after `next()`
    - `data`: any data send by `next()` will be outputed here
    - `uid`: provides job id, you assigned, or one generated by the class, usefull when dealing with promises
    - `index`: counts all callback to each job uid

- `next(data)/emit(data)`: sends data to `subscribe` callback. Can be declared before `subscribe` was initialized, there are no timers, so do not worry about memory leaks! 

- `del()/delete()/unsubscribe()`: remove dispatcher from stack

- `isActive():boolean`: tells you if dispatcher is still active, in case you set to delete it somewhere!


##### Stack
-  ES5, Javascript, lint, callback, chaining support

#### Version support
- `node.js/commonjs`: `./index`
- `browser/window`: `window.xdispatcher` (use `./libs/x-dispatcher.min.js`)


##### Contact
* Have questions, or would like to submit feedback, `contact me at: https://eaglex.net/app/contact?product=x-dispatcher`
