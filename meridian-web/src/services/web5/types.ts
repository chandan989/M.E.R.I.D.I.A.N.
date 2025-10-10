/**
 * Web5 Service Types
 * Type definitions for Web5 operations
 */

import { Web5, DwnResponseStatus } from '@web5/api';

// Web5 Connection Result
export interface Web5ConnectionResult {
  web5: Web5;
  did: string;
}

// DID Create Options
export interface DIDCreateOptions {
  dwnEndpoints?: string[];
}

// Record Write Response
export interface RecordWriteResponse {
  recordId: string;
  status: DwnResponseStatus;
}

// Query Filter
export interface QueryFilter {
  schema?: string;
  dataFormat?: string;
  published?: boolean;
  dateCreated?: {
    from?: string;
    to?: string;
  };
}

// Query Result
export interface QueryResult {
  records: any[];
  cursor?: string;
}

// Permission Scope
export interface PermissionScope {
  interface: 'Records' | 'Protocols';
  method: 'Read' | 'Write' | 'Delete' | 'Query';
  protocol?: string;
  expiry?: number; // Unix timestamp
}

// Permission Record
export interface Permission {
  id: string;
  grantedTo: string;
  grantedBy: string;
  scope: PermissionScope;
  recordId: string;
  createdAt: number;
  expiry?: number;
}

// Web5 Error
export class Web5Error extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'Web5Error';
  }
}
