`use strict`


/**
 * x-dispatcher 
 * - three examples showcase
 */


function exampleOne() {
    const uid = `dispatch_job_1`
    const DEBUG = true
    const { dispatcher } = require('./index')
    const ds = dispatcher(uid,  DEBUG)

    // thanks to callback memory `next` can be called before being subscribed!
    ds.next({ type: 'profile', data: { address: 'xox', email: 'johndoe@email.xo', name: 'John Doe', company: 'Anonymous' } })

    ds.subscribe((data, uid, index) => {
        console.log('on subscribe', data, uid, index)
    })

    ds.next({ data: { company: "Secret" } })
              .next({ data: { company: "another Secret" } }) // and so on
}


// exampleTwo()
function exampleTwo() {
    const uid = `dispatch_job_2`
    const DEBUG = true
    const { dispatcher } = require('./index')
    const ds = dispatcher(uid,  DEBUG)
    
    // thanks to callback memory `next` can be called before being subscribed!
    ds.next({ type: 'profile', data: { address: 'xox', email: 'johndoe@email.xo', name: 'John Doe', company: 'Anonymous' } })
    
    console.log('isActive? 1', ds.isActive()) // active

    ds.subscribe(function(data, uid, index) {      
        console.log('on subscribe', data, uid, index)
        this.unsubscribe() // `dispatcher.unsubscribe()` will remove dispatch listener from future events 
    })
    
    // never called
    ds.next({ data: { company: "Secret" } })

    console.log('isActive? 2', ds.isActive()) // not active
}




exampleThree()
function exampleThree() {

    const { dispatcher } = require('./index')
    const ds = dispatcher()
    
    console.log('dispatcher/active ? 1', ds.isActive()) // null not yet set

    ds.subscribe(function() {    
        console.log('on subscribe', this.uid, this.data, this.index)
    })
    .next({ data: { company: "Secret" } })
    .next({ data: { company: "any more secrets?" } })

    console.log('dispatcher/active ? 2', ds.isActive()) // not active
}
