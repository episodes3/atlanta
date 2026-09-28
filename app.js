const days=[
{date:'10/1',dow:'목',title:'출발 · 애틀랜타 도착',events:[['07:00','인천 2터미널 집합'],['08:45','출국','KE0033 · 13시간 50분 비행'],['09:35','애틀랜타 도착'],['11:00','숙소 짐 보관'],['12:00','혜영 언니네 인사 및 집 답사'],['16:00','빈티지샵 / 마트 답사','시간 여유가 없을 시 10/2, 10/3 촬영 이후 진행'],['18:00','저녁'],['20:00','첫째 날 마무리'],['21:00','자유시간 및 취침']]},
{date:'10/2',dow:'금',title:'애틀랜타 본가 공개',events:[['10:00','CNL 수소미스트 PPL'],['11:00','가족 집 도착'],['12:00','① 본가 촬영 (PPL 포함)','오즈모포켓2 · A7 · 거치캠 · 윈터폰\n10/2 이혜영 애틀란타 본가 공개.docx'],['18:00','저녁'],['20:00','둘째 날 마무리']]},
{date:'10/3',dow:'토',title:'빈티지샵 털기',events:[['10:00','가족 집 도착'],['11:00','겟레디윗미','쥬베룩 PPL'],['12:00','② 세모녀 쇼핑 · 빈티지샵','오즈모포켓2 · A7 · 윈터폰\nThe Clothing Warehouse / Space Queen / 2nd Street Ponce\n🥘 점심\n[혜영이는 못말려] 혜영이의 빈티지샵 털기_공유용_v1.docx'],['20:00','셋째 날 마무리']]},
{date:'10/4',dow:'일',title:'마트 꿀템 · 패션 트렌드',events:[['11:00','아점'],['12:00','③ 미국 마트 추천템 구입','마트 구입 촬영 → 본가 주방 추천템 소개 촬영\n10/4 이혜영의 미국 마트 털기.docx v2.docx\n\n(휴식)\n\n④ 26–27 F/W 패션 트렌드 · 약 1시간 촬영'],['20:00','넷째 날 마무리']]},
{date:'10/5',dow:'월',title:'엄마랑 데이트',events:[['07:00','엄마 집 도착'],['07:45','픽업 차 출발'],['08:30','⑤ 엄마랑 데이트 · 센터 방문','Joynus Care\n08:30–09:50 아침식사 & 건강체크\n09:30–11:00 오전 프로그램 (뉴스 · 운동 · 게임) + 깜짝 이벤트\n11:00–12:00 특별활동 (노래교실 참석)\n10/5 엄마랑 데이트하는 날.docx'],['12:00','점심'],['13:00','📸 사진관 방문'],['14:00','☕️🎤 카페 개인 인터뷰'],['20:00','다섯째 날 마무리']]},
{date:'10/6',dow:'화',title:'귀국',events:[['10:00','공항 도착'],['11:35','애틀랜타 출발','KE0034 · 15시간 20분 비행']]}
];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);let selected=0;
const savedDays=localStorage.getItem('atl_schedule_days');
if(savedDays){
  try{
    const parsed=JSON.parse(savedDays);
    if(Array.isArray(parsed)&&parsed.length===days.length){
      parsed.forEach((d,i)=>{ if(Array.isArray(d.events)) days[i].events=d.events; });
    }
  }catch(e){}
}
function saveSchedule(){localStorage.setItem('atl_schedule_days',JSON.stringify(days));renderDay();renderToday()}

