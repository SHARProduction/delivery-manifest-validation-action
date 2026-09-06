import test from 'node:test'; import assert from 'node:assert/strict'; import { validate } from '../src/index.mjs';
const good={project_id:'demo',delivery_id:'v1',files:[{path:'final.mp4',sha256:'a'.repeat(64)}],rights:{status:'cleared',evidence_url:'https://example.com/rights'}};
test('accepts cleared manifest',()=>assert.equal(validate(good).valid,true));
test('blocks unknown rights',()=>assert.throws(()=>validate({...good,rights:{...good.rights,status:'unknown'}}),/release blocked/));
