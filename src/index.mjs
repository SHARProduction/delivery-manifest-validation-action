import { readFile } from 'node:fs/promises';
const fail = message => { throw new Error(message); };
export function validate(manifest) {
  if (!manifest || typeof manifest !== 'object') fail('manifest must be an object');
  for (const key of ['project_id','delivery_id','files','rights']) if (!manifest[key]) fail(`missing ${key}`);
  if (!Array.isArray(manifest.files) || !manifest.files.length) fail('files must be a non-empty array');
  for (const file of manifest.files) { if (!file.path || !/^[a-f0-9]{64}$/i.test(file.sha256 || '')) fail('each file requires path and SHA-256'); }
  if (manifest.rights.status !== 'cleared') fail(`release blocked: rights.status is ${manifest.rights.status || 'missing'}`);
  if (!/^https:\/\//.test(manifest.rights.evidence_url || '')) fail('rights.evidence_url must be HTTPS');
  return { valid: true, project_id: manifest.project_id, delivery_id: manifest.delivery_id, files: manifest.files.length };
}
export async function run(path) { return validate(JSON.parse(await readFile(path, 'utf8'))); }
if (process.env.GITHUB_ACTIONS === 'true') { const path = process.env.INPUT_MANIFEST; if (!path) fail('input manifest is required'); console.log(JSON.stringify(await run(path))); }
