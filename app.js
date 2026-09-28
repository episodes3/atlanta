const days=[
{date:'10/1',dow:'목',title:'출발 · 애틀랜타 도착',events:[['07:00','인천 2터미널 집합'],['08:45','출국','KE0033 · 13시간 50분 비행'],['09:35','애틀랜타 도착'],['11:00','숙소 짐 보관'],['12:00','혜영 언니네 인사 및 집 답사'],['16:00','빈티지샵 / 마트 답사','시간 여유가 없을 시 10/2, 10/3 촬영 이후 진행'],['18:00','저녁'],['20:00','첫째 날 마무리'],['21:00','자유시간 및 취침']]},
{date:'10/2',dow:'금',title:'애틀랜타 본가 공개',events:[['10:00','CNL 수소미스트 PPL'],['11:00','가족 집 도착'],['12:00','① 본가 촬영 (PPL 포함)','오즈모포켓2 · A7 · 거치캠 · 윈터폰\n10/2 이혜영 애틀란타 본가 공개.docx'],['18:00','저녁'],['20:00','둘째 날 마무리']]},
{date:'10/3',dow:'토',title:'세모녀 쇼핑',events:[['10:00','가족 집 도착'],['11:00','겟레디윗미','쥬베룩 PPL'],['12:00','② 세모녀 쇼핑 · 빈티지샵','오즈모포켓2 · A7 · 윈터폰\nThe Clothing Warehouse / Space Queen / 2nd Street Ponce\n🥘 점심\n[혜영이는 못말려] 혜영이의 빈티지샵 털기_공유용_v1.docx'],['20:00','셋째 날 마무리']]},
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
function editableEventHTML(e,i){return `<div class="schedule-edit-row">
  <input class="schedule-time" value="${esc(e[0])}" aria-label="시간" onchange="updateEvent(${i},0,this.value)">
  <div class="schedule-fields">
    <input class="schedule-title-input" value="${esc(e[1])}" aria-label="일정 내용" onchange="updateEvent(${i},1,this.value)">
    <textarea class="schedule-note-input" aria-label="상세 메모" placeholder="상세 메모 (선택)" onchange="updateEvent(${i},2,this.value)">${esc(e[2]||'')}</textarea>
  </div>
  <div class="schedule-actions"><button onclick="moveEvent(${i},-1)" title="위로">↑</button><button onclick="moveEvent(${i},1)" title="아래로">↓</button><button class="remove-event" onclick="deleteEvent(${i})" title="삭제">×</button></div>
</div>`}
function renderDay(){let d=days[selected];dayDetail.innerHTML=`<article class="day-card"><div class="day-title"><div><p class="eyebrow">${d.date} · ${d.dow}</p><h2>${d.title}</h2><p class="muted edit-help">시간과 내용을 눌러 바로 수정할 수 있어요.</p></div><span class="saved">수정 시 자동 저장</span></div><div class="day-events schedule-editor">${d.events.map(editableEventHTML).join('')}<button class="add-event-btn" onclick="addEvent()">+ 일정 추가</button></div></article>`}
function updateEvent(i,field,value){days[selected].events[i][field]=value;saveSchedule()}
function addEvent(){days[selected].events.push(['00:00','새 일정','']);saveSchedule();setTimeout(()=>{const rows=$$('.schedule-edit-row');const last=rows[rows.length-1];if(last)last.querySelector('.schedule-time').focus()},0)}
function deleteEvent(i){if(confirm('이 일정을 삭제할까요?')){days[selected].events.splice(i,1);saveSchedule()}}
function moveEvent(i,dir){let j=i+dir;if(j<0||j>=days[selected].events.length)return;[days[selected].events[i],days[selected].events[j]]=[days[selected].events[j],days[selected].events[i]];saveSchedule()}

function tripIndex(){let n=new Date(),y=n.getFullYear();if(y!==2026)return 0;let m=n.getMonth()+1,day=n.getDate();if(m===10&&day>=1&&day<=6)return day-1;return 0}
function renderToday(){let i=tripIndex(),d=days[i],now=new Date(),start=new Date(2026,9,1),diff=Math.ceil((start-new Date(now.getFullYear(),now.getMonth(),now.getDate()))/86400000);todayLabel.textContent=`${d.date} ${d.dow}요일 · ${d.title}`;dday.textContent=diff>0?`D-${diff}`:diff===0?'D-DAY':(now<=new Date(2026,9,6)?`DAY ${i+1}`:'TRIP COMPLETE');todaySchedule.innerHTML=d.events.map(eventHTML).join('')}
function goScheduleToday(){selected=tripIndex();document.querySelector('[data-tab=schedule]').click();renderDates()}
['todayMemo','overviewMemo'].forEach(id=>{let el=$('#'+id),v=localStorage.getItem('atl_'+id);if(v!==null)el.value=v;el.addEventListener('input',()=>localStorage.setItem('atl_'+id,el.value))});
let checks=JSON.parse(localStorage.getItem('atl_checks')||'[ {"t":"카메라 / 배터리","d":false},{"t":"오디오","d":false},{"t":"PPL 제품","d":false},{"t":"구성안 확인","d":false} ]');function saveChecks(){localStorage.setItem('atl_checks',JSON.stringify(checks));renderChecks()}function renderChecks(){checklist.innerHTML=checks.map((c,i)=>`<div class="checkrow ${c.d?'done':''}"><input type="checkbox" ${c.d?'checked':''} onchange="checks[${i}].d=this.checked;saveChecks()"><span contenteditable="true" onblur="checks[${i}].t=this.innerText;saveChecks()">${c.t}</span><button class="del" onclick="checks.splice(${i},1);saveChecks()">×</button></div>`).join('')}function addCheck(){checks.push({t:'새 항목',d:false});saveChecks()}
let editor=$('#editor');editor.innerHTML=localStorage.getItem('atl_plan')||'';let timer;editor.addEventListener('input',()=>{clearTimeout(timer);planSaved.textContent='저장 중…';timer=setTimeout(()=>{localStorage.setItem('atl_plan',editor.innerHTML);planSaved.textContent='저장됨'},350)});$$('[data-cmd]').forEach(b=>b.onclick=()=>{document.execCommand(b.dataset.cmd,false,null);editor.focus()});fontSize.onchange=()=>document.execCommand('fontSize',false,fontSize.value);linkBtn.onclick=()=>{let u=prompt('연결할 URL을 입력하세요');if(u)document.execCommand('createLink',false,u)};checkBtn.onclick=()=>{document.execCommand('insertHTML',false,'<div class="checkline"><input type="checkbox" onclick="this.parentElement.classList.toggle(\'checked\')"> 체크 항목</div>')};clearBtn.onclick=()=>{if(confirm('구성안 노트를 모두 지울까요?')){editor.innerHTML='';localStorage.removeItem('atl_plan')}};
renderToday();renderDates();renderChecks();
