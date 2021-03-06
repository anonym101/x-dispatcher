// @ts-nocheck

/**
 * @xdispatcher
 * * Lightweight Event Dispatcher
 * * Self invoked class
 * * Developed by Anon
 * * license: CC-BY-SA-4.0
 */

// esModule
export function xdispatcher(_uid, _debug = null) {
    return (new function (uid, debug) {
        const plugin = `[dispatcher]`
        this.uid = ((uid || '').toString() || new Date().getTime()).toString() // id generated if not provided
        this.debug = debug
        this.cbQueue = {}
        this.dispatchInstance = {}
        this._isActive = null
        this._onComplete_cb = null
        this.index = 0 // count callbacks
        this.data = null // dynamic next data becomes available when subscribe event is received
        // shorthand aliases
        /** 
        * @alias initListener
        */
        this.init = () => {
            return this.initListener()
        }
        /** 
        * @alias next
        */
        this.emit = (data = null) => {
            return this.next(data)
        }

        /** 
        * @alias del
        */
        this.delete = () => {
            return this.del()
        }

        /** 
         * @alias del
        */
        this.unsubscribe = () => {
            return this.del()
        }

        /** 
         * @alias subscribe
        */
        this.sub = (cb) => {
            return this.subscribe(cb)
        }
        // end

        /** 
         * @onComplete
         * when subscribe event is deleted complete even callback can be called
        */
        this.onComplete = (cb) => {
            this._onComplete_cb = cb
            return this
        }

        /** 
         * @Dispatch
         * initialize the dispatcher
        */
        this.initListener = () => {
            this.Dispatch()
            this._isActive = true
            return this
        }

        /**
         * @next
         * send data to `subscribe` callback
         * @param {*} data any
         */
        this.next = (data = null) => {
            if (this._isActive !== false) this.initListener() // in case next is called above subscribe, we need to make sure it is initiated
            if (this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid].next(data)
            else {
                if (this.debug) console.log({ message: `${plugin} for uid not available`, uid: this.uid })
            }
            return this
        }

        /**
         * @Dispatch
         * master listener, sends all event callbacks to `subscribe`
         */
        this.Dispatch = () => {
            if (this.dispatchInstance[this.uid]) return this
            const self = this
            const D = function () {
                this.uid = self.uid
                this.data = null

                this.next = (data) => {
                    if ((data || {}).type !== 'cb') this.data = data
                    /**
                         * @next
                         * acts as a reverse callback, it sends back the `cb` from `subscribe`
                         */
                    if ((data || {}).type === 'cb') {
                        if (typeof data.cb === 'function') {
                            // when calling next before subscribe is initiated
                            // collect cb from .next
                            if (!self.cbQueue[self.uid]) self.cbQueue[self.uid] = data.cb
                            if (this.data) {
                                self.index++
                                self.data = this.data
                                data.cb.call(self, this.data, self.uid, self.index)

                            }
                        }

                        return
                    }

                    if (this.data) {
                        if (typeof self.cbQueue[self.uid] === 'function') {
                            self.index++
                            self.data = this.data
                            self.cbQueue[self.uid].call(self, this.data, self.uid, self.index)

                        }
                    } else {
                        if (self.debug) console.log(`${plugin} no callback data`)
                    }
                }
            }

            if (!this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid] = new D()
            return this
        }

        /** 
         * @isActive
         * check if current Dispatcher is still valid and active
        */
        this.isActive = () => {
            return this._isActive
        }

        /** 
         * @del
         * delete dispatcher
        */
        this.del = () => {
            delete this.cbQueue[this.uid]
            delete this.dispatchInstance[this.uid]
            this._isActive = false
            if (typeof this._onComplete_cb === 'function') this._onComplete_cb(this.uid)
            return this
        }

        /**
         * @subscribe
         * wait for callbacks forwarded from Dispatch and returned in callback of this method
         * - Dispatch must be set initially before you call `subscribe`
         * @param {*} cb required
         */
        this.subscribe = (cb) => {
            const isFN = typeof cb === 'function'
            if (!isFN) {
                if (this.debug) console.log(`${plugin}[subscribe] cb must be set`)
                return this
            }
            if (!this.dispatchInstance[this.uid]) {
                // this means subscribe was executed prior to `Dispatch`, because it has forward with next
                // it will get executed anyway
                this.Dispatch()
            }
            if (this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid].next({ type: 'cb', cb })
            return this
        }

    }(_uid, _debug))
}
