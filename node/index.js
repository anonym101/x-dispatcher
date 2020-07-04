console.log('calling node')

// NOESLINT
// NOTSLINT
// @ts-nocheck
/**
 * @xdispatcher
 * * Lightweight Event Dispatcher
 * * Self invoked class
 * * Developed by Anon
 */ // loading with UMD 
function xdispatcher(_uid,_debug=null){return new function(uid,debug){const plugin=`[dispatcher]`;// id generated if not provided
// count callbacks
// dynamic next data becomes available when subscribe event is received
// shorthand aliases
/** 
        * @alias initListener
        */ /** 
        * @alias next
        */ /** 
        * @alias del
        */ /** 
         * @alias del
        */ /** 
         * @alias subscribe
        */ // end
/** 
         * @Dispatch
         * initialize the dispatcher
        */ /**
         * @next
         * send data to `subscribe` callback
         * @param {*} data any
         */ /**
         * @Dispatch
         * master listener, sends all event callbacks to `subscribe`
         */ /** 
         * @isActive
         * check if current Dispatcher is still valid and active
        */ /** 
         * @del
         * delete dispatcher
        */ /**
         * @subscribe
         * wait for callbacks forwarded from Dispatch and returned in callback of this method
         * - Dispatch must be set initially before you call `subscribe`
         * @param {*} cb required
         */this.uid=((uid||"").toString()||new Date().getTime()).toString(),this.debug=debug,this.cbQueue={},this.dispatchInstance={},this._isActive=null,this.index=0,this.data=null,this.init=()=>this.initListener(),this.emit=(data=null)=>this.next(data),this.delete=()=>this.del(),this.unsubscribe=()=>this.del(),this.sub=cb=>this.subscribe(cb),this.initListener=()=>(this.Dispatch(),this._isActive=!0,this),this.next=(data=null)=>(!1!==this._isActive&&this.initListener(),this.dispatchInstance[this.uid]?this.dispatchInstance[this.uid].next(data):this.debug&&console.log({message:`${plugin} for uid not available`,uid:this.uid}),this),this.Dispatch=()=>{if(this.dispatchInstance[this.uid])return this;const self=this;return this.dispatchInstance[this.uid]||(this.dispatchInstance[this.uid]=new function(){this.uid=self.uid,this.data=null,this.next=data=>("cb"!==(data||{}).type&&(this.data=data),"cb"===(data||{}).type?void("function"===typeof data.cb&&(!self.cbQueue[self.uid]&&(self.cbQueue[self.uid]=data.cb),this.data&&(self.index++,self.data=this.data,data.cb.call(self,this.data,self.uid,self.index)))):void(this.data?"function"===typeof self.cbQueue[self.uid]&&(self.index++,self.data=this.data,self.cbQueue[self.uid].call(self,this.data,self.uid,self.index)):self.debug&&console.log(`${plugin} no callback data`)))}),this},this.isActive=()=>this._isActive,this.del=()=>(delete this.cbQueue[this.uid],delete this.dispatchInstance[this.uid],this._isActive=!1,this),this.subscribe=cb=>{return"function"===typeof cb?(this.dispatchInstance[this.uid]||this.Dispatch(),this.dispatchInstance[this.uid]&&this.dispatchInstance[this.uid].next({type:"cb",cb}),this):(this.debug&&console.log(`${plugin}[subscribe] cb must be set`),this)}}(_uid,_debug)}// UMD Universal module loader
(function(root,factory){"function"===typeof define&&define.amd?define(["dep"],function(dep){// eslint-disable-line no-undef
return root=root||self||window,root.xdispatcher=factory(dep);// eslint-disable-line no-undef
}):"object"===typeof exports?exports.xdispatcher=factory():(root=root||self||window,window.xdispatcher=factory())})(this,function(){// myModule data goes here
return xdispatcher});
