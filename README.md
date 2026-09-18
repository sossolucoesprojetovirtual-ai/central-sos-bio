# Central SOS Soluções

Página de "link da bio" para o Instagram da SOS Soluções, com quatro produtos
(NextGaragem, Rappaiz, FlyVarejo e PlugDFE) e um painel de detalhes que abre
sem recarregar a página.

## Estrutura de arquivos

```
central-sos-solucoes/
├── index.html          → estrutura e conteúdo da página
├── css/
│   └── style.css       → todo o visual (cores, tipografia, layout, animações)
├── js/
│   └── script.js       → abre/fecha os painéis de produto
├── assets/
│   └── favicon.svg      → ícone da aba do navegador
└── README.md            → este arquivo
```

Não há dependências além de duas fontes do Google Fonts, carregadas por link
no `<head>`. Não é necessário Node.js, build ou instalação de pacotes.

## Como rodar localmente

Como a página usa `fetch` de arquivos locais (CSS/JS) por caminho relativo,
o ideal é servir os arquivos por um servidor local em vez de abrir o
`index.html` direto com duplo clique (alguns navegadores bloqueiam módulos
locais por segurança em `file://`).

**Opção 1 — Python (já vem instalado na maioria dos sistemas):**
```bash
cd central-sos-solucoes
python3 -m http.server 8000
```
Depois acesse `http://localhost:8000` no navegador.

**Opção 2 — VS Code:**
Instale a extensão "Live Server" e clique em "Go Live" com o `index.html`
aberto.

**Opção 3 — Node.js:**
```bash
npx serve central-sos-solucoes
```

## Antes de publicar: o que personalizar

1. **Número de WhatsApp** — troque `5543996631986` (código do país + DDD +
   número, sem espaços ou símbolos) em **todos** os links `wa.me` dentro de
   `index.html` (são 5 no total: o botão principal e um por produto).
2. **Logo** — a página usa um "wordmark" (ícone + texto "SOS Soluções")
   feito em SVG/CSS, já que nenhum arquivo de logo foi enviado. Para usar a
   logo oficial, troque o bloco `.brand` em `index.html` por uma tag
   `<img src="assets/logo.svg" alt="SOS Soluções">` apontando para o
   arquivo da marca.
3. **Links de site e redes sociais** — atualize as URLs em `sossolucoes.com.br`,
   Instagram, Facebook e LinkedIn na seção de rodapé e nos botões "Conhecer
   o site do produto" dentro de cada painel.
4. **Textos dos produtos** — descrições e listas de benefícios ficam direto
   no `index.html`, dentro de cada `<section class="product-panel">`.
5. **Imagem de compartilhamento (Open Graph)** — a tag `og:image` aponta
   para `assets/preview.jpg`, que ainda não existe. Adicione uma imagem
   (1200×630px, formato JPG ou PNG) nesse caminho para que links
   compartilhados no WhatsApp/Instagram mostrem uma prévia visual.
6. **Favicon para iOS** — `favicon.svg` funciona nos navegadores atuais,
   mas o iOS ainda prefere PNG para o ícone de tela de início. Se quiser um
   ícone ao "adicionar à tela de início" no iPhone, gere um
   `apple-touch-icon.png` (180×180px) e adicione:
   `<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">`.

## Google Analytics e Meta Pixel (integração futura)

No `<head>` de `index.html` já existem dois blocos de código comentados,
prontos para receber os IDs de rastreamento:

```html
<!-- Google Analytics (GA4) -->
<!-- ... -->

<!-- Meta Pixel -->
<!-- ... -->
```

Basta descomentar cada bloco e substituir `SEU_ID_GA4` / `SEU_ID_PIXEL`
pelos IDs reais. Em `js/script.js` também há um trecho comentado que
registra automaticamente o clique em cada card de produto como evento
(`select_content` no GA4 e um evento customizado no Meta Pixel) — também
é só descomentar depois de ativar os scripts acima.

## Como publicar

Por ser um site 100% estático (HTML, CSS e JS puros, sem backend), qualquer
serviço de hospedagem de sites estáticos funciona. Os mais simples e
gratuitos:

### Netlify (mais simples, arrastar e soltar)
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arraste a pasta `central-sos-solucoes` inteira para a página.
3. Pronto — o Netlify gera uma URL pública em segundos. É possível trocar
   por um domínio próprio depois, em "Domain settings".

### Vercel
1. Crie uma conta em [vercel.com](https://vercel.com).
2. Use o comando `npx vercel` dentro da pasta do projeto e siga as
   instruções, ou conecte um repositório do GitHub pelo painel.

### GitHub Pages (gratuito, bom se o projeto já está no GitHub)
1. Suba a pasta `central-sos-solucoes` para um repositório no GitHub.
2. Em **Settings → Pages**, selecione a branch principal e a pasta raiz.
3. O GitHub gera uma URL no formato
   `https://seu-usuario.github.io/nome-do-repositorio/`.

### Hospedagem própria (cPanel, Hostinger, etc.)
Basta enviar os arquivos da pasta `central-sos-solucoes` para a pasta
pública do site (geralmente `public_html` ou `www`) por FTP ou pelo
gerenciador de arquivos do painel de hospedagem, mantendo a mesma
estrutura de pastas (`css/`, `js/`, `assets/`).

Depois de publicar, use a URL final (ex.: `https://sossolucoes.com.br` ou
o link gerado pelo Netlify) como o link da bio no Instagram.

## Notas técnicas

- **Performance**: nenhuma biblioteca externa (sem jQuery, sem frameworks);
  apenas HTML, CSS e um pequeno JavaScript nativo. Os únicos recursos
  externos são as fontes do Google Fonts.
- **Acessibilidade**: os painéis usam `aria-hidden`, o foco é movido para o
  título do produto ao abrir um painel, e as animações respeitam a
  preferência do sistema por "reduzir movimento" (`prefers-reduced-motion`).
- **Navegação**: cada produto tem uma URL própria via hash
  (ex.: `#nextgaragem`), o que permite compartilhar um link direto para um
  produto específico e faz o botão "voltar" do navegador fechar o painel
  corretamente.
