# Web5 Troubleshooting Guide

## Common Errors and Solutions

### Error: "Failed to put Pkarr record" / "Failed to fetch"

**Full Error:**
```
DidError: internalError: Failed to put Pkarr record for identifier [id]: Failed to fetch
```

**What it means:**
The Web5 SDK is trying to register your DID on the DHT (Distributed Hash Table) network but cannot reach the DHT gateway.

**Why it happens:**
1. **Network connectivity issues** - No internet or unstable connection
2. **Firewall/Proxy blocking** - Corporate firewall blocking DHT connections
3. **CORS issues** - Browser security blocking cross-origin requests
4. **DHT gateway down** - Temporary service outage
5. **VPN interference** - VPN blocking certain protocols

**Solutions:**

#### 1. Check Internet Connection
```bash
# Test basic connectivity
ping google.com

# Test DHT gateway (if accessible)
curl https://diddht.tbddev.org/health
```

#### 2. Try Different Network
- Switch from WiFi to mobile hotspot
- Try a different WiFi network
- Disable VPN temporarily

#### 3. Check Browser Console
Open DevTools (F12) and look for:
- CORS errors
- Network errors
- Failed fetch requests

#### 4. Clear Browser Data
```javascript
// Clear IndexedDB
// DevTools → Application → IndexedDB → Delete all

// Clear localStorage
localStorage.clear();

// Reload page
location.reload();
```

#### 5. Try Incognito/Private Mode
- Opens fresh browser session
- No extensions interfering
- Clean storage state

#### 6. Check Firewall Settings
If on corporate network:
- Ask IT to whitelist `*.tbddev.org`
- Check if WebRTC is blocked
- Verify DHT ports are open

#### 7. Use Alternative DID Method
If DHT continues to fail, we can implement fallback to `did:key` method:

```typescript
// In Web5Service.ts - Add fallback option
const { web5, did } = await Web5.connect({
  didMethod: 'key', // Fallback to did:key (no DHT needed)
  techPreview: {
    dwnEndpoints: WEB5_CONFIG.techPreview.dwnEndpoints
  }
});
```

---

### Error: "Web5 not initialized"

**What it means:**
Trying to use Web5 before calling `connect()` or `createDID()`

**Solution:**
```typescript
// Always check connection first
if (!web5Service.isConnected()) {
  await web5Service.connect();
}

// Then use Web5 features
await web5Service.writeToDWN(data, schema);
```

---

### Error: "Record not found"

**What it means:**
Trying to read a DWN record that doesn't exist

**Solutions:**
1. Verify record ID is correct
2. Check if record was actually created
3. Ensure you're querying the right DID's DWN

```typescript
// List all records first
const { records } = await web5Service.queryDWN({
  schema: 'https://meridian.io/schemas/dataset'
});

console.log('Available records:', records);
```

---

### Error: "Permission denied"

**What it means:**
Trying to access a record without proper permissions

**Solutions:**
1. Verify you own the DID
2. Check if permission was granted
3. Ensure permission hasn't expired

```typescript
// Check permissions
const permissions = await web5Service.listPermissions();
console.log('Active permissions:', permissions);
```

---

## Network Diagnostics

### Test Web5 Connectivity

```typescript
// Test DWN endpoint
async function testDWNEndpoint(endpoint: string) {
  try {
    const response = await fetch(endpoint);
    console.log(`✅ ${endpoint} is reachable`);
    return true;
  } catch (error) {
    console.error(`❌ ${endpoint} is not reachable:`, error);
    return false;
  }
}

// Test all endpoints
const endpoints = [
  'https://dwn.tbddev.org/beta',
  'https://diddht.tbddev.org'
];

for (const endpoint of endpoints) {
  await testDWNEndpoint(endpoint);
}
```

### Check Browser Compatibility

```typescript
// Check required features
const checks = {
  indexedDB: 'indexedDB' in window,
  crypto: 'crypto' in window && 'subtle' in crypto,
  fetch: 'fetch' in window,
  webWorker: 'Worker' in window
};

console.log('Browser compatibility:', checks);

// All should be true
if (Object.values(checks).every(v => v)) {
  console.log('✅ Browser is compatible');
} else {
  console.error('❌ Browser missing required features');
}
```

---

## Development Tips

### Enable Verbose Logging

