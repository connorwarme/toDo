(()=>{"use strict";var e={692:(e,t,n)=>{n.d(t,{L:()=>C});var l=n(923),i=n(894);const d=e=>{e.parentElement.parentElement.classList.toggle("completedToDo"),i.V.updateCheck(e)},r=(()=>{let e=!1;return{mainFn:e=>{let t=e.parentElement.nextElementSibling,n=i.V.getObject(t.parentElement);0==n.expanded?(t.style.display="flex",n.expanded=!0):(t.style.display="none",n.expanded=!1,console.log(`edit.edit = ${a.edit}`),0==n.editable&&a.cancelEditFn(t.parentElement))},toggle:()=>{e=!e},expand:e}})(),a=(()=>{let e=!0;const t=e=>{e.children[0].style.display="none",e.children[1].style.display="block",e.children[2].style.display="block"},n=(e,t)=>{e.querySelector("input.titleEdit").value=t.title,e.querySelector("input#notesEdit").value=t.notes;let n=s.populateInput(i.V.projectArray,e);s.markSelected(n,t),p.editCurrentSelection(e,t)},l=e=>{e.children[0].style.display="flex",e.children[1].style.display="none",e.children[2].style.display="none"},d=e=>{r(e),l(e.children[0].children[1]),l(e.children[1].children[0]),s.hideInput(e),h.hideInput(e),(e=>{e.classList.remove("cardEdit"),e.children[1].style.display="none",e.children[2].classList.remove("displayEdit")})(e)},r=e=>{a(e),p.clearSelection(e),s.clearOptions(e),h.clearInput(e)},a=e=>{e.children[0].children[1].children[2].value=null,e.children[1].children[0].children[2].value=null};return{mainFn:l=>{let r=l.parentElement.parentElement,a=i.V.getObject(r);var c;1==a.editable?((c=r).classList.add("cardEdit"),c.children[1].style.display="flex",c.children[2].classList.add("displayEdit"),a.expanded=!0,a.editable=!1,(e=>{let n=e.children[0].children[1];t(n);let l=e.children[1].children[0];t(l),h.displayInput(e),s.displayInput(e)})(r),n(r,a)):0==a.editable&&(d(r),a.expanded=!1,a.editable=!0),console.log(`edit.edit after editmainFn = ${e}`)},toggle:()=>{e=!e},resetCard:d,edit:e,populateInput:n,cancelEditFn:e=>{d(e);let t=i.V.getObject(e);t.editable=!0,t.expanded=!1}}})(),c=(()=>{const e=(e,t)=>0==e||""==e||null==e?"":`${t}: ${e}`;return{mainFn:(t,n)=>{let l=Array.from(t.querySelectorAll('input[type="radio')),d=((e,t)=>{let n=e.children[0].children[1].children[2].value,l=e.children[1].children[0].children[2].value,i=p.currentSelection(t).value;return[n,s.getInput(e),i,"",l,""]})(t,l);i.V.update(n,d),((t,n)=>{t.children[0].children[1].children[0].textContent=n[0],t.children[1].children[0].children[0].textContent=e(n[4],"Notes"),t.children[0].children[3].textContent=n[2],t.children[1].children[1].children[0].textContent=e(n[1],"Project")})(t,d),a.cancelEditFn(t)}}})(),o=e=>{let t=e.parentElement.parentElement;u.removeAll(t),t.parentElement.removeChild(t)},p=(()=>{const e=e=>{for(let t=0;t<e.length;t++)if(e[t].checked)return console.log(e[t]),e[t]};return{mainFn:t=>{let n=Array.from(t.querySelector('input[type="radio'));return e(n)},clearSelection:e=>{let t=Array.from(e.querySelectorAll('input[type="radio"]'));for(let e=0;e<t.length;e++)t[e].checked=!1},currentSelection:e,editCurrentSelection:(e,t)=>{let n=Array.from(e.querySelectorAll('input[type="radio"]')).find((e=>e.value===t.priority));return n.checked="checked",n}}})(),s=(()=>{const e=(e,t)=>{let n=t.children[1].children[1].children[2],i=[];return e.forEach((e=>{let t=(0,l.a)("option",{value:`${e}`});t.textContent=`${e}`,n.appendChild(t),i.push(t)})),i},t=(e,t)=>{console.log(t);let n=t.project;console.log(n),e.find((e=>e.value===n)).selected=!0},n=e=>{let t=e.children[1].children[1].children[2];Array.from(t.children).forEach((e=>{t.removeChild(e)}))},d=e=>{e.children[1].children[1].children[4].children[0].value="",e.children[1].children[1].children[3].style.display="block",e.children[1].children[1].children[4].style.display="none"};return{hideInput:e=>{e.children[1].children[1].children[0].style.display="block",e.children[1].children[1].children[1].style.display="none",e.children[1].children[1].children[2].style.display="none",e.children[1].children[1].children[3].style.display="none",e.children[1].children[1].children[4].style.display="none"},displayInput:e=>{e.children[1].children[1].children[0].style.display="none",e.children[1].children[1].children[1].style.display="block",e.children[1].children[1].children[2].style.display="block",e.children[1].children[1].children[3].style.display="block"},populateInput:e,getInput:e=>{let t=e.children[1].children[1].children[2];return t.children.length>0&&Array.from(t.children).find((e=>!0===e.selected)).value},markSelected:t,addBtnFn:e=>{e.children[1].children[1].children[3].style.display="none",e.children[1].children[1].children[4].style.display="block"},addCancelFn:d,clearOptions:n,addSaveFn:(l,r)=>{(e=>{let t=e.children[1].children[1].children[4].children[0].value;""!=t&&i.V.projectArray.push(t)})(l),d(l),n(l);let a=e(i.V.projectArray,l);t(a,r)}}})(),h={mainFn:()=>{},hideInput:e=>{e.children[0].children[5].children[0].style.display="block",e.children[0].children[5].children[1].style.display="none",e.children[0].children[5].children[2].style.display="none"},displayInput:e=>{e.children[0].children[5].children[0].style.display="none",e.children[0].children[5].children[1].style.display="block",e.children[0].children[5].children[2].style.display="block"},clearInput:e=>{e.children[0].children[5].children[2].value=""},addInput:e=>{let t=e.children[0].children[5].children[2].value;console.log(t)}},u=(()=>{const e=[];return{addAll:function(t,n,l,i,h,u,y,C,v,E,m){for(let t=0;t<arguments.length;t++)e.push(arguments[t]);t.addEventListener("click",(()=>{d(t)})),n.addEventListener("click",(()=>{r.mainFn(n)})),l.addEventListener("click",(()=>{a.mainFn(l)})),i.addEventListener("click",(()=>{o(i)}));let b=Array.from(E.querySelectorAll('input[type="radio"]'));b.forEach((e=>{e.addEventListener("click",(()=>{p.mainFn(E)}))})),h.addEventListener("click",(()=>{s.addBtnFn(E)})),u.addEventListener("click",(()=>{s.addCancelFn(E)})),y.addEventListener("click",(()=>{s.addSaveFn(E,m)})),C.addEventListener("click",(()=>{a.cancelEditFn(E)})),v.addEventListener("click",(()=>{c.mainFn(E,m)}))},removeAll:()=>{e[0].removeEventListener("click",(()=>{d(e[0])})),e[1].removeEventListener("click",(()=>{r.mainFn(e[1])})),e[2].removeEventListener("click",(()=>{a.mainFn(e[2])})),e[3].removeEventListener("click",(()=>{o(e[3])})),Array.from(e[9].querySelectorAll('input[type="radio"]')).forEach((t=>{t.removeEventListener("click",(()=>{p.mainFn(e[9])}))})),e[4].removeEventListener("click",(()=>{s.addBtnFn(e[9])})),e[5].removeEventListener("click",(()=>{s.addCancelFn(e[9])})),e[6].removeEventListener("click",(()=>{s.addSaveFn(e[9],e[10])})),e[7].removeEventListener("click",(()=>{a.cancelEditFn(e[9])})),e[8].removeEventListener("click",(()=>{c.mainFn(e[9],e[10])})),console.log("bingo")}}})(),y=(()=>{let e,t,n,i,d,r,a,c,o;return{initial:()=>(0,l.a)("div",{class:"card"}),card:(p,s)=>{const h=(0,l.a)("div",{class:"regularSize"}),y=(0,l.a)("div",{class:"extendedSize"}),C=(0,l.a)("div",{class:"editSize"});s.appendChild(h),s.appendChild(y),s.appendChild(C),e=(0,l.a)("input",{type:"checkbox",class:"checkbox","aria-label":"Checkbox"});let v=(e=>{const t=(0,l.a)("div",{class:"titleContainer"}),n=(0,l.a)("div",{class:"title"});n.textContent=`${e.title}`;const i=(0,l.a)("label",{for:"titleEdit",class:"titleEdit"});i.textContent="Title:";const d=(0,l.a)("input",{type:"text",class:"titleEdit",id:"titleEdit"});return t.appendChild(n),t.appendChild(i),t.appendChild(d),t})(p);const E=(0,l.a)("div",{class:"spacerDiv"});let m=(e=>{const t=(0,l.a)("div",{class:"priority",id:`${e.priority}`});return t.textContent=`${e.priority}`,t})(p);t=(0,l.a)("button",{id:"expand",class:"expand","aria-label":"Expand Card"});let b=(e=>{const t=(0,l.a)("div",{class:"dateContainer"}),n=(0,l.a)("div",{class:"dateText"});n.textContent=`${e.dueDate}`;const i=(0,l.a)("label",{for:"dateInput",class:"dateInput"});i.textContent="Due Date:";const d=(0,l.a)("input",{type:"date",id:"dateInput",class:"dateInput"});return t.appendChild(n),t.appendChild(i),t.appendChild(d),t})(p);n=(0,l.a)("button",{class:"editCard","aria-label":"Edit Card"}),i=(0,l.a)("button",{class:"deleteCard","aria-label":"Delete Card"});let k=(e=>{const t=(0,l.a)("div",{class:"notesContainer"}),n=(0,l.a)("div",{class:"notes"});n.textContent=`Notes: ${e.notes}`;const i=(0,l.a)("label",{for:"notesEdit"});i.textContent="Notes:";const d=(0,l.a)("input",{type:"textarea",id:"notesEdit"});return t.appendChild(n),t.appendChild(i),t.appendChild(d),t})(p),x=(e=>{const t=(0,l.a)("div",{class:"projectContainer"}),n=(0,l.a)("div",{class:"projectText"});""!=e.project&&(n.textContent=`Project: ${e.project}`);const i=(0,l.a)("label",{class:"projectEditLabel",for:"projectDropdown"}),c=(0,l.a)("select",{class:"projectSelect",id:"projectDropdown"});d=(0,l.a)("button",{class:"projectAddBtn","aria-label":"Add Project"});const o=(0,l.a)("div",{class:"projectAddContainer"}),p=(0,l.a)("input",{type:"text",class:"projectAddInput","aria-label":"Add New Project"});return r=(0,l.a)("button",{class:"projectAddCancel","aria-label":"Cancel"}),a=(0,l.a)("button",{class:"projectAddSave"}),t.appendChild(n),t.appendChild(i),t.appendChild(c),t.appendChild(d),t.appendChild(o),o.appendChild(p),o.appendChild(r),o.appendChild(a),t})(p),f=(()=>{const e=(0,l.a)("div",{class:"priorityEditContainer"}),t=(0,l.a)("div",{class:"priorityEditTitle"});t.textContent="Priority:";const n=(0,l.a)("input",{type:"radio",name:"priorityEditBtns",id:"priorityEditLow",value:"Low"}),i=(0,l.a)("label",{for:"priorityEditLow"});i.textContent="Low";const d=(0,l.a)("input",{type:"radio",name:"priorityEditBtns",id:"priorityEditMed",value:"Medium"}),r=(0,l.a)("label",{for:"priorityEditMed"});r.textContent="Medium";const a=(0,l.a)("input",{type:"radio",name:"priorityEditBtns",id:"priorityEditHigh",value:"High"}),c=(0,l.a)("label",{for:"priorityEditHigh"});c.textContent="High";const o=(0,l.a)("input",{type:"radio",name:"priorityEditBtns",id:"priorityEditDefcon",value:"Defcon"}),p=(0,l.a)("label",{for:"priorityEditDefcon"});return p.textContent="Defcon",e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(d),e.appendChild(r),e.appendChild(a),e.appendChild(c),e.appendChild(o),e.appendChild(p),e})(),j=(()=>{const e=(0,l.a)("div",{class:"submitContainer"});return c=(0,l.a)("button",{class:"cancelEditBtn","aria-label":"Cancel Edit"}),c.textContent="Cancel",o=(0,l.a)("button",{class:"submitEditBtn","aria-label":"Submit Edit"}),o.textContent="Submit",e.appendChild(c),e.appendChild(o),e})();h.appendChild(e),h.appendChild(v),h.appendChild(E),h.appendChild(m),h.appendChild(t),h.appendChild(b),h.appendChild(n),h.appendChild(i),y.appendChild(k),y.appendChild(x),C.appendChild(f),C.appendChild(j),u.addAll(e,t,n,i,d,r,a,c,o,s,p)}}})(),C=e=>{let t=y.initial();return y.card(e,t),t}},894:(e,t,n)=>{n.d(t,{P:()=>l,V:()=>i});const l=(e,t,n,l,i,d)=>({title:e,project:t,priority:n,dueDate:l,notes:i,checked:d,expanded:!1,editable:!0,properties:["title","project","priority","dueDate","notes","checked"]}),i=(()=>{const e=[],t=[],n=t=>{let n=t.children[0].children[1].children[0].textContent;return e.find((e=>e.title===n))};return{addToObjectArray:t=>{e.push(t)},addToProjectArray:e=>{e.forEach((e=>{if(""==e.project||null==e.project||null==e.project){let t;t.push(e.project)}else t.push(e.project)}))},objectArray:e,projectArray:t,update:(e,t)=>{for(let n=0;n<t.length;n++)e[e.properties[n]]=t[n]},updateCheck:e=>{let t=n(e.parentElement.parentElement);e.checked?t.checked=!0:t.checked=!1},getObject:n}})()},923:(e,t,n)=>{n.d(t,{a:()=>l});const l=(e,t)=>{const n=document.createElement(`${e}`);return null==t||i(n,t),n},i=(e,t)=>{Object.entries(t).forEach((([t,n])=>{e.setAttribute(t,n)}))}}},t={};function n(l){var i=t[l];if(void 0!==i)return i.exports;var d=t[l]={exports:{}};return e[l](d,d.exports,n),d.exports}n.d=(e,t)=>{for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(894),t=n(692);let l=(0,e.P)("update README","winning","High","07/14/22","kinda like the other dudes",!1),i=(0,e.P)("doing it","dudeage","High","","all the time",!1);e.V.addToObjectArray(l),e.V.addToObjectArray(i),e.V.addToProjectArray(e.V.objectArray);let d=document.querySelector("div.body");d.appendChild((0,t.L)(l)),d.appendChild((0,t.L)(i))})()})();