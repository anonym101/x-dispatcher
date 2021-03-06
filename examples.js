`use strict`


/**
 * x-dispatcher 
 * - three examples showcase
 * - just uncomment the example you want to see
 */

exampleOne()
function exampleOne() {
    const uid = `dispatch_job_1`
    const DEBUG = true
    const { xdispatcher } = require('./umd')
  
    const ds = xdispatcher(uid, DEBUG)

    // thanks to callback memory `next` can be called before being subscribed!
    ds.next({ type: 'profile', data: { address: 'xox', email: 'johndoe@email.xo', name: 'John Doe', company: 'Anonymous' } })

    ds.subscribe((data, uid, index) => {
        console.log('on subscribe', data, uid, index)
    })
    // can optionally be used
    .onComplete(uid=>{
        console.log(`have unsubscribed from ${uid}`)
    })

    setTimeout(() => {
        ds.next({ data: { company: "Secret delayed" } })
            .next({ data: { company: "another Secret delayed" } }) // and so on
            .unsubscribe()
    }, 2000)


}


 // exampleTwo()
function exampleTwo() {
    const uid = `dispatch_job_2`
    const DEBUG = true
    const { xdispatcher } = require('./node') 
    const ds = xdispatcher(uid, DEBUG)

    // thanks to callback memory `next` can be called before being subscribed!
    ds.next({ type: 'profile', data: { address: 'xox', email: 'johndoe@email.xo', name: 'John Doe', company: 'Anonymous' } })

    console.log('isActive? 1', ds.isActive()) // active

    ds.subscribe(function (data, uid, index) {
        console.log('on subscribe', data, uid, index)
       // `this.unsubscribe()` will remove dispatch listener from future events 
    })

    // never called
    ds.next({ data: { company: "Secret" } })
    .unsubscribe()
    .next({ data: { company: "never received" } })
    console.log('isActive? 2', ds.isActive()) // not active
}


// exampleThree()
function exampleThree() {

    const { xdispatcher } = require('./node') 
    const ds = xdispatcher()

    console.log('xdispatcher/active ? 1', ds.isActive()) // null not yet set

    ds.subscribe(function () {
        console.log('on subscribe', this.uid, this.data, this.index)
    })
        .next({ data: { company: "Secret" } })
        .next({ data: { company: "any more secrets?" } })
        .unsubscribe()
        .next({ data: { company: "did you receive it" } }) // never received

    console.log('xdispatcher/active ? 2', ds.isActive()) // not active
}
