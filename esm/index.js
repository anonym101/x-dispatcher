/* tslint:disable */
/* eslint-disable */
/**
 * @xdispatcher
 * * Lightweight Event Dispatcher
 * * Self invoked class
 * * Developed by Anon
 * * license: CC-BY-SA-4.0
 */

export function xdispatcher(_uid,_debug=null){return new function(uid,debug){const plugin=`[dispatcher]`;this.uid=((uid||"").toString()||new Date().getTime()).toString(),this.debug=debug,this.cbQueue={},this.dispatchInstance={},this._isActive=null,this._onComplete_cb=null,this.index=0,this.data=null,this.init=()=>this.initListener(),this.emit=(data=null)=>this.next(data),this.delete=()=>this.del(),this.unsubscribe=()=>this.del(),this.sub=cb=>this.subscribe(cb),this.onComplete=cb=>(this._onComplete_cb=cb,this),this.initListener=()=>(this.Dispatch(),this._isActive=!0,this),this.next=(data=null)=>(!1!==this._isActive&&this.initListener(),this.dispatchInstance[this.uid]?this.dispatchInstance[this.uid].next(data):this.debug&&console.log({message:`${plugin} for uid not available`,uid:this.uid}),this),this.Dispatch=()=>{if(this.dispatchInstance[this.uid])return this;const self=this;return this.dispatchInstance[this.uid]||(this.dispatchInstance[this.uid]=new function(){this.uid=self.uid,this.data=null,this.next=data=>("cb"!==(data||{}).type&&(this.data=data),"cb"===(data||{}).type?void("function"===typeof data.cb&&(!self.cbQueue[self.uid]&&(self.cbQueue[self.uid]=data.cb),this.data&&(self.index++,self.data=this.data,data.cb.call(self,this.data,self.uid,self.index)))):void(this.data?"function"===typeof self.cbQueue[self.uid]&&(self.index++,self.data=this.data,self.cbQueue[self.uid].call(self,this.data,self.uid,self.index)):self.debug&&console.log(`${plugin} no callback data`)))}),this},this.isActive=()=>this._isActive,this.del=()=>(delete this.cbQueue[this.uid],delete this.dispatchInstance[this.uid],this._isActive=!1,"function"===typeof this._onComplete_cb&&this._onComplete_cb(this.uid),this),this.subscribe=cb=>{return"function"===typeof cb?(this.dispatchInstance[this.uid]||this.Dispatch(),this.dispatchInstance[this.uid]&&this.dispatchInstance[this.uid].next({type:"cb",cb}),this):(this.debug&&console.log(`${plugin}[subscribe] cb must be set`),this)}}(_uid,_debug)}
