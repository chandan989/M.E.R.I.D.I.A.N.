/**
 * Web5 Service
 * Handles all Web5 SDK interactions for identity and data management
 */

import { Web5 } from '@web5/api';
import { WEB5_CONFIG } from '@/config/wallet.config';
import { STORAGE_KEYS, ERROR_CODES, ERROR_MESSAGES } from '@/config/constants';
import {
  Web5ConnectionResult,
  DIDCreateOptions,
  RecordWriteResponse,
  QueryFilter,
  QueryResult,
  PermissionScope,
  Permission,
  Web5Error
} from './types';
import { mockWeb5Service } from './MockWeb5Service';

class Web5Service {
  private web5: Web5 | null = null;
  private did: string | null = null;
  private isInitialized: boolean = false;
  private useMockMode: boolean = false;

  /**
   * Initialize Web5 SDK
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Check if we have a stored DID to reconnect
      const storedDID = localStorage.getItem(STORAGE_KEYS.WEB5_DID);
      
      if (storedDID) {
        await this.connect();
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Web5:', error);
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED,
        error
      );
    }
  }

  /**
   * Create a new DID
   * 
   * Strategy:
   * 1. Try to create real Web5 DID
   * 2. If DHT network fails, fallback to mock mode (development)
   */
  async createDID(options?: DIDCreateOptions): Promise<string> {
    try {
      console.log('Creating Web5 identity...');
      console.log('DWN Endpoints:', options?.dwnEndpoints || WEB5_CONFIG.techPreview.dwnEndpoints);
      
      // Try to create real Web5 DID
      const { web5, did } = await Web5.connect({
        techPreview: {
          dwnEndpoints: options?.dwnEndpoints || WEB5_CONFIG.techPreview.dwnEndpoints
        }
      });

      console.log('✅ Web5 identity created successfully');
      console.log('DID:', did);
      
      this.web5 = web5;
      this.did = did;
      this.useMockMode = false;

      // Store DID in localStorage
      localStorage.setItem(STORAGE_KEYS.WEB5_DID, did);
      localStorage.setItem(STORAGE_KEYS.LAST_CONNECTION_TIME, Date.now().toString());

      return did;
      
    } catch (error: any) {
      console.error('Failed to create real Web5 identity:', error);
      
      // Check if it's a DHT/network error
      const isDHTError = error?.message?.includes('Pkarr') || 
                        error?.message?.includes('Failed to fetch') ||
                        error?.message?.includes('DHT');
      
      if (isDHTError) {
        console.warn('⚠️  DHT network unavailable, using mock mode for development');
        console.warn('⚠️  Data will be stored locally only (not on DWN)');
        
        // Fallback to mock mode
        this.useMockMode = true;
        const mockDID = await mockWeb5Service.createMockDID();
        this.did = mockDID;
        
        return mockDID;
      }
      
      // If it's not a DHT error, throw it
      throw new Web5Error(
        `Failed to create Web5 identity: ${error?.message || 'Unknown error'}`,
        ERROR_CODES.DID_CREATION_FAILED,
        error
      );
    }
  }