```typescript
// In Web5Service.ts
const DEBUG = true;

if (DEBUG) {
  console.log('Web5 Debug Info:', {
    did: this.did,
    connected: this.isConnected(),
    web5Instance: this.web5
  });
}
```

### Monitor IndexedDB

```javascript
// Check what's stored
// DevTools → Application → IndexedDB → agent-store

// Look for:
// - DID documents
// - Private keys
// - DWN records cache
```

### Test in Isolation

```typescript
// Create minimal test
async function testWeb5() {
  try {
    const { web5, did } = await Web5.connect();
    console.log('✅ Web5 works!', did);
    
    // Test write
    const { record } = await web5.dwn.records.create({
      data: { test: 'data' },
      message: { dataFormat: 'application/json' }
    });
    console.log('✅ Write works!', record.id);
    
    // Test read
    const { records } = await web5.dwn.records.query({
      message: { filter: {} }
    });
    console.log('✅ Read works!', records.length, 'records');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testWeb5();
```

---

## Production Considerations

### 1. Implement Retry Logic ✅
Already implemented in `Web5Service.createDID()` with exponential backoff.

### 2. Add Fallback DID Method
```typescript
// Try DHT first, fallback to key method
try {
  return await createDIDWithDHT();
} catch (error) {
  console.warn('DHT failed, using key method');
  return await createDIDWithKey();
}
```

### 3. Monitor DHT Health
```typescript
// Periodic health check
setInterval(async () => {
  const healthy = await checkDHTHealth();
  if (!healthy) {
    console.warn('DHT gateway unhealthy');
    // Switch to fallback or notify user
  }
}, 60000); // Every minute
```

### 4. User-Friendly Error Messages ✅
Already implemented with specific error codes and messages.

### 5. Offline Support
```typescript
// Detect offline
window.addEventListener('offline', () => {
  toast.warning('You are offline. Some features may not work.');
});

window.addEventListener('online', () => {
  toast.success('Back online!');
  // Retry failed operations
});
```

---

## FAQ

### Q: Why does DID creation take so long?
**A:** The SDK needs to:
1. Generate cryptographic keys
2. Create DID document
3. Register on DHT network (can be slow)
4. Store in IndexedDB

Typical time: 2-5 seconds

### Q: Can I use MERIDIAN offline?
**A:** Partially:
- ✅ Can access locally cached data
- ✅ Can view your DID
- ❌ Cannot create new DID
- ❌ Cannot sync with DWN
- ❌ Cannot grant/revoke permissions

### Q: Is my data safe?
**A:** Yes:
- Private keys stored encrypted in IndexedDB
- DWN data encrypted at rest
- Only you control access
- No central authority

### Q: What if I lose my DID?
**A:** Currently:
- DID is stored in browser IndexedDB
- Clearing browser data = losing DID
- **Recommendation**: Export and backup DID

Future: Implement DID recovery mechanism

### Q: Can I use the same DID on multiple devices?
**A:** Not directly:
- Each browser has its own agent
- DID is tied to the agent
- **Workaround**: Store DID in Firebase, query DWN from any device

---

## Getting Help

### 1. Check Console Logs
Always check browser console first - we log detailed error information.

### 2. Check Network Tab
DevTools → Network → Look for failed requests to:
- `dwn.tbddev.org`
- `diddht.tbddev.org`

### 3. Test Connectivity
```bash
# Test DWN endpoint
curl https://dwn.tbddev.org/beta

# Test DHT gateway
curl https://diddht.tbddev.org
```

### 4. Report Issue
Include:
- Browser and version
- Operating system
- Error message from console
- Network tab screenshot
- Steps to reproduce

---

## Resources

- [Web5 SDK Issues](https://github.com/TBD54566975/web5-js/issues)
- [DID DHT Spec](https://did-dht.com/)
- [DWN Spec](https://identity.foundation/decentralized-web-node/spec/)
- [Web5 Discord](https://discord.gg/tbd)

---

## Quick Fixes Checklist

When Web5 fails, try these in order:

- [ ] Check internet connection
- [ ] Reload page (Ctrl+R / Cmd+R)
- [ ] Clear browser cache
- [ ] Try incognito mode
- [ ] Try different browser
- [ ] Try different network
- [ ] Check browser console for errors
- [ ] Disable VPN
- [ ] Disable browser extensions
- [ ] Check firewall settings
- [ ] Wait and retry (service might be down)

If none work, it's likely a service outage. Check TBD's status page or Discord.
