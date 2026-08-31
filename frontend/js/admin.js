const A="/api";let data=[];
const $=x=>document.getElementById(x);
async function api(path,opt={}){const t=localStorage.getItem("token");opt.headers={"Content-Type":"application/json",...(opt.headers||{}),...(t?{Authorization:"Bearer "+t}:{})};const r=await fetch(A+path,opt);const d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.message||"Request failed");return d}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
async function load(){try{data=await api("/students");render(data)}catch(e){alert(e.message)}}
function render(list){$("rows").innerHTML=list.map(s=>`<tr><td><b>${esc(s.student_code)}</b></td><td>${esc(s.name)}</td><td>${esc(s.email)}</td><td>${esc(s.department)}</td><td>Year ${s.year}</td><td><span class="status ${s.status.toLowerCase()}">${esc(s.status)}</span></td><td><button class="small" onclick="edit(${s.id})">Edit</button><button class="small danger" onclick="del(${s.id})">Delete</button></td></tr>`).join("");$("total").textContent=data.length;$("cs").textContent=data.filter(s=>s.department==="Computer Science").length;$("active").textContent=data.filter(s=>s.status==="Active").length}
function dashboard(){$("login").classList.add("hidden");$("dash").classList.remove("hidden");$("logout").classList.remove("hidden");load()}
$("loginForm").onsubmit=async e=>{e.preventDefault();try{let d=await api("/login",{method:"POST",body:JSON.stringify({username:$("username").value,password:$("password").value})});localStorage.setItem("token",d.token);dashboard()}catch(e){$("error").textContent=e.message}}
$("logout").onclick=()=>{localStorage.removeItem("token");location.reload()}
$("search").oninput=e=>{let q=e.target.value.toLowerCase();render(data.filter(s=>[s.student_code,s.name,s.email,s.department].some(v=>String(v).toLowerCase().includes(q))))}
$("add").onclick=()=>open();$("close").onclick=()=>close();
$("studentForm").onsubmit=async e=>{e.preventDefault();let id=$("sid").value,b={student_code:$("scode").value,name:$("sname").value,email:$("semail").value,department:$("sdept").value,year:+$("syear").value,status:$("sstatus").value};try{await api(id?"/students/"+id:"/students",{method:id?"PUT":"POST",body:JSON.stringify(b)});close();load()}catch(e){alert(e.message)}}
window.edit=id=>{let s=data.find(x=>x.id===id);$("mtitle").textContent="Edit Student";$("sid").value=s.id;$("scode").value=s.student_code;$("sname").value=s.name;$("semail").value=s.email;$("sdept").value=s.department;$("syear").value=s.year;$("sstatus").value=s.status;open(true)}
window.del=async id=>{if(confirm("Delete this student record?")){await api("/students/"+id,{method:"DELETE"});load()}}
function open(edit=false){if(!edit){$("studentForm").reset();$("sid").value="";$("mtitle").textContent="Add Student"}$("modal").classList.remove("hidden")}function close(){$("modal").classList.add("hidden")}
if(localStorage.getItem("token"))dashboard();