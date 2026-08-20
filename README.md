# Use Klara — E-commerce (site estático)

Site de moda multipágina em HTML + CSS + JS puro, fiel à identidade **Use Klara**
do Figma (fonte Jost, paleta Taupe/Chocolate/Areia, textos em PT-BR, preços em R$).

## Rodar

```bash
npx --yes serve -l 5173 .
```

Depois abra `http://localhost:5173`.

## Páginas

| Arquivo | Página |
|---|---|
| `index.html` | Home — hero, Novidades, benefícios, categorias, newsletter |
| `vestidos.html` / `macacao.html` / `blusas.html` | Listagem de categoria (filtros + grade 4×3 + paginação) |
| `produto.html` | Detalhe do produto (Calça Kensho) com galeria, opções e abas |
| `carrinho.html` | Carrinho com tabela, cupom e resumo do pedido |
| `login.html` | Box de login (Entre) |
| `conta.html` | Minha conta com 6 abas navegáveis |

## Estrutura

```
index.html + demais páginas
css/style.css     design system (tokens em :root) + estilos de todas as páginas
js/main.js        header/footer injetados, catálogo, carrinho, abas, filtros
```

## Como funciona

- **Header e footer** são injetados por `js/main.js` em `<div id="site-header">` /
  `<div id="site-footer">` — um só lugar para manter, consistente em todas as páginas.
  A aba ativa vem de `data-active` no placeholder do header.
- **Grades de produto** são renderizadas a partir do catálogo em `main.js`
  (`CATALOG`). Cada grade usa `<div data-collection="vestidos">` (ou `novidades`,
  `macacao`, `blusas`), com `data-limit` opcional.
- **Carrinho** persiste em `localStorage` (`useklara-cart`), com drawer lateral,
  contador no header e toast. Add-to-cart funciona em qualquer `.card` e na página
  de produto (respeitando a quantidade do stepper).
- **Busca** filtra os cards por nome em tempo real.
- **Abas** (produto e conta) e **filtros** (categoria) alternam via JS.
- **Reveal on scroll** com `IntersectionObserver`, respeitando `prefers-reduced-motion`.

## Design tokens (trocar cores)

Tudo em `css/style.css` → `:root`:

```css
--taupe:#5D412E;      /* fundo principal / títulos */
--chocolate:#412F23;  /* botões / contraste */
--nude:#9C8674;       /* textos secundários */
--areia:#CDBAA6;      /* slots de imagem / bordas */
--marfim:#F7F2EB;     /* fundo geral */
--dourado:#E0C79B;    /* detalhe nobre */
```

## Trocar produtos / preços

Edite o objeto `CATALOG` em `js/main.js` (nome, `price`, `old` opcional para
promoção). Preços em número; a formatação em R$ é automática.

## Imagens

As fotos são do Unsplash (hotlink) e servem como **placeholder** — substitua pelas
fotos reais do catálogo. Imagens que não carregarem caem num placeholder SVG
(marcadas com `data-ph`), então o layout nunca quebra.

## Logotipo

O header usa o logotipo em texto `USE KLARA`. Para usar o logotipo vetorial oficial
do Figma, exporte-o como SVG e troque no `injectHeader()` de `js/main.js`.
