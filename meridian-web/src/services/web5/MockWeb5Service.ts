/**
 * Mock Web5 Service
 * Temporary fallback when DHT network is unavailable
 * 
 * This creates a simulated Web5 environment that:
 * - Generates a mock DID
 * - Stores data in localStorage (instead of DWN)
 * - Works completely offline
 * 
 * TODO: Remove this once DHT network is stable or we have proper fallback in Web5 SDK
 */

import { STORAGE_KEYS } from '@/config/constants';

interface MockDWNRecord {
  id: string;
  data: any;
  schema: string;
  dataFormat: string;
  dateCreated: string;
}

class MockWeb5Service {
  private mockDID: string | null = null;
  private mockRecords: Map<string, MockDWNRecord> = new Map();
  private readonly MOCK_RECORDS_KEY = 'meridian_mock_dwn_records';

  /**
   * Create a mock DID (simulated)
   */
  async createMockDID(): Promise<string> {
    // Generate a mock DID that looks realistic
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const mockDID = `did:key:z6Mk${random}${timestamp}`;
    
    this.mockDID = mockDID;
    
    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.WEB5_DID, mockDID);
    localStorage.setItem('meridian_mock_mode', 'true');
    
    // Load existing records
    this.loadRecords();
    
    console.log('🔧 Mock DID created (development mode):', mockDID);
    console.warn('⚠️  Using mock Web5 service - data stored locally only');
    
    return mockDID;
  }

  /**
   * Get mock DID
   */
  getMockDID(): string | null {
    return this.mockDID;
  }

  /**
   * Check if in mock mode
   */
  isMockMode(): boolean {
    return localStorage.getItem('meridian_mock_mode') === 'true';
  }

  /**
   * Write to mock DWN (localStorage)
   */
  async writeMockRecord(data: any, schema: string): Promise<string> {
    const recordId = `mock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    const record: MockDWNRecord = {
      id: recordId,
      data,
      schema,
      dataFormat: 'application/json',
      dateCreated: new Date().toISOString()
    };
    
    this.mockRecords.set(recordId, record);
    this.saveRecords();
    
    console.log('🔧 Mock record created:', recordId);
    return recordId;
  }

  /**
   * Read from mock DWN
   */
  async readMockRecord(recordId: string): Promise<any> {
    const record = this.mockRecords.get(recordId);
    
    if (!record) {
      throw new Error(`Mock record not found: ${recordId}`);
    }
    
    return record.data;
  }

  /**
   * Query mock DWN
   */
  async queryMockRecords(schema?: string): Promise<MockDWNRecord[]> {
    const records = Array.from(this.mockRecords.values());
    
    if (schema) {
      return records.filter(r => r.schema === schema);
    }
    
    return records;
  }

  /**
   * Delete mock record
   */
  async deleteMockRecord(recordId: string): Promise<void> {
    this.mockRecords.delete(recordId);
    this.saveRecords();
    console.log('🔧 Mock record deleted:', recordId);
  }

  /**
   * Clear all mock data
   */
  clearMockData(): void {
    this.mockRecords.clear();
    localStorage.removeItem(this.MOCK_RECORDS_KEY);
    localStorage.removeItem('meridian_mock_mode');
    localStorage.removeItem(STORAGE_KEYS.WEB5_DID);
    console.log('🔧 Mock data cleared');
  }

  /**
   * Save records to localStorage
   */
  private saveRecords(): void {
    const recordsArray = Array.from(this.mockRecords.entries());
    localStorage.setItem(this.MOCK_RECORDS_KEY, JSON.stringify(recordsArray));
  }

  /**
   * Load records from localStorage
   */
  private loadRecords(): void {
    const stored = localStorage.getItem(this.MOCK_RECORDS_KEY);
    
    if (stored) {
      try {
        const recordsArray = JSON.parse(stored);
        this.mockRecords = new Map(recordsArray);
        console.log(`🔧 Loaded ${this.mockRecords.size} mock records`);
      } catch (error) {
        console.error('Failed to load mock records:', error);
      }
    }
  }

  /**
   * Export mock data (for migration to real Web5 later)
   */
  exportMockData(): any {
    return {
      did: this.mockDID,
      records: Array.from(this.mockRecords.values())
    };
  }
}

// Export singleton
export const mockWeb5Service = new MockWeb5Service();
export default MockWeb5Service;
