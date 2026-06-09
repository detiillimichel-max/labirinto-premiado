const SIZE = 17;
let fase = 1;
let ciclo = 1;
let pontos = 0;
let maze = [];
let entries = [];
let playerPos = null;
let exitPos = {x:15, y:15};
let timeLeft = 90;
let timerId = null;
let canMove = false;

const mazeEl = document.getElementById('maze');
const faseEl = document.getElementById('fase');
const cicloEl = document.getElementById('ciclo');
const pontosEl = document.getElementById('pontos');
const tempoEl = document.getElementById('tempo');
const messageEl = document.getElementById('message');
const lojaBtn = document.getElementById('lojaBtn');
const shop = document.getElementById('shop');
const shopPontos = document.getElementById('shopPontos');

function getEntryCount(f){
  if(f<=7) return 3+f;
  if(f===20) return 10;
  return 4 + Math.floor(Math.random()*7);
}
function getTimeForPhase(){
  return Math.max(30, 90 - (fase-1)*3 - (ciclo-1)*5);
}

function generateMaze(entryCount){
  maze = Array.from({length:SIZE}, ()=>Array(SIZE).fill(1));
  function carve(x,y){
    maze[y][x]=0;
    const dirs=[[2,0],[-2,0],[0,2],[0,-2]].sort(()=>Math.random()-0.5);
    for(const [dx,dy] of dirs){
      const nx=x+dx, ny=y+dy;
      if(nx>0 && nx<SIZE-1 && ny>0 && ny<SIZE-1 && maze[ny][nx]===1){
        maze[y+dy/2][x+dx/2]=0;
        carve(nx,ny);
      }
    }
  }
  carve(1,1);
  maze[15][15]=0; maze[14][15]=0; maze[15][14]=0;

  entries=[];
  for(let i=0;i<entryCount;i++){
    let tries=0;
    while(tries<100){
      const side = Math.floor(Math.random()*4);
      let x,y;
      if(side===0){ y=0; x=1+2*Math.floor(Math.random()*7); maze[1][x]=0; }
      else if(side===1){ x=SIZE-1; y=1+2*Math.floor(Math.random()*7); maze[y][SIZE-2]=0; }
      else if(side===2){ y=SIZE-1; x=1+2*Math.floor(Math.random()*7); maze[SIZE-2][x]=0; }
      else { x=0; y=1+2*Math.floor(Math.random()*7); maze[y][1]=0; }
      maze[y][x]=0;
      if(!entries.some(e=>e.x===x&&e.y===y)){
        entries.push({x,y});
        break;
      }
      tries++;
    }
  }
}

function render(){
  mazeEl.innerHTML='';
  for(let y=0;y<SIZE;y++){
    for(let x=0;x<SIZE;x++){
      const cell=document.createElement('div');
      cell.className='cell ' + (maze[y][x]===1 ? 'wall' : 'path');
      if(x===exitPos.x && y===exitPos.y) cell.classList.add('exit');
      const entry = entries.find(e=>e.x===x&&e.y===y);
      if(entry) { cell.classList.add('entry'); cell.dataset.entry=`${x},${y}`; }
      if(playerPos && playerPos.x===x && playerPos.y===y) cell.classList.add('player');
      mazeEl.appendChild(cell);
    }
  }
  faseEl.textContent=fase;
  cicloEl.textContent=ciclo;
  pontosEl.textContent=pontos;
  tempoEl.textContent=timeLeft;
}

function startPhase(){
  const count=getEntryCount(fase);
  generateMaze(count);
  playerPos=null;
  canMove=false;
  stopTimer();
  timeLeft = getTimeForPhase();
  messageEl.textContent='Escolha uma entrada 🚪';
  render();
}

mazeEl.addEventListener('click', e=>{
  const entry = e.target.closest('.entry');
  if(!entry || playerPos) return;
  const [x,y]=entry.dataset.entry.split(',').map(Number);
  playerPos={x,y};
  canMove=true;
  messageEl.textContent='Use as setas para chegar na ⭐';
  startTimer();
  render();
});

