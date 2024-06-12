(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))y(p);new MutationObserver(p=>{for(const f of p)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&y(h)}).observe(document,{childList:!0,subtree:!0});function a(p){const f={};return p.integrity&&(f.integrity=p.integrity),p.referrerpolicy&&(f.referrerPolicy=p.referrerpolicy),p.crossorigin==="use-credentials"?f.credentials="include":p.crossorigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function y(p){if(p.ep)return;p.ep=!0;const f=a(p);fetch(p.href,f)}})();var lt={},H={};H.byteLength=Dt;H.toByteArray=Pt;H.fromByteArray=qt;var _=[],T=[],Nt=typeof Uint8Array<"u"?Uint8Array:Array,z="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var M=0,Mt=z.length;M<Mt;++M)_[M]=z[M],T[z.charCodeAt(M)]=M;T["-".charCodeAt(0)]=62;T["_".charCodeAt(0)]=63;function at(l){var s=l.length;if(s%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var a=l.indexOf("=");a===-1&&(a=s);var y=a===s?0:4-a%4;return[a,y]}function Dt(l){var s=at(l),a=s[0],y=s[1];return(a+y)*3/4-y}function $t(l,s,a){return(s+a)*3/4-a}function Pt(l){var s,a=at(l),y=a[0],p=a[1],f=new Nt($t(l,y,p)),h=0,o=p>0?y-4:y,w;for(w=0;w<o;w+=4)s=T[l.charCodeAt(w)]<<18|T[l.charCodeAt(w+1)]<<12|T[l.charCodeAt(w+2)]<<6|T[l.charCodeAt(w+3)],f[h++]=s>>16&255,f[h++]=s>>8&255,f[h++]=s&255;return p===2&&(s=T[l.charCodeAt(w)]<<2|T[l.charCodeAt(w+1)]>>4,f[h++]=s&255),p===1&&(s=T[l.charCodeAt(w)]<<10|T[l.charCodeAt(w+1)]<<4|T[l.charCodeAt(w+2)]>>2,f[h++]=s>>8&255,f[h++]=s&255),f}function Ot(l){return _[l>>18&63]+_[l>>12&63]+_[l>>6&63]+_[l&63]}function jt(l,s,a){for(var y,p=[],f=s;f<a;f+=3)y=(l[f]<<16&16711680)+(l[f+1]<<8&65280)+(l[f+2]&255),p.push(Ot(y));return p.join("")}function qt(l){for(var s,a=l.length,y=a%3,p=[],f=16383,h=0,o=a-y;h<o;h+=f)p.push(jt(l,h,h+f>o?o:h+f));return y===1?(s=l[a-1],p.push(_[s>>2]+_[s<<4&63]+"==")):y===2&&(s=(l[a-2]<<8)+l[a-1],p.push(_[s>>10]+_[s>>4&63]+_[s<<2&63]+"=")),p.join("")}var V={};V.read=function(l,s,a,y,p){var f,h,o=p*8-y-1,w=(1<<o)-1,C=w>>1,I=-7,F=a?p-1:0,R=a?-1:1,A=l[s+F];for(F+=R,f=A&(1<<-I)-1,A>>=-I,I+=o;I>0;f=f*256+l[s+F],F+=R,I-=8);for(h=f&(1<<-I)-1,f>>=-I,I+=y;I>0;h=h*256+l[s+F],F+=R,I-=8);if(f===0)f=1-C;else{if(f===w)return h?NaN:(A?-1:1)*(1/0);h=h+Math.pow(2,y),f=f-C}return(A?-1:1)*h*Math.pow(2,f-y)};V.write=function(l,s,a,y,p,f){var h,o,w,C=f*8-p-1,I=(1<<C)-1,F=I>>1,R=p===23?Math.pow(2,-24)-Math.pow(2,-77):0,A=y?0:f-1,D=y?1:-1,$=s<0||s===0&&1/s<0?1:0;for(s=Math.abs(s),isNaN(s)||s===1/0?(o=isNaN(s)?1:0,h=I):(h=Math.floor(Math.log(s)/Math.LN2),s*(w=Math.pow(2,-h))<1&&(h--,w*=2),h+F>=1?s+=R/w:s+=R*Math.pow(2,1-F),s*w>=2&&(h++,w/=2),h+F>=I?(o=0,h=I):h+F>=1?(o=(s*w-1)*Math.pow(2,p),h=h+F):(o=s*Math.pow(2,F-1)*Math.pow(2,p),h=0));p>=8;l[a+A]=o&255,A+=D,o/=256,p-=8);for(h=h<<p|o,C+=p;C>0;l[a+A]=h&255,A+=D,h/=256,C-=8);l[a+A-D]|=$*128};(function(l){const s=H,a=V,y=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;l.Buffer=o,l.SlowBuffer=yt,l.INSPECT_MAX_BYTES=50;const p=2147483647;l.kMaxLength=p,o.TYPED_ARRAY_SUPPORT=f(),!o.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function f(){try{const e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),e.foo()===42}catch{return!1}}Object.defineProperty(o.prototype,"parent",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.buffer}}),Object.defineProperty(o.prototype,"offset",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.byteOffset}});function h(e){if(e>p)throw new RangeError('The value "'+e+'" is invalid for option "size"');const t=new Uint8Array(e);return Object.setPrototypeOf(t,o.prototype),t}function o(e,t,r){if(typeof e=="number"){if(typeof t=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return F(e)}return w(e,t,r)}o.poolSize=8192;function w(e,t,r){if(typeof e=="string")return R(e,t);if(ArrayBuffer.isView(e))return D(e);if(e==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(S(e,ArrayBuffer)||e&&S(e.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(S(e,SharedArrayBuffer)||e&&S(e.buffer,SharedArrayBuffer)))return $(e,t,r);if(typeof e=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');const n=e.valueOf&&e.valueOf();if(n!=null&&n!==e)return o.from(n,t,r);const i=pt(e);if(i)return i;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof e[Symbol.toPrimitive]=="function")return o.from(e[Symbol.toPrimitive]("string"),t,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}o.from=function(e,t,r){return w(e,t,r)},Object.setPrototypeOf(o.prototype,Uint8Array.prototype),Object.setPrototypeOf(o,Uint8Array);function C(e){if(typeof e!="number")throw new TypeError('"size" argument must be of type number');if(e<0)throw new RangeError('The value "'+e+'" is invalid for option "size"')}function I(e,t,r){return C(e),e<=0?h(e):t!==void 0?typeof r=="string"?h(e).fill(t,r):h(e).fill(t):h(e)}o.alloc=function(e,t,r){return I(e,t,r)};function F(e){return C(e),h(e<0?0:G(e)|0)}o.allocUnsafe=function(e){return F(e)},o.allocUnsafeSlow=function(e){return F(e)};function R(e,t){if((typeof t!="string"||t==="")&&(t="utf8"),!o.isEncoding(t))throw new TypeError("Unknown encoding: "+t);const r=X(e,t)|0;let n=h(r);const i=n.write(e,t);return i!==r&&(n=n.slice(0,i)),n}function A(e){const t=e.length<0?0:G(e.length)|0,r=h(t);for(let n=0;n<t;n+=1)r[n]=e[n]&255;return r}function D(e){if(S(e,Uint8Array)){const t=new Uint8Array(e);return $(t.buffer,t.byteOffset,t.byteLength)}return A(e)}function $(e,t,r){if(t<0||e.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return t===void 0&&r===void 0?n=new Uint8Array(e):r===void 0?n=new Uint8Array(e,t):n=new Uint8Array(e,t,r),Object.setPrototypeOf(n,o.prototype),n}function pt(e){if(o.isBuffer(e)){const t=G(e.length)|0,r=h(t);return r.length===0||e.copy(r,0,0,t),r}if(e.length!==void 0)return typeof e.length!="number"||W(e.length)?h(0):A(e);if(e.type==="Buffer"&&Array.isArray(e.data))return A(e.data)}function G(e){if(e>=p)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+p.toString(16)+" bytes");return e|0}function yt(e){return+e!=e&&(e=0),o.alloc(+e)}o.isBuffer=function(t){return t!=null&&t._isBuffer===!0&&t!==o.prototype},o.compare=function(t,r){if(S(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),S(r,Uint8Array)&&(r=o.from(r,r.offset,r.byteLength)),!o.isBuffer(t)||!o.isBuffer(r))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===r)return 0;let n=t.length,i=r.length;for(let u=0,c=Math.min(n,i);u<c;++u)if(t[u]!==r[u]){n=t[u],i=r[u];break}return n<i?-1:i<n?1:0},o.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(t,r){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(t.length===0)return o.alloc(0);let n;if(r===void 0)for(r=0,n=0;n<t.length;++n)r+=t[n].length;const i=o.allocUnsafe(r);let u=0;for(n=0;n<t.length;++n){let c=t[n];if(S(c,Uint8Array))u+c.length>i.length?(o.isBuffer(c)||(c=o.from(c)),c.copy(i,u)):Uint8Array.prototype.set.call(i,c,u);else if(o.isBuffer(c))c.copy(i,u);else throw new TypeError('"list" argument must be an Array of Buffers');u+=c.length}return i};function X(e,t){if(o.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||S(e,ArrayBuffer))return e.byteLength;if(typeof e!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);const r=e.length,n=arguments.length>2&&arguments[2]===!0;if(!n&&r===0)return 0;let i=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return J(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return r*2;case"hex":return r>>>1;case"base64":return ct(e).length;default:if(i)return n?-1:J(e).length;t=(""+t).toLowerCase(),i=!0}}o.byteLength=X;function dt(e,t,r){let n=!1;if((t===void 0||t<0)&&(t=0),t>this.length||((r===void 0||r>this.length)&&(r=this.length),r<=0)||(r>>>=0,t>>>=0,r<=t))return"";for(e||(e="utf8");;)switch(e){case"hex":return Ut(this,t,r);case"utf8":case"utf-8":return Q(this,t,r);case"ascii":return Ft(this,t,r);case"latin1":case"binary":return At(this,t,r);case"base64":return Et(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Tt(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}o.prototype._isBuffer=!0;function k(e,t,r){const n=e[t];e[t]=e[r],e[r]=n}o.prototype.swap16=function(){const t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let r=0;r<t;r+=2)k(this,r,r+1);return this},o.prototype.swap32=function(){const t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let r=0;r<t;r+=4)k(this,r,r+3),k(this,r+1,r+2);return this},o.prototype.swap64=function(){const t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let r=0;r<t;r+=8)k(this,r,r+7),k(this,r+1,r+6),k(this,r+2,r+5),k(this,r+3,r+4);return this},o.prototype.toString=function(){const t=this.length;return t===0?"":arguments.length===0?Q(this,0,t):dt.apply(this,arguments)},o.prototype.toLocaleString=o.prototype.toString,o.prototype.equals=function(t){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?!0:o.compare(this,t)===0},o.prototype.inspect=function(){let t="";const r=l.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},y&&(o.prototype[y]=o.prototype.inspect),o.prototype.compare=function(t,r,n,i,u){if(S(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),!o.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(r===void 0&&(r=0),n===void 0&&(n=t?t.length:0),i===void 0&&(i=0),u===void 0&&(u=this.length),r<0||n>t.length||i<0||u>this.length)throw new RangeError("out of range index");if(i>=u&&r>=n)return 0;if(i>=u)return-1;if(r>=n)return 1;if(r>>>=0,n>>>=0,i>>>=0,u>>>=0,this===t)return 0;let c=u-i,d=n-r;const x=Math.min(c,d),m=this.slice(i,u),B=t.slice(r,n);for(let g=0;g<x;++g)if(m[g]!==B[g]){c=m[g],d=B[g];break}return c<d?-1:d<c?1:0};function K(e,t,r,n,i){if(e.length===0)return-1;if(typeof r=="string"?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,W(r)&&(r=i?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(i)return-1;r=e.length-1}else if(r<0)if(i)r=0;else return-1;if(typeof t=="string"&&(t=o.from(t,n)),o.isBuffer(t))return t.length===0?-1:Z(e,t,r,n,i);if(typeof t=="number")return t=t&255,typeof Uint8Array.prototype.indexOf=="function"?i?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):Z(e,[t],r,n,i);throw new TypeError("val must be string, number or Buffer")}function Z(e,t,r,n,i){let u=1,c=e.length,d=t.length;if(n!==void 0&&(n=String(n).toLowerCase(),n==="ucs2"||n==="ucs-2"||n==="utf16le"||n==="utf-16le")){if(e.length<2||t.length<2)return-1;u=2,c/=2,d/=2,r/=2}function x(B,g){return u===1?B[g]:B.readUInt16BE(g*u)}let m;if(i){let B=-1;for(m=r;m<c;m++)if(x(e,m)===x(t,B===-1?0:m-B)){if(B===-1&&(B=m),m-B+1===d)return B*u}else B!==-1&&(m-=m-B),B=-1}else for(r+d>c&&(r=c-d),m=r;m>=0;m--){let B=!0;for(let g=0;g<d;g++)if(x(e,m+g)!==x(t,g)){B=!1;break}if(B)return m}return-1}o.prototype.includes=function(t,r,n){return this.indexOf(t,r,n)!==-1},o.prototype.indexOf=function(t,r,n){return K(this,t,r,n,!0)},o.prototype.lastIndexOf=function(t,r,n){return K(this,t,r,n,!1)};function wt(e,t,r,n){r=Number(r)||0;const i=e.length-r;n?(n=Number(n),n>i&&(n=i)):n=i;const u=t.length;n>u/2&&(n=u/2);let c;for(c=0;c<n;++c){const d=parseInt(t.substr(c*2,2),16);if(W(d))return c;e[r+c]=d}return c}function gt(e,t,r,n){return j(J(t,e.length-r),e,r,n)}function mt(e,t,r,n){return j(Rt(t),e,r,n)}function xt(e,t,r,n){return j(ct(t),e,r,n)}function Bt(e,t,r,n){return j(Lt(t,e.length-r),e,r,n)}o.prototype.write=function(t,r,n,i){if(r===void 0)i="utf8",n=this.length,r=0;else if(n===void 0&&typeof r=="string")i=r,n=this.length,r=0;else if(isFinite(r))r=r>>>0,isFinite(n)?(n=n>>>0,i===void 0&&(i="utf8")):(i=n,n=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");const u=this.length-r;if((n===void 0||n>u)&&(n=u),t.length>0&&(n<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");i||(i="utf8");let c=!1;for(;;)switch(i){case"hex":return wt(this,t,r,n);case"utf8":case"utf-8":return gt(this,t,r,n);case"ascii":case"latin1":case"binary":return mt(this,t,r,n);case"base64":return xt(this,t,r,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Bt(this,t,r,n);default:if(c)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),c=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Et(e,t,r){return t===0&&r===e.length?s.fromByteArray(e):s.fromByteArray(e.slice(t,r))}function Q(e,t,r){r=Math.min(e.length,r);const n=[];let i=t;for(;i<r;){const u=e[i];let c=null,d=u>239?4:u>223?3:u>191?2:1;if(i+d<=r){let x,m,B,g;switch(d){case 1:u<128&&(c=u);break;case 2:x=e[i+1],(x&192)===128&&(g=(u&31)<<6|x&63,g>127&&(c=g));break;case 3:x=e[i+1],m=e[i+2],(x&192)===128&&(m&192)===128&&(g=(u&15)<<12|(x&63)<<6|m&63,g>2047&&(g<55296||g>57343)&&(c=g));break;case 4:x=e[i+1],m=e[i+2],B=e[i+3],(x&192)===128&&(m&192)===128&&(B&192)===128&&(g=(u&15)<<18|(x&63)<<12|(m&63)<<6|B&63,g>65535&&g<1114112&&(c=g))}}c===null?(c=65533,d=1):c>65535&&(c-=65536,n.push(c>>>10&1023|55296),c=56320|c&1023),n.push(c),i+=d}return It(n)}const v=4096;function It(e){const t=e.length;if(t<=v)return String.fromCharCode.apply(String,e);let r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=v));return r}function Ft(e,t,r){let n="";r=Math.min(e.length,r);for(let i=t;i<r;++i)n+=String.fromCharCode(e[i]&127);return n}function At(e,t,r){let n="";r=Math.min(e.length,r);for(let i=t;i<r;++i)n+=String.fromCharCode(e[i]);return n}function Ut(e,t,r){const n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);let i="";for(let u=t;u<r;++u)i+=kt[e[u]];return i}function Tt(e,t,r){const n=e.slice(t,r);let i="";for(let u=0;u<n.length-1;u+=2)i+=String.fromCharCode(n[u]+n[u+1]*256);return i}o.prototype.slice=function(t,r){const n=this.length;t=~~t,r=r===void 0?n:~~r,t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),r<0?(r+=n,r<0&&(r=0)):r>n&&(r=n),r<t&&(r=t);const i=this.subarray(t,r);return Object.setPrototypeOf(i,o.prototype),i};function E(e,t,r){if(e%1!==0||e<0)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}o.prototype.readUintLE=o.prototype.readUIntLE=function(t,r,n){t=t>>>0,r=r>>>0,n||E(t,r,this.length);let i=this[t],u=1,c=0;for(;++c<r&&(u*=256);)i+=this[t+c]*u;return i},o.prototype.readUintBE=o.prototype.readUIntBE=function(t,r,n){t=t>>>0,r=r>>>0,n||E(t,r,this.length);let i=this[t+--r],u=1;for(;r>0&&(u*=256);)i+=this[t+--r]*u;return i},o.prototype.readUint8=o.prototype.readUInt8=function(t,r){return t=t>>>0,r||E(t,1,this.length),this[t]},o.prototype.readUint16LE=o.prototype.readUInt16LE=function(t,r){return t=t>>>0,r||E(t,2,this.length),this[t]|this[t+1]<<8},o.prototype.readUint16BE=o.prototype.readUInt16BE=function(t,r){return t=t>>>0,r||E(t,2,this.length),this[t]<<8|this[t+1]},o.prototype.readUint32LE=o.prototype.readUInt32LE=function(t,r){return t=t>>>0,r||E(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+this[t+3]*16777216},o.prototype.readUint32BE=o.prototype.readUInt32BE=function(t,r){return t=t>>>0,r||E(t,4,this.length),this[t]*16777216+(this[t+1]<<16|this[t+2]<<8|this[t+3])},o.prototype.readBigUInt64LE=L(function(t){t=t>>>0,N(t,"offset");const r=this[t],n=this[t+7];(r===void 0||n===void 0)&&P(t,this.length-8);const i=r+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24,u=this[++t]+this[++t]*2**8+this[++t]*2**16+n*2**24;return BigInt(i)+(BigInt(u)<<BigInt(32))}),o.prototype.readBigUInt64BE=L(function(t){t=t>>>0,N(t,"offset");const r=this[t],n=this[t+7];(r===void 0||n===void 0)&&P(t,this.length-8);const i=r*2**24+this[++t]*2**16+this[++t]*2**8+this[++t],u=this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n;return(BigInt(i)<<BigInt(32))+BigInt(u)}),o.prototype.readIntLE=function(t,r,n){t=t>>>0,r=r>>>0,n||E(t,r,this.length);let i=this[t],u=1,c=0;for(;++c<r&&(u*=256);)i+=this[t+c]*u;return u*=128,i>=u&&(i-=Math.pow(2,8*r)),i},o.prototype.readIntBE=function(t,r,n){t=t>>>0,r=r>>>0,n||E(t,r,this.length);let i=r,u=1,c=this[t+--i];for(;i>0&&(u*=256);)c+=this[t+--i]*u;return u*=128,c>=u&&(c-=Math.pow(2,8*r)),c},o.prototype.readInt8=function(t,r){return t=t>>>0,r||E(t,1,this.length),this[t]&128?(255-this[t]+1)*-1:this[t]},o.prototype.readInt16LE=function(t,r){t=t>>>0,r||E(t,2,this.length);const n=this[t]|this[t+1]<<8;return n&32768?n|4294901760:n},o.prototype.readInt16BE=function(t,r){t=t>>>0,r||E(t,2,this.length);const n=this[t+1]|this[t]<<8;return n&32768?n|4294901760:n},o.prototype.readInt32LE=function(t,r){return t=t>>>0,r||E(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},o.prototype.readInt32BE=function(t,r){return t=t>>>0,r||E(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},o.prototype.readBigInt64LE=L(function(t){t=t>>>0,N(t,"offset");const r=this[t],n=this[t+7];(r===void 0||n===void 0)&&P(t,this.length-8);const i=this[t+4]+this[t+5]*2**8+this[t+6]*2**16+(n<<24);return(BigInt(i)<<BigInt(32))+BigInt(r+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24)}),o.prototype.readBigInt64BE=L(function(t){t=t>>>0,N(t,"offset");const r=this[t],n=this[t+7];(r===void 0||n===void 0)&&P(t,this.length-8);const i=(r<<24)+this[++t]*2**16+this[++t]*2**8+this[++t];return(BigInt(i)<<BigInt(32))+BigInt(this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n)}),o.prototype.readFloatLE=function(t,r){return t=t>>>0,r||E(t,4,this.length),a.read(this,t,!0,23,4)},o.prototype.readFloatBE=function(t,r){return t=t>>>0,r||E(t,4,this.length),a.read(this,t,!1,23,4)},o.prototype.readDoubleLE=function(t,r){return t=t>>>0,r||E(t,8,this.length),a.read(this,t,!0,52,8)},o.prototype.readDoubleBE=function(t,r){return t=t>>>0,r||E(t,8,this.length),a.read(this,t,!1,52,8)};function U(e,t,r,n,i,u){if(!o.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<u)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}o.prototype.writeUintLE=o.prototype.writeUIntLE=function(t,r,n,i){if(t=+t,r=r>>>0,n=n>>>0,!i){const d=Math.pow(2,8*n)-1;U(this,t,r,n,d,0)}let u=1,c=0;for(this[r]=t&255;++c<n&&(u*=256);)this[r+c]=t/u&255;return r+n},o.prototype.writeUintBE=o.prototype.writeUIntBE=function(t,r,n,i){if(t=+t,r=r>>>0,n=n>>>0,!i){const d=Math.pow(2,8*n)-1;U(this,t,r,n,d,0)}let u=n-1,c=1;for(this[r+u]=t&255;--u>=0&&(c*=256);)this[r+u]=t/c&255;return r+n},o.prototype.writeUint8=o.prototype.writeUInt8=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,1,255,0),this[r]=t&255,r+1},o.prototype.writeUint16LE=o.prototype.writeUInt16LE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,2,65535,0),this[r]=t&255,this[r+1]=t>>>8,r+2},o.prototype.writeUint16BE=o.prototype.writeUInt16BE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,2,65535,0),this[r]=t>>>8,this[r+1]=t&255,r+2},o.prototype.writeUint32LE=o.prototype.writeUInt32LE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,4,4294967295,0),this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=t&255,r+4},o.prototype.writeUint32BE=o.prototype.writeUInt32BE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,4,4294967295,0),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=t&255,r+4};function tt(e,t,r,n,i){ut(t,n,i,e,r,7);let u=Number(t&BigInt(4294967295));e[r++]=u,u=u>>8,e[r++]=u,u=u>>8,e[r++]=u,u=u>>8,e[r++]=u;let c=Number(t>>BigInt(32)&BigInt(4294967295));return e[r++]=c,c=c>>8,e[r++]=c,c=c>>8,e[r++]=c,c=c>>8,e[r++]=c,r}function rt(e,t,r,n,i){ut(t,n,i,e,r,7);let u=Number(t&BigInt(4294967295));e[r+7]=u,u=u>>8,e[r+6]=u,u=u>>8,e[r+5]=u,u=u>>8,e[r+4]=u;let c=Number(t>>BigInt(32)&BigInt(4294967295));return e[r+3]=c,c=c>>8,e[r+2]=c,c=c>>8,e[r+1]=c,c=c>>8,e[r]=c,r+8}o.prototype.writeBigUInt64LE=L(function(t,r=0){return tt(this,t,r,BigInt(0),BigInt("0xffffffffffffffff"))}),o.prototype.writeBigUInt64BE=L(function(t,r=0){return rt(this,t,r,BigInt(0),BigInt("0xffffffffffffffff"))}),o.prototype.writeIntLE=function(t,r,n,i){if(t=+t,r=r>>>0,!i){const x=Math.pow(2,8*n-1);U(this,t,r,n,x-1,-x)}let u=0,c=1,d=0;for(this[r]=t&255;++u<n&&(c*=256);)t<0&&d===0&&this[r+u-1]!==0&&(d=1),this[r+u]=(t/c>>0)-d&255;return r+n},o.prototype.writeIntBE=function(t,r,n,i){if(t=+t,r=r>>>0,!i){const x=Math.pow(2,8*n-1);U(this,t,r,n,x-1,-x)}let u=n-1,c=1,d=0;for(this[r+u]=t&255;--u>=0&&(c*=256);)t<0&&d===0&&this[r+u+1]!==0&&(d=1),this[r+u]=(t/c>>0)-d&255;return r+n},o.prototype.writeInt8=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,1,127,-128),t<0&&(t=255+t+1),this[r]=t&255,r+1},o.prototype.writeInt16LE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,2,32767,-32768),this[r]=t&255,this[r+1]=t>>>8,r+2},o.prototype.writeInt16BE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,2,32767,-32768),this[r]=t>>>8,this[r+1]=t&255,r+2},o.prototype.writeInt32LE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,4,2147483647,-2147483648),this[r]=t&255,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24,r+4},o.prototype.writeInt32BE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=t&255,r+4},o.prototype.writeBigInt64LE=L(function(t,r=0){return tt(this,t,r,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),o.prototype.writeBigInt64BE=L(function(t,r=0){return rt(this,t,r,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function et(e,t,r,n,i,u){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function nt(e,t,r,n,i){return t=+t,r=r>>>0,i||et(e,t,r,4),a.write(e,t,r,n,23,4),r+4}o.prototype.writeFloatLE=function(t,r,n){return nt(this,t,r,!0,n)},o.prototype.writeFloatBE=function(t,r,n){return nt(this,t,r,!1,n)};function it(e,t,r,n,i){return t=+t,r=r>>>0,i||et(e,t,r,8),a.write(e,t,r,n,52,8),r+8}o.prototype.writeDoubleLE=function(t,r,n){return it(this,t,r,!0,n)},o.prototype.writeDoubleBE=function(t,r,n){return it(this,t,r,!1,n)},o.prototype.copy=function(t,r,n,i){if(!o.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),!i&&i!==0&&(i=this.length),r>=t.length&&(r=t.length),r||(r=0),i>0&&i<n&&(i=n),i===n||t.length===0||this.length===0)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(i<0)throw new RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),t.length-r<i-n&&(i=t.length-r+n);const u=i-n;return this===t&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(r,n,i):Uint8Array.prototype.set.call(t,this.subarray(n,i),r),u},o.prototype.fill=function(t,r,n,i){if(typeof t=="string"){if(typeof r=="string"?(i=r,r=0,n=this.length):typeof n=="string"&&(i=n,n=this.length),i!==void 0&&typeof i!="string")throw new TypeError("encoding must be a string");if(typeof i=="string"&&!o.isEncoding(i))throw new TypeError("Unknown encoding: "+i);if(t.length===1){const c=t.charCodeAt(0);(i==="utf8"&&c<128||i==="latin1")&&(t=c)}}else typeof t=="number"?t=t&255:typeof t=="boolean"&&(t=Number(t));if(r<0||this.length<r||this.length<n)throw new RangeError("Out of range index");if(n<=r)return this;r=r>>>0,n=n===void 0?this.length:n>>>0,t||(t=0);let u;if(typeof t=="number")for(u=r;u<n;++u)this[u]=t;else{const c=o.isBuffer(t)?t:o.from(t,i),d=c.length;if(d===0)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(u=0;u<n-r;++u)this[u+r]=c[u%d]}return this};const b={};function Y(e,t,r){b[e]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${e}]`,this.stack,delete this.name}get code(){return e}set code(i){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:i,writable:!0})}toString(){return`${this.name} [${e}]: ${this.message}`}}}Y("ERR_BUFFER_OUT_OF_BOUNDS",function(e){return e?`${e} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),Y("ERR_INVALID_ARG_TYPE",function(e,t){return`The "${e}" argument must be of type number. Received type ${typeof t}`},TypeError),Y("ERR_OUT_OF_RANGE",function(e,t,r){let n=`The value of "${e}" is out of range.`,i=r;return Number.isInteger(r)&&Math.abs(r)>2**32?i=ot(String(r)):typeof r=="bigint"&&(i=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(i=ot(i)),i+="n"),n+=` It must be ${t}. Received ${i}`,n},RangeError);function ot(e){let t="",r=e.length;const n=e[0]==="-"?1:0;for(;r>=n+4;r-=3)t=`_${e.slice(r-3,r)}${t}`;return`${e.slice(0,r)}${t}`}function Ct(e,t,r){N(t,"offset"),(e[t]===void 0||e[t+r]===void 0)&&P(t,e.length-(r+1))}function ut(e,t,r,n,i,u){if(e>r||e<t){const c=typeof t=="bigint"?"n":"";let d;throw u>3?t===0||t===BigInt(0)?d=`>= 0${c} and < 2${c} ** ${(u+1)*8}${c}`:d=`>= -(2${c} ** ${(u+1)*8-1}${c}) and < 2 ** ${(u+1)*8-1}${c}`:d=`>= ${t}${c} and <= ${r}${c}`,new b.ERR_OUT_OF_RANGE("value",d,e)}Ct(n,i,u)}function N(e,t){if(typeof e!="number")throw new b.ERR_INVALID_ARG_TYPE(t,"number",e)}function P(e,t,r){throw Math.floor(e)!==e?(N(e,r),new b.ERR_OUT_OF_RANGE(r||"offset","an integer",e)):t<0?new b.ERR_BUFFER_OUT_OF_BOUNDS:new b.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${t}`,e)}const St=/[^+/0-9A-Za-z-_]/g;function _t(e){if(e=e.split("=")[0],e=e.trim().replace(St,""),e.length<2)return"";for(;e.length%4!==0;)e=e+"=";return e}function J(e,t){t=t||1/0;let r;const n=e.length;let i=null;const u=[];for(let c=0;c<n;++c){if(r=e.charCodeAt(c),r>55295&&r<57344){if(!i){if(r>56319){(t-=3)>-1&&u.push(239,191,189);continue}else if(c+1===n){(t-=3)>-1&&u.push(239,191,189);continue}i=r;continue}if(r<56320){(t-=3)>-1&&u.push(239,191,189),i=r;continue}r=(i-55296<<10|r-56320)+65536}else i&&(t-=3)>-1&&u.push(239,191,189);if(i=null,r<128){if((t-=1)<0)break;u.push(r)}else if(r<2048){if((t-=2)<0)break;u.push(r>>6|192,r&63|128)}else if(r<65536){if((t-=3)<0)break;u.push(r>>12|224,r>>6&63|128,r&63|128)}else if(r<1114112){if((t-=4)<0)break;u.push(r>>18|240,r>>12&63|128,r>>6&63|128,r&63|128)}else throw new Error("Invalid code point")}return u}function Rt(e){const t=[];for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r)&255);return t}function Lt(e,t){let r,n,i;const u=[];for(let c=0;c<e.length&&!((t-=2)<0);++c)r=e.charCodeAt(c),n=r>>8,i=r%256,u.push(i),u.push(n);return u}function ct(e){return s.toByteArray(_t(e))}function j(e,t,r,n){let i;for(i=0;i<n&&!(i+r>=t.length||i>=e.length);++i)t[i+r]=e[i];return i}function S(e,t){return e instanceof t||e!=null&&e.constructor!=null&&e.constructor.name!=null&&e.constructor.name===t.name}function W(e){return e!==e}const kt=function(){const e="0123456789abcdef",t=new Array(256);for(let r=0;r<16;++r){const n=r*16;for(let i=0;i<16;++i)t[n+i]=e[r]+e[i]}return t}();function L(e){return typeof BigInt>"u"?bt:e}function bt(){throw new Error("BigInt not supported")}})(lt);const Ht=document.querySelector("#login_form"),Gt=document.querySelector("#signin_form");async function Yt(l,s){try{const y=await(await fetch("https://openaiserverlwt.azurewebsites.net/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:l,password:s})})).json();return console.log(y),y.accessToken?(localStorage.setItem("jwtToken",y.accessToken),!0):!1}catch(a){return console.error("Error:",a),!1}}async function Jt(l,s){try{const y=await(await fetch("https://openaiserverlwt.azurewebsites.net/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:l,password:s})})).json();return console.log(y),y.accessToken?(localStorage.setItem("jwtToken",y.accessToken),!0):!1}catch(a){return console.error("Error:",a),!1}}function Wt(){console.log("getUser called");const l=localStorage.getItem("jwtToken");if(!l)return null;const s=JSON.parse(lt.Buffer.from(l.split(".")[1],"base64").toString("utf8"));return console.log(s),s.username}function zt(){localStorage.removeItem("jwtToken"),window.location.reload()}async function Vt(l){l.preventDefault();const s=document.getElementById("username"),a=document.getElementById("password"),y=s.value,p=a.value;if(s.value="",a.value="",await Yt(y,p)){const h=document.getElementById("login_container");h.style.display="none";const o=document.getElementById("signin_container");o.style.display="none";const w=document.getElementById("chat_container");w.style.display="block"}else alert("Invalid username or password")}async function Xt(l){l.preventDefault();const s=document.getElementById("signusername"),a=document.getElementById("signpassword"),y=s.value,p=a.value;if(s.value="",a.value="",await Jt(y,p)){const h=document.getElementById("login_container");h.style.display="none";const o=document.getElementById("signin_container");o.style.display="none";const w=document.getElementById("chat_container");w.style.display="block"}else alert("Invalid username or password")}document.addEventListener("DOMContentLoaded",()=>{if(Wt()){const s=document.getElementById("login_container");s.style.display="none";const a=document.getElementById("signin_container");a.style.display="none";const y=document.getElementById("chat_container");y.style.display="block"}else{const s=document.getElementById("login_container");s.style.display="block"}});Ht.addEventListener("submit",Vt);Gt.addEventListener("submit",Xt);const Kt=document.getElementById("logout_link"),Zt=document.getElementById("profile_link");Kt.addEventListener("click",function(l){l.preventDefault(),zt()});Zt.addEventListener("click",function(l){l.preventDefault(),console.log("Profile clicked!")});const Qt="/codex_client/assets/bot-7be685d2.svg",vt="/codex_client/assets/user-792a8b2c.svg";document.querySelector("#chat_container");const q=document.querySelector("#chat_form"),O=document.querySelector("#message_container");let ht;function tr(l){l.textContent="",ht=setInterval(()=>{l.textContent+=".",l.textContent==="...."&&(l.textContent="")},300)}function rr(l,s){let a=0,y=setInterval(()=>{a<s.length?(l.innerHTML+=s.charAt(a),a++):clearInterval(y)},20)}function er(){const l=Date.now(),a=Math.random().toString(16);return`id-${l}-${a}`}function st(l,s,a){return`
        <div class="wrapper ${l&&"ai"}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${l?Qt:vt} 
                      alt="${l?"bot":"user"}" 
                    />
                </div>
                <div class="message" id=${a}>${s}</div>
            </div>
        </div>
    `}const ft=async l=>{l.preventDefault();const s=new FormData(q);O.innerHTML+=st(!1,s.get("prompt")),q.reset();const a=er();O.innerHTML+=st(!0," ",a),O.scrollTop=O.scrollHeight;const y=document.getElementById(a);tr(y);const p=localStorage.getItem("jwtToken"),f=await fetch("https://openaiserverlwt.azurewebsites.net",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`},body:JSON.stringify({prompt:s.get("prompt")})});if(clearInterval(ht),y.innerHTML=" ",f.status===401||f.status===403){const h=document.getElementById("login_container");h.style.display="block";const o=document.getElementById("chat_container");o.style.display="none",O.innerHTML="",localStorage.removeItem("jwtToken")}else if(f.ok){const o=(await f.json()).bot.trim();rr(y,o)}else{const h=await f.text();y.innerHTML="Something went wrong",alert(h)}};q.addEventListener("submit",ft);q.addEventListener("keyup",l=>{l.keyCode===13&&ft(l)});
