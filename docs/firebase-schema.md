# MERIDIAN Firebase Database Schema Design

## Overview

This document outlines the complete Firebase Firestore database schema for the MERIDIAN platform. The schema is designed to support:
- User management (providers and buyers)
- Dataset listings and metadata
- NFT transactions and ownership
- Access permissions and licenses
- Analytics and marketplace data

## Database Structure

### Collections Overview

```
firestore/
├── users/
├── datasets/
├── nfts/
├── transactions/
├── permissions/
├── analytics/
├── marketplace/
└── notifications/
```

---

## 1. Users Collection

**Collection Path:** `/users/{userId}`

Stores user profiles, wallet information, and account settings.

### Document Structure

```typescript
{
  // Identity
  userId: string;                    // Document ID (same as DID or generated)
  did: string;                       // Web5 Decentralized Identifier
  walletAddress: string;             // Web3 wallet address (Ethereum format)
  username: string;                  // Display name
  email?: string;                    // Optional email
  
  // User Type
  userType: 'provider' | 'buyer';    // Account type
  
  // Profile
  profile: {
    bio?: string;
    avatar?: string;                 // URL to profile image
    location?: string;
    website?: string;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  
  // Statistics (for providers)
  stats?: {
    totalDatasets: number;
    totalSales: number;
    totalRevenue: string;            // In CTC (Creditcoin)
    averageRating: number;
    totalReviews: number;
  };
  
  // Statistics (for buyers)
  buyerStats?: {
    totalPurchases: number;
    totalSpent: string;              // In CTC
    datasetsOwned: number;
  };
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
  isActive: boolean;
  isVerified: boolean;
  
  // Settings
  settings: {
    emailNotifications: boolean;
    marketingEmails: boolean;
    publicProfile: boolean;
  };
}
```

### Indexes

```javascript
// Composite indexes
users: [
  { fields: ['userType', 'createdAt'], order: 'desc' },
  { fields: ['isActive', 'userType'] },
  { fields: ['stats.totalSales', 'createdAt'], order: 'desc' }
]
```

### Example Document

```json
{
  "userId": "user_abc123",
  "did": "did:web5:eyJhbGciOiJFZERTQSJ9...",
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "username": "alice_data_provider",
  "email": "alice@example.com",
  "userType": "provider",
  "profile": {
    "bio": "Agricultural data specialist from Kenya",
    "avatar": "https://storage.example.com/avatars/alice.jpg",
    "location": "Nairobi, Kenya"
  },
  "stats": {
    "totalDatasets": 15,
    "totalSales": 47,
    "totalRevenue": "125.5",
    "averageRating": 4.8,
    "totalReviews": 23
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-03-10T14:22:00Z",
  "lastLoginAt": "2024-03-10T14:22:00Z",
  "isActive": true,
  "isVerified": true,
  "settings": {
    "emailNotifications": true,
    "marketingEmails": false,
    "publicProfile": true
  }
}
```

---

## 2. Datasets Collection

**Collection Path:** `/datasets/{datasetId}`

Stores dataset metadata and listing information.

### Document Structure

```typescript
{
  // Identity
  datasetId: string;                 // Document ID
  dwnRecordId: string;               // DWN record ID where actual data is stored
  
  // Provider Info
  providerId: string;                // Reference to users collection
  providerDid: string;               // Provider's DID
  providerUsername: string;          // Cached for display
  
  // Dataset Info
  name: string;
  description: string;
  category: string;                  // 'agriculture', 'health', 'finance', etc.
  tags: string[];
  
  // File Info
  fileInfo: {
    size: number;                    // In bytes
    type: string;                    // MIME type
    format: string;                  // 'csv', 'json', 'xlsx', etc.
    hash: string;                    // File hash for verification
    rowCount?: number;
    columnCount?: number;
  };
  
  // Quality & Pricing
  qualityScore: number;              // 0-100
  qualityMetrics: {
    completeness: number;
    accuracy: number;
    consistency: number;
    uniqueness: number;
  };
  
  price: string;                     // In CTC
  currency: string;                  // 'CTC'
  
  // NFT Info (after minting)
  nftInfo?: {
    tokenId: string;
    contractAddress: string;
    mintedAt: Timestamp;
    transactionHash: string;
    blockNumber: number;
  };
  
  // Status
  status: 'draft' | 'analyzing' | 'listed' | 'sold' | 'unlisted';
  isListed: boolean;
  
  // Analytics
  views: number;
  favorites: number;
  purchases: number;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  listedAt?: Timestamp;
  
  // AI Analysis
  aiAnalysis?: {
    analyzedAt: Timestamp;
    suggestedPrice: string;
    insights: string[];
    dataTypes: string[];
  };
}
```

