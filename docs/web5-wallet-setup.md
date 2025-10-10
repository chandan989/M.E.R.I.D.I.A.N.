# Web5 Wallet Setup Guide

## Overview

MERIDIAN uses **TBD's Web5 SDK** which creates an **in-app wallet** automatically. Users don't need any external wallet extension or app. The wallet is created and stored directly in the browser.

## How It Works

### Web5.connect() Method

The `Web5.connect()` method does the following automatically:

1. **Creates a DID (Decentralized Identifier)** - Your unique identity
2. **Creates a DWN (Decentralized Web Node)** - Your personal data storage
3. **Stores the agent in IndexedDB** - Persists across browser sessions
4. **Returns a Web5 instance** - Used for all DWN operations

### No External Wallet Required

Unlike Web3 (which requires MetaMask or similar), Web5 is built into the application:

```typescript
// This creates everything automatically
const { web5, did } = await Web5.connect({
  techPreview: {
    dwnEndpoints: ['https://dwn.tbddev.org/beta']
  }
});

// Now you have:
// - did: Your decentralized identifier (e.g., "did:dht:...")
// - web5: Instance to interact with your DWN
```

## Implementation in MERIDIAN

### Registration Flow

1. **User clicks "Create Web5 Wallet"**
   - Calls `web5Service.createDID()`
   - Web5.connect() creates DID + DWN
   - DID is stored in localStorage
   - Agent is stored in IndexedDB (by Web5 SDK)

2. **User enters username**

3. **User selects role (Provider/Buyer)**

4. **User connects Web3 wallet (MetaMask)**
   - This IS an external wallet
   - Used for blockchain transactions

5. **Registration complete**
   - User has both Web5 (in-app) and Web3 (external) wallets

### Login Flow

1. **User clicks "Access Your Web5 Wallet"**
   - Calls `web5Service.connect()`
   - Web5.connect() retrieves existing agent from IndexedDB
   - Returns the same DID as before

2. **User selects role**

3. **User connects Web3 wallet**

4. **Login complete**

## Storage Locations

### Web5 Data (Automatic)
- **Agent**: IndexedDB (managed by Web5 SDK)
- **DWN Records**: Remote DWN endpoints + local cache
- **DID**: localStorage (for reference only)

### Web3 Data
- **Private Keys**: MetaMask extension
- **Wallet Address**: localStorage (for reference)

## Key Differences: Web5 vs Web3

| Feature | Web5 | Web3 |
|---------|------|------|
| **Wallet Type** | In-app (browser) | External (MetaMask) |
| **Installation** | Automatic | User must install |
| **Storage** | IndexedDB | Browser extension |
| **Purpose** | Identity + Data | Transactions + NFTs |
| **User Action** | Click button | Approve in extension |

## Code Example

### Creating a Web5 Wallet

```typescript
// In Web5Service.ts
async createDID(): Promise<string> {
  // This creates everything automatically
  const { web5, did } = await Web5.connect({
    techPreview: {
      dwnEndpoints: ['https://dwn.tbddev.org/beta']
    }
  });

  // Store references
  this.web5 = web5;
  this.did = did;
  
  // Save DID for display
  localStorage.setItem('meridian_web5_did', did);
  
  return did;
}
```

### Using the Web5 Wallet

```typescript
// Write data to your DWN
const { record } = await web5.dwn.records.create({
  data: { name: "My Dataset", description: "..." },
  message: {
    schema: 'https://meridian.io/schemas/dataset',
    dataFormat: 'application/json'
  }
});

// Read data from your DWN
const { records } = await web5.dwn.records.query({
  message: {
    filter: {
      schema: 'https://meridian.io/schemas/dataset'
    }
  }
});
```

## Troubleshooting

### "Failed to connect to wallet"

**Cause**: Web5.connect() failed to create/retrieve agent

**Solutions**:
1. Check browser console for detailed error
2. Clear IndexedDB: DevTools → Application → IndexedDB → Delete
3. Clear localStorage: DevTools → Application → Local Storage → Clear
4. Try in incognito mode (fresh state)
5. Check network connection (needs to reach DWN endpoints)

### "DID not persisting"

**Cause**: IndexedDB not working or being cleared

**Solutions**:
1. Check if browser allows IndexedDB
2. Check if in private/incognito mode (may not persist)
3. Verify localStorage has the DID reference
4. Check browser storage settings

### "Cannot read from DWN"

**Cause**: Web5 instance not initialized

**Solutions**:
1. Ensure `web5Service.connect()` was called
2. Check if `web5Service.isConnected()` returns true
3. Verify DID is set: `web5Service.getDID()`

## Best Practices

### 1. Always Check Connection

```typescript
if (!web5Service.isConnected()) {
  await web5Service.connect();
}
```

### 2. Handle Errors Gracefully

```typescript
try {
  const did = await web5Service.createDID();
} catch (error) {
  if (error instanceof Web5Error) {
    // Show user-friendly message
    toast.error(error.message);
  }
}
```

### 3. Store DID Reference

```typescript
// Store in localStorage for quick access
localStorage.setItem('meridian_web5_did', did);

// Store in Firebase for cross-device access
await firestore.collection('users').doc(userId).set({
  did: did,
  // ... other user data
});
```

### 4. Sync Across Devices

Web5 agents are browser-specific. To access data from multiple devices:

1. Store DID in Firebase
2. Use the same DID to query DWN from any device
3. DWN data is stored remotely, accessible from anywhere

## Security Considerations

### What's Stored Where

- **Private Keys**: In IndexedDB (encrypted by Web5 SDK)
- **DID**: Public identifier (safe to share)
- **DWN Data**: Encrypted at rest on DWN endpoints
- **Permissions**: Managed via Web5 protocols

### User Privacy

- Users control their data (stored in their DWN)
- Providers grant temporary read access for AI analysis
- Buyers get permanent read access after NFT purchase
- All access is cryptographically verified

## Resources

- [Web5 Documentation](https://developer.tbd.website/docs/web5/)
- [Web5 API Reference](https://tbd54566975.github.io/web5-js/)
- [DWN Specification](https://identity.foundation/decentralized-web-node/spec/)
- [DID Specification](https://www.w3.org/TR/did-core/)

## Summary

✅ Web5 wallet is **created automatically** in the browser
✅ No external wallet or extension needed
✅ DID and agent persist across sessions (IndexedDB)
✅ Data stored in personal DWN (decentralized)
✅ Full user control and privacy
✅ Works seamlessly with Web3 for blockchain transactions
