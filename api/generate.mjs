const categories = {
  lashes:'professional lash extension beauty campaign, detailed natural eyelashes, elegant beauty editorial photography',
  facial:'premium facial skincare clinic campaign, natural healthy skin texture, skincare editorial photography',
  nails:'premium nail artist campaign, beautifully manicured hands, refined beauty product photography',
  hair:'premium hair salon campaign, healthy glossy hair, modern beauty editorial photograph',
  brows:'professional eyebrow design campaign, fine eyebrow detailing, sophisticated beauty portrait',
  spa:'premium spa and wellness campaign, serene refined treatment atmosphere, editorial interior photography'
};
const arts = {
  editorial:'high-fashion luxury beauty editorial, deliberate asymmetry, sophisticated directional studio lighting, tactile depth, editorial magazine photography',
  minimal:'quiet luxury minimalism, understated architectural compositions, soft window lighting, refined negative space, premium clean beauty advertising',
  impact:'bold premium advertising photography, cinematic contrast, powerful focal point, dynamic yet elegant composition, sophisticated visual storytelling'
};
const recent = new Map();
export async function POST(request) {
  const origin = request.headers.get('origin');
  const self = new URL(request.url);
  if (origin && new URL(origin).host !== self.host) return Response.json({error:'Origem não autorizada.'},{status:403});
  if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN) return Response.json({error:'Configure as duas variáveis Cloudflare na Vercel e publique novamente.'},{status:503});
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  // Mitigação básica apenas; instâncias serverless não compartilham memória.
  const last = recent.get(ip) || 0;
  if (now-last < 15000) return Response.json({error:'Aguarde 15 segundos antes de gerar outra imagem.'},{status:429});
  if (recent.size > 300) recent.clear();
  let body;
  try { body = await request.json(); } catch { return Response.json({error:'Pedido inválido.'},{status:400}); }
  const category = categories[body?.category] ? body.category : 'facial';
  const art = arts[body?.art] ? body.art : 'editorial';
  const subject = typeof body?.subject === 'string' ? body.subject.trim().slice(0,220) : '';
  if (subject.length < 4) return Response.json({error:'Descreva a imagem desejada (mínimo de 4 caracteres).'},{status:400});
  const prompt = `${categories[category]}. Creative brief: ${subject.replace(/[<>]/g, '')}. Art direction: ${arts[art]}. Authentic believable details, premium beauty art direction, tasteful restrained styling, natural skin, sophisticated color grading. Vertical-friendly intentional composition with generous clean negative space for graphic typography overlay. Photographic visual only: absolutely no text, lettering, typography, logos, watermarks, collage, flyer layout, frames, excessive glitter or generic beauty clip art. Commercial art photography, premium lighting, human realism.`.slice(0,2048);
  recent.set(ip, now);
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(), 55000);
  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(process.env.CLOUDFLARE_ACCOUNT_ID)}/ai/run/@cf/black-forest-labs/flux-1-schnell`;
    const response = await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({prompt,steps:6}),signal:controller.signal});
    const json = await response.json();
    if (!response.ok || json.success === false || !json.result?.image) {
      const msg = response.status === 429 ? 'Limite da API atingido. Tente mais tarde.' : response.status === 401 || response.status === 403 ? 'Token sem permissão ou inválido na Cloudflare.' : 'A Cloudflare não conseguiu gerar a imagem. Confira limites e configurações.';
      return Response.json({error:msg},{status:response.status===429?429:502});
    }
    return Response.json({image:`data:image/jpeg;base64,${json.result.image}`},{headers:{'Cache-Control':'no-store'}});
  } catch(e) {return Response.json({error:e.name==='AbortError'?'A geração excedeu o tempo limite. Tente novamente.':'Erro de conexão com a IA. Tente novamente.'},{status:504});}
  finally{clearTimeout(timeout);}
}
export function GET(){return Response.json({status:'ok',message:'Endpoint pronto. Use POST para gerar imagens.'});}
