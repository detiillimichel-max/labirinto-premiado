// Labirinto do Robozinho - 17x17 DFS + BFS
const SIZE = 17;
const EXIT = {x:15, y:15};

let fase = 1;
let ciclo = 1;
let pontos = 0;
let grid = [];
let entries = [];
let player = null;
let canMove = false;

const mazeEl = document.getElementById('maze');
const faseEl = document.getElementById('fase');
const cicloEl = document.getElementById('ciclo');
const pontosEl = document.getElementById('pontos');
const shopPontosEl = document.getElementById('shopPontos');
const messageEl = document.getElementById('message');

function getEntryCount(f) {
  if (f <= 7) return 3 + f; // 1->4 ... 7->10
  if (f === 20) return 10;
  return 4 + Math.floor(Math.random()*7); // 4-10
}

function generateMaze() {
  grid = Array.from({length: SIZE}, () => Array(SIZE).fill(1));
  
  function carve(x, y) {
    grid[y][x] = 0;
    const dirs = [[2,0],[-2,0],[0,2],[0,-2]].sort(()=>Math.random()-0.5);
    for (const [dx,dy] of dirs) {
      const nx = x+dx, ny = y+dy;
      if (nx>0 && nx<SIZE-1 && ny>0 && ny<SIZE-1 && grid[ny][nx]===1) {
        grid[y+dy/2][x+dx/2] = 0;
        carve(nx,ny);
      }
    }
  }
  carve(1,1);
  grid[EXIT.y][EXIT.x] = 0;
  grid[EXIT.y-1][EXIT.x] = 0;

  // entradas
  entries = [];
  const count = getEntryCount(fase);
  const sides = [0,1,2,3];
  let attempts = 0;
  while (entries.length < count && attempts < 200) {
    attempts++;
    const side = sides[Math.floor(Math.random()*4)];
    let x, y;
    if (side===0) { y=0; x=1+2*Math.floor(Math.random()*7); grid[1][x]=0; }
    if (side===1) { x=SIZE-1; y=1+2*Math.floor(Math.random()*7); grid[y][SIZE-2]=0; }
    if (side===2) { y=SIZE-1; x=1+2*Math.floor(Math.random()*7); grid[SIZE-2][x]=0; }
    if (side===3) { x=0; y=1+2*Math.floor(Math.random()*7); grid[y][1]=0; }
    grid[y][x]=0;
    if (!entries.some(e=>e.x===x && e.y===y)) entries.push({x,y});
  }
}

function render() {
  mazeEl.innerHTML = '';
  mazeEl.className = '';
  // temas como na imagem
  const theme = fase % 4;
  if (theme===1) document.body.className = 'theme-classic';
  else if (theme===2) document.body.className = 'theme-lines';
  else if (theme===3) document.body.className = 'theme-hedge';
  else document.body.className = 'theme-bold';

  for (let y=0; y<SIZE; y++) {
    for (let x=0; x<SIZE; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell ' + (grid[y][x] ? 'wall' : 'path');
      cell.dataset.x = x; cell.dataset.y = y;
      
      if (x===EXIT.x && y===EXIT.y) cell.classList.add('exit');
      
      const isEntry = entries.find(e=>e.x===x && e.y===y);
      if (isEntry) {
        cell.classList.add('entry');
        cell.onclick = () => chooseEntry(x,y);
      }
      if (player && player.x===x && player.y===y) {
        cell.classList.add('player');
      }
      mazeEl.appendChild(cell);
    }
  }
}

function chooseEntry(x,y) {
  if (player) return;
  player = {x,y};
  canMove = true;
  messageEl.textContent = 'Use as setas para chegar na â­';
  render();
}

function move(dx,dy) {
  if (!canMove || !player) return;
  const nx = player.x + dx;
  const ny = player.y + dy;
  if (nx<0||ny<0||nx>=SIZE||ny>=SIZE) return;
  if (grid[ny][nx]===1) {
    messageEl.textContent = 'Bateu na parede!';
    setTimeout(()=>messageEl.textContent='Continue atÃ© a â­', 800);
    return;
  }
  player.x = nx; player.y = ny;
  render();
  if (nx===EXIT.x && ny===EXIT.y) win();
}

function win() {
  canMove = false;
  pontos += 100;
  updateUI();
  document.getElementById('win').classList.remove('hidden');
}

function nextPhase() {
  document.getElementById('win').classList.add('hidden');
  fase++;
  if (fase>20) { fase=1; ciclo++; }
  player = null; canMove = false;
  generateMaze();
  render();
  updateUI();
  messageEl.textContent = 'Escolha uma entrada ðŸšª';
}

function bfsPath() {
  if (!player) return [];
  const q = [[player.x, player.y]];
  const visited = Array.from({length:SIZE},()=>Array(SIZE).fill(false));
  const parent = {};
  visited[player.y][player.x]=true;
  
  while(q.length) {
    const [x,y]=q.shift();
    if (x===EXIT.x && y===EXIT.y) break;
    for (const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx=x+dx, ny=y+dy;
      if (nx>=0&&ny>=0&&nx<SIZE&&ny<SIZE && !visited[ny][nx] && grid[ny][nx]===0) {
        visited[ny][nx]=true;
        parent[`${nx},${ny}`]=[x,y];
        q.push([nx,ny]);
      }
    }
  }
  const path=[];
  let cur=[EXIT.x,EXIT.y];
  while(parent[`${cur[0]},${cur[1]}`]) {
    path.push(cur);
    cur=parent[`${cur[0]},${cur[1]}`];
  }
  return path;
}

function showGuide(seconds) {
  if (!player) { messageEl.textContent='Escolha uma entrada primeiro!'; return; }
  const path = bfsPath();
  path.forEach(([x,y])=>{
    const idx = y*SIZE + x;
    mazeEl.children[idx].classList.add('guide');
  });
  setTimeout(()=>{ 
    document.querySelectorAll('.guide').forEach(el=>el.classList.remove('guide'));
  }, seconds*1000);
}

function updateUI() {
  faseEl.textContent = fase;
  cicloEl.textContent = ciclo;
  pontosEl.textContent = pontos;
  shopPontosEl.textContent = pontos;
}

// Controles
document.querySelectorAll('.controls button').forEach(btn=>{
  btn.onclick = ()=>{
    const dir = btn.dataset.dir;
    if (dir==='up') move(0,-1);
    if (dir==='down') move(0,1);
    if (dir==='left') move(-1,0);
    if (dir==='right') move(1,0);
  };
});
window.addEventListener('keydown', e=>{
  if (e.key==='ArrowUp') move(0,-1);
  if (e.key==='ArrowDown') move(0,1);
  if (e.key==='ArrowLeft') move(-1,0);
  if (e.key==='ArrowRight') move(1,0);
});

// Loja
const shop = document.getElementById('shop');
document.getElementById('shopBtn').onclick = ()=>{ updateUI(); shop.classList.remove('hidden'); };
document.getElementById('closeShop').onclick = ()=> shop.classList.add('hidden');
document.querySelectorAll('[data-buy]').forEach(b=>{
  b.onclick = ()=>{
    const type = b.dataset.buy;
    const cost = type==='rapido'?50:80;
    if (pontos < cost) { alert('Pontos insuficientes!'); return; }
    pontos -= cost;
    updateUI();
    shop.classList.add('hidden');
    showGuide(type==='rapido'?2:3);
    messageEl.textContent = type==='rapido'?'Guia rÃ¡pido ativado!':'Guia estendido ativado!';
  };
});

document.getElementById('nextBtn').onclick = nextPhase;

// Init
generateMaze();
render();
updateUI();
