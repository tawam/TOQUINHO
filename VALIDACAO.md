# Validação da entrega

Data: 26 de outubro de 2026.

## Executado

- Sintaxe de `script.js` e `serve.mjs` validada com `node --check`.
- Navegação em Chrome, com Playwright, nas larguras 1440, 1024, 768, 390 e 320 pixels.
- Ausência de rolagem horizontal nas cinco larguras, inclusive com os projetos expandidos.
- Linha do tempo por clique e pelas teclas de seta.
- Menu móvel, fechamento por Escape e fechamento ao escolher uma seção.
- Seleção dos três momentos do espetáculo e carregamento de suas imagens.
- Abertura das quatro frentes do Toquinho 360.
- Download do PDF retornando HTTP 200 e assinatura válida de arquivo PDF.
- Cópia do PDF idêntica ao original, conferida por SHA-256.
- Fontes locais carregadas e imagens decodificadas, incluindo as imagens dentro de blocos inicialmente recolhidos.
- Todos os nove títulos de seção visíveis após suas animações.
- Destinos das âncoras internas existentes.
- Abertura direta de `index.html` por `file://`, com fontes, linha do tempo e troca de imagens funcionando sem servidor.
- Auditoria axe-core 4.14.0, regras WCAG 2 A/AA e WCAG 2.1 AA, em desktop e celular, sem violações detectadas nos cenários avaliados.
- Capturas revisadas visualmente; enquadramento da abertura móvel ajustado para preservar o rosto de Toquinho.
- Conferência visual das cinco páginas do PDF e preservação do processo operacional da página 4, ausente na extração automática de texto.

SHA-256 do PDF original e da cópia:

`9E4751741F857304B7C75CAFA43FFAF50F7B5C00F9906F64DF4CD26F34DF45D3`

## Limites

Validação realizada em Chrome no Windows, com emulação de tamanhos de tela. Não houve teste em aparelhos físicos, Safari ou Firefox. A auditoria automatizada não substitui uma avaliação completa com tecnologias assistivas.

A publicação no GitHub Pages será feita no repositório do solicitante; nenhuma publicação externa foi realizada nesta entrega. Não há formulário, envio de mensagens ou captação de dados.
