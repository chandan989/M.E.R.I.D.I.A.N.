# Mock Mode Guide

## Overview

When the Web5 DHT network is unavailable, MERIDIAN automatically falls back to **Mock Mode** - a development-friendly alternative that allows you to continue building and testing without network dependencies.

## What is Mock Mode?

Mock Mode is a fallback system that:
- ✅ Creates simulated DIDs (looks like real DIDs)
- ✅ Stores data in browser localStorage (instead of DWN)
- ✅ Works completely offline
- ✅ Maintains the same API as real Web5
- ⚠️  Data is local only (not synced to DWN)
- ⚠️  DIDs are not registered on DHT network

## When Does It Activate?

Mock Mode automatically activates when:
1. DHT network is unreachable
2. Pkarr registration fails
3. Network connectivity issues occur

You'll see a warning toast:
```
⚠️  Development Mode: Using local storage (DHT network unavailable)
```

## How It Works

### DID Creation
```typescript
// Real mode: did:dht:abc123...
// Mock mode: did:key:z6Mkabc123...

const did = await web5Service.createDID();
// Automatically uses mock if DHT fails
```

### Data Storage
```typescript
// Real mode: Stored in DWN (decentralized)
// Mock mode: Stored in localStorage

await web5Service.writeToDWN(data, schema);
// Works the same in both modes
```

### Data Retrieval
```typescript
// Real mode: Queries DWN
// Mock mode: Queries localStorage

const records = await web5Service.queryDWN({ schema });
// Same API, different storage
```

## Checking Mock Mode

```typescript
// Check if in mock mode
if (web5Service.isMockMode()) {
  console.log('Using mock mode');
} else {
  console.log('Using real Web5');
}
```

## Mock Mode Features

### ✅ What Works

- DID creation
- Data storage (localStorage)
- Data retrieval
- Data queries
- Data deletion
- Permission tracking (simulated)
- All UI features

### ❌ What Doesn't Work

- DHT resolution (DID not on network)
- DWN synchronization across devices
- Real decentralized storage
- Cross-device data access
- Actual permission enforcement

## Data Storage

### Location
```
Browser localStorage:
- meridian_web5_did: Your mock DID
- meridian_mock_mode: Flag indicating mock mode
- meridian_mock_dwn_records: All your data
```

### Structure
```json
{
  "did": "did:key:z6Mk...",
  "records": [
    {
      "id": "mock_1234567890_abc",
      "data": { "name": "Dataset 1" },
      "schema": "https://meridian.io/schemas/dataset",
      "dataFormat": "application/json",
      "dateCreated": "2024-03-10T10:30:00Z"
    }
  ]
}
```

## Exporting Mock Data

```typescript
// Export all mock data
const mockData = mockWeb5Service.exportMockData();

console.log('DID:', mockData.did);
console.log('Records:', mockData.records);

// Save to file for backup
const json = JSON.stringify(mockData, null, 2);
const blob = new Blob([json], { type: 'application/json' });
const url = URL.createObjectURL(blob);
// Download...
```

## Migrating to Real Web5

When DHT network becomes available:

### Option 1: Clear and Recreate
```typescript
// Clear mock data
mockWeb5Service.clearMockData();

// Create real Web5 identity
const realDID = await web5Service.createDID();

// Re-upload your data
```

### Option 2: Export and Import
```typescript
// 1. Export mock data
const mockData = mockWeb5Service.exportMockData();

// 2. Clear mock mode
mockWeb5Service.clearMockData();

// 3. Create real DID
const realDID = await web5Service.createDID();

// 4. Import data to real DWN
for (const record of mockData.records) {
  await web5Service.writeToDWN(record.data, record.schema);
}
```

## Development Tips

### 1. Test Both Modes

```typescript
// Force mock mode for testing
localStorage.setItem('meridian_force_mock', 'true');

// Force real mode for testing
localStorage.removeItem('meridian_force_mock');
```

### 2. Inspect Mock Data

```javascript
// In browser console
const records = localStorage.getItem('meridian_mock_dwn_records');
console.log(JSON.parse(records));
```