$$('.nav').forEach(b=>b.onclick=()=>{$$('.nav,.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.tab).classList.add('active')});
function eventHTML(e){return `<div class="event"><div class="time">${e[0]}</div><div><div class="event-title">${e[1]}</div>${e[2]?`<div class="event-note">${e[2]}</div>`:''}</div></div>`}
function renderDates(){dateTabs.innerHTML=days.map((d,i)=>`<button class="date-tab ${i===selected?'active':''}" onclick="selectDay(${i})"><strong>${d.date}</strong><span>${d.dow} · ${d.title}</span></button>`).join('');renderDay()}
function selectDay(i){selected=i;renderDates()}
function esc(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function scheduleEventHTML(e,i){return `<div class="event schedule-view-event"><div class="time">${esc(e[0])}</div><div class="event-content"><div class="event-title">${esc(e[1])}</div>${e[2]?`<div class="event-note">${esc(e[2])}</div>`:''}</div><button class="event-edit-btn" onclick="openScheduleModal(${i})">수정</button></div>`}
function renderDay(){let d=days[selected];dayDetail.innerHTML=`<article class="day-card"><div class="day-title"><div><p class="eyebrow">${d.date} · ${d.dow}</p><h2>${d.title}</h2></div><span class="saved">일정은 수정 버튼에서 변경</span></div><div class="day-events">${d.events.map(scheduleEventHTML).join('')}<button class="add-event-btn" onclick="openScheduleModal(-1)">+ 일정 추가</button></div></article>`}
let editingEvent=-1;
function openScheduleModal(i){editingEvent=i;let isNew=i<0,e=isNew?['','','']:days[selected].events[i];$('#scheduleModalTitle').textContent=isNew?'새 일정 추가':'일정 수정';$('#modalTime').value=e[0]||'';$('#modalEventTitle').value=e[1]||'';$('#modalEventNote').value=e[2]||'';$('#scheduleDeleteBtn').style.display=isNew?'none':'inline-flex';openModal('scheduleModal');setTimeout(()=>$('#modalTime').focus(),0)}
function openModal(id){let m=$('#'+id);m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}
function closeModal(id){let m=$('#'+id);m.classList.remove('open');m.setAttribute('aria-hidden','true');if(!document.querySelector('.modal.open'))document.body.classList.remove('modal-open')}
function timeToMinutes(value){
  const raw=String(value||'').trim();
  const ampm=raw.match(/^(오전|오후)\s*(\d{1,2})(?::(\d{1,2}))?/);
  if(ampm){let h=Number(ampm[2]),m=Number(ampm[3]||0);if(ampm[1]==='오후'&&h<12)h+=12;if(ampm[1]==='오전'&&h===12)h=0;return h*60+m}
  const hm=raw.match(/^(\d{1,2})(?::(\d{1,2}))?/);
  if(hm){const h=Number(hm[1]),m=Number(hm[2]||0);return h*60+m}
  return Number.MAX_SAFE_INTEGER;
}
function sortEventsByTime(){days[selected].events=days[selected].events.map((e,i)=>({e,i})).sort((a,b)=>{const diff=timeToMinutes(a.e[0])-timeToMinutes(b.e[0]);return diff||a.i-b.i}).map(x=>x.e)}
$('#scheduleSaveBtn').onclick=()=>{let time=$('#modalTime').value.trim(),title=$('#modalEventTitle').value.trim(),note=$('#modalEventNote').value.trim();if(!time||!title){alert('시간과 일정 내용을 입력해주세요.');return}let e=[time,title,note];if(editingEvent<0)days[selected].events.push(e);else days[selected].events[editingEvent]=e;sortEventsByTime();localStorage.setItem('atl_schedule_days',JSON.stringify(days));renderDay();renderToday();closeModal('scheduleModal')};
$('#scheduleDeleteBtn').onclick=()=>{if(editingEvent>=0&&confirm('이 일정을 삭제할까요?')){days[selected].events.splice(editingEvent,1);localStorage.setItem('atl_schedule_days',JSON.stringify(days));renderDay();renderToday();closeModal('scheduleModal')}};
function tripIndex(){let n=new Date(),y=n.getFullYear();if(y!==2026)return 0;let m=n.getMonth()+1,day=n.getDate();if(m===10&&day>=1&&day<=6)return day-1;return 0}
function renderToday(){let i=tripIndex(),d=days[i],now=new Date(),start=new Date(2026,9,1),diff=Math.ceil((start-new Date(now.getFullYear(),now.getMonth(),now.getDate()))/86400000);todayLabel.textContent=`${d.date} ${d.dow}요일 · ${d.title}`;dday.textContent=diff>0?`D-${diff}`:diff===0?'D-DAY':(now<=new Date(2026,9,6)?`DAY ${i+1}`:'TRIP COMPLETE');todaySchedule.innerHTML=d.events.map(eventHTML).join('')}
function goScheduleToday(){selected=tripIndex();document.querySelector('[data-tab=schedule]').click();renderDates()}
['todayMemo','overviewMemo'].forEach(id=>{let el=$('#'+id),v=localStorage.getItem('atl_'+id);if(v!==null)el.value=v;el.addEventListener('input',()=>localStorage.setItem('atl_'+id,el.value))});
let checks=JSON.parse(localStorage.getItem('atl_checks')||'[ {"t":"카메라 / 배터리","d":false},{"t":"오디오","d":false},{"t":"PPL 제품","d":false},{"t":"구성안 확인","d":false} ]');function saveChecks(){localStorage.setItem('atl_checks',JSON.stringify(checks));renderChecks()}function renderChecks(){checklist.innerHTML=checks.map((c,i)=>`<div class="checkrow ${c.d?'done':''}"><input type="checkbox" ${c.d?'checked':''} onchange="checks[${i}].d=this.checked;saveChecks()"><span contenteditable="true" onblur="checks[${i}].t=this.innerText;saveChecks()">${c.t}</span><button class="del" onclick="checks.splice(${i},1);saveChecks()">×</button></div>`).join('')}function addCheck(){checks.push({t:'새 항목',d:false});saveChecks()}
let editor=$('#editor'),planView=$('#planView');
function normalizeLinks(root){root.querySelectorAll('a').forEach(a=>{let href=a.getAttribute('href')||'';if(href&&!/^(https?:|mailto:|tel:)/i.test(href))a.setAttribute('href','https://'+href);a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer')})}
function renderPlanView(){let html=localStorage.getItem('atl_plan')||'';planView.innerHTML=html;normalizeLinks(planView);planView.classList.toggle('empty',!html.trim())}
$('#planEditBtn').onclick=()=>{editor.innerHTML=localStorage.getItem('atl_plan')||'';openModal('planModal');setTimeout(()=>editor.focus(),0)};
$('#planSaveBtn').onclick=()=>{normalizeLinks(editor);localStorage.setItem('atl_plan',editor.innerHTML);planSaved.textContent='저장됨';renderPlanView();closeModal('planModal')};
$$('[data-cmd]').forEach(b=>b.onclick=()=>{document.execCommand(b.dataset.cmd,false,null);editor.focus()});fontSize.onchange=()=>{document.execCommand('fontSize',false,fontSize.value);editor.focus()};linkBtn.onclick=()=>{let u=prompt('연결할 URL을 입력하세요');if(u){u=u.trim();if(u&&!/^(https?:|mailto:|tel:)/i.test(u))u='https://'+u;document.execCommand('createLink',false,u);normalizeLinks(editor);editor.focus()}};checkBtn.onclick=()=>{document.execCommand('insertHTML',false,'<div class="checkline"><input type="checkbox" tabindex="-1"> 체크 항목</div>');editor.focus()};clearBtn.onclick=()=>{if(confirm('편집 중인 구성안 노트를 모두 지울까요?'))editor.innerHTML=''};
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>closeModal(b.dataset.close==='schedule'?'scheduleModal':'planModal')));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('#scheduleModal').classList.contains('open'))closeModal('scheduleModal');if($('#planModal').classList.contains('open'))closeModal('planModal')}});
renderPlanView();
renderToday();renderDates();renderChecks();
