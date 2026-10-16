# Beauty Studio AI Pro V2.5 — Premium Design Library

**12 novos layouts originais** (não reproduções do Canva) com camadas editáveis e galerias de miniaturas, incluindo Editorial Chic, Soft Luxury, Fashion Impact, Beauty Collage, Lifestyle Premium, Commercial Beauty, Agenda Premium, Antes e Depois, Promoção Impacto, Conteúdo Educativo, Serviços Premium e Depoimentos.

Cada miniatura é uma representação gráfica simples da categoria, não uma foto gerada por IA. Os posts finais ficam completos com textos, cores, molduras, ofertas e CTAs. Para imagens fotográficas, use **Gerar foto com IA** ou upload próprio. As fotos são raster e não se tornam camadas internas editáveis.

## Instalação
Substitua `index.html`, `package.json` e `api/generate.mjs` no repositório conectado à Vercel. Preserve a pasta `api`. O projeto funciona como site estático com função serverless em `/api/generate` na Vercel, sem comando de build. Não inclua segredos no GitHub.

## Observações
A biblioteca e os projetos são locais ao navegador; exporte seus backups JSON. A geração por Cloudflare ainda depende das cotas do modelo e precisa de autenticação e limite persistente antes de disponibilizar a terceiros. Os 12 layouts usam a mesma fotografia de campanha escolhida ou gerada. Miniaturas dos templates são abstrações visuais, não a renderização integral do post. Teste a implantação antes de considerar o app pronto.