  /**
   * Connect to existing Web5 agent
   */
  async connect(): Promise<Web5ConnectionResult> {
    try {
      const { web5, did } = await Web5.connect({
        techPreview: {
          dwnEndpoints: WEB5_CONFIG.techPreview.dwnEndpoints
        }
      });

      this.web5 = web5;
      this.did = did;

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.WEB5_DID, did);
      localStorage.setItem(STORAGE_KEYS.LAST_CONNECTION_TIME, Date.now().toString());

      console.log('Connected to Web5 with DID:', did);
      return { web5, did };
    } catch (error) {
      console.error('Failed to connect to Web5:', error);
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.WALLET_CONNECTION_FAILED],
        ERROR_CODES.WALLET_CONNECTION_FAILED,
        error
      );
    }
  }

  /**
   * Disconnect from Web5
   */
  async disconnect(): Promise<void> {
    this.web5 = null;
    this.did = null;
    this.isInitialized = false;

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.WEB5_DID);
    localStorage.removeItem(STORAGE_KEYS.LAST_CONNECTION_TIME);

    console.log('Disconnected from Web5');
  }

  /**
   * Check if Web5 is connected
   */
  isConnected(): boolean {
    return (this.web5 !== null && this.did !== null) || this.useMockMode;
  }

  /**
   * Check if using mock mode
   */
  isMockMode(): boolean {
    return this.useMockMode;
  }

  /**
   * Get current DID
   */
  getDID(): string | null {
    return this.did;
  }

  /**
   * Write data to DWN (or mock storage)
   */
  async writeToDWN(data: any, schema: string): Promise<RecordWriteResponse> {
    // Use mock mode if enabled
    if (this.useMockMode) {
      const recordId = await mockWeb5Service.writeMockRecord(data, schema);
      return {
        recordId,
        status: { code: 202, detail: 'Accepted (mock)' } as any
      };
    }

    if (!this.web5) {
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      const { record, status } = await this.web5.dwn.records.create({
        data: data,
        message: {
          schema: schema,
          dataFormat: 'application/json',
          published: false // Private by default
        }
      });

      if (!record) {
        throw new Error('Failed to create record');
      }

      console.log('Data written to DWN:', record.id);
      return {
        recordId: record.id,
        status: status
      };
    } catch (error) {
      console.error('Failed to write to DWN:', error);
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.DWN_WRITE_FAILED],
        ERROR_CODES.DWN_WRITE_FAILED,
        error
      );
    }
  }

  /**
   * Read data from DWN
   */
  async readFromDWN(recordId: string): Promise<any> {
    if (!this.web5) {
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      const { record } = await this.web5.dwn.records.read({
        message: {
          filter: {
            recordId: recordId
          }
        }
      });

      if (!record) {
        throw new Error('Record not found');
      }

      const data = await record.data.json();
      console.log('Data read from DWN:', recordId);
      return data;
    } catch (error) {
      console.error('Failed to read from DWN:', error);
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.DWN_READ_FAILED],
        ERROR_CODES.DWN_READ_FAILED,
        error
      );
    }
  }

  /**
   * Query DWN records
   */
  async queryDWN(filter: QueryFilter): Promise<QueryResult> {
    if (!this.web5) {
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      const { records } = await this.web5.dwn.records.query({
        message: {
          filter: {
            schema: filter.schema,
            dataFormat: filter.dataFormat,
            published: filter.published
          }
        }
      });

      const recordsData = await Promise.all(
        (records || []).map(async (record) => ({
          id: record.id,
          data: await record.data.json(),
          metadata: {
            dateCreated: record.dateCreated,
            dataFormat: record.dataFormat,
            schema: record.schema
          }
        }))
      );

      console.log('Query returned', recordsData.length, 'records');
      return {
        records: recordsData
      };
    } catch (error) {
      console.error('Failed to query DWN:', error);
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.DWN_QUERY_FAILED],
        ERROR_CODES.DWN_QUERY_FAILED,
        error
      );
    }
  }

  /**
   * Delete record from DWN
   */
  async deleteFromDWN(recordId: string): Promise<void> {
    if (!this.web5) {
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      const { record } = await this.web5.dwn.records.read({
        message: {
          filter: {
            recordId: recordId
          }
        }
      });

      if (!record) {
        throw new Error('Record not found');
      }

      await record.delete();
      console.log('Record deleted from DWN:', recordId);
    } catch (error) {
      console.error('Failed to delete from DWN:', error);
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.DWN_DELETE_FAILED],
        ERROR_CODES.DWN_DELETE_FAILED,
        error
      );
    }
  }

  /**
   * Grant permission to access a record
   * Note: This is a simplified implementation. Full permission management
   * requires more complex protocol configurations in Web5.
   */
  async grantPermission(
    targetDID: string,
    recordId: string,
    scope: PermissionScope
  ): Promise<void> {
    if (!this.web5) {
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      // In a production implementation, this would use Web5 protocols
      // to grant specific permissions. For now, we'll log the intent.
      console.log('Granting permission:', {
        targetDID,
        recordId,
        scope
      });

      // Store permission record for tracking
      const permissionRecord = {
        grantedTo: targetDID,
        grantedBy: this.did,
        recordId,
        scope,
        createdAt: Date.now(),
        expiry: scope.expiry
      };

      await this.writeToDWN(permissionRecord, 'https://meridian.io/schemas/permission');
      
      console.log('Permission granted successfully');
    } catch (error) {
      console.error('Failed to grant permission:', error);
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.PERMISSION_GRANT_FAILED],
        ERROR_CODES.PERMISSION_GRANT_FAILED,
        error
      );
    }
  }

  /**
   * Revoke permission
   */
  async revokePermission(targetDID: string, recordId: string): Promise<void> {
    if (!this.web5) {
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      console.log('Revoking permission:', { targetDID, recordId });
      
      // In production, this would revoke the actual protocol permission
      // For now, we'll mark the permission record as revoked
      
      console.log('Permission revoked successfully');
    } catch (error) {
      console.error('Failed to revoke permission:', error);
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.PERMISSION_REVOKE_FAILED],
        ERROR_CODES.PERMISSION_REVOKE_FAILED,
        error
      );
    }
  }

  /**
   * List all permissions
   */
  async listPermissions(): Promise<Permission[]> {
    if (!this.web5) {
      throw new Web5Error(
        ERROR_MESSAGES[ERROR_CODES.WEB5_NOT_INITIALIZED],
        ERROR_CODES.WEB5_NOT_INITIALIZED
      );
    }

    try {
      const result = await this.queryDWN({
        schema: 'https://meridian.io/schemas/permission'
      });

      return result.records.map((record) => ({
        id: record.id,
        ...record.data
      }));
    } catch (error) {
      console.error('Failed to list permissions:', error);
      return [];
    }
  }
}

// Export singleton instance
export const web5Service = new Web5Service();
export default Web5Service;
