# Beauty Studio AI — V1

Aplicativo responsivo para criar posts de estética/beleza com editor Canvas e geração opcional de imagens com Cloudflare Workers AI.

## O que funciona
- Templates locais imediatos, 3 composições, paletas, categorias de beleza.
- Editar título, subtítulo, preço, botão, nome da marca, cores e formato.
- Enviar foto própria e logo (ficam no navegador); gerar background via Cloudflare (após configurar conta).
- Preview em canvas, exportar PNG 1080×1350, 1080×1920 ou 1080×1080.
- Salvar/restaurar projeto localmente, gerar sugestões de legendas e copiar.

## Rodar localmente
1. Instale Node.js 20+.
2. Rode `npm install` e `npm run dev`.
3. Para testar API IA localmente, use `vercel dev` com variáveis de ambiente configuradas. `vite` isolado não disponibiliza /api/generate.

## Publicar na Vercel
1. Suba os arquivos em um repositório GitHub.
2. Importe o repositório na Vercel, framework Vite; Build command: `npm run build`, output: `dist`.
3. Para IA, crie conta Cloudflare, acesse Workers AI > Use REST API, obtenha Account ID e API Token com permissão Workers AI.
4. Configure `CLOUDFLARE_ACCOUNT_ID` e `CLOUDFLARE_API_TOKEN` em Settings > Environment Variables na Vercel; faça novo deploy.
5. Sem essas variáveis, o editor e os templates funcionam; botão Gerar com IA informa a falta de configuração.

## Importante
- Vercel Hobby é restrito a uso pessoal/não comercial; para explorar comercialmente, escolha hospedagem/contrato adequado.
- Cloudflare oferece cota diária limitada, não geração ilimitada.
- Rate limit local de exemplo em `api/generate.js` não é proteção suficiente para produção pública. Antes de liberar acesso geral, adicione autenticação, rate limiting persistente, cotas por conta, verificação de abuso e logs.
- Projetos são salvos apenas neste navegador; backup/contas/sincronização precisam de backend.
- Imagens de resultados estéticos devem ser apresentadas como ilustrativas quando geradas por IA; não alegar resultados clínicos reais.
