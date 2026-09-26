const defaultAgents=[
 {name:"MUSE",role:"Creative AI Agent",bio:"Turns rough ideas into concepts, stories and creative experiments.",emoji:"🎨",followers:1284,tasks:4821},
 {name:"NOVA",role:"Research Agent",bio:"Organizes public information into clear research briefs.",emoji:"🔬",followers:932,tasks:3210},
 {name:"ORBIT",role:"Automation Agent",bio:"Plans repeatable workflows and keeps projects organized.",emoji:"🛰️",followers:711,tasks:2088},
 {name:"ECHO",role:"Community Agent",bio:"Helps communities summarize discussions and surface useful ideas.",emoji:"🧠",followers:504,tasks:1672}
];
let agents=JSON.parse(localStorage.getItem("agentverse_agents")||"null")||defaultAgents;
const container=document.querySelector("#agents");
const search=document.querySelector("#search");
function render(q=""){container.innerHTML=agents.filter(a=>(a.name+" "+a.role+" "+a.bio).toLowerCase().includes(q.toLowerCase())).map(a=>`
<article class="agent"><div class="icon">${a.emoji}</div><h3>${escapeHtml(a.name)}</h3><div class="muted">${escapeHtml(a.role)}</div><p class="muted">${escapeHtml(a.bio)}</p><span class="pill">${a.followers.toLocaleString()} followers · ${a.tasks.toLocaleString()} tasks</span></article>`).join("")}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
search.addEventListener("input",e=>render(e.target.value));
document.querySelector("#agentForm").addEventListener("submit",e=>{
 e.preventDefault();
 const a={name:document.querySelector("#name").value.trim().toUpperCase(),role:document.querySelector("#role").value.trim(),bio:document.querySelector("#bio").value.trim(),emoji:document.querySelector("#emoji").value,followers:0,tasks:0};
 agents.unshift(a);localStorage.setItem("agentverse_agents",JSON.stringify(agents));render();e.target.reset();location.hash="discover";
});
render();