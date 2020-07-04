"use strict";function xdispatcher(_uid,_debug){return void 0===_debug&&(_debug=null),new function(uid,debug){var _this=this,plugin="[dispatcher]";this.uid=((uid||"").toString()||new Date().getTime()).toString(),this.debug=debug,this.cbQueue={},this.dispatchInstance={},this._isActive=null,this.index=0,this.data=null,this.init=function(){return _this.initListener()},this.emit=function(data){return void 0===data&&(data=null),_this.next(data)},this.delete=function(){return _this.del()},this.unsubscribe=function(){return _this.del()},this.sub=function(cb){return _this.subscribe(cb)},this.initListener=function(){return _this.Dispatch(),_this._isActive=!0,_this},this.next=function(data){return void 0===data&&(data=null),!1!==_this._isActive&&_this.initListener(),_this.dispatchInstance[_this.uid]?_this.dispatchInstance[_this.uid].next(data):_this.debug&&console.log({message:plugin+" for uid not available",uid:_this.uid}),_this},this.Dispatch=function(){if(_this.dispatchInstance[_this.uid])return _this;var self=_this;return _this.dispatchInstance[_this.uid]||(_this.dispatchInstance[_this.uid]=new function D(){var _this2=this;this.uid=self.uid,this.data=null,this.next=function(data){return"cb"!==(data||{}).type&&(_this2.data=data),"cb"===(data||{}).type?void("function"===typeof data.cb&&(!self.cbQueue[self.uid]&&(self.cbQueue[self.uid]=data.cb),_this2.data&&(self.index++,self.data=_this2.data,data.cb.call(self,_this2.data,self.uid,self.index)))):void(_this2.data?"function"===typeof self.cbQueue[self.uid]&&(self.index++,self.data=_this2.data,self.cbQueue[self.uid].call(self,_this2.data,self.uid,self.index)):self.debug&&console.log(plugin+" no callback data"))}}),_this},this.isActive=function(){return _this._isActive},this.del=function(){return delete _this.cbQueue[_this.uid],delete _this.dispatchInstance[_this.uid],_this._isActive=!1,_this},this.subscribe=function(cb){return"function"===typeof cb?(_this.dispatchInstance[_this.uid]||_this.Dispatch(),_this.dispatchInstance[_this.uid]&&_this.dispatchInstance[_this.uid].next({type:"cb",cb:cb}),_this):(_this.debug&&console.log(plugin+"[subscribe] cb must be set"),_this)}}(_uid,_debug)}(function(root,factory){"function"===typeof define&&define.amd?define(["dep"],function(dep){return root=root||self||window,root.xdispatcher=factory(dep)}):"object"===typeof exports?exports.xdispatcher=factory():(root=root||self||window,window.xdispatcher=factory())})(void 0,function(){return xdispatcher});
