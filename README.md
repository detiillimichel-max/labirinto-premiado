# labirinto-premiado
# 🚪 Labirinto das Múltiplas Entradas – 20 Fases com Loja e Ciclo Infinito

> *“Escolha sua entrada, encontre a única saída. A cada fase, um cenário novo. A cada ciclo, um labirinto renovado.”*

Um jogo de labirinto onde cada fase tem **de 4 a 10 entradas diferentes** (todas visíveis nas bordas), mas apenas **uma única saída correta**. São 20 fases com **cenários visuais únicos** (cores de parede, chão e fundo mudam a cada fase). Complete as fases, ganhe pontos, compre **guias mágicos** que mostram o caminho mais curto e enfrente **ciclos infinitos** – após a fase 20, todos os labirintos são regenerados com novas rotas e posições de entrada, mantendo sua pontuação.

![Exemplo do labirinto](https://via.placeholder.com/600x600?text=Labirinto+com+entradas+verdes)

---

## 🎮 Como jogar – passo a passo

### 1. Escolha uma entrada
- No início de cada fase, você verá **círculos verdes** com o ícone 🚪 nas bordas do labirinto.
- **Clique em um desses círculos** para posicionar seu personagem (robozinho) naquela entrada.
- Só depois de escolher a entrada você poderá se mover.

### 2. Movimente‑se
- Use as **setas do teclado** (← ↑ ↓ →) ou os **botões na tela** (▲ ▼ ◀ ▶) para caminhar pelo labirinto.
- Você **não pode atravessar paredes** – o jogo avisa quando você bate.

### 3. Encontre a saída
- A saída é uma **estrela ⭐** (sempre no canto inferior direito do labirinto).
- Quando seu personagem alcançar a estrela, você **completa a fase** e ganha **100 pontos**.

### 4. Avance pelas 20 fases
- **Fase 1**: 4 entradas  
- **Fase 2**: 5 entradas  
- … até **Fase 7**: 10 entradas  
- Depois os números de entradas variam (4 a 10), mas a **fase 20 sempre tem 10 entradas**.
- Cada fase tem **cores e fundo diferentes** – cenário totalmente novo!

### 5. Use a loja (power‑ups)
- Clique no botão **🛒 LOJA · COMPRAR GUIAS**.
- Você pode comprar:
  - **Guia Rápido (2s)** – custa 50 pontos. Mostra o **caminho mais curto** da sua posição até a saída por 2 segundos (pontilhado rosa).
  - **Guia Estendido (3s)** – custa 80 pontos. Mesmo efeito, mas por 3 segundos.
- Os pontos são acumulados ao vencer fases (100 pontos por fase).

### 6. Ciclo infinito (rejogabilidade eterna)
- Após completar a **fase 20**, o jogo entra em um **novo ciclo**.
- **Todos os 20 labirintos são totalmente regenerados** – novas rotas internas, novas posições de entrada (mantendo o número de entradas de cada fase).
- Sua **pontuação continua acumulando** e o contador de ciclo aumenta (Ciclo 1, Ciclo 2, …).
- Você pode jogar para sempre, sempre com desafios inéditos.

---

## 🧠 Mecânicas técnicas

| Componente        | Descrição |
|------------------|-----------|
| **Tamanho do labirinto** | 17x17 células (paredes e caminhos) |
| **Geração de labirinto** | Algoritmo DFS (backtracking) garantindo caminho válido entre qualquer entrada e a saída. |
| **Entradas** | Posicionadas aleatoriamente nas bordas, mas sempre em células de caminho. |
| **Saída** | Fixa na célula (15,15) – canto inferior direito. |
| **Caminho mais curto** | Calculado por BFS (busca em largura) a cada uso do guia. |
| **Loja** | Modal simples com pontos acumulados. |
| **Ciclos** | Após 20 fases, todos os labirintos são recriados com nova semente aleatória. |
| **Estilos visuais** | Cada fase tem ângulo de cor único (HSL variável) para paredes, chão e fundo. |

---

## 🕹️ Controles

| Ação               | Teclado         | Botões na tela |
|--------------------|-----------------|----------------|
| Mover para cima    | ↑ (seta cima)   | ▲              |
| Mover para baixo   | ↓ (seta baixo)  | ▼              |
| Mover para esquerda| ← (seta esquerda)| ◀              |
| Mover para direita | → (seta direita)| ▶              |
| Escolher entrada   | Clique no círculo verde | (mesmo) |
| Abrir loja         | -               | Botão "🛒 LOJA" |

> **No celular:** Use os botões na tela e toque nas entradas verdes.

---

## 🧩 Tela do jogo – elementos

- **Cabeçalho**:
  - `FASE X / 20` – fase atual.
  - `🚪 Entradas: Y` – número de entradas disponíveis.
  - `🔄 Ciclo Z` – quantas vezes você já zerou as 20 fases.
  - `⭐ Pontos` – total acumulado.
- **Canvas central** – desenha o labirinto, entradas (verde), saída (estrela), personagem e caminho guia.
- **Botões direcionais** – para dispositivos sem teclado.
- **Botão da loja** – comprar guias.
- **Mensagens** – orientações e feedback (erro, sucesso, compra).

---

## 🏆 Dicas e estratégias

- **Não clique em nenhuma entrada antes de pensar** – algumas podem estar mais longe da saída.
- **Use a loja** quando estiver perdido – o guia mostra o caminho exato.
- **Guarde pontos** para as fases com muitas entradas (10 entradas) – pode ser mais confuso.
- **Observe as cores** – cada fase tem um tema diferente, mas a lógica do labirinto continua a mesma.
- **Completar o ciclo 1 é só o começo** – nos ciclos seguintes, as rotas mudam completamente, então decore apenas a estratégia, não o caminho.

---

## 📁 Estrutura do projeto
© 2026 Michel Detilli.
Todos os direitos reservados. 
É permitido jogar online. É proibida a cópia, distribuição ou uso comercial do código sem autorização.
