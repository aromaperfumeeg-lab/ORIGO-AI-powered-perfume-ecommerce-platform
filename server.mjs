import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.ORIGO_PORT||process.env.PORT||4173);
const dataDir=path.join(root,'data');
const uploadsDir=path.join(root,'assets','uploads');
const mediaFile=path.join(dataDir,'media.json');
const adminEmail=process.env.ORIGO_ADMIN_EMAIL||'admin@origo.test';
const adminPassword=process.env.ORIGO_ADMIN_PASSWORD||'TestPassword123!';
const sessions=new Map();
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json; charset=utf-8'};
fs.mkdirSync(dataDir,{recursive:true});
fs.mkdirSync(uploadsDir,{recursive:true});
if(!fs.existsSync(mediaFile))fs.writeFileSync(mediaFile,'{}','utf8');

const json=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value))};
const readMedia=()=>{try{return JSON.parse(fs.readFileSync(mediaFile,'utf8'))}catch{return{}}};
const readJson=req=>new Promise((resolve,reject)=>{let body='',size=0;req.on('data',chunk=>{size+=chunk.length;if(size>8*1024*1024){reject(new Error('too_large'));req.destroy();return}body+=chunk});req.on('end',()=>{try{resolve(JSON.parse(body||'{}'))}catch{reject(new Error('invalid_json'))}});req.on('error',reject)});
const tokenFrom=req=>(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
const isAdmin=req=>{const token=tokenFrom(req),expires=sessions.get(token);if(!expires||expires<Date.now()){if(token)sessions.delete(token);return false}return true};
const cleanSlot=value=>String(value||'').toLowerCase().replace(/[^a-z0-9-]/g,'').slice(0,70);
const cleanText=value=>String(value||'').replace(/[<>]/g,'').trim().slice(0,180);

async function api(req,res,url){
  if(req.method==='POST'&&url==='/api/admin/login'){
    const body=await readJson(req);
    const emailOk=String(body.email||'').trim().toLowerCase()===adminEmail.toLowerCase();
    const supplied=Buffer.from(String(body.password||''));
    const expected=Buffer.from(adminPassword);
    const passwordOk=supplied.length===expected.length&&crypto.timingSafeEqual(supplied,expected);
    if(!emailOk||!passwordOk)return json(res,401,{ok:false,error:'invalid_credentials'});
    const token=crypto.randomBytes(32).toString('hex');
    sessions.set(token,Date.now()+8*60*60*1000);
    return json(res,200,{ok:true,token,expiresIn:28800});
  }
  if(req.method==='GET'&&url==='/api/admin/session')return json(res,isAdmin(req)?200:401,{ok:isAdmin(req)});
  if(req.method==='POST'&&url==='/api/admin/logout'){sessions.delete(tokenFrom(req));return json(res,200,{ok:true})}
  if(req.method==='GET'&&url==='/api/media')return json(res,200,{ok:true,media:readMedia()});
  if(req.method==='POST'&&url==='/api/admin/media'){
    if(!isAdmin(req))return json(res,401,{ok:false,error:'admin_required'});
    const body=await readJson(req),slot=cleanSlot(body.slot),match=/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(body.dataUrl||''));
    if(!slot||!match)return json(res,400,{ok:false,error:'invalid_image'});
    const bytes=Buffer.from(match[2],'base64');
    if(bytes.length<32||bytes.length>5*1024*1024)return json(res,400,{ok:false,error:'invalid_size'});
    const ext={'image/png':'png','image/jpeg':'jpg','image/webp':'webp'}[match[1]];
    const filename=`${slot}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
    fs.writeFileSync(path.join(uploadsDir,filename),bytes);
    const media=readMedia();
    media[slot]={url:`/assets/uploads/${filename}`,altAr:cleanText(body.altAr),altEn:cleanText(body.altEn),kind:body.kind==='icon'?'icon':'image',updatedAt:new Date().toISOString()};
    fs.writeFileSync(mediaFile,JSON.stringify(media,null,2),'utf8');
    return json(res,200,{ok:true,item:media[slot]});
  }
  if(req.method==='DELETE'&&url.startsWith('/api/admin/media/')){
    if(!isAdmin(req))return json(res,401,{ok:false,error:'admin_required'});
    const slot=cleanSlot(url.slice('/api/admin/media/'.length)),media=readMedia();
    delete media[slot];
    fs.writeFileSync(mediaFile,JSON.stringify(media,null,2),'utf8');
    return json(res,200,{ok:true});
  }
  return false;
}

http.createServer(async(req,res)=>{
  const url=decodeURIComponent(req.url.split('?')[0]);
  try{if(url.startsWith('/api/')){const handled=await api(req,res,url);if(handled!==false)return;return json(res,404,{ok:false,error:'not_found'})}}catch(error){return json(res,error.message==='too_large'?413:400,{ok:false,error:error.message||'request_failed'})}
  let staticUrl=url==='/'?'/index.html':url;
  const file=path.resolve(root,'.'+staticUrl);
  if(!file.startsWith(root)){res.writeHead(403);return res.end('Forbidden')}
  fs.readFile(file,(err,data)=>{
    if(err)return fs.readFile(path.join(root,'404.html'),(fallbackErr,fallback)=>{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'});res.end(fallbackErr?'Not found':fallback)});
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(data);
  });
}).listen(port,'127.0.0.1',()=>console.log(`ORIGO http://127.0.0.1:${port}`));