### Subcollections

#### `/datasets/{datasetId}/reviews`

```typescript
{
  reviewId: string;
  buyerId: string;
  buyerUsername: string;
  rating: number;                    // 1-5
  comment: string;
  helpful: number;                   // Helpful votes
  createdAt: Timestamp;
}
```

#### `/datasets/{datasetId}/accessLog`

```typescript
{
  logId: string;
  buyerId: string;
  buyerDid: string;
  accessType: 'view' | 'download' | 'query';
  timestamp: Timestamp;
  ipAddress?: string;
}
```

### Indexes

```javascript
datasets: [
  { fields: ['providerId', 'createdAt'], order: 'desc' },
  { fields: ['category', 'isListed', 'createdAt'], order: 'desc' },
  { fields: ['isListed', 'qualityScore'], order: 'desc' },
  { fields: ['isListed', 'price'], order: 'asc' },
  { fields: ['tags', 'isListed'] }
]
```

---

## 3. NFTs Collection

**Collection Path:** `/nfts/{nftId}`

Stores NFT metadata and ownership information.

### Document Structure

```typescript
{
  // Identity
  nftId: string;                     // Document ID
  tokenId: string;                   // On-chain token ID
  contractAddress: string;           // Smart contract address
  
  // Dataset Reference
  datasetId: string;                 // Reference to datasets collection
  dwnRecordId: string;               // DWN record ID
  
  // Ownership
  currentOwner: string;              // Current owner's user ID
  currentOwnerAddress: string;       // Current owner's wallet address
  originalOwner: string;             // Original minter (provider)
  
  // Pricing
  mintPrice: string;                 // Original mint price in CTC
  currentPrice?: string;             // Current listing price (if for sale)
  lastSalePrice?: string;            // Last sale price
  
  // Metadata
  metadata: {
    name: string;
    description: string;
    image: string;                   // IPFS or storage URL
    externalUrl?: string;
    attributes: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
  
  // Status
  status: 'minted' | 'listed' | 'sold' | 'transferred';
  isForSale: boolean;
  isFractional: boolean;             // For future fractional ownership
  
  // Blockchain Info
  blockchain: {
    network: string;                 // 'creditcoin-mainnet' | 'creditcoin-testnet'
    mintTransactionHash: string;
    mintBlockNumber: number;
    mintedAt: Timestamp;
  };
  
  // Access Control
  accessGrants: Array<{
    buyerDid: string;
    grantedAt: Timestamp;
    expiresAt?: Timestamp;
  }>;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastTransferredAt?: Timestamp;
}
```

### Indexes

```javascript
nfts: [
  { fields: ['currentOwner', 'createdAt'], order: 'desc' },
  { fields: ['datasetId'] },
  { fields: ['tokenId', 'contractAddress'] },
  { fields: ['isForSale', 'currentPrice'], order: 'asc' }
]
```

---

## 4. Transactions Collection

**Collection Path:** `/transactions/{transactionId}`

Stores all blockchain transactions and payment records.

### Document Structure

```typescript
{
  // Identity
  transactionId: string;             // Document ID
  transactionHash: string;           // Blockchain transaction hash
  
  // Type
  type: 'mint' | 'purchase' | 'transfer' | 'list' | 'unlist';
  
  // Parties
  from: string;                      // Sender user ID
  fromAddress: string;               // Sender wallet address
  to: string;                        // Receiver user ID
  toAddress: string;                 // Receiver wallet address
  
  // Asset
  nftId?: string;                    // Reference to NFT (if applicable)
  datasetId?: string;                // Reference to dataset
  tokenId?: string;                  // On-chain token ID
  
  // Financial
  amount: string;                    // Transaction amount in CTC
  currency: string;                  // 'CTC'
  gasUsed?: string;                  // Gas used in CTC
  gasFee?: string;                   // Gas fee in CTC
  
  // Blockchain Info
  blockchain: {
    network: string;
    blockNumber: number;
    blockHash: string;
    confirmations: number;
  };
  
  // Status
  status: 'pending' | 'confirming' | 'confirmed' | 'failed';
  
  // Timestamps
  createdAt: Timestamp;
  confirmedAt?: Timestamp;
  
  // Error Info (if failed)
  error?: {
    code: string;
    message: string;
  };
}
```

### Indexes