### 3. Clear Mock Data

```javascript
// In browser console
mockWeb5Service.clearMockData();
// or
localStorage.clear();
```

### 4. Monitor Mode Changes

```typescript
// Add listener
web5Service.on('modeChanged', (mode) => {
  console.log('Mode changed to:', mode);
  if (mode === 'mock') {
    toast.warning('Switched to mock mode');
  }
});
```

## Production Considerations

### Should Mock Mode Be in Production?

**For MVP/Beta:** ✅ Yes
- Allows users to try the platform even if DHT is down
- Better user experience than complete failure
- Data is still secure (local to user's browser)

**For Production:** ⚠️  Conditional
- Consider disabling if DHT is stable
- Or keep as emergency fallback
- Add clear warnings to users
- Implement data export/migration tools

### Disabling Mock Mode

```typescript
// In Web5Service.ts
const ALLOW_MOCK_MODE = import.meta.env.VITE_ALLOW_MOCK_MODE === 'true';

if (isDHTError && ALLOW_MOCK_MODE) {
  // Use mock mode
} else {
  // Throw error
  throw new Web5Error('DHT network unavailable');
}
```

### User Communication

Always inform users when in mock mode:
- Show banner/badge in UI
- Display in settings/profile
- Warn before important actions
- Provide export functionality

## Troubleshooting

### Mock Mode Not Activating

**Check:**
1. Is DHT actually failing?
2. Are errors being caught correctly?
3. Check browser console for errors

### Data Not Persisting

**Check:**
1. Is localStorage enabled?
2. Is browser in private/incognito mode?
3. Is storage quota exceeded?

### Can't Switch Back to Real Mode

**Solution:**
```typescript
// Clear mock mode flag
mockWeb5Service.clearMockData();

// Reload page
window.location.reload();

// Try creating real DID again
```

## API Reference

### MockWeb5Service

```typescript
class MockWeb5Service {
  // Create mock DID
  async createMockDID(): Promise<string>
  
  // Get current mock DID
  getMockDID(): string | null
  
  // Check if in mock mode
  isMockMode(): boolean
  
  // Write mock record
  async writeMockRecord(data: any, schema: string): Promise<string>
  
  // Read mock record
  async readMockRecord(recordId: string): Promise<any>
  
  // Query mock records
  async queryMockRecords(schema?: string): Promise<MockDWNRecord[]>
  
  // Delete mock record
  async deleteMockRecord(recordId: string): Promise<void>
  
  // Clear all mock data
  clearMockData(): void
  
  // Export mock data
  exportMockData(): any
}
```

## FAQ

### Q: Is mock mode secure?
**A:** Yes, data is stored in your browser's localStorage, which is:
- Isolated per domain
- Not accessible by other websites
- Encrypted by browser (on disk)

### Q: Can others access my mock data?
**A:** No, unless they have physical access to your device and browser.

### Q: Will my mock data sync across devices?
**A:** No, mock data is local only. Use real Web5 for cross-device sync.

### Q: Can I use mock mode in production?
**A:** Yes, but with clear warnings to users about limitations.

### Q: How do I know if I'm in mock mode?
**A:** Check for the warning toast or call `web5Service.isMockMode()`.

### Q: Can I force mock mode for testing?
**A:** Yes, set `localStorage.setItem('meridian_force_mock', 'true')`.

### Q: How do I migrate from mock to real?
**A:** Export data, clear mock mode, create real DID, re-import data.

## Summary

Mock Mode is a **development-friendly fallback** that:
- ✅ Keeps your app working when DHT is down
- ✅ Provides identical API to real Web5
- ✅ Stores data securely in browser
- ⚠️  Is local-only (no sync)
- ⚠️  Should be clearly communicated to users

It's perfect for:
- Development and testing
- MVP/Beta releases
- Emergency fallback
- Offline-first features

But remember:
- Not a replacement for real Web5
- Data is not decentralized
- No cross-device sync
- Provide migration path to real Web5
