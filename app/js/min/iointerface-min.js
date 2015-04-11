var IOInterface=function o(){var o=require("nedb"),e=require("path"),n,i,l={};return l.init=function(l){global.tools.notify("ioInterface initialising.",1),console.log("iointerface reporting on session name:"),console.log(global.session.name),n=new o({filename:e.join(window.require("nw.gui").App.dataPath,"NetworkCanvas.db"),autoload:!0}),window.localStorage.getObject("activeSession")!==!1?(console.log("existing session found"),l(window.localStorage.getObject("activeSession"))):(console.log("no existing session"),n.insert([{}],function(o,e){o&&console.log("error with insert"),console.log(e),console.log(e[0]._id),i=e[0]._id,console.log("id has been set as "+i),window.localStorage.setObject("activeSession",i),l(e[0]._id)}))},l.save=function(o,e){delete global.session.userData._id,global.tools.notify("IOInterface being asked to synchronise with data store:",2),global.tools.notify("Data to be saved: ",1),global.tools.notify(o,1),n.update({_id:e},o,{},function(o){o&&console.log("saving failed"),console.log("saving worked...id for find: "+e),n.find({_id:e},function(o,e){o&&(console.log("error with finding"),console.log(o)),console.log("data is now: "),console.log(e[0])})})},l.update=function(o,e,i){n.update({_id:i},e,{},function(o){o&&console.log("saving failed"),console.log("update worked."),n.find({_id:i},function(o,e){o&&(console.log("error with finding"),console.log(o)),console.log("new data is: "),console.log(e[0])})})},l.reset=function(o){n.find({},function(e,n){if(e)return console.log("resetting failed"),!1;for(var i=n.length,t=0;i>t;t++)l.deleteDocument(n[t]._id);o&&o()})},l.deleteDocument=function(o){n.remove({_id:o},{},function(o){return o?(console.log("deleting document failed."),!1):void 0})},l.load=function(o,e){console.log("loading...id is "+e),global.tools.notify("ioInterface being asked to load data.",2),n.find({_id:e},function(e,n){e&&console.log("error"),console.log("loading worked. Returning: "),console.log(n[0]),o(n[0])})},l};module.exports=new IOInterface;