```javascript
transactions: [
  { fields: ['from', 'createdAt'], order: 'desc' },
  { fields: ['to', 'createdAt'], order: 'desc' },
  { fields: ['type', 'status', 'createdAt'], order: 'desc' },
  { fields: ['transactionHash'] },
  { fields: ['nftId', 'createdAt'], order: 'desc' }
]
```

---

## 5. Permissions Collection

**Collection Path:** `/permissions/{permissionId}`

Tracks DWN access permissions and their status.

### Document Structure

```typescript
{
  // Identity
  permissionId: string;              // Document ID
  
  // Grant Info
  grantedBy: string;                 // Provider user ID
  grantedByDid: string;              // Provider DID
  grantedTo: string;                 // Buyer user ID
  grantedToDid: string;              // Buyer DID
  
  // Resource
  datasetId: string;                 // Dataset being accessed
  dwnRecordId: string;               // DWN record ID
  
  // Permission Details
  scope: {
    interface: 'Records' | 'Protocols';
    method: 'Read' | 'Write' | 'Delete' | 'Query';
    protocol?: string;
  };
  
  // Timing
  grantedAt: Timestamp;
  expiresAt?: Timestamp;
  revokedAt?: Timestamp;
  
  // Status
  status: 'active' | 'expired' | 'revoked';
  isTemporary: boolean;              // True for AI analysis permissions
  
  // Usage Tracking
  usageCount: number;
  lastAccessedAt?: Timestamp;
  
  // Metadata
  reason?: string;                   // 'purchase' | 'ai_analysis' | 'preview'
  nftId?: string;                    // Associated NFT (if from purchase)
}
```

### Indexes

```javascript
permissions: [
  { fields: ['grantedTo', 'status', 'grantedAt'], order: 'desc' },
  { fields: ['grantedBy', 'status', 'grantedAt'], order: 'desc' },
  { fields: ['datasetId', 'status'] },
  { fields: ['status', 'expiresAt'], order: 'asc' }
]
```

---

## 6. Analytics Collection

**Collection Path:** `/analytics/{analyticsId}`

Stores platform analytics and metrics.

### Document Structure

