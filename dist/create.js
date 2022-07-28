(()=>{"use strict";var e={894:(e,n,l)=>{l.d(n,{V:()=>t});const t=(()=>{const e=[],n=[],l=n=>{let l=n.children[0].children[1].children[0].textContent;return e.find((e=>e.title===l))};return{addToObjectArray:n=>{e.push(n)},addToProjectArray:e=>{e.forEach((e=>{if(""==e.project||null==e.project||null==e.project){let n;n.push(e.project)}else n.push(e.project)}))},objectArray:e,projectArray:n,update:(e,n)=>{for(let l=0;l<n.length;l++)e[e.properties[l]]=n[l]},updateCheck:e=>{let n=l(e.parentElement.parentElement);e.checked?n.checked=!0:n.checked=!1},getObject:l}})()},923:(e,n,l)=>{l.d(n,{a:()=>t});const t=(e,n)=>{const l=document.createElement(`${e}`);return null==n||r(l,n),l},r=(e,n)=>{Object.entries(n).forEach((([n,l])=>{e.setAttribute(n,l)}))}}},n={};function l(t){var r=n[t];if(void 0!==r)return r.exports;var i=n[t]={exports:{}};return e[t](i,i.exports,l),i.exports}l.d=(e,n)=>{for(var t in n)l.o(n,t)&&!l.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},l.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e=l(923),n=l(894);const t=e=>{e.parentElement.parentElement.classList.toggle("completedToDo"),n.V.updateCheck(e)},r=(()=>{let e=!1;return{mainFn:e=>{let l=e.parentElement.nextElementSibling,t=n.V.getObject(l.parentElement);0==t.expanded?(l.style.display="flex",t.expanded=!0):(l.style.display="none",t.expanded=!1,console.log(`edit.edit = ${i.edit}`),0==t.editable&&i.cancelEditFn(l.parentElement))},toggle:()=>{e=!e},expand:e}})(),i=(()=>{let e=!0;const l=e=>{e.children[0].style.display="none",e.children[1].style.display="block",e.children[2].style.display="block"},t=(e,l)=>{e.querySelector("input.titleEdit").value=l.title,e.querySelector("input#notesEdit").value=l.notes;let t=o.populateInput(n.V.projectArray,e);o.markSelected(t,l),a.editCurrentSelection(e,l)},r=e=>{e.children[0].style.display="flex",e.children[1].style.display="none",e.children[2].style.display="none"},i=e=>{d(e),r(e.children[0].children[1]),r(e.children[1].children[0]),o.hideInput(e),h.hideInput(e),(e=>{e.classList.remove("cardEdit"),e.children[1].style.display="none",e.children[2].classList.remove("displayEdit")})(e)},d=e=>{c(e),a.clearSelection(e),o.clearOptions(e),h.clearInput(e)},c=e=>{e.children[0].children[1].children[2].value=null,e.children[1].children[0].children[2].value=null};return{mainFn:r=>{let d=r.parentElement.parentElement,c=n.V.getObject(d);var a;1==c.editable?((a=d).classList.add("cardEdit"),a.children[1].style.display="flex",a.children[2].classList.add("displayEdit"),c.expanded=!0,c.editable=!1,(e=>{let n=e.children[0].children[1];l(n);let t=e.children[1].children[0];l(t),h.displayInput(e),o.displayInput(e)})(d),t(d,c)):0==c.editable&&(i(d),c.expanded=!1,c.editable=!0),console.log(`edit.edit after editmainFn = ${e}`)},toggle:()=>{e=!e},resetCard:i,edit:e,populateInput:t,cancelEditFn:e=>{i(e);let l=n.V.getObject(e);l.editable=!0,l.expanded=!1}}})(),d=(()=>{const e=(e,n)=>0==e||""==e||null==e?"":`${n}: ${e}`;return{mainFn:(l,t)=>{let r=Array.from(l.querySelectorAll('input[type="radio')),d=((e,n)=>{let l=e.children[0].children[1].children[2].value,t=e.children[1].children[0].children[2].value,r=a.currentSelection(n).value;return[l,o.getInput(e),r,"",t,""]})(l,r);n.V.update(t,d),((n,l)=>{n.children[0].children[1].children[0].textContent=l[0],n.children[1].children[0].children[0].textContent=e(l[4],"Notes"),n.children[0].children[3].textContent=l[2],n.children[1].children[1].children[0].textContent=e(l[1],"Project")})(l,d),i.cancelEditFn(l)}}})(),c=e=>{let n=e.parentElement.parentElement;s.removeAll(n),n.parentElement.removeChild(n)},a=(()=>{const e=e=>{for(let n=0;n<e.length;n++)if(e[n].checked)return console.log(e[n]),e[n]};return{mainFn:n=>{let l=Array.from(n.querySelector('input[type="radio'));return e(l)},clearSelection:e=>{let n=Array.from(e.querySelectorAll('input[type="radio"]'));for(let e=0;e<n.length;e++)n[e].checked=!1},currentSelection:e,editCurrentSelection:(e,n)=>{let l=Array.from(e.querySelectorAll('input[type="radio"]')).find((e=>e.value===n.priority));return l.checked="checked",l}}})(),o=(()=>{const l=(n,l)=>{let t=l.children[1].children[1].children[2],r=[];return n.forEach((n=>{let l=(0,e.a)("option",{value:`${n}`});l.textContent=`${n}`,t.appendChild(l),r.push(l)})),r},t=(e,n)=>{console.log(n);let l=n.project;console.log(l),e.find((e=>e.value===l)).selected=!0},r=e=>{let n=e.children[1].children[1].children[2];Array.from(n.children).forEach((e=>{n.removeChild(e)}))},i=e=>{e.children[1].children[1].children[4].children[0].value="",e.children[1].children[1].children[3].style.display="block",e.children[1].children[1].children[4].style.display="none"};return{hideInput:e=>{e.children[1].children[1].children[0].style.display="block",e.children[1].children[1].children[1].style.display="none",e.children[1].children[1].children[2].style.display="none",e.children[1].children[1].children[3].style.display="none",e.children[1].children[1].children[4].style.display="none"},displayInput:e=>{e.children[1].children[1].children[0].style.display="none",e.children[1].children[1].children[1].style.display="block",e.children[1].children[1].children[2].style.display="block",e.children[1].children[1].children[3].style.display="block"},populateInput:l,getInput:e=>{let n=e.children[1].children[1].children[2];return n.children.length>0&&Array.from(n.children).find((e=>!0===e.selected)).value},markSelected:t,addBtnFn:e=>{e.children[1].children[1].children[3].style.display="none",e.children[1].children[1].children[4].style.display="block"},addCancelFn:i,clearOptions:r,addSaveFn:(e,d)=>{(e=>{let l=e.children[1].children[1].children[4].children[0].value;""!=l&&n.V.projectArray.push(l)})(e),i(e),r(e);let c=l(n.V.projectArray,e);t(c,d)}}})(),h={mainFn:()=>{},hideInput:e=>{e.children[0].children[5].children[0].style.display="block",e.children[0].children[5].children[1].style.display="none",e.children[0].children[5].children[2].style.display="none"},displayInput:e=>{e.children[0].children[5].children[0].style.display="none",e.children[0].children[5].children[1].style.display="block",e.children[0].children[5].children[2].style.display="block"},clearInput:e=>{e.children[0].children[5].children[2].value=""},addInput:e=>{let n=e.children[0].children[5].children[2].value;console.log(n)}},s=(()=>{const e=[];return{addAll:function(n,l,h,s,p,y,u,v,m,E,k){for(let n=0;n<arguments.length;n++)e.push(arguments[n]);n.addEventListener("click",(()=>{t(n)})),l.addEventListener("click",(()=>{r.mainFn(l)})),h.addEventListener("click",(()=>{i.mainFn(h)})),s.addEventListener("click",(()=>{c(s)}));let f=Array.from(E.querySelectorAll('input[type="radio"]'));f.forEach((e=>{e.addEventListener("click",(()=>{a.mainFn(E)}))})),p.addEventListener("click",(()=>{o.addBtnFn(E)})),y.addEventListener("click",(()=>{o.addCancelFn(E)})),u.addEventListener("click",(()=>{o.addSaveFn(E,k)})),v.addEventListener("click",(()=>{i.cancelEditFn(E)})),m.addEventListener("click",(()=>{d.mainFn(E,k)}))},removeAll:()=>{e[0].removeEventListener("click",(()=>{t(e[0])})),e[1].removeEventListener("click",(()=>{r.mainFn(e[1])})),e[2].removeEventListener("click",(()=>{i.mainFn(e[2])})),e[3].removeEventListener("click",(()=>{c(e[3])})),Array.from(e[9].querySelectorAll('input[type="radio"]')).forEach((n=>{n.removeEventListener("click",(()=>{a.mainFn(e[9])}))})),e[4].removeEventListener("click",(()=>{o.addBtnFn(e[9])})),e[5].removeEventListener("click",(()=>{o.addCancelFn(e[9])})),e[6].removeEventListener("click",(()=>{o.addSaveFn(e[9],e[10])})),e[7].removeEventListener("click",(()=>{i.cancelEditFn(e[9])})),e[8].removeEventListener("click",(()=>{d.mainFn(e[9],e[10])})),console.log("bingo")}}})()})()})();