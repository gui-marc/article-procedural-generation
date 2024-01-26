<script>
  import Figure from '../lib/Figure.svelte';
  import Dictionary from '../lib/Dictionary.svelte';
  import Noise from '../lib/Noise.svelte';
  import Note from '../lib/Note.svelte';
  import Link from '../lib/Link.svelte';
  import Em from '../lib/Em.svelte';
  import Game from '../lib/procedural-generation-game/Game.svelte';
  import { onMount } from 'svelte';

  let isMobile = false;

  onMount(() => {
    isMobile = window.innerWidth < 768;
  });
</script>

<svelte:head>
  <title>Design Procedural: Os desafios na criação de mundos infinitos</title>
</svelte:head>

<Noise />

<article class="container">
  <header>
    <h1>Design Procedural: Os Desafios na criação de mundos infinitos</h1>
    <p class="muted">Guilherme Marcondes · Janeiro de 2024</p>
  </header>
  <section>
    <p>
      No reino dos desenvolvimento de jogos e paisagens digitais, uma nova fronteira emerge — uma
      que transcende as limitações do design tradicional e abre portas para possibilidades
      ilimitadas. O design procedural é uma técnica que, a partir de um conjunto de regras e
      parâmetros, gera conteúdo de forma pseudo aleatória e infinita, o qual segue os princípios do
      criador e, ao mesmo tempo, é único e imprevisível, mas também determinístico.
    </p>
    <p>
      À medida que os entusiastas de jogos e desenvolvedores independentes abraçaram ideias
      expansivas e a criação de universos sem fim, os arquitetos por trás destes mundos encontraram
      uma série de desafios penosos. Neste artigo, nós embarcaremos em uma jornada para explorar as
      complexidades e dilemas inerentes à arte de construir mundos infinitos através do Design
      Procedural. Desde o balanço delicado entre a imprevisibilidade e a coerência, até as técnicas
      computacionais de geração de paisagens contínuas e os principais algoritmos utilizados neste
      sentido.
    </p>
  </section>
  <section>
    <h3>O que é o Design Procedural</h3>
    <Dictionary
      term="procedural"
      type="adjetivo"
      fonems={['prəˈsiː.dʒɚ.əl', 'prəˈsiː.dʒər.əl']}
      definitions={[
        'Relativo a um procedimento ou processo.',
        '[Informática] Programação Procedural. Sequência de processos que devem ser executados por um programa, seguindo a linguagem específica que lhe é particular.'
      ]}
      fromText="Dicionário Online de Português (Adaptado)"
      fromLink="https://www.dicio.com.br/procedural/"
    />
    <p>
      Ok, mas o que é mesmo o design procedural? Basicamente, é uma metodologia da programação e
      criação de conteúdo digital que envolve o uso de algoritmos e regras para gerar dados. Estes
      dados então podem ser praticamente qualquer coisa, desde a representação de uma paisagem ou
      topologia de um mundo, até uma história gerada dinamicamente em formato textual. Esta
      abordagem é principalmente utilizada na criação de jogos, computação gráfica, arquitetura e
      simulação.
    </p>
    <Figure
      src="procedural-generation.gif"
      alt="Exemplo de geração de mundo procedural - por Evgeniya Glazycheva"
      caption="Exemplo de geração de mundo procedural - por Evgeniya Glazycheva"
      fullWidth
    />
    <p>
      A base da geração procedural está nos algoritmos, os quais são listas de instruções que
      definem como algo acontece. Geralmente, os desenvolvedores utilizam aleatoriedade, funções
      matemáticas e instruções condicionais para introduzir variabilidade, controle e complexidade
      nestes códigos. É desta forma que os designers de jogos conseguem criar mundos vastos sem a
      necessidade de construir manualmente cada elemento. Atualmente, muitos destes algoritmos já
      estão classificados e categorizados, sendo alguns dos principais: <i>Wave Function Collapse</i
      >,
      <i>Cellular Automata</i> e <i>Perlin Noise</i>.
    </p>
    <p>
      Entre os principais benefícios do design procedural se destaca a escalabilidade, isto é, a
      capacidade de expandir e replicar uma ideia ou programa em um determinado ambiente. O mais
      comum é trabalhar do pequeno para o grande, por exemplo, ao invés de criar um texto inteiro de
      uma vez, podemos começar por definir como é criado um agrupamento menor — palavras ou
      parágrafos. Pode parecer simples a priori definir estes blocos mínimos de construção do nosso
      mundo, mas o desafio se dá ao tentar deixá-los ao mesmo tempo flexíveis o suficiente para não
      se tornarem repetitivos e controlados o bastante para não serem estranhos ou descontínuos.
    </p>
  </section>
  <section>
    <h3>“Rogue”: uma aventura na masmorra sem fim</h3>
    <p>
      Originalmente lançado em 1980, o jogo <i>Rogue</i>, por Michael Toy e Glenn Wichman, é
      conhecido por ser uma das primeiras aventuras gráficas e também por ser precursor de um estilo
      de jogos, o <i>Roguelike</i>, no qual o mapa é gerado proceduralmente e, ao morrer, o jogador
      tem que recomeçar em outro mapa, perdendo todo o progresso anterior. Este jogo teve uma grande
      influência no <i>design</i> de jogos em geral, principalmente quando se trata de geração procedural
      de mundos, uma vez que foi um dos primeiros jogos a adotar esta abordagem.
    </p>
    <p>
      O jogo possui uma dinâmica e desafiante forma de se jogar. A cada tentativa, ou <i>run</i>, o
      jogador navega por uma masmorra composta de salas, corredores e monstros, em busca de um
      artefato chamado “Amuleto de Yendor” (Rodney escrito ao contrário). Ao avançar pelos níveis,
      os monstros ficam progressivamente mais difíceis e não é possível voltar até encontrar o
      amuleto. Depois de encontrá-lo, é preciso voltar ao nível inicial e assim, o jogo acaba. Mesmo
      com gráficos primitivos baseados em texto ASCII, o jogo conseguiu desafiar o jogador por fazer
      com que ele tivesse que se adaptar a cada situação criada.
    </p>
    <Figure
      src="rogue-screenshot.png"
      alt="Rogue Game Screenshot"
      caption="Captura de tela do jogo Rogue"
      fullWidth
    />
    <p>
      Cada nível é na realidade dividido em 9 espaços. O algoritmo forma uma grelha 3x3 e em cada um
      dos blocos decide de forma aleatória o tamanho e posição de uma sala. Depois, escolhe uma
      dessas salas e gera corredores de forma a conectá-las, uma por uma. Na primeira sala
      escolhida, o jogador é colocado e na última, é colocada uma passagem para o próximo nível.
      Isto garante que o jogador passe por todas as salas antes de ir à próxima. Dentro de cada sala
      também podem aparecer itens e monstros, existindo limites e parâmetros para estas gerações
      consoante à dificuldade do nível.
    </p>
    <p>
      O uso da geração procedural garante que os jogadores enfrentem uma experiência única, de forma
      que o <i>layout</i> da masmorra, o local dos itens e o tipo de inimigos encontrados são diferentes
      a cada jogatina. Esta aleatoriedade aumenta a rejogabilidade e desafia o jogador a se adaptar a
      condições que sempre mudam.
    </p>
    <Note>
      O jogo <i>Rogue</i> atualmente possui o código aberto o qual está disponível em
      <Link href="https://github.com/Davidslv/rogue" external>github.com/Davidslv/rogue</Link>.
    </Note>
  </section>
  <section>
    <h3>Além dos blocos: navegando pelos mundos infinitos do Minecraft</h3>
    <p>
      Desde seu início como um pequeno jogo independente, o <i>Minecraft</i> já conquistou uma
      comunidade massiva e hoje é o jogo mais vendido de todos os tempos, tornando-se um evento
      global. No cerne dessa revolução virtual está não apenas a simplicidade dos blocos, mas uma
      complexidade oculta que alimenta a essência do jogo: o design procedural de mundos. A magia do
      <i>Minecraft</i> não reside apenas nos ambientes pixelados e na liberdade criativa ilimitada; ela
      é intrínseca à capacidade do jogo de gerar, de forma procedural, mundos vastos e interconectados.
    </p>
    <Figure
      src="minecraft.jpg"
      alt="Capa do jogo Minecraft"
      caption="Capa do jogo Minecraft - Loja Nintendo"
      fullWidth
    />
    <p>
      Para quem nunca o jogou, Minecraft trata-se de um jogo de aventura em que o jogador é colocado
      em um mundo “infinito” e que possui animais e monstros que tentam matar o jogador e destruir
      suas construções. O mundo é constituído por blocos, sendo cada bloco a representação de um
      material específico como terra, grama, água, areia, pedra, etc. Estes blocos podem ser
      removidos ou adicionados como uma espécie de Lego virtual. Apesar de ser conhecido pela sua
      identidade visual caricata e simples, que utiliza de texturas pixelizadas e personagens
      “quadrados”, é perceptível a complexidade do mundo do jogo.
    </p>
    <p>
      O mapa possui limites bem extensos: se um bloco corresponder a um cubo de 1m³, isto é, 1 metro
      de altura, largura e profundidade, o mundo teria incríveis 4.096.000.000 km² o que resulta em
      aproximadamente 8 vezes o tamanho do planeta Terra em área de superfície. A altura do mapa,
      entretanto, é limitada entre -64 e 320, conferindo um total de 384 blocos de altura. Além de
      gigante, o mapa é extremamente detalhado, existindo 79 biomas, 3 dimensões e mais de 830 tipos
      de blocos diferentes.
    </p>
    <p>
      O código do jogo não é aberto, porém é possível obter uma versão quase completa através do
      processo de <Em>descompilação</Em> do executável do jogo, que é escrito na linguagem Java. Desta
      forma, a comunidade conseguiu estudar e perceber como funciona o algoritmo de geração de mundos
      do Minecraft. Estes pedaços de códigos são amplamente utilizados por modificadores independentes,
      que criam pacotes de biomas, ferramentas e até mecânicas de <i>gameplay</i> adicionais para o jogo.
    </p>
    <Dictionary
      term="descompilação"
      type="nome feminino"
      fromLink="https://dicionario.priberam.org/descompila%C3%A7%C3%A3o"
      fromText="Descompilação - Dicionário Priberam da Língua Portuguesa"
      definitions={[
        '[Informática] Transformação de um código ou de uma linguagem que estava convertida para ser lida por um computador em linguagem de programação. = ENGENHARIA REVERSA'
      ]}
    />
    <Note>
      Um guia para obter o código descompilado do <i>Minecraft</i> pode ser encontrado em
      <Link external href="https://minecraft.fandom.com/wiki/Tutorials/See_Minecraft%27s_code">
        Minecraft Fandom - Tutorial/See Minecraft's code
      </Link> ou com a ferramenta <Link external href="https://github.com/Hexeption/MCP-Reborn"
        >MCP-Reborn</Link
      >.
    </Note>
    <p>
      Tudo começa com o mapa de biomas. É a partir dele que o jogo determinará a forma com que cada
      região será gerada. Cada bioma é construído com a utilização de diversas camadas de
      processamento, em que cada uma toma o resultado da anterior, faz algumas adições, e passa à
      próxima. Nestas camadas são utilizadas diversas técnicas, como por exemplo a criação de mapas
      de ruído (<i>noise maps</i>).
    </p>
    <p>
      Um <i>noise map</i> é uma imagem em que cada ponto (pixel) representa um valor limitado,
      geralmente, entre 0 e 1. Esta imagem depois pode ser utilizada para determinar uma propriedade
      de uma dada coordenada do mapa. Para determinar quais porções do mundo serão preenchidas com
      oceanos ou pedaços de terra firme, por exemplo, o Minecraft cria um <i>noise map</i> com a proporção
      de 1 para 9, ou seja, para cada coordenada do mapa, é escolhido um número aleatório entre 1 e 10
      e, se calhar 1, o local é um ponto de terra firme, senão, é oceano.
    </p>
    <Figure
      src="minecraft-first-layer.png"
      alt="Noise map para determinação de oceanos e terras firmes - Minecraft"
      caption="Noise map que determina quais regiões serão oceano e quais serão terra firme - Minecraft"
    />
    <p>
      Depois de determinados os biomas, o algoritmo escolhe um pixel e performa uma espécie de zoom.
      Cada pixel no <i>noise map</i> gerado anteriormente corresponde agora a um quadrado de 4096 por
      4096 blocos em que serão adicionados detalhes adicionais à região. Esta estratégia de ampliar o
      mapa anterior ainda é atrelada a uma outra forma de aleatorização. Ao fazer o “zoom”, o algoritmo
      muda propositalmente alguns dos pixels, resultando em ilhas menos quadradas e “imperfeições” as
      quais deixam o mundo mais natural e menos previsível.
    </p>
    <p>
      Depois de determinar quais áreas serão oceanos ou terra-firme, o algoritmo passa a calcular os
      biomas em cada região. Para isso utiliza-se de diversas camadas e novos <i>noise maps</i> para
      determinar quais as temperaturas em cada região, as quais podem ser: quente, temperado, frio ou
      congelante. Além de determinar uma temperatura, o gerador depois possui algumas camadas para garantir
      a suavidade dos biomas, isto é, que não haja um deserto escaldante do lado de uma tundra, por exemplo.
    </p>
    <Figure
      src="minecraft-biome-map.avif"
      alt="Mapa de biomas - Minecraft"
      caption="Mapa de biomas - Minecraft"
      fullWidth
    />
    <p>
      A segunda fase, então, se destina a calcular a altura de cada coordenada do jogo.
      Primeiramente as cavernas são escavadas com um algoritmo conhecido como “Perlin Worms”, que
      basicamente move uma esfera gentilmente em um local, removendo os blocos que lá estavam. O
      próprio nome já diz, o resultado é como se uma minhoca tivesse escavado uma porção de terra.
      Com isso, o mapa passa a possuir as cavernas onde depois o jogador poderá procurar por
      minérios, passando por monstros, minas abandonadas e masmorras.
    </p>
    <Figure
      src="minecraft-cave.webp"
      alt="Caverna - Minecraft"
      caption="Caverna - Minecraft Wiki - Fandom"
      fullWidth
    />
    <p>
      Após a definição das cavernas, o algoritmo procede para definir a topografia do mapa. Para
      isso ele utiliza um <i>noise map</i> invertido: para cada ponto calcula um valor x e então
      remove x blocos a partir do topo do mapa (altura 320). O método para gerar o <i>noise map</i>
      é o <i>Fractal Noise</i>, o qual possui várias camadas em que cada camada tem um nível de
      contribuição diferente. Este método consegue gerar um efeito de continuidade no mapa à medida
      que adiciona pequenos detalhes, sem deformar de forma desproporcional a topografia do mapa.
    </p>
    <p>
      Por fim, são colocados nos mapas os detalhes finais como vegetação, animais, estruturas e
      minérios. Cada uma destas entidades, porém, possui uma forma própria de ser colocada no mundo.
      Estes detalhes, aliados à complexa estrutura do mapa, corroboram para a sensação de imersão e
      grandiosidade do jogo.
    </p>
    <Note>
      Uma versão muito mais detalhada sobre o algoritmo de geração de mundos do Minecraft pode ser
      encontrada em
      <Link external href="https://www.alanzucconi.com/2022/06/05/minecraft-world-generation/">
        Alan Zucconi - Minecraft World Generation
      </Link>
    </Note>
  </section>

  <section>
    <h3>Na prática: O mínimo que é preciso saber para criar mundos procedurais</h3>
    <p>
      Como pode ser visto nas secções anteriores, existem diversos algoritmos e estratégias para a
      geração de mundos infinitos. Porém, atualmente, a principal é a utilização de
      <i>noise maps</i> para que, a partir da sua combinação, sejam criados mundos realistas ou que servem
      a um propósito.
    </p>
    <p>
      O <i>Perlin Noise</i>, criado em 1983 por <Link
        href="https://en.wikipedia.org/wiki/Ken_Perlin"
        external>Ken Perlin</Link
      > é o tipo de <i>noise</i> mais utilizado hoje em dia quando se trata de geração procedural.
      Este algoritmo inovou na forma de gerar listas de valores aleatórios mas que levavam em
      consideração os valores vizinhos, como uma forma de <Em>gradiente</Em>. Entretanto, a
      utilização de sua forma "crua" resulta em terrenos de pouca definição. Estes podem ser úteis
      ao gerar alguns casos como dunas ou ondas do mar, mas ao simular topografias mais complexas,
      nota-se que este algoritmo não é suficiente.
    </p>
    <Dictionary
      term="gradiente"
      type="nome masculino"
      fonems={['ɡrɐˈdjẽt(ə)']}
      definitions={[
        'Variação de uma grandeza ao longo de uma dimensão espacial, em determinada direção',
        '[matemática] coeficiente angular (ou declive) da tangente de uma curva (em um dos seus pontos) e cujo valor é o da tangente trigonométrica da inclinação da tangente à curva (nos pontos em que tal tangente exista)'
      ]}
      fromText="Infopédia - Dicionários Porto Editora"
      fromLink="https://www.infopedia.pt/dicionarios/lingua-portuguesa/gradiente"
    />
    <Figure
      alt="Demonstração de uma topografia gerada a partir de um Perlin Noise"
      src="perlin-noise.png"
      caption="(esquerda) Representação 2D de um Perlin Noise. (direita) Topografia gerada a partir do mapa à esquerda."
      fullWidth
    />
    <p>
      Uma das formas de aumentar a definição e o controlo destes mapas de ruído é a criação de
      <i>Fractal Noises</i>. Os <i>Fractal Noises</i> são uma forma de combinar vários
      <i>noise maps</i>
      em um só, de forma que cada um dos mapas contribua com uma porção do resultado final. Desta forma,
      é possível emular a complexidade de terrenos reais, que sofrem de erosão hidraulica, ação do vento,
      da vegetação, e assim por diante. A seguir, explicarei o que são os parâmetros encontrados nos
      <i>Fractal Noises</i>.
    </p>
    <Figure
      src="perlin-noise-vs-fractal-noise.jpg"
      alt="Perlin Noise (esquerda) vs Fractal Noise (direita)"
      caption="Perlin Noise (esquerda) vs Fractal Noise (direita)"
      fullWidth
    />
    <p>
      Como é visível na imagem acima, os <i>Fractal Noises</i> são bem mais complexos que o
      <i>Perlin Noise</i> e é possível visualizar vários detalhes inexistentes no modelo anterior.
      Este detalhamento é influenciado pelo número de <Em>oitavas</Em> <i>(octaves)</i> do
      algoritmo. As oitavas são o número de <i>noise maps</i> que serão combinados para gerar o
      resultado final. Cada
      <i>noise map</i> é gerado com uma frequência diferente, isto é, o número de vezes que o
      algoritmo irá calcular um valor para cada pixel. Quanto maior a <Em>frequência</Em>
      <i>(frequency)</i>, mais detalhes serão adicionados ao mapa, porém, o resultado final será
      mais “granulado”.
    </p>
    <Note>
      As vezes, a incrementação do número de oitavas e da frequencia também pode causar problemas na
      performance do jogo / aplicação. Isto porque, para cada oitava, o algoritmo precisa calcular
      um novo
      <i>noise map</i> e depois combiná-lo com os anteriores. Desta forma, é preciso encontrar um balanço
      entre a qualidade do resultado e a performance do algoritmo.
    </Note>
    <p>
      Além da frequência, o <i>Fractal Noise</i> também possui um parâmetro chamado de
      <Em>lacunaridade</Em> <i>(lacunarity)</i>. Este parâmetro define a razão entre as frequências
      de cada oitava. Por exemplo, se a frequência da primeira oitava for 1, a frequência da segunda
      será 2, da terceira 4, da quarta 8, e assim por diante. Desta forma, o algoritmo consegue
      gerar detalhes cada vez menores, o que é mais próximo da realidade
    </p>
    <p>
      Ao final, o algoritmo combina todos esses valores, os normaliza, isto é, os coloca entre 0 e
      1, e os potencializa pelo inverso de um valor chamado <Em>exponenciação</Em>. Este valor é
      responsável por definir a velocidade em que o mapa aumenta de tamanho, ou seja, se o valor for
      1, aumenta de forma linear e se for 2, aumenta o equivalente a metade e assim por diante.
      Quanto maior o valor da exponenciação, mais plano o mapa fica.
    </p>
    <p>
      Por fim, o <i>Fractal Noise</i> também possui um parâmetro chamado de <Em>persistência</Em>
      <i>(persistence)</i>. Este parâmetro define a influência de cada oitava no resultado final.
      Quanto maior o valor de <i>persistence</i>, mais influência cada oitava terá no resultado
      final. Ao modificar este parametro, é possível alternar entre um resultado mais contínuo e
      sutil ou mais granulado.
    </p>
    <Figure
      alt="Nuvem gerada proceduralmente - AAA Studios"
      caption="Nuvem gerada proceduralmente - AAA studio"
      src="cloud-procedural.jpg"
      fullWidth
    />
    <p>
      Com estes parâmetros, é possível gerar mapas de ruído com uma grande variedade de detalhes e
      complexidade. Estes mapas podem ser utilizados para gerar terrenos, texturas, vegetação,
      animais, e assim por diante. O interessante é perceber bem como cada um dos parâmetros
      influencia o mapa final e formar diversas combinações de parametros que podem ser usadas para
      fins diferentes. Por exemplo, um mapa com uma frequência alta e uma lacunaridade baixa pode
      ser utilizado para gerar texturas de pedra, enquanto um mapa com uma frequência baixa e uma
      lacunaridade alta pode ser utilizado para gerar texturas de nuvens.
    </p>
    <p>
      A seguir, poderá modificar os parâmetros de um <i>Fractal Noise</i> no <i>playground</i> interativo
      abaixo e visualizar em tempo real o resultado em uma malha 3D.
    </p>
  </section>

  {#if !isMobile}
    <Game />
  {:else}
    <section>
      <Note>Infelizmente o playground ainda não é suportado em dispositivos móveis</Note>
    </section>
  {/if}

  <section>
    <Note>
      O código deste <i>playground</i> foi feito por mim e está disponível em
      <Link
        href="https://github.com/gui-marc/article-procedural-generation/blob/main/src/lib/procedural-generation-game/Game.svelte"
        external>GitHub</Link
      >
    </Note>
  </section>

  <section class="references">
    <h3>Referências</h3>
    <p>
      <Link external href="https://robertheaton.com/2018/12/17/wavefunction-collapse-algorithm/"
        >The Wavefunction Collapse Algorithm explained very clearly - Robert Heaton</Link
      >
    </p>
    <p>
      <Link external href="https://www.alanzucconi.com/2022/06/05/minecraft-world-generation/"
        >The World Generation of Minecraft - Alan Zucconi</Link
      >
    </p>
    <p>
      <Link external href="https://www.maizure.org/projects/decoded-rogue/index.html"
        >Decoded: Rogue - MaiZure's Projects</Link
      >
    </p>
    <p>
      <Link external href="https://eis.ucsc.edu/papers/Mason_Lume.pdf"
        >Lume: A System for Procedural Story Generation - Stacey Mason</Link
      >
    </p>
    <p>
      <Link external href="https://www.voxelquest.com/news/how-does-it-work"
        >How Does it Work - Voxel Quest</Link
      >
    </p>
    <p>
      <Link
        external
        href="https://www.amazon.com/Procedural-Storytelling-Design-Tanya-Short/dp/1138595314"
        >Procedural Storytelling in Game Design – Tanya X. Short (Editor), Tarn Adams (Editor) –
        2019</Link
      >
    </p>
    <p>
      <Link external href="https://www.youtube.com/@SebastianLague"
        >Coding Adventures - Sebastian Lague</Link
      >
    </p>
    <p>
      <Link
        external
        href="https://www.youtube.com/watch?v=hHGshzIXFWY&list=PLRL3Z3lpLmH3PNGZuDNf2WXnLTHpN9hXy"
        >3D World Generation - Youtube Series - Simon Dev</Link
      >
    </p>
    <p>
      <Link external href="https://threejs.org/">Documentação Three.js</Link>
    </p>
  </section>
</article>

<style>
  .references {
    margin-top: 8rem;
  }
</style>
