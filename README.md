# Labirinto do Robozinho

Jogo de labirinto 17x17 com 20 fases, ciclos infinitos e loja de power-ups.

## Como jogar â€“ passo a passo

1. **Escolha uma entrada**
   No inÃ­cio de cada fase, vocÃª verÃ¡ cÃ­rculos verdes com o Ã­cone ðŸšª nas bordas do labirinto.
   Clique em um desses cÃ­rculos para posicionar seu personagem (robozinho) naquela entrada.
   SÃ³ depois de escolher a entrada vocÃª poderÃ¡ se mover.

2. **Movimente-se**
   Use as setas do teclado (â† â†‘ â†“ â†’) ou os botÃµes na tela (â–² â–¼ â—€ â–¶) para caminhar pelo labirinto.
   VocÃª nÃ£o pode atravessar paredes â€“ o jogo avisa quando vocÃª bate.

3. **Encontre a saÃ­da**
   A saÃ­da Ã© uma estrela â­ (sempre no canto inferior direito do labirinto).
   Quando seu personagem alcanÃ§ar a estrela, vocÃª completa a fase e ganha 100 pontos.

4. **Avance pelas 20 fases**
   - Fase 1: 4 entradas
   - Fase 2: 5 entradas
   - â€¦ atÃ© Fase 7: 10 entradas
   - Depois os nÃºmeros de entradas variam (4 a 10), mas a fase 20 sempre tem 10 entradas.
   - Cada fase tem cores e fundo diferentes â€“ cenÃ¡rio totalmente novo!

5. **Use a loja (power-ups)**
   Clique no botÃ£o ðŸ›’ LOJA Â· COMPRAR GUIAS.
   VocÃª pode comprar:
   - **Guia RÃ¡pido (2s)** â€“ custa 50 pontos. Mostra o caminho mais curto da sua posiÃ§Ã£o atÃ© a saÃ­da por 2 segundos (pontilhado rosa).
   - **Guia Estendido (3s)** â€“ custa 80 pontos. Mesmo efeito, mas por 3 segundos.
   Os pontos sÃ£o acumulados ao vencer fases (100 pontos por fase).

6. **Ciclo infinito (rejogabilidade eterna)**
   ApÃ³s completar a fase 20, o jogo entra em um novo ciclo.
   Todos os 20 labirintos sÃ£o totalmente regenerados â€“ novas rotas internas, novas posiÃ§Ãµes de entrada (mantendo o nÃºmero de entradas de cada fase).
   Sua pontuaÃ§Ã£o continua acumulando e o contador de ciclo aumenta (Ciclo 1, Ciclo 2, â€¦).
   VocÃª pode jogar para sempre, sempre com desafios inÃ©ditos.

## ðŸ§  MecÃ¢nicas tÃ©cnicas

| Componente | DescriÃ§Ã£o |
|------------|-----------|
| Tamanho do labirinto | 17x17 cÃ©lulas (paredes e caminhos) |
| GeraÃ§Ã£o de labirinto | Algoritmo DFS (backtracking) garantindo caminho vÃ¡lido entre qualquer entrada e a saÃ­da. |
| Entradas | Posicionadas aleatoriamente nas bordas, mas sempre em cÃ©lulas de caminho. |
| SaÃ­da | Fixa na cÃ©lula (15,15) â€“ canto inferior direito. |
| Caminho mais curto | Calculado por BFS (busca em largura) a cada uso do guia. |
| Loja | Modal simples com pontos acumulados. |
| Ciclos | ApÃ³s 20 fases, todos os labirintos sÃ£o recriados com nova semente aleatÃ³ria. |
| Estilos visuais | Cada fase tem tema inspirado nas imagens: clÃ¡ssico preto/branco, linhas finas, hedge verde, e bold. |

## Arquivos
- index.html
- style.css
- script.js
- README.md
 © 2026 Michel Detilli.
Todos os direitos reservados. 
É permitido jogar online. É proibida a cópia, distribuição ou uso comercial do código sem autorização.