```typescript
{
  // Identity
  analyticsId: string;               // Document ID
  
  // Type
  type: 'daily' | 'weekly' | 'monthly' | 'event';
  
  // Time Period
  period: {
    start: Timestamp;
    end: Timestamp;
  };
  
  // Platform Metrics
  platform?: {
    totalUsers: number;
    newUsers: number;
    activeUsers: number;
    totalProviders: number;
    totalBuyers: number;
  };
  
  // Dataset Metrics
  datasets?: {
    totalDatasets: number;
    newDatasets: number;
    listedDatasets: number;
    totalViews: number;
    totalDownloads: number;
  };
  
  // Transaction Metrics
  transactions?: {
    totalTransactions: number;
    totalVolume: string;             // In CTC
    averagePrice: string;
    totalNFTsMinted: number;
    totalNFTsSold: number;
  };
  
  // Category Breakdown
  categoryStats?: Array<{
    category: string;
    count: number;
    volume: string;
  }>;
  
  // Top Performers
  topProviders?: Array<{
    userId: string;
    username: string;
    sales: number;
    revenue: string;
  }>;
  
  topDatasets?: Array<{
    datasetId: string;
    name: string;
    views: number;
    purchases: number;
  }>;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## 7. Marketplace Collection

**Collection Path:** `/marketplace/{listingId}`

Stores active marketplace listings and featured items.

### Document Structure

```typescript
{
  // Identity
  listingId: string;                 // Document ID
  datasetId: string;                 // Reference to dataset
  nftId?: string;                    // Reference to NFT (if minted)
  
  // Seller Info
  sellerId: string;
  sellerUsername: string;
  sellerDid: string;
  
  // Listing Info
  title: string;
  description: string;
  category: string;
  tags: string[];
  
  // Pricing
  price: string;                     // In CTC
  originalPrice?: string;            // If discounted
  discount?: number;                 // Percentage
  
  // Status
  status: 'active' | 'sold' | 'expired' | 'removed';
  isFeatured: boolean;
  isPremium: boolean;
  
  // Visibility
  visibility: 'public' | 'private' | 'unlisted';
  
  // Engagement
  views: number;
  favorites: number;
  inquiries: number;
  
  // Timestamps
  listedAt: Timestamp;
  expiresAt?: Timestamp;
  soldAt?: Timestamp;
  updatedAt: Timestamp;
}
```

### Indexes

```javascript
marketplace: [
  { fields: ['status', 'listedAt'], order: 'desc' },
  { fields: ['category', 'status', 'price'], order: 'asc' },
  { fields: ['isFeatured', 'status', 'listedAt'], order: 'desc' },
  { fields: ['sellerId', 'status'] }
]
```

---

## 8. Notifications Collection

**Collection Path:** `/notifications/{notificationId}`

Stores user notifications and alerts.

### Document Structure

```typescript
{
  // Identity
  notificationId: string;            // Document ID
  
  // Recipient
  userId: string;                    // User receiving notification
  
  // Notification Info
  type: 'purchase' | 'sale' | 'review' | 'message' | 'system';
  title: string;
  message: string;
  
  // Related Resources
  relatedId?: string;                // ID of related resource
  relatedType?: 'dataset' | 'nft' | 'transaction' | 'user';
  
  // Action
  actionUrl?: string;                // URL to navigate to
  actionLabel?: string;              // Button label
  
  // Status
  isRead: boolean;
  isArchived: boolean;
  
  // Priority
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Timestamps
  createdAt: Timestamp;
  readAt?: Timestamp;
}
```

### Indexes

```javascript
notifications: [
  { fields: ['userId', 'isRead', 'createdAt'], order: 'desc' },
  { fields: ['userId', 'priority', 'createdAt'], order: 'desc' }
]
```

---

## Security Rules

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isProvider() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'provider';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if true;  // Public profiles
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isOwner(userId);
      allow delete: if isOwner(userId);
    }
    
    // Datasets collection
    match /datasets/{datasetId} {
      allow read: if true;  // Public listings
      allow create: if isAuthenticated() && isProvider();
      allow update: if isAuthenticated() && 
                      resource.data.providerId == request.auth.uid;
      allow delete: if isAuthenticated() && 
                      resource.data.providerId == request.auth.uid;
      
      // Reviews subcollection
      match /reviews/{reviewId} {
        allow read: if true;
        allow create: if isAuthenticated();
        allow update: if isAuthenticated() && 
                        resource.data.buyerId == request.auth.uid;
      }
    }
    
    // NFTs collection
    match /nfts/{nftId} {
      allow read: if true;
      allow create: if isAuthenticated() && isProvider();
      allow update: if isAuthenticated() && 
                      resource.data.currentOwner == request.auth.uid;
    }
    
    // Transactions collection
    match /transactions/{transactionId} {
      allow read: if isAuthenticated() && 
                    (resource.data.from == request.auth.uid || 
                     resource.data.to == request.auth.uid);
      allow create: if isAuthenticated();
      allow update: if false;  // Immutable after creation
    }
    
    // Permissions collection
    match /permissions/{permissionId} {
      allow read: if isAuthenticated() && 
                    (resource.data.grantedBy == request.auth.uid || 
                     resource.data.grantedTo == request.auth.uid);
      allow create: if isAuthenticated() && isProvider();
      allow update: if isAuthenticated() && 
                      resource.data.grantedBy == request.auth.uid;
    }
    
    // Analytics collection
    match /analytics/{analyticsId} {
      allow read: if true;  // Public analytics
      allow write: if false;  // Only server-side writes
    }
    
    // Marketplace collection
    match /marketplace/{listingId} {
      allow read: if true;
      allow create: if isAuthenticated() && isProvider();
      allow update: if isAuthenticated() && 
                      resource.data.sellerId == request.auth.uid;
      allow delete: if isAuthenticated() && 
                      resource.data.sellerId == request.auth.uid;
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      allow read: if isAuthenticated() && 
                    resource.data.userId == request.auth.uid;
      allow update: if isAuthenticated() && 
                      resource.data.userId == request.auth.uid;
      allow create: if false;  // Only server-side creates
    }
  }
}
```

---

## Cloud Functions

### Recommended Cloud Functions

