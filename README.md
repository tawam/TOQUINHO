# Toquinho 80 anos + Toquinho 360

Site de apresentação da proposta de celebração para 2027, baseado exclusivamente no documento `TOQUINHOE29420ANOS.pdf.pdf`. As fotografias e a marca vieram do acervo fornecido. A seção de trajetória acrescenta contexto histórico pesquisado em fontes primárias.

## Abrir

Abra `index.html` no navegador. Não é necessário instalar dependências. Imagens, fontes e PDF estão incluídos no pacote.

Para uma prévia por servidor local, com Node.js 18 ou superior:

```sh
npm start
```

Acesse `http://127.0.0.1:4173`. Para encerrar, pressione `Ctrl+C` no terminal.

## Publicar no GitHub Pages

1. Extraia o ZIP e envie **o conteúdo** da pasta para a raiz do repositório. `index.html` deve ficar na raiz, junto de `styles.css`, `script.js` e `assets/`.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch que recebeu os arquivos, a pasta **/(root)** e salve.

O site usa caminhos relativos, compatíveis com `usuario.github.io/repositorio/`. Não há etapa de build, backend, banco de dados, chaves ou serviços externos necessários ao funcionamento. O arquivo `.nojekyll` pode ser mantido na raiz.

Como se trata de uma apresentação de proposta, o HTML contém `noindex, nofollow`. Essa configuração desestimula indexação em buscadores; não restringe acesso por link. Se a apresentação passar a ser um site público indexável, remova a meta tag `robots` de `index.html`.

## Editar

- `index.html`: textos, imagens, linha do tempo e blocos da proposta.
- `styles.css`: cores, tipografia, animações e versões responsivas.
- `script.js`: menu móvel, navegação por teclado, linha do tempo e imagens do espetáculo.
- `assets/`: imagens WebP, marca, fontes locais e PDF original.
- `FONTES-E-CREDITOS.md`: referências editoriais, origem das imagens e licenças.
- `VALIDACAO.md`: verificações realizadas e limites da entrega.

O PDF original está em `assets/documents/toquinho-80-anos-proposta.pdf`, acessível pelo botão de download no encerramento. Os riders técnicos não integram este site nem este pacote.

## Conteúdo editorial

A data de nascimento e os 80 anos em 2026 aparecem na trajetória; a celebração de 2027 mantém o planejamento do documento. Cidades, formatos, artistas em aproximação e canais de comunicação permanecem no contexto de proposta. A validação estratégica e comercial pela Level Up foi preservada.

## Verificar sintaxe

```sh
npm run check
```

As fontes têm licenças OFL incluídas. As fotografias, a marca, o conteúdo artístico e a proposta mantêm os direitos dos respectivos titulares; este pacote não lhes atribui uma licença de código aberto.
