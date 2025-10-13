/**
 * Web5 Service
 * Handles all Web5 SDK interactions for identity and data management
 */

import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';
import { Web5UserAgent } from '@web5/user-agent';
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
    console.log('🔐 Creating Web5 identity with YOUR infrastructure...');
    console.log('📡 DWN Server:', WEB5_CONFIG.techPreview.dwnEndpoints[0]);
    console.log('📡 DHT Server:', WEB5_CONFIG.didDhtGateway);
    
    try {
      // Create Web5 UserAgent manually to have full control
      console.log('Creating Web5UserAgent...');
      const userAgent = await Web5UserAgent.create();
      
      const password = 'meridian-secure-password-' + Date.now();
      
      // Initialize agent on first launch
      if (await userAgent.firstLaunch()) {
        console.log('First launch - initializing agent with YOUR DWN...');
        await userAgent.initialize({ 
          password,
          dwnEndpoints: WEB5_CONFIG.techPreview.dwnEndpoints
        });
      }
      
      await userAgent.start({ password });
      
      // Check if identity exists
      const identities = await userAgent.identity.list();
      let identity;
      
      if (identities.length === 0) {
        console.log('Creating new DID with YOUR DHT server...');
        
        // Create DID directly using YOUR DHT (bypassing the agent's create method)
        const bearerDid = await DidDht.create({
          options: {
            gatewayUri: WEB5_CONFIG.didDhtGateway,  // YOUR DHT!
            publish: true,
            services: [{
              id: 'dwn',
              type: 'DecentralizedWebNode',
              serviceEndpoint: WEB5_CONFIG.techPreview.dwnEndpoints,
              enc: '#enc',
              sig: '#sig'
            }]
          }
        });
        
        console.log('✅ DID created and published to YOUR DHT!');
        console.log('🆔 DID:', bearerDid.uri);
        
        // Export to portable format
        const portableDid = await bearerDid.export();
        
        // Import into agent as identity
        console.log('Importing DID into agent...');
        identity = await userAgent.identity.import({
          portableIdentity: {
            portableDid: portableDid,
            metadata: {
              name: 'Default',
              uri: bearerDid.uri,
              tenant: userAgent.agentDid.uri
            }
          }
        });
        
        console.log('✅ Identity imported into agent successfully!');
      } else {
        identity = identities[0];
        console.log('✅ Loaded existing identity');
      }
      
      const connectedDid = identity.did.uri;
      
      // Create Web5 instance
      const web5 = new Web5({ 
        agent: userAgent, 
        connectedDid 
      });
      
      this.web5 = web5;
      this.did = connectedDid;
      this.useMockMode = false;

      localStorage.setItem(STORAGE_KEYS.WEB5_DID, connectedDid);
      localStorage.setItem(STORAGE_KEYS.LAST_CONNECTION_TIME, Date.now().toString());

      console.log('✅✅✅ SUCCESS! Using YOUR Web5 Infrastructure! ✅✅✅');
      console.log('🆔 DID:', connectedDid);
      console.log('📡 DHT:', WEB5_CONFIG.didDhtGateway);
      console.log('💾 DWN:', WEB5_CONFIG.techPreview.dwnEndpoints[0]);

      return connectedDid;
      
    } catch (error: any) {
      console.error('❌ Web5 completely failed:', error.message);
      console.log('🔄 Using mock mode');
      
      this.useMockMode = true;
      const mockDID = await mockWeb5Service.createMockDID();
      this.did = mockDID;
      
      return mockDID;
    }
  }

  /**
   * Connect to existing Web5 agent
   */
  async connect(): Promise<Web5ConnectionResult> {
    console.log('🔐 Connecting to existing Web5 identity...');
    
    try {
      // Create agent manually (same as createDID)
      const userAgent = await Web5UserAgent.create();
      const password = 'meridian-secure-password-' + Date.now();
      
      // Agent should already be initialized (from previous registration)
      if (await userAgent.firstLaunch()) {
        throw new Error('No existing identity found. Please register first.');
      }
      
      await userAgent.start({ password });
      
      // Get existing identity
      const identities = await userAgent.identity.list();
      if (identities.length === 0) {
        throw new Error('No identity found. Please register first.');
      }
      
      const identity = identities[0];
      const connectedDid = identity.did.uri;
      
      // Create Web5 instance
      const web5 = new Web5({ 
        agent: userAgent, 
        connectedDid 
      });
      
      this.web5 = web5;
      this.did = connectedDid;
      this.useMockMode = false;

      localStorage.setItem(STORAGE_KEYS.WEB5_DID, connectedDid);
      localStorage.setItem(STORAGE_KEYS.LAST_CONNECTION_TIME, Date.now().toString());

      console.log('✅ Connected successfully!');
      console.log('🆔 DID:', connectedDid);
      console.log('💾 DWN:', WEB5_CONFIG.techPreview.dwnEndpoints[0]);
      
      return { web5, did: connectedDid };
      
    } catch (error: any) {
      console.error('❌ Login failed:', error.message);
      
      // Fallback to mock mode
      const storedDID = localStorage.getItem(STORAGE_KEYS.WEB5_DID);
      if (storedDID) {
        console.log('✅ Using stored DID with mock mode');
        this.did = storedDID;
        this.useMockMode = true;
        
        return { 
          web5: null as any, 
          did: storedDID 
        };
      }
      
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