function startTimer(){
  stopTimer();
  tempoEl.parentElement.classList.remove('low');
  timerId = setInterval(()=>{
    timeLeft--;
    tempoEl.textContent=timeLeft;
    if(timeLeft<=10) tempoEl.parentElement.classList.add('low');
    if(timeLeft<=0){
      stopTimer();
      canMove=false;
      messageEl.textContent='⏰ Tempo esgotado!';
      setTimeout(()=>{ alert('Tempo esgotado!'); startPhase(); }, 600);
    }
  },1000);
}
function stopTimer(){ if(timerId){ clearInterval(timerId); timerId=null; } }

function move(dx,dy){
  if(!canMove || !playerPos) return;
  const nx=playerPos.x+dx, ny=playerPos.y+dy;
  if(nx<0||ny<0||nx>=SIZE||ny>=SIZE) return;
  if(maze[ny][nx]===1){ messageEl.textContent='Bateu na parede!'; setTimeout(()=>messageEl.textContent='Continue até a ⭐',700); return; }
  playerPos={x:nx,y:ny};
  if(nx===exitPos.x && ny===exitPos.y){
    stopTimer();
    pontos+=100 + timeLeft; // bônus de tempo
    messageEl.textContent=`Fase completa! +${100+timeLeft} pts`;
    canMove=false;
    setTimeout(nextPhase,900);
  }
  render();
}

function nextPhase(){
  fase++;
  if(fase>20){ fase=1; ciclo++; }
  startPhase();
}

document.addEventListener('keydown', e=>{
  if(e.key==='ArrowUp') move(0,-1);
  if(e.key==='ArrowDown') move(0,1);
  if(e.key==='ArrowLeft') move(-1,0);
  if(e.key==='ArrowRight') move(1,0);
});
document.querySelectorAll('.controls button').forEach(b=>{
  b.addEventListener('click', ()=>{
    const d=b.dataset.dir;
    if(d==='up') move(0,-1);
    if(d==='down') move(0,1);
    if(d==='left') move(-1,0);
    if(d==='right') move(1,0);
  });
});

// Loja corrigida
lojaBtn.onclick=()=>{
  shop.classList.remove('hidden');
  shopPontos.textContent=pontos;
  document.getElementById('guia2').disabled = pontos<50;
  document.getElementById('guia3').disabled = pontos<80;
  if(timerId){ clearInterval(timerId); } // pausa
};
document.getElementById('fecharLoja').onclick=()=>{
  shop.classList.add('hidden');
  if(canMove && playerPos && !timerId) startTimer(); // retoma
};

function bfs(start, goal){
  const q=[[start]], visited=Array.from({length:SIZE},()=>Array(SIZE).fill(false));
  visited[start.y][start.x]=true;
  while(q.length){
    const path=q.shift();
    const {x,y}=path[path.length-1];
    if(x===goal.x && y===goal.y) return path;
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{
      const nx=x+dx, ny=y+dy;
      if(nx>=0&&ny>=0&&nx<SIZE&&ny<SIZE && !visited[ny][nx] && maze[ny][nx]===0){
        visited[ny][nx]=true;
        q.push([...path,{x:nx,y:ny}]);
      }
    });
  }
  return null;
}

function showGuide(seconds, cost){
  if(pontos<cost){ alert('Pontos insuficientes'); return; }
  if(!playerPos){ alert('Escolha uma entrada primeiro!'); shop.classList.add('hidden'); return; }
  pontos-=cost;
  pontosEl.textContent=pontos;
  shop.classList.add('hidden');
  const path=bfs(playerPos, exitPos);
  if(!path) return;
  path.forEach(p=>{
    const idx=p.y*SIZE+p.x;
    mazeEl.children[idx].classList.add('guide');
  });
  setTimeout(()=>{
    document.querySelectorAll('.guide').forEach(c=>c.classList.remove('guide'));
    if(canMove && !timerId) startTimer();
  }, seconds*1000);
}

document.getElementById('guia2').onclick=()=>showGuide(2,50);
document.getElementById('guia3').onclick=()=>showGuide(3,80);

startPhase();