```typescript
// 1. onUserCreate - Initialize user stats
exports.onUserCreate = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    const stats = userData.userType === 'provider' 
      ? { totalDatasets: 0, totalSales: 0, totalRevenue: '0', averageRating: 0, totalReviews: 0 }
      : { totalPurchases: 0, totalSpent: '0', datasetsOwned: 0 };
    
    return snap.ref.update({ stats });
  });

// 2. onDatasetCreate - Update provider stats
exports.onDatasetCreate = functions.firestore
  .document('datasets/{datasetId}')
  .onCreate(async (snap, context) => {
    const dataset = snap.data();
    const userRef = admin.firestore().doc(`users/${dataset.providerId}`);
    
    return userRef.update({
      'stats.totalDatasets': admin.firestore.FieldValue.increment(1)
    });
  });

// 3. onNFTPurchase - Update stats and create notification
exports.onNFTPurchase = functions.firestore
  .document('transactions/{transactionId}')
  .onCreate(async (snap, context) => {
    const transaction = snap.data();
    
    if (transaction.type === 'purchase') {
      // Update seller stats
      await admin.firestore().doc(`users/${transaction.from}`).update({
        'stats.totalSales': admin.firestore.FieldValue.increment(1),
        'stats.totalRevenue': admin.firestore.FieldValue.increment(parseFloat(transaction.amount))
      });
      
      // Update buyer stats
      await admin.firestore().doc(`users/${transaction.to}`).update({
        'buyerStats.totalPurchases': admin.firestore.FieldValue.increment(1),
        'buyerStats.totalSpent': admin.firestore.FieldValue.increment(parseFloat(transaction.amount))
      });
      
      // Create notifications
      await admin.firestore().collection('notifications').add({
        userId: transaction.from,
        type: 'sale',
        title: 'Dataset Sold!',
        message: `Your dataset was purchased for ${transaction.amount} CTC`,
        relatedId: transaction.datasetId,
        relatedType: 'dataset',
        isRead: false,
        priority: 'high',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  });

// 4. expirePermissions - Scheduled function to expire old permissions
exports.expirePermissions = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const expiredPermissions = await admin.firestore()
      .collection('permissions')
      .where('status', '==', 'active')
      .where('expiresAt', '<=', now)
      .get();
    
    const batch = admin.firestore().batch();
    expiredPermissions.docs.forEach(doc => {
      batch.update(doc.ref, { status: 'expired' });
    });
    
    return batch.commit();
  });

// 5. generateDailyAnalytics - Scheduled function for analytics
exports.generateDailyAnalytics = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    // Aggregate daily metrics
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Calculate metrics...
    // Store in analytics collection
  });
```

---

## Indexes Summary

Create these composite indexes in Firebase Console:

```javascript
// users
users_userType_createdAt
users_isActive_userType
users_stats_totalSales_createdAt

// datasets
datasets_providerId_createdAt
datasets_category_isListed_createdAt
datasets_isListed_qualityScore
datasets_isListed_price
datasets_tags_isListed

// nfts
nfts_currentOwner_createdAt
nfts_datasetId
nfts_tokenId_contractAddress
nfts_isForSale_currentPrice

// transactions
transactions_from_createdAt
transactions_to_createdAt
transactions_type_status_createdAt
transactions_transactionHash
transactions_nftId_createdAt

// permissions
permissions_grantedTo_status_grantedAt
permissions_grantedBy_status_grantedAt
permissions_datasetId_status
permissions_status_expiresAt

// marketplace
marketplace_status_listedAt
marketplace_category_status_price
marketplace_isFeatured_status_listedAt
marketplace_sellerId_status

// notifications
notifications_userId_isRead_createdAt
notifications_userId_priority_createdAt
```

---

## Migration Strategy

### Phase 1: Initial Setup
1. Create Firestore database
2. Set up collections with initial documents
3. Configure security rules
4. Create composite indexes

### Phase 2: Deploy Cloud Functions
1. Deploy user management functions
2. Deploy transaction tracking functions
3. Deploy scheduled functions (analytics, cleanup)

### Phase 3: Data Migration
1. Migrate existing user data (if any)
2. Sync blockchain data with Firestore
3. Validate data integrity

### Phase 4: Testing
1. Test security rules
2. Test Cloud Functions
3. Load testing
4. Performance optimization

---

## Best Practices

### 1. Data Denormalization
- Cache frequently accessed data (e.g., username in datasets)
- Reduces read operations
- Update cached data via Cloud Functions

### 2. Pagination
- Use cursor-based pagination for large collections
- Limit query results to 20-50 documents
- Implement infinite scroll in UI

### 3. Real-time Updates
- Use Firestore listeners for live data
- Limit listeners to necessary collections
- Unsubscribe when components unmount

### 4. Cost Optimization
- Use Cloud Functions for aggregations
- Cache analytics data
- Implement proper indexes to avoid full collection scans
- Use batch operations for bulk updates

### 5. Security
- Always validate data on server-side
- Use Cloud Functions for sensitive operations
- Implement rate limiting
- Regular security audits

---

## Backup Strategy

### Automated Backups
```bash
# Daily backups
gcloud firestore export gs://meridian-backups/$(date +%Y%m%d)

# Retention: 30 days
```

### Point-in-Time Recovery
- Enable Firestore PITR
- Retention period: 7 days
- Test recovery procedures monthly

---

This schema provides a solid foundation for MERIDIAN's database needs while maintaining flexibility for future enhancements!
